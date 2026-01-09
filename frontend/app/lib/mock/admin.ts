// Lightweight mock data provider for admin pages.
// Use only for local/dev. Does not call any network APIs.

export type Restaurant = {
  id: string;
  name: string;
  city?: string;
  address?: string;
  phone?: string;
  isActive: boolean;
  rating?: number;
  cuisine?: string[];
  description?: string;
  createdAt?: string;
};

export type Order = {
  id: string;
  restaurantName: string;
  customer: string;
  items: Array<{ name: string; qty: number; price?: number }>;
  total: number;
  status: string;
  createdAt: string;
};

export type User = { id: string; name: string; email: string; role: string };

const RESTAURANTS: Restaurant[] = Array.from({ length: 48 }).map((_, i) => ({
  id: `rest-${1000 + i}`,
  name: `Sample Restaurant ${i + 1}`,
  city: ["Kathmandu", "Pokhara", "Butwal", "Biratnagar"][i % 4],
  isActive: i % 5 !== 0,
  rating: Number((3 + (i % 3) + Math.random()).toFixed(1)),
  cuisine: i % 2 === 0 ? ["Nepali", "Chinese"] : ["Indian", "Continental"],
  description: `A short description for Sample Restaurant ${i + 1}.`,
  address: `Address ${i + 1}`,
  phone: `+977-1-1000${i}`,
  createdAt: new Date(Date.now() - i * 1000 * 60 * 60 * 24).toISOString(),
}));

const ORDERS: Order[] = Array.from({ length: 10 }).map((_, i) => ({
  id: `ord-${2000 + i}`,
  restaurantName: `Sample Restaurant ${1 + (i % 6)}`,
  customer: `Customer ${i + 1}`,
  items: [{ name: "Momo", qty: 2, price: 5.5 }, { name: "Fried Rice", qty: 1, price: 7.0 }],
  total: Math.round((12 + Math.random() * 30) * 100) / 100,
  status: ["pending", "accepted", "delivered", "cancelled"][i % 4],
  createdAt: new Date(Date.now() - i * 1000 * 60 * 20).toISOString(),
}));

const USERS: User[] = [
  { id: "u-1", name: "Admin One", email: "admin1@example.com", role: "superadmin" },
  { id: "u-2", name: "Ops User", email: "ops@example.com", role: "ops" },
  { id: "u-3", name: "Partner Owner", email: "owner@example.com", role: "restaurant_owner" },
];

export async function getRestaurants({ q = "", page = 1, pageSize = 12 }: { q?: string; page?: number; pageSize?: number } = {}) {
  let items = RESTAURANTS.slice();
  const qq = (q || "").trim().toLowerCase();
  if (qq) {
    items = items.filter((r) => r.name.toLowerCase().includes(qq) || (r.city || "").toLowerCase().includes(qq) || r.id.toLowerCase().includes(qq));
  }
  const total = items.length;
  const start = (page - 1) * pageSize;
  const paged = items.slice(start, start + pageSize);
  return { items: paged, total, page, pageSize };
}

export async function getRestaurantById(id?: string) {
  // ✅ Defensive guard
  if (!id || typeof id !== "string") {
    return {
      id: "unknown",
      name: "Unknown Restaurant",
      city: "Kathmandu",
      address: "Unknown",
      phone: "",
      isActive: false,
      rating: 0,
      cuisine: [],
      description: "",
      createdAt: new Date().toISOString(),
    } as Restaurant;
  }

  const found = RESTAURANTS.find((r) => r.id === id);

  if (!found) {
    return {
      id,
      name: `Sample Restaurant ${id.slice(-3)}`,
      city: "Kathmandu",
      address: "Unknown",
      phone: "",
      isActive: true,
      rating: 4.0,
      cuisine: ["Nepali"],
      description: "",
      createdAt: new Date().toISOString(),
    } as Restaurant;
  }

  return found;
}


export async function getOrders() {
  return { items: ORDERS.slice() };
}

export async function getOrderById(id: string) {
  const found = ORDERS.find((o) => o.id === id);
  if (!found) {
    return {
      id,
      restaurantName: "Unknown",
      customer: "Guest",
      items: [{ name: "Item A", qty: 1, price: 0 }],
      total: 0,
      status: "pending",
      createdAt: new Date().toISOString(),
    } as Order;
  }
  return found;
}

export async function getUsers() {
  return { items: USERS.slice() };
}

export async function getUserById(id: string) {
  const found = USERS.find((u) => u.id === id);
  if (!found) {
    return { id, name: `User ${id}`, email: `${id}@example.com`, role: "ops" } as User;
  }
  return found;
}

export async function getAnalytics() {
  return {
    revenue: "$24,320",
    orders30d: 1283,
    activeRestaurants: 342,
  };
}

export async function getOffers() {
  return {
    items: [
      { id: "offer-1", title: "10% off all orders", code: "WELCOME10", discount: 10 },
      { id: "offer-2", title: "Free delivery", code: "FREESHIP", discount: 0 },
    ],
  };
}

export async function getSettings() {
  return {
    platformName: "Foodmandu Clone",
    currency: "NPR",
    timezone: "Asia/Kathmandu",
  };
}