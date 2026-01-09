import OfferForm from "@/app/components/admin/OfferForm";

export default function AddOfferPage() {
  return (
    <main className="min-h-screen p-10 bg-gray-50">
      <h1 className="text-3xl font-bold mb-6">Add New Offer</h1>
      <OfferForm mode="add" />
    </main>
  );
}
