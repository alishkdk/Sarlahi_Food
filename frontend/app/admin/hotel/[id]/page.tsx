import axios from "axios";
import Link from "next/link";

export const dynamic = "force-dynamic";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function RestaurantDetailPage({ params }: PageProps) {
  // ✅ MUST await params in Next.js 15
  const { id } = await params;

  // safety guard (prevents /undefined)
  if (!id) {
    return (
      <main className="py-24 text-center text-red-600">
        Invalid restaurant ID
      </main>
    );
  }

  let data: any;

  try {
    const res = await axios.get(
      `https://fakerestaurantapi.runasp.net/api/Restaurant/${id}`,
      { headers: { "Cache-Control": "no-store" } }
    );
    data = res.data;
  } catch {
    return (
      <main className="py-24 text-center text-red-600">
        Failed to load restaurant
      </main>
    );
  }

  return (
    <main className="max-w-6xl mx-auto px-6 py-8">
      <header className="border-b pb-6 mb-6">
        <h1 className="text-3xl font-bold text-gray-900">
          {data.restaurantName}
        </h1>
        <p className="text-gray-500 mt-1">{data.address ?? "—"}</p>
      </header>

      <section className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6">
        <div className="bg-white border rounded-xl p-6 shadow">
          <h3 className="font-semibold mb-3">Details</h3>

          <p className="text-sm text-gray-700">
            {data.description ?? "No description"}
          </p>

          <dl className="mt-4 text-sm grid grid-cols-[120px_1fr] gap-y-2">
            <dt>ID</dt>
            <dd>{data.restaurantID}</dd>

            <dt>Phone</dt>
            <dd>{data.phone ?? "—"}</dd>

            <dt>Rating</dt>
            <dd>{data.rating ? `${data.rating} ★` : "—"}</dd>
          </dl>
        </div>

        <aside className="bg-white border rounded-xl p-6 shadow">
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold text-white ${
              data.isActive ? "bg-green-500" : "bg-red-500"
            }`}
          >
            {data.isActive ? "Active" : "Disabled"}
          </span>

          <div className="mt-6 flex flex-col gap-3">
            <Link
              href={`/admin/hotel/${id}/edit`}
              className="px-4 py-2 border rounded-lg text-center hover:bg-gray-50"
            >
              Edit
            </Link>

            <Link
              href="/admin/hotel"
              className="px-4 py-2 border rounded-lg text-center hover:bg-gray-50"
            >
              Back
            </Link>
          </div>
        </aside>
      </section>
    </main>
  );
}
