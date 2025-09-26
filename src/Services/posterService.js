const API_BASE_POSTER = "http://localhost:1200/api/poster";

/**
 * Get all posters
 */
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

/**
 * Update poster by id
 */
export const updatePoster = async (id, posterData) => {
  const response = await fetch(`${API_BASE_POSTER}/${id}`, {
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

/**
 * Delete poster by id
 */
export const deletePoster = async (id) => {
  const response = await fetch(`${API_BASE_POSTER}/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Failed to delete poster");
  }
  return await response.json();
};
