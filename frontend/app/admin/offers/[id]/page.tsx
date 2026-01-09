
import OfferForm from "@/app/components/admin/OfferForm";
import { getOffers } from "@/app/lib/mock/admin";

import Link from "next/link";

export default async function ViewOfferPage({ params }: { params: { id: string } }) {
  const offers = await getOffers();
  const offer = offers.items.find((o) => o.id === params.id);

  return (
    <main className="min-h-screen p-10 bg-gray-50">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">View Offer</h1>
        <Link href={`/admin/offers/edit`}>
          <button className="px-6 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition">
            Edit Offer
          </button>
        </Link>
      </div>

      <OfferForm initial={offer} mode="view" />
    </main>
  );
}
