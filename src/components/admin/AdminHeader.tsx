"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useAdminSidebar } from "@/context/AdminSidebarContext";

const AdminHeader: React.FC = () => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { isMobileOpen, toggleSidebar, toggleMobileSidebar } = useAdminSidebar();

  const handleToggle = () => {
    if (window.innerWidth >= 1280) {
      toggleSidebar();
    } else {
      toggleMobileSidebar();
    }
  };

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  const handleLogout = () => {
    // TODO: Implement logout logic with Supabase
    window.location.href = "/";
  };

  return (
    <header className="sticky top-0 flex w-full bg-white border-b border-slate-200 dark:border-slate-800 dark:bg-slate-900 z-40">
      <div className="flex flex-col items-center justify-between grow xl:flex-row xl:px-6">
        <div className="flex items-center justify-between w-full gap-2 px-3 py-3 sm:gap-4 xl:justify-normal xl:px-0 xl:py-4">
          <button
            className={`flex items-center justify-center w-10 h-10 text-slate-500 border border-slate-200 rounded-lg dark:border-slate-800 dark:text-slate-400 lg:h-11 lg:w-11 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors ${
              isMobileOpen ? "bg-slate-100 dark:bg-slate-800" : ""
            }`}
            onClick={handleToggle}
            aria-label="Toggle Sidebar"
          >
            {isMobileOpen ? (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h7"
                />
              </svg>
            )}
          </button>

          <Link href="/" target="_blank" className="xl:hidden">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-forest flex items-center justify-center">
                <span className="text-white font-bold text-sm">A</span>
              </div>
              <span className="font-bold text-forest-600 dark:text-forest-400">
                Acer Forestry
              </span>
            </div>
          </Link>

          <div className="flex-1 hidden xl:flex xl:justify-end">
            <div className="flex items-center gap-4">
              <Link
                href="/"
                target="_blank"
                className="text-sm text-slate-600 dark:text-slate-400 hover:text-forest-600 dark:hover:text-forest-400 transition-colors"
              >
                View Site
              </Link>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between w-full gap-4 px-5 py-4 xl:w-auto xl:px-0 border-t border-slate-200 dark:border-slate-800 xl:border-t-0">
          <div className="flex items-center gap-3">
            {/* Notifications Placeholder */}
            <button
              className="relative flex items-center justify-center w-10 h-10 text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg transition-colors"
              aria-label="Notifications"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
              <span className="absolute top-2 right-2 w-2 h-2 bg-forest-500 rounded-full"></span>
            </button>
          </div>

          {/* User Menu */}
          <div className="relative">
            <button
              onClick={toggleUserMenu}
              className="flex items-center gap-3 hover:bg-slate-50 dark:hover:bg-slate-800 px-2 py-2 rounded-lg transition-colors"
            >
              <div className="w-9 h-9 rounded-full bg-gradient-forest flex items-center justify-center">
                <span className="text-white font-medium text-sm">AD</span>
              </div>
              <span className="hidden sm:block font-medium text-slate-700 dark:text-slate-300 text-sm">
                Admin User
              </span>
              <svg
                className={`w-5 h-5 text-slate-500 dark:text-slate-400 transition-transform duration-200 ${
                  isUserMenuOpen ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {isUserMenuOpen && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setIsUserMenuOpen(false)}
                />
                <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-lg z-50">
                  <div className="p-4 border-b border-slate-200 dark:border-slate-700">
                    <p className="font-medium text-slate-700 dark:text-slate-300 text-sm">
                      Admin User
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      admin@acerforestry.com
                    </p>
                  </div>

                  <ul className="py-2">
                    <li>
                      <Link
                        href="/admin/settings"
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <svg className="w-5 h-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        Profile Settings
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/admin/settings"
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <svg className="w-5 h-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        Account Settings
                      </Link>
                    </li>
                  </ul>

                  <div className="border-t border-slate-200 dark:border-slate-700 py-2">
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors w-full"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                      Sign Out
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
