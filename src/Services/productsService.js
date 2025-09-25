// Updated productService.js
const url = "http://localhost:1200/api/product";
const Category = "http://localhost:1200/api/category";

export const getProducts = async () => {
  const response = await fetch(`${url}/Product`);

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }


  const data = await response.json();
  // console.log("Data from ProductService", data);
  // ✅ Return the allProducts array directly
  return data || [];
};

export const postProduct = async (product) => {
  try {
    const response = await fetch(`${url}/Product`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Backend error:", errorData);
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error posting product:", error);
    throw error;
  }
};
export const postCategory = async (product) => {
  try {
    const response = await fetch(`${Category}/category`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Backend error:", errorData);
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error posting product:", error);
    throw error;
  }
};

export const getCategories = async () => {
  const response = await fetch(`${Category}/category`);

  if (!response.ok) {
    throw new Error("Failed to fetch categories");
  }

  const data = await response.json();
  return data; // Categories seem to come as direct array
};


export const getAllProducts = async () => {
  const response = await fetch(`${url}/Product`);

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  const data = await response.json();
  // Return just the allProducts array
  return data.allProducts || [];
};