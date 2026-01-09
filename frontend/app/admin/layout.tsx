"use client"

import React from "react"
import { AdminAuthProvider } from "../context/AdminAuthProvider"
import AdminSidebar from "../components/admin/AdminSliderbar"
import AdminHeader from "../components/admin/AdminHeader"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AdminAuthProvider>
      <div className="min-h-screen flex bg-gray-50">
        
        {/* Sidebar */}
        <AdminSidebar />

        {/* Main content */}
        <div className="flex-1 flex flex-col ml-64">
          
          {/* Header */}
          <AdminHeader />

          {/* Page Content */}
          <main className="flex-1 p-6">
            {children}
          </main>

        </div>
      </div>
    </AdminAuthProvider>
  )
}
