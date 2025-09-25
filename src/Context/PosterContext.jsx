import React, { createContext, useState, useEffect } from "react";
import { getPoster } from "../Services/posterService.js";

export const PosterContext = createContext();

export const PosterProvider = ({ children }) => {
  const [poster, setPoster] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchPoster = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getPoster();
      setPoster(data);
    } catch (err) {
      setError(err.message || "Failed to load posters");
      console.error("Error fetching posters:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPoster();
  }, []);

  return (
    <PosterContext.Provider value={{ poster, loading, error, fetchPoster }}>
      {children}
    </PosterContext.Provider>
  );
};
