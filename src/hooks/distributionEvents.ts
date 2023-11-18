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
    const response = await fetch(process.env.MULTIBASS_EVENT_QUERY_REQUEST, {
      headers: {
        Authorization: 'Bearer ' + process.env.MULTIBASS_TOKEN

      }
    });
    const data = await response.json();
    setDistributionEvents(data.result?.rows as []);
    setLoading(false);
  };

  return { distributionEvents, loading };
}
