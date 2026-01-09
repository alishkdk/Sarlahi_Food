"use client";

import { useEffect, useState } from "react";
import localClient from "@/app/lib/localClient";

type Stats = {
  hotelsCount: number;
  ordersLast24h: number;
  revenueLast24h: number;
};

export default function useAdminStats() {
  const [data, setData] = useState<Stats>({
    hotelsCount: 0,
    ordersLast24h: 0,
    revenueLast24h: 0,
  });
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    try {
      setLoading(true);

      const stored = localClient.get("admin_stats");

      if (stored) {
        setData(stored as Stats);
      } else {
        // fallback default data
        const defaultStats: Stats = {
          hotelsCount: 0,
          ordersLast24h: 0,
          revenueLast24h: 0,
        };
        localClient.post("admin_stats", defaultStats);
        setData(defaultStats);
      }
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    data,
    isLoading,
    error,
  };
}
