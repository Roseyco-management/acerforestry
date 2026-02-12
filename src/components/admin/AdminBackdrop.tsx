"use client";
import React from "react";
import { useAdminSidebar } from "@/context/AdminSidebarContext";

const AdminBackdrop: React.FC = () => {
  const { isMobileOpen, toggleMobileSidebar } = useAdminSidebar();

  if (!isMobileOpen) return null;

  return (
    <div
      className="fixed inset-0 z-40 bg-slate-900/50 xl:hidden"
      onClick={toggleMobileSidebar}
    />
  );
};

export default AdminBackdrop;
