import { create } from "zustand";
import axiosInstance from "@/lib/axiosInstance";

export const useProductStore = create((set, get) => ({
  products: [],
  loading: false,
  error: null,
  fetched: false, // ← used to prevent re-fetching

  createProduct: async (formData) => {
    const productCreateResult = await axiosInstance.post(`/product`, formData);
  },

  fetchProducts: async () => {
    if (get().fetched) return; // ← skip if already fetched

    set({ loading: true, error: null });

    try {
      const res = await axiosInstance.get("/product");

      set({
        products: res.data?.products || [],
        loading: false,
        fetched: true, // ✅ important: mark as fetched here!
      });
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },

  fetchProductById: async (id) => {
    try {
      const res = await axiosInstance.get(`/product/${id}`);
      // console.log("res", res?.data?.product)
      // set({ product: res?.data?.product || []});
      return res?.data?.product
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },

  deleteProduct: async (id) => {
    try {
      const res = await axiosInstance.delete(`/product/${id}`);
      set((state) => ({
        products: state.products.filter((p) => p._id !== id),
        loading: false,
      }));
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },

  updateProduct: async ({ id, formData }) => {
    set({ loading: true, error: null })
    try {
      const res = await axiosInstance.put(`/product/${id}`, formData)
      console.log("updated")
      //  set({product:res?.data?.product})
    } catch (error) {

    }
  },

  clearCache: () => {
    set({ fetched: false }); // ← optional: to allow forced refetch
  },
}));
