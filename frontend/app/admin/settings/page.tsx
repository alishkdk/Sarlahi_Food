"use client";

import React, { useState } from "react";

export default function AdminSettingsPage() {
  const [form, setForm] = useState({
    name: "Admin User",
    email: "admin@sarlahifood.com",
    password: "",
    notifications: {
      orders: true,
      offers: true,
      system: false,
    },
    darkMode: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    if (name in form.notifications) {
      setForm((prev) => ({
        ...prev,
        notifications: {
          ...prev.notifications,
          [name]: checked,
        },
      }));
    } else if (type === "checkbox") {
      setForm((prev) => ({ ...prev, [name]: checked }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Settings saved! (mock)");
  };

  return (
    <main className="min-h-screen bg-gray-50 p-10">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-gray-900">Settings</h1>

        <form onSubmit={handleSave} className="bg-white p-8 rounded-2xl shadow-lg space-y-8">
          {/* Profile Info */}
          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-800">Profile</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Name</label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
                />
              </div>
            </div>
          </section>

          {/* Password */}
          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-800">Password</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">New Password</label>
                <input
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="••••••••"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
                />
              </div>
            </div>
          </section>

          {/* Notifications */}
          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-800">Notifications</h2>
            <div className="space-y-2">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="orders"
                  checked={form.notifications.orders}
                  onChange={handleChange}
                  className="h-4 w-4 rounded border-gray-300 focus:ring-2 focus:ring-green-500"
                />
                <span className="text-gray-700">Order notifications</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="offers"
                  checked={form.notifications.offers}
                  onChange={handleChange}
                  className="h-4 w-4 rounded border-gray-300 focus:ring-2 focus:ring-green-500"
                />
                <span className="text-gray-700">Offers & promotions</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="system"
                  checked={form.notifications.system}
                  onChange={handleChange}
                  className="h-4 w-4 rounded border-gray-300 focus:ring-2 focus:ring-green-500"
                />
                <span className="text-gray-700">System alerts</span>
              </label>
            </div>
          </section>

          {/* Preferences */}
          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-800">Preferences</h2>
            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                name="darkMode"
                checked={form.darkMode}
                onChange={handleChange}
                className="h-4 w-4 rounded border-gray-300 focus:ring-2 focus:ring-green-500"
              />
              <span className="text-gray-700">Enable Dark Mode</span>
            </label>
          </section>

          <div className="flex justify-end gap-4">
            <button
              type="button"
              className="px-6 py-2 rounded-lg border hover:bg-gray-50 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition"
            >
              Save Settings
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
