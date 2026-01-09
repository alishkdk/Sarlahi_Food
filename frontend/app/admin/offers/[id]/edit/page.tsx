import OfferForm, { Offer } from "@/app/components/admin/OfferForm";
import { getOffers } from "@/app/lib/mock/admin";

export default async function EditOfferPage({ params }: { params: { id: string } }) {
  const offers = await getOffers();
  const Offer: Offer = offers.items.find((o) => o.id === params.id);
  return (
    <main className="min-h-screen p-10 bg-gray-50">
      <h1 className="text-3xl font-bold mb-6">Edit Offer</h1>
      <OfferForm initial={Offer} mode="edit" />
    </main>
  );
}
