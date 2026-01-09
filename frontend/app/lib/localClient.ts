// Simple local storage based client (NO API)

const STORAGE_KEY = "admin_data";

function getData() {
  if (typeof window === "undefined") return {};
  const raw = localStorage.getItem(STORAGE_KEY);
  return raw ? JSON.parse(raw) : {};
}

function setData(data: any) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

const localClient = {
  get(key: string) {
    const data = getData();
    return data[key] ?? null;
  },

  getAll() {
    return getData();
  },

  post(key: string, value: any) {
    const data = getData();
    data[key] = value;
    setData(data);
    return value;
  },

  put(key: string, value: any) {
    const data = getData();
    if (!data[key]) throw new Error("Item not found");
    data[key] = value;
    setData(data);
    return value;
  },

  delete(key: string) {
    const data = getData();
    delete data[key];
    setData(data);
    return true;
  },

  clear() {
    localStorage.removeItem(STORAGE_KEY);
  },
  
};

export default localClient;
