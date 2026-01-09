"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

export type Offer = {
  id: string;
  title: string;
  code: string;
  discount: number;
  description?: string;
  expiresAt?: string;
  isActive: boolean;
};

type OfferFormProps = {
  initial?: Offer;
  mode?: "add" | "edit" | "view";
};

export default function OfferForm({ initial, mode = "add" }: OfferFormProps) {
  const router = useRouter();
  const [form, setForm] = useState<Offer>(
    initial || {
      id: Math.random().toString(36).slice(2, 9),
      title: "",
      code: "",
      discount: 0,
      description: "",
      expiresAt: "",
      isActive: true,
    }
  );
  const [saving, setSaving] = useState(false);

  const readOnly = mode === "view";

  function setField<K extends keyof Offer>(key: K, value: Offer[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);

    try {
      // Mock localStorage persistence
      const key = "mock_offers";
      const raw = localStorage.getItem(key);
      const current = raw ? JSON.parse(raw) : {};
      current[form.id] = form;
      localStorage.setItem(key, JSON.stringify(current));

      setTimeout(() => {
        setSaving(false);
        router.push(`/admin/offers/${form.id}`);
      }, 600);
    } catch (err) {
      console.error(err);
      alert("Failed to save (mock)");
      setSaving(false);
    }
  }

  return (
    <form
      onSubmit={handleSave}
      className="bg-white p-6 rounded-xl shadow-md space-y-4 border border-gray-200"
    >
      {/* Title & Code */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Title</label>
          {readOnly ? (
            <p className="mt-1 text-gray-900">{form.title}</p>
          ) : (
            <input
              type="text"
              value={form.title}
              onChange={(e) => setField("title", e.target.value)}
              required
              className="mt-1 block w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Code</label>
          {readOnly ? (
            <p className="mt-1 text-gray-900">{form.code}</p>
          ) : (
            <input
              type="text"
              value={form.code}
              onChange={(e) => setField("code", e.target.value)}
              required
              className="mt-1 block w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          )}
        </div>
      </div>

      {/* Discount & Expiry */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Discount (%)</label>
          {readOnly ? (
            <p className="mt-1 text-gray-900">{form.discount}%</p>
          ) : (
            <input
              type="number"
              value={form.discount}
              onChange={(e) => setField("discount", Number(e.target.value))}
              required
              min={0}
              max={100}
              className="mt-1 block w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Expires At</label>
          {readOnly ? (
            <p className="mt-1 text-gray-900">{form.expiresAt || "—"}</p>
          ) : (
            <input
              type="datetime-local"
              value={form.expiresAt}
              onChange={(e) => setField("expiresAt", e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          )}
        </div>
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Description</label>
        {readOnly ? (
          <p className="mt-1 text-gray-900">{form.description || "—"}</p>
        ) : (
          <textarea
            value={form.description}
            onChange={(e) => setField("description", e.target.value)}
            rows={3}
            className="mt-1 block w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        )}
      </div>

      {/* Status */}
      <div className="flex items-center gap-4">
        {readOnly ? (
          <span
            className={`px-3 py-1 rounded-full text-sm font-semibold ${
              form.isActive ? "bg-green-500 text-white" : "bg-gray-300 text-gray-700"
            }`}
          >
            {form.isActive ? "Active" : "Inactive"}
          </span>
        ) : (
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={form.isActive}
              onChange={(e) => setField("isActive", e.target.checked)}
              className="h-4 w-4 text-green-600 border-gray-300 rounded"
            />
            <span className="text-sm font-medium text-gray-700">Active</span>
          </label>
        )}
      </div>

      {/* Actions */}
      {!readOnly && (
        <div className="flex gap-4 mt-4">
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition"
          >
            {saving ? "Saving…" : mode === "add" ? "Add Offer" : "Save Changes"}
          </button>
          <button
            type="button"
            onClick={() => router.back()}
            className="px-6 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
          >
            Cancel
          </button>
        </div>
      )}
    </form>
  );
}
