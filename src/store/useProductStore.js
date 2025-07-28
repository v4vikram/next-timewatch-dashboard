import { create } from "zustand";
import axiosInstance from "@/lib/axiosInstance";

export const useProductStore = create((set, get) => ({
  products: [],
  trashedProducts: [],
  loading: false,
  error: null,
  fetched: false,
  fetchedTrashed: false,

  createProduct: async (formData) => {
    const productCreateResult = await axiosInstance.post(`/product/create`, formData);
    set({
      fetched: false,
    });
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
      set({ product: res?.data?.product || [] });
      return res?.data?.product
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },

  trashProductById: async (id) => {
    try {
      const res = await axiosInstance.put(`/product/trashed/${id}`);
      set((state) => ({
        products: state.products.filter((p) => p._id !== id),
        loading: false,
      }));
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },

  fetchTrashedProducts: async (force = false) => {
    if (!force && get().fetchedTrashed) return;

    set({ loading: true, error: null });
    try {
      const res = await axiosInstance.get("/product/trashed");
      set({
        trashedProducts: res.data?.products || [],
        loading: false,
        fetchedTrashed: false,
      });
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },


  updateProduct: async ({ id, formData }) => {
    set({ loading: true, error: null })
    try {
      const res = await axiosInstance.put(`/product/update/${id}`, formData)
      console.log("updated")
      set({fetched:false})
      //  set({product:res?.data?.product})
    } catch (error) {

    }
  },

  bulkDeleteProducts: async (ids) => {
    try {

      await axiosInstance.post("/product/bulk-delete", { ids });
      set((state) => ({
        // loading: false,
        fetchedTrashed: false,
        trashedProducts: state.trashedProducts.filter((p) => !ids.includes(p._id)),
      }));
    } catch (err) {
      set({ error: err.message });
    }
  },

  restoreProduct: async (id) => {
  try {
    await axiosInstance.post(`/product/restore/${id}`);
    set((state) => ({
      // optionally, re-fetch or update trashedProducts list
      trashedProducts: state.trashedProducts.filter(p => p._id !== id),
      fetchedTrashed: false, // to trigger reload if needed
    }));
  } catch (err) {
    set({ error: err.message });
  }
},



  clearCache: () => {
    set({ fetched: false }); // ← optional: to allow forced refetch
  },
}));
