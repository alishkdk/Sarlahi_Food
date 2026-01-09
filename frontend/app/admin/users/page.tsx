
import InviteButton from "@/app/components/InviteButton";
import { getUsers } from "@/app/lib/mock/admin";
import Link from "next/link";


export default async function AdminUsersPage() {
  const data = await getUsers();

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
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Role</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.items.map((u) => (
              <tr key={u.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-3 font-semibold text-gray-900">
                  <Link href={`/admin/users/${u.id}`}>{u.name}</Link>
                </td>
                <td className="px-4 py-3">{u.email}</td>
                <td className="px-4 py-3">{u.role}</td>
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
