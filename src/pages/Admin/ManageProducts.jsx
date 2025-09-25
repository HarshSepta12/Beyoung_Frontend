import { useContext, useState } from "react";
import { postProduct } from "../../Services/productsService.js";
import styles from "../Admin/ManageProduct.module.css";
import { ProductContext } from "../../Context/ProductContext.jsx";

const ManageProduct = () => {
  const { category } = useContext(ProductContext);

  // Initial empty states including details
  const initialProductState = {
    title: "",
    slug: "",
    sku: "",
    description: "",
    brand: "",
    category: "", // ObjectId string
    tags: "",
    price: "",
    discountPrice: "",
    variants: [
      {
        color: "",
        sizes: [],
        images: [],
      },
    ],
    offer: {
      discountType: "percent",
      value: 0,
      startDate: "",
      endDate: "",
      isActive: false,
    },
    coupons: [],
    isFeatured: false,
    details: {},
  };

  const initialImageState = { url: "", alt: "" };
  const initialCouponState = {
    code: "",
    discountType: "percent",
    value: 0,
    minPurchase: 0,
    maxDiscount: "",
    expiryDate: "",
    isActive: true,
  };

  const [product, setProduct] = useState(initialProductState);
  const [newImage, setNewImage] = useState(initialImageState);
  const [newCoupon, setNewCoupon] = useState(initialCouponState);

  // Basic input handler
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Variant handlers
  const handleVariantChange = (e, index) => {
    const { name, value } = e.target;
    setProduct((prev) => {
      const variantsCopy = [...prev.variants];
      variantsCopy[index][name] = value;
      return { ...prev, variants: variantsCopy };
    });
  };

  const handleSizesChange = (e, index) => {
    const sizesArray = e.target.value
      .split(",")
      .map((s) => s.trim())
      .filter((s) => s !== "");
    setProduct((prev) => {
      const variantsCopy = [...prev.variants];
      variantsCopy[index].sizes = sizesArray;
      return { ...prev, variants: variantsCopy };
    });
  };

  // Image handlers
  const handleNewImageChange = (e) => {
    const { name, value } = e.target;
    setNewImage((prev) => ({ ...prev, [name]: value }));
  };

  const addImageToVariant = () => {
    if (!newImage.url.trim()) {
      alert("Please enter Image URL");
      return;
    }
    setProduct((prev) => {
      const variantsCopy = [...prev.variants];
      if (!variantsCopy[0].images) variantsCopy[0].images = [];
      variantsCopy[0].images.push({ ...newImage });
      return { ...prev, variants: variantsCopy };
    });
    setNewImage(initialImageState);
  };

  const removeImageFromVariant = (imgIndex) => {
    setProduct((prev) => {
      const variantsCopy = [...prev.variants];
      variantsCopy[0].images.splice(imgIndex, 1);
      return { ...prev, variants: variantsCopy };
    });
  };

  // Offer handlers
  const handleOfferChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProduct((prev) => ({
      ...prev,
      offer: {
        ...prev.offer,
        [name]: type === "checkbox" ? checked : value,
      },
    }));
  };

  // Coupon handlers
  const handleCouponChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewCoupon((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const addCoupon = () => {
    if (!newCoupon.code.trim()) {
      alert("Please enter a coupon code");
      return;
    }
    setProduct((prev) => ({
      ...prev,
      coupons: [...prev.coupons, { ...newCoupon }],
    }));
    setNewCoupon(initialCouponState);
  };

  const removeCoupon = (index) => {
    setProduct((prev) => {
      const couponsCopy = [...prev.coupons];
      couponsCopy.splice(index, 1);
      return { ...prev, coupons: couponsCopy };
    });
  };

  // Dynamic details handler
  const handleDetailsChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({
      ...prev,
      details: {
        ...prev.details,
        [name]: value,
      },
    }));
  };

  // Determine categoryType from selected category ObjectId
  const selectedCategory = category.find((cat) => cat._id === product.category);
  const categoryType = selectedCategory?.categoryType;

  // Form submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formattedProduct = {
        ...product,
        price: Number(product.price) || 0,
        discountPrice: Number(product.discountPrice) || 0,
        tags: product.tags
          ? product.tags
              .split(",")
              .map((t) => t.trim())
              .filter((t) => t !== "")
          : [],
        offer: {
          discountType: product.offer.discountType || "percent",
          value: Number(product.offer.value) || 0,
          startDate: product.offer.startDate || null,
          endDate: product.offer.endDate || null,
          isActive: product.offer.isActive ?? false,
        },
        coupons: product.coupons.map((c) => ({
          code: c.code,
          discountType: c.discountType || "percent",
          value: Number(c.value) || 0,
          minPurchase: Number(c.minPurchase) || 0,
          maxDiscount: Number(c.maxDiscount) || null,
          expiryDate: c.expiryDate || null,
          isActive: c.isActive ?? true,
        })),
      };

      console.log("Submitting product:", formattedProduct);
      const res = await postProduct(formattedProduct);
      console.log("Product added:", res.data);

      alert("Product added successfully!");

      // Reset all states
      setProduct(initialProductState);
      setNewImage(initialImageState);
      setNewCoupon(initialCouponState);
    } catch (err) {
      console.error("Error submitting product:", err);
      alert(err.response?.data?.message || "Something went wrong while adding product");
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Add New Product</h2>
      <form className={styles.form} onSubmit={handleSubmit}>
        {/* Basic inputs */}
        <input type="text" name="title" placeholder="Title" value={product.title} onChange={handleChange} required className={styles.input} />
        <input type="text" name="slug" placeholder="Slug" value={product.slug} onChange={handleChange} className={styles.input} />
        <input type="text" name="sku" placeholder="SKU" value={product.sku} onChange={handleChange} className={styles.input} />
        <textarea name="description" placeholder="Description" value={product.description} onChange={handleChange} className={styles.textarea} />
        <input type="text" name="brand" placeholder="Brand" value={product.brand} onChange={handleChange} className={styles.input} />

        {/* Category select dropdown */}
        <select name="category" value={product.category} onChange={handleChange} className={styles.input} required>
          <option value="">Select Category</option>
          {category.map((cat) => (
            <option key={cat._id} value={cat._id}>{cat.name}</option>
          ))}
        </select>

        <input type="text" name="tags" placeholder="Tags (comma separated)" value={product.tags} onChange={handleChange} className={styles.input} />
        <input type="number" name="price" placeholder="Price" value={product.price} onChange={handleChange} required className={styles.input} />
        <input type="number" name="discountPrice" placeholder="Discount Price" value={product.discountPrice} onChange={handleChange} className={styles.input} />

        {/* Details Inputs conditional */}
        {categoryType === "topwear" && (
          <>
            <input type="text" name="neckCollar" placeholder="Neck Collar" value={product.details.neckCollar || ""} onChange={handleDetailsChange} className={styles.input} />
            <input type="text" name="sleeves" placeholder="Sleeves" value={product.details.sleeves || ""} onChange={handleDetailsChange} className={styles.input} />
            <input type="text" name="pattern" placeholder="Pattern" value={product.details.pattern || ""} onChange={handleDetailsChange} className={styles.input} />
            <input type="text" name="fabric" placeholder="Fabric" value={product.details.fabric || ""} onChange={handleDetailsChange} className={styles.input} />
          </>
        )}

        {categoryType === "bottomwear" && (
          <>
            <input type="text" name="waistSize" placeholder="Waist Size" value={product.details.waistSize || ""} onChange={handleDetailsChange} className={styles.input} />
            <input type="text" name="length" placeholder="Length" value={product.details.length || ""} onChange={handleDetailsChange} className={styles.input} />
            <input type="text" name="fitType" placeholder="Fit Type" value={product.details.fitType || ""} onChange={handleDetailsChange} className={styles.input} />
            <input type="text" name="closureType" placeholder="Closure Type" value={product.details.closureType || ""} onChange={handleDetailsChange} className={styles.input} />
            <input type="text" name="pocketType" placeholder="Pocket Type" value={product.details.pocketType || ""} onChange={handleDetailsChange} className={styles.input} />
            <input type="text" name="fabric" placeholder="Fabric" value={product.details.fabric || ""} onChange={handleDetailsChange} className={styles.input} />
            <input type="text" name="design" placeholder="Design" value={product.details.design || ""} onChange={handleDetailsChange} className={styles.input} />
          </>
        )}

        {/* Variant */}
        <h4 className={styles.subHeading}>Variant</h4>
        <input type="text" name="color" placeholder="Color" value={product.variants[0].color} onChange={(e) => handleVariantChange(e, 0)} className={styles.input} />
        <input type="text" placeholder="Sizes (comma separated)" value={product.variants[0].sizes.join(",")} onChange={(e) => handleSizesChange(e, 0)} className={styles.input} />

        {/* Variant Images */}
        <div className={styles.imagesContainer}>
          {product.variants[0].images.map((img, idx) => (
            <div key={idx} className={styles.imageItem}>
              <img src={img.url} alt={img.alt || "image"} className={styles.imagePreview} />
              <button type="button" onClick={() => removeImageFromVariant(idx)} className={styles.removeImageButton}>
                Remove
              </button>
            </div>
          ))}
        </div>
        <input type="text" name="url" placeholder="Image URL" value={newImage.url} onChange={handleNewImageChange} className={styles.input} />
        <input type="text" name="alt" placeholder="Image Alt" value={newImage.alt} onChange={handleNewImageChange} className={styles.input} />
        <button type="button" onClick={addImageToVariant} className={styles.button}>
          Add Image
        </button>

        {/* Offer */}
        <h4 className={styles.subHeading}>Offer</h4>
        <select name="discountType" value={product.offer.discountType} onChange={handleOfferChange} className={styles.select}>
          <option value="percent">Percent</option>
          <option value="flat">Flat</option>
        </select>
        <input type="number" name="value" placeholder="Offer Value" value={product.offer.value} onChange={handleOfferChange} className={styles.input} />
        <input type="date" name="startDate" value={product.offer.startDate} onChange={handleOfferChange} className={styles.input} />
        <input type="date" name="endDate" value={product.offer.endDate} onChange={handleOfferChange} className={styles.input} />
        <label className={styles.checkbox}>
          Active Offer:
          <input type="checkbox" name="isActive" checked={product.offer.isActive} onChange={handleOfferChange} />
        </label>

        {/* Coupons */}
        <h4 className={styles.subHeading}>Coupons</h4>
        <div className={styles.couponList}>
          {product.coupons.map((c, idx) => (
            <div key={idx} className={styles.couponItem}>
              <span>
                {c.code} - {c.discountType} {c.value}
              </span>
              <button type="button" onClick={() => removeCoupon(idx)} className={styles.removeImageButton}>
                Remove
              </button>
            </div>
          ))}
        </div>
        <input type="text" name="code" placeholder="Coupon Code" value={newCoupon.code} onChange={handleCouponChange} className={styles.input} />
        <select name="discountType" value={newCoupon.discountType} onChange={handleCouponChange} className={styles.select}>
          <option value="percent">Percent</option>
          <option value="flat">Flat</option>
        </select>
        <input type="number" name="value" placeholder="Discount Value" value={newCoupon.value} onChange={handleCouponChange} className={styles.input} />
        <input type="number" name="minPurchase" placeholder="Minimum Purchase" value={newCoupon.minPurchase} onChange={handleCouponChange} className={styles.input} />
        <input type="number" name="maxDiscount" placeholder="Max Discount" value={newCoupon.maxDiscount} onChange={handleCouponChange} className={styles.input} />
        <input type="date" name="expiryDate" value={newCoupon.expiryDate} onChange={handleCouponChange} className={styles.input} />
        <label className={styles.checkbox}>
          Active:
          <input type="checkbox" name="isActive" checked={newCoupon.isActive} onChange={handleCouponChange} />
        </label>
        <button type="button" onClick={addCoupon} className={styles.button}>
          Add Coupon
        </button>

        {/* Featured */}
        <label className={styles.checkbox}>
          Featured:
          <input type="checkbox" name="isFeatured" checked={product.isFeatured} onChange={handleChange} />
        </label>

        <button type="submit" className={styles.button}>
          Add Product
        </button>
      </form>
    </div>
  );
};

export default ManageProduct;
