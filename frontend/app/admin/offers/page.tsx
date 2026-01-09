// Server component: platform-wide promotions (mock)

import { getOffers } from "@/app/lib/mock/admin";
import Link from "next/link";

export default async function AdminOffersPage() {
  const data = await getOffers();

  return (
    <main className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Offers</h1>
            <p className="mt-1 text-gray-500 text-sm">
              Manage platform promotions and coupon codes
            </p>
          </div>

          <Link href="/admin/offers/new" className="w-full sm:w-auto">
            <button className="px-4 py-2 rounded-lg bg-green-600 text-white font-medium hover:bg-green-700 transition">
              New Offer
            </button>
          </Link>
        </header>

        {/* Offers List */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.items.length === 0 ? (
            <div className="col-span-full text-gray-500 text-center py-10 bg-white rounded-xl shadow border border-gray-200">
              No offers yet
            </div>
          ) : (
            data.items.map((o) => (
              <div
                key={o.id}
                className="bg-white rounded-xl shadow-md border border-gray-200 p-5 hover:shadow-xl transition flex flex-col justify-between"
              >
                {/* Offer Info */}
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">{o.title}</h2>
                  <p className="mt-1 text-sm text-gray-500">
                    Code: <span className="font-medium">{o.code}</span> • Discount: <span className="text-green-600 font-semibold">{o.discount}%</span>
                  </p>
                </div>

                {/* Actions */}
                <div className="mt-4 flex justify-end">
                  <Link href={`/admin/offers/${o.id}`}>
                    <button className="px-3 py-1.5 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition">
                      View
                    </button>
                  </Link>
                </div>
              </div>
            ))
          )}
        </section>
      </div>
    </main>
  );
}
