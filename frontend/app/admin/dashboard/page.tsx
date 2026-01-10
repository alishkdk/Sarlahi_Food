"use client";

import { useEffect, useState } from "react";
import {
  Hotel,
  ShoppingBag,
  Users,
  DollarSign,
} from "lucide-react";
import localClient from "@/app/lib/localClient";


export default function AdminDashboard() {
  const [stats, setStats] = useState({
    hotels: 10,
    orders: 0,
    users: 0,
    revenue: 0,
  });

  useEffect(() => {
    const data = localClient.get("dashboard_stats");
    if (data) setStats(data);
  }, []);

  const cards = [
    {
      title: "Total Hotels",
      value: stats.hotels,
      icon: Hotel,
      color: "bg-green-500",
    },
    {
      title: "Total Orders",
      value: stats.orders,
      icon: ShoppingBag,
      color: "bg-blue-500",
    },
    {
      title: "Total Users",
      value: stats.users,
      icon: Users,
      color: "bg-purple-500",
    },
    {
      title: "Total Revenue",
      value: `Rs. ${stats.revenue}`,
      icon: DollarSign,
      color: "bg-orange-500",
    },
  ];

  return (
    <div className="space-y-8">
      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">
          Dashboard
        </h1>
        <p className="text-gray-500">
          Overview of your platform
        </p>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.title}
              className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">
                    {card.title}
                  </p>
                  <p className="text-2xl font-bold mt-1">
                    {card.value}
                  </p>
                </div>

                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center text-white ${card.color}`}
                >
                  <Icon className="w-6 h-6" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* RECENT ACTIVITY */}
      <div className="  bg-white rounded-2xl shadow-sm p-6">
        <h2 className="text-lg font-semibold mb-4">
          Recent Activity
        </h2>

        <ul className="space-y-3 text-sm text-gray-600">
          <li>🏨 New hotel added</li>
          <li>🛒 Order placed by customer</li>
          <li>👤 New user registered</li>
          <li>💰 Payment received</li>
        </ul>

 
      </div>
    </div>
  );
}
