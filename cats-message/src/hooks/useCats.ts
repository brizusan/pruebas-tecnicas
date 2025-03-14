import { useEffect, useMemo, useState } from "react";

export const useCats = () => {
  const [fact, setFact] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getFact();
  }, []);

  const getFact = async () => {
    try {
      setLoading(true);
      const res = await fetch("https://catfact.ninja/fact");
      const data = await res.json();
      setFact(data.fact);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const getFirstLetter = useMemo(() => () => fact.split(" ")[0], [fact]);

  const firstLetter = fact ? getFirstLetter() : null;

  return { fact, getFact, loading, firstLetter };
};
