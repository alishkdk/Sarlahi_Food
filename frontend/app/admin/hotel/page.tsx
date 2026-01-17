"use client";

import { useEffect, useState } from "react";
import { Edit, Trash2, X, RefreshCcw } from "lucide-react";
import axios from "axios";

export default function ProductsTable() {
  const [products, setProducts] = useState<any[]>([]);
  const [displayed, setDisplayed] = useState<any[]>([]);

  const [open, setOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [current, setCurrent] = useState<any>(null);

  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const [form, setForm] = useState({
    title: "",
    price: "",
    description: "",
    category: "",
    image: "",
  });

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const pageSize = 10;

  const isMobile =
    typeof window !== "undefined" && window.innerWidth < 768;


  const fetchProducts = async () => {
    try {
      const { data } = await axios.get(
        "https://fakestoreapi.com/products"
      );
      setProducts(data);
      setPage(1);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);


  useEffect(() => {
    const filtered = products.filter(
      (p) =>
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.category.toLowerCase().includes(search.toLowerCase())
    );

    const start = (page - 1) * pageSize;
    setDisplayed(filtered.slice(start, start + pageSize));
  }, [products, search, page]);

  const totalPages = Math.ceil(
    products.filter(
      (p) =>
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.category.toLowerCase().includes(search.toLowerCase())
    ).length / pageSize
  );


  const openAdd = () => {
    setForm({
      title: "",
      price: "",
      description: "",
      category: "",
      image: "",
    });
    setIsEdit(false);
    setOpen(true);
  };

  const openEdit = (item: any) => {
    setForm(item);
    setCurrent(item);
    setIsEdit(true);
    setOpen(true);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (isEdit) {
      await axios.put(
        `https://fakestoreapi.com/products/${current.id}`,
        form
      );
    } else {
      await axios.post(
        "https://fakestoreapi.com/products",
        form
      );
    }

    setOpen(false);
    fetchProducts();
  };


  const openDelete = (id: number) => {
    setDeleteId(id);
    setDeleteOpen(true);
  };

  const confirmDelete = async () => {
    if (!deleteId) return;

    await axios.delete(
      `https://fakestoreapi.com/products/${deleteId}`
    );

    setDeleteOpen(false);
    setDeleteId(null);
    fetchProducts();
  };

 
  return (
    <div className="p-6 max-w-6xl mx-auto">
    
      <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
        <h1 className="text-2xl font-bold">Products</h1>

        <div className="flex gap-2 flex-wrap">
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-4 py-2 border rounded-lg"
          />

          <button
            onClick={openAdd}
            className="px-4 py-2 bg-green-700 text-white rounded-lg hover:bg-green-800"
          >
            Add Product
          </button>

          <button
            onClick={fetchProducts}
            className="p-2 border rounded-lg hover:bg-gray-100"
          >
            <RefreshCcw size={18} />
          </button>
        </div>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto bg-white rounded-xl shadow">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th className="px-4 py-3 text-left">Title</th>
              <th className="px-4 py-3">Price</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {displayed.map((item) => (
              <tr
                key={item.id}
                className="border-t hover:bg-gray-50"
              >
                <td className="px-4 py-3">{item.title}</td>
                <td className="px-4 py-3">${item.price}</td>
                <td className="px-4 py-3">{item.category}</td>
                <td className="px-4 py-3 flex justify-end gap-2">
                  <button
                    onClick={() => openEdit(item)}
                    className="p-2 border rounded hover:bg-gray-100"
                  >
                    <Edit size={16} />
                  </button>

                  <button
                    onClick={() => openDelete(item.id)}
                    className="p-2 border rounded hover:bg-red-100 text-red-600"
                  >
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* PAGINATION */}
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Prev
        </button>

        <span>
          Page {page} of {totalPages || 1}
        </span>

        <button
          onClick={() =>
            setPage((p) => Math.min(totalPages, p + 1))
          }
          disabled={page === totalPages}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-end md:items-center justify-center">
          <div
            className={`bg-white w-full ${
              isMobile
                ? "rounded-t-2xl"
                : "rounded-xl max-w-lg"
            } p-6`}
          >
            <div className="flex justify-between mb-4">
              <h2 className="text-lg font-semibold">
                {isEdit ? "Edit Product" : "Add Product"}
              </h2>
              <button onClick={() => setOpen(false)}>
                <X />
              </button>
            </div>

            <form
              onSubmit={handleSubmit}
              className="space-y-3"
            >
            
              {["title", "price", "category", "image"].map(
                 
                (field) => (
                 
                  <input
                    key={field}
                    type={field === "price" ? "number" : "text"}
                    placeholder={field}
                    value={(form as any)[field]}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        [field]: e.target.value,
                      })
                    }
                    className="w-full border rounded-lg px-4 py-2"
                    required
                  />
                 
                )
              )}

              <textarea
                placeholder="Description"
                value={form.description}
                onChange={(e) =>
                  setForm({
                    ...form,
                    description: e.target.value,
                  })
                }
                className="w-full border rounded-lg px-4 py-2"
              />

              <button
                type="submit"
                className="w-full bg-green-700 text-white py-2 rounded-lg hover:bg-green-800"
              >
                {isEdit ? "Update" : "Create"}
              </button>
            </form>
          </div>
        </div>
      )}

     
      {deleteOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
          <div className="bg-white max-w-sm w-full rounded-xl p-6">
            <h2 className="text-lg font-semibold">
              Delete Product
            </h2>

            <p className="text-sm text-gray-600 mt-2">
              Are you sure you want to delete this product?
              This action cannot be undone.
            </p>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setDeleteOpen(false)}
                className="px-4 py-2 border rounded-lg"
              >
                Cancel
              </button>

              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
