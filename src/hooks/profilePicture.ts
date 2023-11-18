import { useEffect, useState } from "react";

export const nounsURL = "https://api.cloudnouns.com/v1/pfp";

export default function useNounsPicture() {
  const [nounsPicture, setNounsPicture] = useState<string | undefined>(undefined);

  useEffect(() => {
    const fetchNounsPicture = async () => {
      const response = await fetch(nounsURL);
      const data = await response.text();
      setNounsPicture(data);
    }
    fetchNounsPicture();
  }, []);

  return nounsPicture;
}