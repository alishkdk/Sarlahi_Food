import axios from "axios";
import Link from "next/link";

export const dynamic = "force-dynamic";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function UsersDetailPage({ params }: PageProps) {

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
      `https://fakestoreapi.com/users/${id}`,
      { headers: { "Cache-Control": "no-user" } }
    );
    data = res.data;
  } catch {
    return (
      <main className="py-24 text-center text-red-600">
        Failed to load user Detail
      </main>
    );
  }

  return (
    <main className="max-w-6xl mx-auto px-6 py-8">
      <header className="border-b pb-6 mb-6">
        <h1 className="text-3xl font-bold text-gray-900">
          {data.name.firstname} {data.name.lastname}
        </h1>
        <p className="text-gray-500 mt-1">{data.email ?? "—"}</p>
      </header>

      <section className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6">
        <div className="bg-white border rounded-xl p-6 shadow">
          <h3 className="font-semibold mb-3">UserDetails</h3>

          

          <dl className="mt-4 text-sm grid grid-cols-[120px_1fr] gap-y-2">
            <dt>ID</dt>
            <dd>{data.id}</dd>

             <dt>Username</dt>
            <dd>{data.username}</dd>

            <dt>Password</dt>
            <dd>{data.password}</dd>

            <dt>Phone</dt>
            <dd>{data.phone ?? "—"}</dd>

            <dt>City</dt>
            <dd>{data.address?.city ?? "—"}</dd>
          </dl>
        </div>

        <aside className="bg-white border rounded-xl p-6 shadow">
         

          <div className="mt-6 flex flex-col gap-3">
            <Link
              href={`/admin/users/${id}/edit`}
              className="px-4 py-2 border rounded-lg text-center hover:bg-gray-50"
            >
              Edit
            </Link>

            <Link
              href="/admin/users"
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
