import React, { useEffect, useState } from "react";
import api from "../api/axios";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [next, setNext] = useState(null);
  const [previous, setPrevious] = useState(null);

  const fetchProducts = async (url = "/products") => {
    setLoading(true);
    setError("");

    try {
      const res = await api.get(url);

      setProducts(res.data.results);
      setNext(res.data.next);
      setPrevious(res.data.previous);
    } catch (err) {
        console.log(err)
      setError("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) {
    return <p className="p-4">Loading products...</p>;
  }

  if (error) {
    return <p className="p-4 text-red-500">{error}</p>;
  }

  return (
    <div className="p-4 space-y-6">
      <h1 className="text-xl font-semibold">Products</h1>

      {/* Product List */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-lg shadow-sm p-4"
          >
            <div className="h-40 bg-gray-100 rounded mb-3 flex items-center justify-center">
              {product.is_image_uploaded ? (
                <img
                  src={product.image_url}
                  alt={product.name}
                  className="h-full object-contain"
                />
              ) : (
                <span className="text-gray-400 text-sm">No Image</span>
              )}
            </div>

            <h2 className="font-medium">{product.name}</h2>
            <p className="text-sm text-gray-500 line-clamp-2">
              {product.description}
            </p>

            <div className="mt-2 flex justify-between text-sm">
              <span>₹ {product.price}</span>
              <span>Stock: {product.stock}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-between">
        <button
          disabled={!previous}
          onClick={() => fetchProducts(previous)}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Previous
        </button>

        <button
          disabled={!next}
          onClick={() => fetchProducts(next)}
          className="px-4 py-2 bg-black text-white rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}
