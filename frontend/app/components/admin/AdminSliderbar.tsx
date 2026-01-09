"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  Hotel,
  ShoppingBag,
  Users,
  BarChart3,
  Settings,
  PartyPopper,
} from "lucide-react"

const menu = [
  { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { name: "Hotel", href: "/admin/hotel", icon: Hotel },
  { name: "Orders", href: "/admin/orders", icon: ShoppingBag },
  { name: "Users", href: "/admin/users", icon: Users },
  { name: "Analytics", href: "/admin/analytics", icon: BarChart3 },
  { name: "Offers", href: "/admin/offers", icon: PartyPopper },
  { name: "Settings", href: "/admin/settings", icon: Settings },
]

export default function AdminSidebar() {
  const pathname = usePathname()

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-gray-900 text-gray-200 shadow-xl flex flex-col">
      
      {/* LOGO */}
      <div className="h-20 flex items-center justify-center border-b border-gray-800">
        <h1 className="text-2xl font-bold tracking-tight text-white">
          SarlahiFood
        </h1>
      </div>

      {/* NAV */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {menu.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`group flex items-center gap-4 px-4 py-3 rounded-lg text-sm font-semibold transition-all duration-300
                ${isActive 
                  ? "bg-gray-800 text-teal-400 shadow-lg" 
                  : "hover:bg-gray-700 hover:text-teal-300 text-gray-200"
                }
              `}
            >
              {/* Active bar */}
              <span
                className={`w-1.5 h-6 rounded-full transition-all duration-300
                  ${isActive ? "bg-teal-400" : "bg-transparent group-hover:bg-teal-300"}
                `}
              />

              <Icon className={`w-5 h-5 transition ${isActive ? "text-teal-400" : "text-gray-200 group-hover:text-teal-300"}`} />
              <span>{item.name}</span>
            </Link>
          )
        })}
      </nav>

      {/* FOOTER */}
      <div className="px-6 py-4 border-t border-gray-800 text-xs text-gray-400 flex flex-col gap-1">
        <span>© {new Date().getFullYear()} Sarlahi Food</span>
        <span className="text-gray-500 text-xs">Admin Panel</span>
      </div>
    </aside>
  )
}
