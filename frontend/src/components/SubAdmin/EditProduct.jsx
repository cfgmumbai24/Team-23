import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom"; // Import these hooks from react-router-dom

const EditProduct = () => {
  const { id } = useParams(); // Extract the product id from the URL
  const history = useHistory(); // For navigation after form submission
  const [product, setProduct] = useState(null);
  const [formValues, setFormValues] = useState({
    title: "",
    description: "",
    // Add other fields as needed
  });

  useEffect(() => {
    // Fetch the product details by id
    const fetchProduct = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/api/v1/product/products/${id}`
        );
        if (!response.ok) throw new Error("Failed to fetch product");
        const data = await response.json();
        setProduct(data);
        setFormValues({
          title: data.title,
          description: data.description,
          // Initialize other fields from the data
        });
      } catch (error) {
        console.error(error);
      }
    };

    fetchProduct();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    // Update the product details
    try {
      const response = await fetch(
        `http://localhost:8000/api/v1/product/products/${id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formValues),
        }
      );

      if (!response.ok) throw new Error("Failed to update product");

      history.push("/"); // Navigate back to the product list page after successful update
    } catch (error) {
      console.error(error);
    }
  };

  if (!product) return <p>Loading...</p>;

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <h1 className="text-2xl font-bold mb-4">Edit Product</h1>
      <form onSubmit={handleFormSubmit} className="w-full max-w-md">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            name="title"
            value={formValues.title}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            name="description"
            value={formValues.description}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>
        <button
          type="submit"
          className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditProduct;
