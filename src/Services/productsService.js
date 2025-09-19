// productService.js
const url = "http://localhost:1200/api/product";

export const getProducts = async () => {
  const response = await fetch(`${url}/getProduct`);
  
  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  const data = await response.json();
  return data;
};

// In your postProduct function, log the error response:

export const postProduct = async (product) => {
  try {
    const response = await fetch(`${url}/addProduct`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    });

    if (!response.ok) {
      const errorData = await response.json(); // Get error details
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

const products = [
  {
    id: 1,
    imgsrc: "/newArrival1.1.jpg",
    name: "Classic White Shirt",
    category: "shirt",
    currentPrice: 997,
    originalPrice: 2499,
    discount: 60,
  },
  {
    id: 2,
    imgsrc: "/newArrival1.2.jpg",
    name: "Casual Gurkha Pant",
    category: "gurkha pant",
    currentPrice: 997,
    originalPrice: 2499,
    discount: 60,
  },
  {
    id: 3,
    imgsrc: "/newArrival1.3.jpg",
    name: "Round Neck T-Shirt",
    category: "t-shirt",
    currentPrice: 997,
    originalPrice: 2499,
    discount: 60,
  },
  {
    id: 4,
    imgsrc: "/newArrival1.4.jpg",
    name: "Black Polo T-Shirt",
    category: "polo t-shirt",
    currentPrice: 997,
    originalPrice: 2499,
    discount: 60,
  },
  {
    id: 5,
    imgsrc: "/newArrival1.5.jpg",
    name: "Slim Fit Jeans",
    category: "jeans",
    currentPrice: 997,
    originalPrice: 2499,
    discount: 60,
  },
  {
    id: 6,
    imgsrc: "/newArrival1.6.jpg",
    name: "Cargo Trouser Olive",
    category: "cargo trouser",
    currentPrice: 997,
    originalPrice: 2499,
    discount: 60,
  },
  {
    id: 7,
    imgsrc: "/newArrival1.7.jpg",
    name: "Formal Blue Shirt",
    category: "shirt",
    currentPrice: 997,
    originalPrice: 2499,
    discount: 60,
  },
  {
    id: 8,
    imgsrc: "/newArrival1.8.jpg",
    name: "Gurkha Pant Black",
    category: "gurkha pant",
    currentPrice: 997,
    originalPrice: 2499,
    discount: 60,
  },
  {
    id: 9,
    imgsrc: "/newArrival1.9.jpg",
    name: "Graphic T-Shirt",
    category: "t-shirt",
    currentPrice: 997,
    originalPrice: 2499,
    discount: 60,
  },
  {
    id: 10,
    imgsrc: "/newArrival1.10.jpg",
    name: "Striped Polo T-Shirt",
    category: "polo t-shirt",
    currentPrice: 997,
    originalPrice: 2499,
    discount: 60,
  },
  {
    id: 11,
    imgsrc: "/newArrival1.11.jpg",
    name: "Distressed Jeans",
    category: "jeans",
    currentPrice: 997,
    originalPrice: 2499,
    discount: 60,
  },
  {
    id: 12,
    imgsrc: "/newArrival1.12.jpg",
    name: "Cargo Trouser Khaki",
    category: "cargo trouser",
    currentPrice: 997,
    originalPrice: 2499,
    discount: 60,
  },
  {
    id: 13,
    imgsrc: "/newArrival1.13.jpg",
    name: "Cargo Trouser Khaki",
    category: "cargo trouser",
    currentPrice: 997,
    originalPrice: 2499,
    discount: 60,
  },
];

export const categories = [
  "View All",
  "Shirt",
  "Gurkha Pant",
  "T-Shirt",
  "Polo T-Shirt",
  "Jeans",
  "Cargo Trouser",
];

// Simple function to get all products
export const getAllProducts = () => {
  // console.log(products);

  return products;
};
