
const API_BASE = "http://localhost:1200/api/section";

export const getSections = async () => {
  const response = await fetch(`${API_BASE}/sections`);
  if (!response.ok) {
    throw new Error("Failed to fetch sections");
  }
  return await response.json();
};

export const getActiveSections = async () => {
  const response = await fetch(`${API_BASE}/sections/active`);
  if (!response.ok) {
    throw new Error("Failed to fetch active sections");
  }
  return await response.json();
};

export const createSection = async (sectionData) => {
  const response = await fetch(`${API_BASE}/sections`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(sectionData),
  });
  
  if (!response.ok) {
    throw new Error("Failed to create section");
  }
  return await response.json();
};

export const updateSection = async (id, sectionData) => {
  const response = await fetch(`${API_BASE}/sections/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(sectionData),
  });
  
  if (!response.ok) {
    throw new Error("Failed to update section");
  }
  return await response.json();
};

export const deleteSection = async (id) => {
  const response = await fetch(`${API_BASE}/sections/${id}`, {
    method: "DELETE",
  });
  
  if (!response.ok) {
    throw new Error("Failed to delete section");
  }
  return await response.json();
};

// Services/posterService.js - Update your existing service
const API_BASE_POSTER = "http://localhost:1200/api/poster";

export const getPoster = async () => {
  const response = await fetch(`${API_BASE_POSTER}/poster`);
  if (!response.ok) {
    throw new Error("Failed to fetch posters");
  }
  return await response.json();
};

export const createPoster = async (posterData) => {
  const response = await fetch(`${API_BASE_POSTER}/poster`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(posterData),
  });
  
  if (!response.ok) {
    throw new Error("Failed to create poster");
  }
  return await response.json();
};

export const updatePoster = async (id, posterData) => {
  const response = await fetch(`${API_BASE_POSTER}/poster/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(posterData),
  });
  
  if (!response.ok) {
    throw new Error("Failed to update poster");
  }
  return await response.json();
};

export const deletePoster = async (id) => {
  const response = await fetch(`${API_BASE_POSTER}/poster/${id}`, {
    method: "DELETE",
  });
  
  if (!response.ok) {
    throw new Error("Failed to delete poster");
  }
  return await response.json();
};

// Get posters by tag
export const getPostersByTag = async (tag) => {
  const allPosters = await getPoster();
  return allPosters.filter(poster => poster.tag === tag && poster.isActive);
};

// Get posters by multiple tags
export const getPostersByTags = async (tags) => {
  const allPosters = await getPoster();
  return allPosters.filter(poster => 
    tags.includes(poster.tag) && poster.isActive
  );
};