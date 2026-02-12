"use client";
import React, { useEffect, useRef, useCallback, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useAdminSidebar } from "@/context/AdminSidebarContext";

type NavItem = {
  name: string;
  icon: React.ReactNode;
  path?: string;
  subItems?: { name: string; path: string }[];
};

const navItems: NavItem[] = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
    name: "Dashboard",
    path: "/admin",
  },
  {
    name: "Clients",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    path: "/admin/clients",
  },
  {
    name: "Projects",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
      </svg>
    ),
    path: "/admin/projects",
  },
  {
    name: "Team",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
    path: "/admin/team",
  },
  {
    name: "Content",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    path: "/admin/content",
  },
  {
    name: "Photos",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    path: "/admin/photos",
  },
  {
    name: "Contacts",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    path: "/admin/contacts",
  },
  {
    name: "Settings",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    path: "/admin/settings",
  },
];

const AdminSidebar: React.FC = () => {
  const { isExpanded, isMobileOpen, isHovered, setIsHovered } = useAdminSidebar();
  const pathname = usePathname();

  const [openSubmenu, setOpenSubmenu] = useState<number | null>(null);
  const [subMenuHeight, setSubMenuHeight] = useState<Record<number, number>>({});
  const subMenuRefs = useRef<Record<number, HTMLDivElement | null>>({});

  const isActive = useCallback((path: string) => {
    if (path === "/admin") {
      return pathname === path;
    }
    return pathname.startsWith(path);
  }, [pathname]);

  useEffect(() => {
    // Auto-open submenu if current path matches a submenu item
    navItems.forEach((nav, index) => {
      if (nav.subItems) {
        nav.subItems.forEach((subItem) => {
          if (isActive(subItem.path)) {
            setOpenSubmenu(index);
          }
        });
      }
    });
  }, [pathname, isActive]);

  useEffect(() => {
    if (openSubmenu !== null) {
      const ref = subMenuRefs.current[openSubmenu];
      if (ref) {
        setSubMenuHeight((prev) => ({
          ...prev,
          [openSubmenu]: ref.scrollHeight,
        }));
      }
    }
  }, [openSubmenu]);

  const handleSubmenuToggle = (index: number) => {
    setOpenSubmenu((prev) => (prev === index ? null : index));
  };

  return (
    <aside
      className={`fixed flex flex-col xl:mt-0 top-0 px-5 left-0 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 h-full transition-all duration-300 ease-in-out z-50
        ${
          isExpanded || isMobileOpen
            ? "w-[290px]"
            : isHovered
            ? "w-[290px]"
            : "w-[90px]"
        }
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
        xl:translate-x-0`}
      onMouseEnter={() => !isExpanded && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`py-8 flex ${
          !isExpanded && !isHovered ? "xl:justify-center" : "justify-start"
        }`}
      >
        <Link href="/admin">
          {isExpanded || isHovered || isMobileOpen ? (
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center overflow-hidden">
                <Image
                  src="/images/AF Logo.png"
                  alt="Acer Forestry"
                  width={40}
                  height={40}
                  className="object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-forest-600 dark:text-forest-400 text-lg">
                  Acer Forestry
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  Admin Panel
                </span>
              </div>
            </div>
          ) : (
            <div className="w-10 h-10 rounded-lg flex items-center justify-center overflow-hidden">
              <Image
                src="/images/AF Logo.png"
                alt="Acer Forestry"
                width={40}
                height={40}
                className="object-contain"
              />
            </div>
          )}
        </Link>
      </div>

      <div className="flex flex-col overflow-y-auto duration-300 ease-linear no-scrollbar">
        <nav className="mb-6">
          <ul className="flex flex-col gap-1">
            {navItems.map((nav, index) => (
              <li key={nav.name}>
                {nav.subItems ? (
                  <div>
                    <button
                      onClick={() => handleSubmenuToggle(index)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
                        openSubmenu === index
                          ? "bg-forest-50 dark:bg-forest-900/20 text-forest-700 dark:text-forest-300"
                          : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800"
                      } ${
                        !isExpanded && !isHovered
                          ? "xl:justify-center"
                          : "justify-start"
                      }`}
                    >
                      <span
                        className={`${
                          openSubmenu === index
                            ? "text-forest-600 dark:text-forest-400"
                            : "text-slate-500 dark:text-slate-400"
                        }`}
                      >
                        {nav.icon}
                      </span>
                      {(isExpanded || isHovered || isMobileOpen) && (
                        <>
                          <span className="font-medium text-sm">{nav.name}</span>
                          <svg
                            className={`ml-auto w-5 h-5 transition-transform duration-200 ${
                              openSubmenu === index ? "rotate-180" : ""
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
                        </>
                      )}
                    </button>
                    {nav.subItems && (isExpanded || isHovered || isMobileOpen) && (
                      <div
                        ref={(el) => {
                          subMenuRefs.current[index] = el;
                        }}
                        className="overflow-hidden transition-all duration-300"
                        style={{
                          height:
                            openSubmenu === index
                              ? `${subMenuHeight[index]}px`
                              : "0px",
                        }}
                      >
                        <ul className="mt-2 space-y-1 ml-9">
                          {nav.subItems.map((subItem) => (
                            <li key={subItem.name}>
                              <Link
                                href={subItem.path}
                                className={`block px-4 py-2 text-sm rounded-lg transition-colors duration-200 ${
                                  isActive(subItem.path)
                                    ? "bg-forest-50 dark:bg-forest-900/20 text-forest-700 dark:text-forest-300 font-medium"
                                    : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800"
                                }`}
                              >
                                {subItem.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ) : (
                  nav.path && (
                    <Link
                      href={nav.path}
                      className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
                        isActive(nav.path)
                          ? "bg-forest-50 dark:bg-forest-900/20 text-forest-700 dark:text-forest-300"
                          : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800"
                      } ${
                        !isExpanded && !isHovered
                          ? "xl:justify-center"
                          : "justify-start"
                      }`}
                    >
                      <span
                        className={`${
                          isActive(nav.path)
                            ? "text-forest-600 dark:text-forest-400"
                            : "text-slate-500 dark:text-slate-400"
                        }`}
                      >
                        {nav.icon}
                      </span>
                      {(isExpanded || isHovered || isMobileOpen) && (
                        <span className="font-medium text-sm">{nav.name}</span>
                      )}
                    </Link>
                  )
                )}
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default AdminSidebar;
