import React, { useState, useEffect, useContext } from "react";
import { PosterContext } from "../../Context/PosterContext.jsx";
import { createPoster, updatePoster, deletePoster } from "../../Services/posterService.js";
import { getCategories } from "../../Services/productsService.js";

const PosterManage = () => {
  const { poster, loading, error, fetchPoster } = useContext(PosterContext);
  const [categories, setCategories] = useState([]);

  const [form, setForm] = useState({
    title: "",
    image: "",
    tag: "",
    category: "",
    redirectUrl: "",
    isActive: true,
  });

  const [editId, setEditId] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      const cats = await getCategories();
      setCategories(cats);
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    if (form.category && form.tag) {
      const selectedCategory = categories.find(c => c._id === form.category);
      if (selectedCategory) {
        const categoryType = selectedCategory.categoryType || "general";
        const tagSlug = form.tag.trim().toLowerCase().replace(/\s+/g, "-");
        setForm(prev => ({
          ...prev,
          redirectUrl: `/products/${categoryType}/${tagSlug}`
        }));
      }
    }
  }, [form.category, form.tag, categories]);

  const handleEdit = (poster) => {
    setForm({
      title: poster.title,
      image: poster.image,
      tag: poster.tag || "",
      category: poster.category || "",
      redirectUrl: poster.redirectUrl || "",
      isActive: poster.isActive,
    });
    setEditId(poster._id);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure to delete this poster?")) {
      try {
        await deletePoster(id);
        fetchPoster();
        if (editId === id) {
          setEditId(null);
          resetForm();
        }
      } catch (err) {
        alert("Failed to delete poster: " + err.message);
      }
    }
  };

  const resetForm = () => {
    setForm({
      title: "",
      image: "",
      tag: "",
      category: "",
      redirectUrl: "",
      isActive: true,
    });
    setEditId(null);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await updatePoster(editId, form);
      } else {
        await createPoster(form);
      }
      fetchPoster();
      resetForm();
    } catch (err) {
      alert("Failed to save poster: " + err.message);
    }
  };

  return (
    <div>
      <h3>{editId ? "Edit Poster" : "Add Poster"}</h3>
      <form onSubmit={handleSubmit}>
        <input required name="title" placeholder="Title" value={form.title} onChange={handleChange} />
        <input required name="image" placeholder="Image URL" value={form.image} onChange={handleChange} />
        <input name="tag" placeholder="Tag (e.g. festival-sale)" value={form.tag} onChange={handleChange} />
        <select name="category" value={form.category} onChange={handleChange} required>
          <option value="">Select Category</option>
          {categories.map((c) => (
            <option key={c._id} value={c._id}>{c.name} ({c.categoryType})</option>
          ))}
        </select>
        <input name="redirectUrl" placeholder="Redirect URL (auto-generated)" value={form.redirectUrl} readOnly />
        <label>
          <input type="checkbox" name="isActive" checked={form.isActive} onChange={handleChange} />
          Active
        </label>
        <br />
        <button type="submit">{editId ? "Update" : "Create"}</button>
        <button type="button" onClick={resetForm}>Reset</button>
      </form>

      <hr />

      <h3>All Posters</h3>
      {loading && <p>Loading posters...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <ul>
        {poster.map((p) => (
          <li key={p._id} style={{ marginBottom: "10px" }}>
            <img src={p.image} alt={p.title} width={40} />
            <span>{p.title}</span>
            <button onClick={() => handleEdit(p)}>Edit</button>
            <button onClick={() => handleDelete(p._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PosterManage;
