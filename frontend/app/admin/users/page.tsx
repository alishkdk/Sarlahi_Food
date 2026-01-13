
import InviteButton from "@/app/components/InviteButton";
import axios from "axios";

import Link from "next/link";


export default async function AdminUsersPage() {
 
  let data: any[] = [];

  try {
    const res = await axios.get(
      "https://fakestoreapi.com/users",
      { headers: { "Cache-Control": "no-store" } }
    );
    data = res.data;
  } catch {
    return (
      <main className="py-24 text-center text-red-600">
        Failed to load restaurants
      </main>
    );
  }

  return (
    <main className="max-w-6xl mx-auto px-6 py-6">
      <header className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Users</h1>
          <p className="text-gray-500 text-sm">Manage admin & partner accounts</p>
        </div>
        <InviteButton />
      </header>

      <section className="bg-white border rounded-lg shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3">First Name</th>
              <th className="px-4 py-3">Last Name</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">UserName</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((u,id) => (
              <tr key={id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-3 font-semibold text-gray-900">
                  <Link href={`/admin/users/${u.id}`}>{u.name.firstname}</Link></td>
                <td className="px-4 py-3">{u.name.lastname}</td>
                <td className="px-4 py-3">{u.email}</td>
                <td className="px-4 py-3">{u.username}</td>
                <td className="px-4 py-3">
                  <Link href={`/admin/users/${u.id}`}>
                    <button className="px-3 py-1 rounded-lg border hover:bg-gray-100 transition">
                      View
                    </button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </main>
  );
}
