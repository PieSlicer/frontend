import { useState, useEffect } from "react";
import { alchemy } from "../lib/alchemy";

export const useDistributionEvents = () => {
  const [distributionEvents, setDistributionEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!distributionEvents) return;
    fetchDistributionEvents();
  }, [distributionEvents]);

  const fetchDistributionEvents = async () => {
    setLoading(true);
    const response = await fetch(process.env.NEXT_PUBLIC_MULTIBASS_EVENT_QUERY_REQUEST as string, {
      headers: {
        Authorization: 'Bearer ' + process.env.NEXT_PUBLIC_MULTIBASS_TOKEN

      }
    });
    const data = await response.json();
    setDistributionEvents(data.result?.rows as []);
    setLoading(false);
  };

  return { distributionEvents, loading };
}
