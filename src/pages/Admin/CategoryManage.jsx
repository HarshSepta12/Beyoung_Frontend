import { useState } from "react";
import { postCategory } from "../../Services/productsService.js"; // Assume API service
import styles from "./CategoryManage.module.css";

const CategoryManage = () => {
  const [category, setCategory] = useState({
    name: "",
    slug: "",
    categoryType: "",
    description: "",
    parentCategory: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCategory((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...category,
        parentCategory: category.parentCategory || null,
      };
      const res = await postCategory(payload);
      alert("Category added successfully");
      setCategory({ name: "", slug: "", description: "", parentCategory: "" });
    } catch (err) {
      alert(err.response?.data?.message || "Error adding category");
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Add New Category</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          name="name"
          placeholder="Category Name"
          value={category.name}
          onChange={handleChange}
          required
          className={styles.input}
        />
        <input
          type="text"
          name="slug"
          placeholder="Slug (URL friendly)"
          value={category.slug}
          onChange={handleChange}
          required
          className={styles.input}
        />
        <select
          name="categoryType"
          value={category.categoryType}
          onChange={handleChange}
          required
          className={styles.input}
        >
          <option value="">Select Category Type</option>
          <option value="topwear">TopWear</option>
          <option value="bottomwear">Bottomwear</option>
        </select>

        <textarea
          name="description"
          placeholder="Description (optional)"
          value={category.description}
          onChange={handleChange}
          className={styles.textarea}
          rows={4}
        />
        <input
          type="text"
          name="parentCategory"
          placeholder="Parent Category ID (optional)"
          value={category.parentCategory}
          onChange={handleChange}
          className={styles.input}
        />
        <button type="submit" className={styles.button}>
          Add Category
        </button>
      </form>
    </div>
  );
};

export default CategoryManage;
