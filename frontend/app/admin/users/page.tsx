"use client"
import InviteButton from "@/app/components/InviteButton";
import { gql } from "@apollo/client";

import { useQuery } from "@apollo/client/react";
import Link from "next/link";

const GET_USERS = gql`
query GetUsers{
users{
id
name
email
role
}
}
`



export default  function AdminUsersPage() {
 const {loading, error ,data}=useQuery(GET_USERS);
 if(loading) return "Laoding..."
 if(error) return `Error ! ${error.message}`;


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
            {data.users.map((item,id) => (
              <tr key={id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-3 font-semibold text-gray-900">
                  <Link href={`/admin/users/${item.id}`}>{item.name}</Link></td>
                <td className="px-4 py-3">{item.email}</td>
                <td className="px-4 py-3">{item.role}</td>
                <td className="px-4 py-3">
                  <Link href={`/admin/users/${item.id}`}>
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
