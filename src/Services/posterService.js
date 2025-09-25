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

/**
 * Get posters filtered by single tag (Prefer backend filtering if possible)
 */

export const getPostersByTag = async (tag) => {
  // If backend supports query param filtering, use like below:
  // const response = await fetch(`${API_BASE_POSTER}/?tag=${encodeURIComponent(tag)}`);
  // if (!response.ok) throw new Error("Failed to fetch posters by tag");
  // return await response.json();

  // Else fallback to fetching all and client filtering
  const allPosters = await getPoster();
  return allPosters.filter((poster) => poster.tag === tag && poster.isActive);
};

/**
 * Get posters filtered by multiple tags
 */
export const getPostersByTags = async (tags) => {
  // Preferred to do backend filtering
  // const response = await fetch(...);

  const allPosters = await getPoster();
  return allPosters.filter(
    (poster) => tags.includes(poster.tag) && poster.isActive
  );
};

/**
 * Create a new poster
 */
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
