import { useState, useEffect } from "react";

export const useDistributionEvents = () => {
  const [distributionEvents, setDistributionEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchDistributionEvents();
  }, []);

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
