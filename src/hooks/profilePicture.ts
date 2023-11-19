import { useEffect, useState } from "react";

export const nounsURL = "https://api.cloudnouns.com/v1/pfp";

export const fetchNounsPicture = async () => {
  const response = await fetch(nounsURL);
  const data = await response.text();
  return data;
}

export default function useNounsPicture() {
  const [nounsPicture, setNounsPicture] = useState<string | undefined>(undefined);

  useEffect(() => {
    async function init() {
      const data = await fetchNounsPicture();
      setNounsPicture(data);
    }
    init();
  }, []);

  return nounsPicture;
}