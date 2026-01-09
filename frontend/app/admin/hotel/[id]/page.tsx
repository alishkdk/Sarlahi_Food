// Server component: premium restaurant detail / overview
import { getRestaurantById } from "@/app/lib/mock/admin";
import Link from "next/link";

export default async function RestaurantDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const id = params.id;
  const r = await getRestaurantById(id);

  return (
    <main className="max-w-6xl mx-auto px-6 py-8">
      {/* HEADER */}
      <header className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 md:gap-6 border-b border-gray-200 pb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{r.name}</h1>
          <p className="mt-1 text-sm text-gray-500">
            {r.cuisine?.join(", ") ?? "—"} • {r.city ?? "—"}
          </p>
        </div>

        <div className="flex gap-2 mt-3 md:mt-0">
          <Link
            href={`/admin/hotel/${id}/edit`}
            className="px-5 py-2 rounded-lg border text-sm font-semibold text-gray-700 hover:bg-gray-50 shadow-sm transition"
          >
            Edit
          </Link>
          <Link
            href="/admin/hotel"
            className="px-5 py-2 rounded-lg border text-sm font-semibold text-gray-700 hover:bg-gray-50 shadow-sm transition"
          >
            Back
          </Link>
        </div>
      </header>

      {/* CONTENT */}
      <section className="mt-8 grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6">
        {/* DETAILS CARD */}
        <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-md hover:shadow-lg transition">
          <h3 className="text-lg font-semibold text-gray-900">Details</h3>

          <p className="mt-4 text-gray-700 text-sm leading-relaxed">
            {r.description ?? "No description provided."}
          </p>

          <dl className="mt-6 grid grid-cols-[120px_1fr] gap-y-3 gap-x-4 text-sm">
            <dt className="text-gray-500">ID</dt>
            <dd className="text-gray-900">{r.id}</dd>

            <dt className="text-gray-500">Phone</dt>
            <dd className="text-gray-900">{r.phone ?? "—"}</dd>

            <dt className="text-gray-500">Address</dt>
            <dd className="text-gray-900">{r.address ?? "—"}</dd>

            <dt className="text-gray-500">Rating</dt>
            <dd className="text-gray-900">{r.rating ? `${r.rating} ★` : "—"}</dd>

            <dt className="text-gray-500">Created</dt>
            <dd className="text-gray-900">{r.createdAt ?? "—"}</dd>
          </dl>
        </div>

        {/* STATUS / ACTIONS */}
        <aside className="bg-white border border-gray-100 rounded-2xl p-6 shadow-md hover:shadow-lg transition">
          <h4 className="text-sm font-semibold text-gray-700">Status</h4>

          <div className="mt-3">
            <span
              className={`inline-flex items-center px-4 py-1 rounded-full text-xs font-semibold text-white 
                ${r.isActive ? "bg-gradient-to-r from-green-400 to-green-600" : "bg-gradient-to-r from-red-400 to-red-600"}
              `}
            >
              {r.isActive ? "Active" : "Disabled"}
            </span>
          </div>

          <div className="mt-8">
            <h4 className="text-sm font-semibold text-gray-700 mb-3">
              Quick actions
            </h4>

            <div className="flex flex-col gap-3">
              <button className="w-full px-5 py-2 rounded-lg border border-gray-300 text-sm font-medium hover:bg-gray-50 hover:shadow transition">
                Toggle Active
              </button>
              <button className="w-full px-5 py-2 rounded-lg border border-gray-300 text-sm font-medium hover:bg-gray-50 hover:shadow transition">
                View Orders
              </button>
            </div>
          </div>
        </aside>
      </section>
    </main>
  );
}
