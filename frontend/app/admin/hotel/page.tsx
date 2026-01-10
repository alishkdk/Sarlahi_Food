// Server component: premium admin restaurants list


import axios from "axios";
import Link from "next/link";

export default async function AdminRestaurantsPage({
  searchParams,
}: {
  searchParams?: { q?: string; page?: string };
}) {
  const q = (searchParams?.q || "").trim();
  const page = parseInt(searchParams?.page || "1", 10) || 1;
  const pageSize = 12;

     const {data} = await axios.get('https://fakerestaurantapi.runasp.net/api/Restaurant')

  return (
    <main className="h-screen flex flex-col px-6 py-6 max-w-[1200px] mx-auto">
      
      {/* HEADER */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 pb-6 border-b border-gray-200">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Restaurants</h1>
          <p className="text-gray-500 mt-1">Manage partner restaurants — search, edit, enable/disable.</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto mt-3 md:mt-0">
          {/* Search */}
          <form method="get" className="flex gap-2 w-full sm:w-auto">
            <input
              name="q"
              defaultValue={q}
              placeholder="Search by name or city..."
              className="px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:outline-none text-sm flex-1"
            />
            <button className="px-5 py-2 rounded-lg bg-green-600 text-white text-sm font-semibold hover:bg-green-700 transition">
              Search
            </button>
          </form>

          {/* New restaurant */}
          <Link href="/admin/restaurants/new" className="w-full sm:w-auto">
            <button className="px-5 py-2 rounded-lg bg-white border border-gray-300 text-sm font-semibold hover:bg-gray-50 transition w-full sm:w-auto">
              New
            </button>
          </Link>
        </div>
      </header>

      {/* TABLE */}
      <div className="mt-6 bg-white shadow rounded-xl overflow-hidden flex-1 flex flex-col">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50 sticky top-0 z-10">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-40">City</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-32">Rating</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-32">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-44">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {data.map((item,id) => (
                <tr key={id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4">
                    <Link href={`/admin/hotel/${item.restaurantID}`} className="font-semibold text-gray-900 hover:text-green-600 transition">
                      {item.restaurantName}
                    </Link>
                    <div className="text-xs text-gray-400 mt-0.5">{item.restaurantID}</div>
                  </td>
                  <td className="px-6 py-4 text-gray-700">{item.address ?? "—"}</td>
                  <td className="px-6 py-4 text-gray-700">{item.rating ? `${item.rating} ★` : "—"}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold text-white ${
                      item.isActive ? "bg-gradient-to-r from-green-400 to-green-600" : "bg-gradient-to-r from-red-400 to-red-600"
                    }`}>
                      {item.isActive ? "Active" : "Disabled"}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <Link href={`/admin/hotel/${item.id}/edit`}>
                        <button className="px-3 py-1 rounded-lg border text-sm hover:bg-gray-50 transition">Edit</button>
                      </Link>
                      <Link href={`/admin/hotel/${item.id}`}>
                        <button className="px-3 py-1 rounded-lg border text-sm hover:bg-gray-50 transition">View</button>
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* PAGINATION */}
      <div className="mt-6 flex flex-col sm:flex-row justify-between items-center text-sm gap-3">
        <div className="text-gray-500">
        
        </div>

        <div className="flex gap-2 items-center">
          <Link
            href={`/admin/restaurants?page=${Math.max(
              1,
              page - 1
            )}${q ? `&q=${encodeURIComponent(q)}` : ""}`}
          >
            <button
              disabled={page <= 1}
              className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 disabled:opacity-50 hover:bg-gray-50 transition"
            >
              Prev
            </button>
          </Link>

          <span className="text-gray-700 font-medium">Page {data.page}</span>

          <Link
            href={`/admin/restaurants?page=${data.page + 1}${
              q ? `&q=${encodeURIComponent(q)}` : ""
            }`}
          >
            <button className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition">
              Next
            </button>
          </Link>
        </div>
      </div>
    </main>
  );
}
