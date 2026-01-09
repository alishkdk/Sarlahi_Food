// Server component: admin order detail + changelog (mock)

import { getOrderById } from "@/app/lib/mock/admin";
import Link from "next/link";

export default async function AdminOrderDetail({ params }: { params: { id: string } }) {
  const { id } = params;
  const order = await getOrderById(id);

  return (
    <main className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Order #{order.id}</h1>
            <p className="mt-1 text-gray-500 text-sm">
              {order.restaurantName} • {new Date(order.createdAt).toLocaleString()}
            </p>
          </div>
          <Link href="/admin/orders">
            <button className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition">
              Back
            </button>
          </Link>
        </header>

        {/* Grid layout */}
        <section className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6">
          {/* Order items & customer info */}
          <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Items</h2>
            <ul className="space-y-2">
              {order.items.map((it, idx) => (
                <li key={idx} className="flex justify-between border-b border-gray-100 pb-2">
                  <span>{it.qty}× {it.name}</span>
                  <span className="font-semibold">${it.price?.toFixed?.(2) ?? "0.00"}</span>
                </li>
              ))}
            </ul>

            <div className="mt-6">
              <h3 className="text-lg font-semibold text-gray-900">Customer</h3>
              <p className="text-gray-700 mt-1">{order.customer}</p>
            </div>

            <div className="mt-4 text-right text-lg font-bold text-gray-900">
              Total: ${order.total.toFixed(2)}
            </div>
          </div>

          {/* Status & changelog */}
          <aside className="bg-white rounded-2xl shadow-md p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Status</h3>
            <div className="mt-2">
              <span
                className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                  order.status === "Pending"
                    ? "bg-yellow-100 text-yellow-800"
                    : order.status === "Completed"
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {order.status}
              </span>
            </div>

            <h3 className="text-lg font-semibold text-gray-900 mt-6">Changelog</h3>
            <ol className="mt-3 border-l-2 border-gray-200 pl-4 space-y-2">
              <li className="relative">
                <span className="absolute -left-3 top-1 w-2 h-2 rounded-full bg-gray-400"></span>
                Order placed — {new Date(order.createdAt).toLocaleString()}
              </li>
              <li className="relative">
                <span className="absolute -left-3 top-1 w-2 h-2 rounded-full bg-gray-400"></span>
                Accepted — {new Date(Date.now() + 1000 * 60 * 3).toLocaleString()}
              </li>
              {/* Add more timeline events here */}
            </ol>
          </aside>
        </section>
      </div>
    </main>
  );
}
