// Server component: admin orders list (mock data)

import { getOrders } from "@/app/lib/mock/admin";
import Link from "next/link";

export default async function AdminOrdersPage() {
  const data = await getOrders();

  return (
    <main className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <header className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Orders</h1>
          <p className="mt-2 text-gray-500">
            View, track, and manage all platform orders efficiently.
          </p>
        </header>

        {/* Table container */}
        <div className="bg-white shadow-lg border border-gray-200 rounded-2xl overflow-x-auto">
          <table className="min-w-full border-collapse">
            <thead className="bg-gray-50 border-b">
              <tr className="text-left text-sm font-semibold text-gray-600">
                <th className="p-4">Order ID</th>
                <th className="p-4">Restaurant</th>
                <th className="p-4">Customer</th>
                <th className="p-4">Total</th>
                <th className="p-4">Status</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>

            <tbody>
              {data.items.map((o) => (
                <tr
                  key={o.id}
                  className="border-b last:border-none hover:bg-gray-50 transition-colors"
                >
                  <td className="p-4 font-medium text-gray-900">
                    <Link href={`/admin/orders/${o.id}`} className="hover:underline">
                      {o.id}
                    </Link>
                  </td>
                  <td className="p-4 text-gray-700">{o.restaurantName}</td>
                  <td className="p-4 text-gray-700">{o.customer}</td>
                  <td className="p-4 font-semibold text-gray-900">${o.total.toFixed(2)}</td>
                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        o.status === "Pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : o.status === "Completed"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {o.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <Link href={`/admin/orders/${o.id}`}>
                      <button className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition">
                        View
                      </button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer / Pagination placeholder */}
        <div className="mt-6 flex justify-between items-center text-sm text-gray-500">
          <div>
            Showing {data.items.length} of {data.total} orders
          </div>
          <div className="flex gap-2">
            <button className="px-3 py-1 rounded-lg border disabled:opacity-50">Prev</button>
            <span>Page {data.page}</span>
            <button className="px-3 py-1 rounded-lg border">Next</button>
          </div>
        </div>
      </div>
    </main>
  );
}
