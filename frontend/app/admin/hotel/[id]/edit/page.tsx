import RestaurantEditForm from "@/app/components/admin/RestaurantEditForm";

import React from "react";
import Link from "next/link";
import { getRestaurantById } from "@/app/lib/mock/admin";

export default async function RestaurantEditPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const data = await getRestaurantById(id);

  return (
    <main className="min-h-screen bg-gray-50 py-10">
      {/* Container */}
      <div className="max-w-4xl mx-auto px-6">
        
        {/* Breadcrumb / Navigation */}
        <nav className="text-sm mb-4" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-2">
            <li>
              <Link href="/admin/hotel" className="text-gray-500 hover:text-gray-700">
                Restaurants
              </Link>
            </li>
            <li>
              <span className="text-gray-400">/</span>
            </li>
            <li className="text-gray-700 font-medium">Edit Restaurant</li>
          </ol>
        </nav>

        {/* Header */}
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Edit Restaurant</h1>
          <p className="mt-2 text-gray-500">
            Update restaurant details, description, and status. Changes are saved locally (mock).
          </p>
        </header>

        {/* Card container */}
        <div className="bg-white shadow-lg rounded-2xl border border-gray-200 p-8">
          <RestaurantEditForm initial={data} />
        </div>
      </div>
    </main>
  );
}
