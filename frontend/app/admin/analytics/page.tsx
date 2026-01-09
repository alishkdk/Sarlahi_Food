// Server component: simple analytics overview (mock)

import { getAnalytics } from "@/app/lib/mock/admin";


export default async function AdminAnalyticsPage() {
  const data = await getAnalytics();

  return (
    <main className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <header className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
          <p className="mt-1 text-gray-500 text-sm">High-level KPIs and charts (mock)</p>
        </header>

        {/* KPI Cards */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-6 hover:shadow-xl transition">
            <div className="text-gray-500 font-medium text-sm">Total Revenue</div>
            <div className="mt-2 text-2xl font-bold text-green-600">${data.revenue}</div>
          </div>

          <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-6 hover:shadow-xl transition">
            <div className="text-gray-500 font-medium text-sm">Orders (30d)</div>
            <div className="mt-2 text-2xl font-bold text-blue-600">{data.orders30d}</div>
          </div>

          <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-6 hover:shadow-xl transition">
            <div className="text-gray-500 font-medium text-sm">Active Restaurants</div>
            <div className="mt-2 text-2xl font-bold text-purple-600">{data.activeRestaurants}</div>
          </div>
        </section>

        {/* Optional charts section */}
        <section className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-6 hover:shadow-xl transition">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Revenue Trend</h2>
            <div className="h-48 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400">
              [Chart placeholder]
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-6 hover:shadow-xl transition">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Orders Trend</h2>
            <div className="h-48 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400">
              [Chart placeholder]
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
