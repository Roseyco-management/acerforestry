"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import {
  User,
  Building2,
  Settings as SettingsIcon,
  Palette,
  Users,
  Save,
  Eye,
  EyeOff,
  AlertCircle,
  CheckCircle,
  Moon,
  Sun,
} from "lucide-react";
import { TextInput, Select, Checkbox, FormGroup } from "@/components/admin/FormFields";
import { cn } from "@/lib/utils";

// Force dynamic rendering to avoid SSR issues
export const dynamic = 'force-dynamic';

type Tab = "profile" | "system" | "admin-users" | "theme";

interface UserProfile {
  id: string;
  email: string;
  full_name: string;
  role: string;
}

interface SystemSettings {
  companyName: string;
  companyAddress: string;
  companyPhone: string;
  companyEmail: string;
  currency: string;
  dateFormat: string;
  timezone: string;
  emailNotifications: boolean;
}

interface FormErrors {
  [key: string]: string;
}

interface AdminUser {
  id: string;
  email: string;
  full_name: string;
  role: "admin" | "manager" | "viewer";
  is_active: boolean;
  created_at: string;
}

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<Tab>("profile");
  const [loading, setLoading] = useState(false);
  const [saveMessage, setSaveMessage] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  // Profile state
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [profileErrors, setProfileErrors] = useState<FormErrors>({});

  // System settings state
  const [systemSettings, setSystemSettings] = useState<SystemSettings>({
    companyName: "Acer Forestry",
    companyAddress: "",
    companyPhone: "",
    companyEmail: "",
    currency: "GBP",
    dateFormat: "DD/MM/YYYY",
    timezone: "Europe/London",
    emailNotifications: true,
  });
  const [systemErrors, setSystemErrors] = useState<FormErrors>({});

  // Admin users state
  const [adminUsers, setAdminUsers] = useState<AdminUser[]>([]);
  const [usersLoading, setUsersLoading] = useState(false);

  // Theme state
  const [theme, setTheme] = useState<"light" | "dark">("light");

  // Load user profile
  useEffect(() => {
    loadUserProfile();
    loadSystemSettings();
    loadAdminUsers();
    loadTheme();
  }, []);

  const loadUserProfile = async () => {
    try {
      const supabase = createClient();
      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser();

      if (authError) throw authError;
      if (!user) return;

      const { data: profile, error: profileError } = await supabase
        .from("users")
        .select("*")
        .eq("id", user.id)
        .single();

      if (profileError) throw profileError;

      setUserProfile(profile);
      setDisplayName(profile.full_name);
      setEmail(profile.email);
    } catch (error) {
      console.error("Error loading profile:", error);
    }
  };

  const loadSystemSettings = async () => {
    try {
      const supabase = createClient();
      // Load from website_content table
      const { data, error } = await supabase
        .from("website_content")
        .select("*")
        .eq("page", "settings")
        .eq("content_type", "json");

      if (error) throw error;

      if (data && data.length > 0) {
        const settings = JSON.parse(data[0].content_value);
        setSystemSettings((prev) => ({ ...prev, ...settings }));
      }
    } catch (error) {
      console.error("Error loading system settings:", error);
    }
  };

  const loadAdminUsers = async () => {
    try {
      setUsersLoading(true);
      const supabase = createClient();
      const { data, error } = await supabase
        .from("users")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setAdminUsers(data || []);
    } catch (error) {
      console.error("Error loading admin users:", error);
    } finally {
      setUsersLoading(false);
    }
  };

  const loadTheme = () => {
    // Only access localStorage on the client side
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
      if (savedTheme) {
        setTheme(savedTheme);
        applyTheme(savedTheme);
      }
    }
  };

  const applyTheme = (newTheme: "light" | "dark") => {
    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  const handleSaveProfile = async () => {
    const errors: FormErrors = {};

    if (!displayName.trim()) {
      errors.displayName = "Display name is required";
    }

    if (!email.trim()) {
      errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = "Please enter a valid email";
    }

    setProfileErrors(errors);
    if (Object.keys(errors).length > 0) return;

    try {
      setLoading(true);
      setSaveMessage(null);
      const supabase = createClient();

      // Update display name in users table
      const { error: updateError } = await supabase
        .from("users")
        .update({
          full_name: displayName,
          email: email,
          updated_at: new Date().toISOString(),
        })
        .eq("id", userProfile?.id);

      if (updateError) throw updateError;

      // Update email in auth if changed
      if (email !== userProfile?.email) {
        const { error: authError } = await supabase.auth.updateUser({
          email: email,
        });

        if (authError) throw authError;
      }

      setSaveMessage({
        type: "success",
        message: "Profile updated successfully!",
      });
      loadUserProfile();
    } catch (error: any) {
      setSaveMessage({
        type: "error",
        message: error.message || "Failed to update profile",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChangePassword = async () => {
    const errors: FormErrors = {};

    if (!newPassword) {
      errors.newPassword = "New password is required";
    } else if (newPassword.length < 8) {
      errors.newPassword = "Password must be at least 8 characters";
    }

    if (newPassword !== confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }

    setProfileErrors(errors);
    if (Object.keys(errors).length > 0) return;

    try {
      setLoading(true);
      setSaveMessage(null);
      const supabase = createClient();

      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (error) throw error;

      setSaveMessage({
        type: "success",
        message: "Password changed successfully!",
      });

      // Clear password fields
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error: any) {
      setSaveMessage({
        type: "error",
        message: error.message || "Failed to change password",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSaveSystemSettings = async () => {
    const errors: FormErrors = {};

    if (!systemSettings.companyName.trim()) {
      errors.companyName = "Company name is required";
    }

    if (systemSettings.companyEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(systemSettings.companyEmail)) {
      errors.companyEmail = "Please enter a valid email";
    }

    setSystemErrors(errors);
    if (Object.keys(errors).length > 0) return;

    try {
      setLoading(true);
      setSaveMessage(null);
      const supabase = createClient();

      // Check if settings exist
      const { data: existing } = await supabase
        .from("website_content")
        .select("id")
        .eq("page", "settings")
        .eq("content_key", "system_settings")
        .single();

      const settingsData = {
        content_key: "system_settings",
        content_type: "json" as const,
        content_value: JSON.stringify(systemSettings),
        page: "settings",
        section: "system",
        description: "System-wide settings",
      };

      if (existing) {
        const { error } = await supabase
          .from("website_content")
          .update({
            ...settingsData,
            updated_at: new Date().toISOString(),
          })
          .eq("id", existing.id);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from("website_content")
          .insert(settingsData);

        if (error) throw error;
      }

      setSaveMessage({
        type: "success",
        message: "System settings saved successfully!",
      });
    } catch (error: any) {
      setSaveMessage({
        type: "error",
        message: error.message || "Failed to save system settings",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleThemeChange = (newTheme: "light" | "dark") => {
    setTheme(newTheme);
    applyTheme(newTheme);
    if (typeof window !== 'undefined') {
      localStorage.setItem("theme", newTheme);
    }
    setSaveMessage({
      type: "success",
      message: `Theme changed to ${newTheme} mode`,
    });
  };

  const tabs = [
    { id: "profile" as Tab, label: "User Profile", icon: User },
    { id: "system" as Tab, label: "System Settings", icon: Building2 },
    { id: "admin-users" as Tab, label: "Admin Users", icon: Users },
    { id: "theme" as Tab, label: "Theme", icon: Palette },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold uppercase tracking-wide text-white">
          Settings
        </h1>
        <p className="mt-2 text-white/80">
          Manage your account and system preferences
        </p>
      </div>

      {/* Save Message */}
      {saveMessage && (
        <div
          className={cn(
            "flex items-center gap-3 p-4 rounded-lg border",
            saveMessage.type === "success"
              ? "bg-green-50 border-green-200 text-green-800"
              : "bg-red-50 border-red-200 text-red-800"
          )}
        >
          {saveMessage.type === "success" ? (
            <CheckCircle className="w-5 h-5" />
          ) : (
            <AlertCircle className="w-5 h-5" />
          )}
          <p className="font-medium">{saveMessage.message}</p>
        </div>
      )}

      {/* Tabs */}
      <div className="border-b border-forest-600">
        <nav className="flex gap-8 overflow-x-auto">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "flex items-center gap-2 pb-4 px-1 border-b-2 font-medium transition-colors whitespace-nowrap",
                  activeTab === tab.id
                    ? "border-white text-white"
                    : "border-transparent text-white/70 hover:text-white hover:border-white/50"
                )}
              >
                <Icon className="w-5 h-5" />
                {tab.label}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="bg-forest-700 dark:bg-forest-800 rounded-lg border-2 border-forest-600 shadow-forest-lg p-6">
        {/* Profile Tab */}
        {activeTab === "profile" && (
          <div className="space-y-8 max-w-2xl">
            {/* User Info */}
            <div>
              <h2 className="text-xl font-bold uppercase tracking-wide text-white mb-4">
                Profile Information
              </h2>
              <FormGroup>
                <TextInput
                  label="Display Name"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  error={profileErrors.displayName}
                  required
                />
                <TextInput
                  label="Email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  error={profileErrors.email}
                  required
                  helperText="Changing your email will require verification"
                />
                {userProfile && (
                  <div className="text-sm text-white/80">
                    <span className="font-medium">Role:</span>{" "}
                    <span className="capitalize">{userProfile.role}</span>
                  </div>
                )}
              </FormGroup>
              <button
                onClick={handleSaveProfile}
                disabled={loading}
                className="mt-4 flex items-center gap-2 px-4 py-2 bg-forest-600 text-white rounded-lg hover:bg-forest-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Save className="w-4 h-4" />
                {loading ? "Saving..." : "Save Profile"}
              </button>
            </div>

            {/* Password Change */}
            <div className="pt-8 border-t border-forest-600">
              <h2 className="text-xl font-bold uppercase tracking-wide text-white mb-4">
                Change Password
              </h2>
              <FormGroup>
                <div className="relative">
                  <TextInput
                    label="New Password"
                    type={showNewPassword ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    error={profileErrors.newPassword}
                    required
                    helperText="Must be at least 8 characters"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-3 top-9 text-white/60 hover:text-white"
                  >
                    {showNewPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
                <div className="relative">
                  <TextInput
                    label="Confirm New Password"
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    error={profileErrors.confirmPassword}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-9 text-white/60 hover:text-white"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </FormGroup>
              <button
                onClick={handleChangePassword}
                disabled={loading}
                className="mt-4 flex items-center gap-2 px-4 py-2 bg-forest-600 text-white rounded-lg hover:bg-forest-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Save className="w-4 h-4" />
                {loading ? "Changing..." : "Change Password"}
              </button>
            </div>
          </div>
        )}

        {/* System Settings Tab */}
        {activeTab === "system" && (
          <div className="space-y-8 max-w-2xl">
            {/* Company Information */}
            <div>
              <h2 className="text-xl font-bold uppercase tracking-wide text-white mb-4">
                Company Information
              </h2>
              <FormGroup>
                <TextInput
                  label="Company Name"
                  value={systemSettings.companyName}
                  onChange={(e) =>
                    setSystemSettings({ ...systemSettings, companyName: e.target.value })
                  }
                  error={systemErrors.companyName}
                  required
                />
                <TextInput
                  label="Address"
                  value={systemSettings.companyAddress}
                  onChange={(e) =>
                    setSystemSettings({ ...systemSettings, companyAddress: e.target.value })
                  }
                />
                <TextInput
                  label="Phone"
                  type="tel"
                  value={systemSettings.companyPhone}
                  onChange={(e) =>
                    setSystemSettings({ ...systemSettings, companyPhone: e.target.value })
                  }
                />
                <TextInput
                  label="Email"
                  type="email"
                  value={systemSettings.companyEmail}
                  onChange={(e) =>
                    setSystemSettings({ ...systemSettings, companyEmail: e.target.value })
                  }
                  error={systemErrors.companyEmail}
                />
              </FormGroup>
            </div>

            {/* Default Settings */}
            <div className="pt-8 border-t border-forest-600">
              <h2 className="text-xl font-bold uppercase tracking-wide text-white mb-4">
                Default Settings
              </h2>
              <FormGroup>
                <Select
                  label="Currency"
                  value={systemSettings.currency}
                  onChange={(e) =>
                    setSystemSettings({ ...systemSettings, currency: e.target.value })
                  }
                  options={[
                    { value: "GBP", label: "GBP (£)" },
                    { value: "USD", label: "USD ($)" },
                    { value: "EUR", label: "EUR (€)" },
                  ]}
                />
                <Select
                  label="Date Format"
                  value={systemSettings.dateFormat}
                  onChange={(e) =>
                    setSystemSettings({ ...systemSettings, dateFormat: e.target.value })
                  }
                  options={[
                    { value: "DD/MM/YYYY", label: "DD/MM/YYYY" },
                    { value: "MM/DD/YYYY", label: "MM/DD/YYYY" },
                    { value: "YYYY-MM-DD", label: "YYYY-MM-DD" },
                  ]}
                />
                <Select
                  label="Timezone"
                  value={systemSettings.timezone}
                  onChange={(e) =>
                    setSystemSettings({ ...systemSettings, timezone: e.target.value })
                  }
                  options={[
                    { value: "Europe/London", label: "Europe/London (GMT)" },
                    { value: "America/New_York", label: "America/New York (EST)" },
                    { value: "America/Los_Angeles", label: "America/Los Angeles (PST)" },
                    { value: "Europe/Paris", label: "Europe/Paris (CET)" },
                    { value: "Asia/Tokyo", label: "Asia/Tokyo (JST)" },
                  ]}
                />
              </FormGroup>
            </div>

            {/* Notifications */}
            <div className="pt-8 border-t border-forest-600">
              <h2 className="text-xl font-bold uppercase tracking-wide text-white mb-4">
                Email Notifications
              </h2>
              <Checkbox
                label="Enable email notifications for new contacts and updates"
                checked={systemSettings.emailNotifications}
                onChange={(e) =>
                  setSystemSettings({
                    ...systemSettings,
                    emailNotifications: e.target.checked,
                  })
                }
              />
            </div>

            <button
              onClick={handleSaveSystemSettings}
              disabled={loading}
              className="flex items-center gap-2 px-4 py-2 bg-forest-600 text-white rounded-lg hover:bg-forest-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Save className="w-4 h-4" />
              {loading ? "Saving..." : "Save Settings"}
            </button>
          </div>
        )}

        {/* Admin Users Tab */}
        {activeTab === "admin-users" && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold uppercase tracking-wide text-white mb-2">
                Admin Users
              </h2>
              <p className="text-sm text-white/80">
                View and manage administrator access. User management features coming soon.
              </p>
            </div>

            {usersLoading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto"></div>
                <p className="mt-2 text-sm text-white/80">Loading users...</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-forest-600">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-bold uppercase tracking-wide text-white">
                        Name
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-bold uppercase tracking-wide text-white">
                        Email
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-bold uppercase tracking-wide text-white">
                        Role
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-bold uppercase tracking-wide text-white">
                        Status
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-bold uppercase tracking-wide text-white">
                        Created
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-forest-600">
                    {adminUsers.map((user) => (
                      <tr key={user.id} className="hover:bg-forest-600/50">
                        <td className="px-4 py-3 text-sm text-white">
                          {user.full_name}
                        </td>
                        <td className="px-4 py-3 text-sm text-white/80">
                          {user.email}
                        </td>
                        <td className="px-4 py-3 text-sm">
                          <span
                            className={cn(
                              "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize",
                              user.role === "admin"
                                ? "bg-purple-100 text-purple-800"
                                : user.role === "manager"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-slate-100 text-slate-800"
                            )}
                          >
                            {user.role}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm">
                          <span
                            className={cn(
                              "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
                              user.is_active
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                            )}
                          >
                            {user.is_active ? "Active" : "Inactive"}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm text-white/80">
                          {new Date(user.created_at).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {adminUsers.length === 0 && (
                  <div className="text-center py-8 text-white/80">
                    No admin users found
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Theme Tab */}
        {activeTab === "theme" && (
          <div className="space-y-6 max-w-2xl">
            <div>
              <h2 className="text-xl font-bold uppercase tracking-wide text-white mb-2">
                Appearance
              </h2>
              <p className="text-sm text-white/80">
                Customize the look and feel of the admin interface
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Light Mode */}
              <button
                onClick={() => handleThemeChange("light")}
                className={cn(
                  "relative p-6 rounded-lg border-2 transition-all text-left",
                  theme === "light"
                    ? "border-forest-600 bg-forest-50"
                    : "border-slate-200 hover:border-slate-300"
                )}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-yellow-100 rounded-lg">
                    <Sun className="w-6 h-6 text-yellow-600" />
                  </div>
                  <div>
                    <h3 className="font-bold uppercase tracking-wide text-white">Light Mode</h3>
                    <p className="text-sm text-white/80">
                      Classic light interface
                    </p>
                  </div>
                </div>
                {theme === "light" && (
                  <div className="absolute top-3 right-3">
                    <CheckCircle className="w-5 h-5 text-forest-600" />
                  </div>
                )}
                <div className="mt-4 p-4 bg-white rounded border border-slate-200">
                  <div className="h-2 bg-slate-200 rounded mb-2"></div>
                  <div className="h-2 bg-slate-200 rounded w-3/4"></div>
                </div>
              </button>

              {/* Dark Mode */}
              <button
                onClick={() => handleThemeChange("dark")}
                className={cn(
                  "relative p-6 rounded-lg border-2 transition-all text-left",
                  theme === "dark"
                    ? "border-forest-600 bg-forest-50"
                    : "border-slate-200 hover:border-slate-300"
                )}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-slate-700 rounded-lg">
                    <Moon className="w-6 h-6 text-slate-300" />
                  </div>
                  <div>
                    <h3 className="font-bold uppercase tracking-wide text-white">Dark Mode</h3>
                    <p className="text-sm text-white/80">
                      Easy on the eyes
                    </p>
                  </div>
                </div>
                {theme === "dark" && (
                  <div className="absolute top-3 right-3">
                    <CheckCircle className="w-5 h-5 text-forest-600" />
                  </div>
                )}
                <div className="mt-4 p-4 bg-slate-800 rounded border border-slate-700">
                  <div className="h-2 bg-slate-700 rounded mb-2"></div>
                  <div className="h-2 bg-slate-700 rounded w-3/4"></div>
                </div>
              </button>
            </div>

            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                <div className="text-sm text-blue-900">
                  <p className="font-medium mb-1">Theme Preference</p>
                  <p>
                    Your theme preference is saved to your browser and will persist across sessions.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
