import React, { createContext, useState, useEffect } from "react";
import { getActiveSections } from "../Services/sectionService.js";

export const SectionContext = createContext();

export const SectionProvider = ({ children }) => {
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchSections = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getActiveSections();
      const sortedSections = data.sort((a, b) => a.order - b.order);
      setSections(sortedSections);
     // console.log("Fetched sorted sections:", sortedSections);
    } catch (err) {
      console.error("Error fetching sections:", err);
      setError(err.message);
      // Fallback to default configuration
      setSections(getDefaultSections());
    } finally {
      setLoading(false);
    }
  };

  // Default sections if API fails
  const getDefaultSections = () => [
    {
      _id: "default-1",
      name: "Main Carousel",
      identifier: "main-carousel",
      title: "Main Banner",
      tags: ["festival", "Festive-Sale"],
      componentType: "carousel",
      order: 1,
      isActive: true,
    },
    {
      _id: "default-2",
      name: "Super Saving Combos",
      identifier: "super-saving-combos",
      title: "SUPER Saving Combos",
      subtitle: "Loved by 4 millions",
      tags: ["super-saving-combos"],
      componentType: "scrollable",
      order: 2,
      isActive: true,
    },
    {
      _id: "default-3",
      name: "Categories",
      identifier: "categories",
      title: "Most Wanted Categories",
      tags: ["category"],
      componentType: "grid",
      order: 3,
      isActive: true,
    },
    {
      _id: "default-4",
      name: "Back to College",
      identifier: "back-to-college",
      title: "Back To College",
      subtitle: "Styles to Slay This Semester",
      tags: ["back-to-college"],
      componentType: "scrollable",
      order: 4,
      isActive: true,
    },
  ];

  useEffect(() => {
    fetchSections();
  }, []);

  return (
    <SectionContext.Provider
      value={{ sections, loading, error, fetchSections, refreshSections: fetchSections }}
    >
      {children}
    </SectionContext.Provider>
  );
};
