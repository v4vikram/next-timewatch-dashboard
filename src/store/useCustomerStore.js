import axiosInstance from "@/lib/axiosInstance";
import { create } from "zustand"

export const useCustomerStore = create((set, get) => (
    {
        customers: [],
        loading: false,
        error: null,
        fetched: false,

        fetchCustomers: async () => {
            if (get().fetched) return;
            set({ loading: true, error: null })

            try{
                const res = await axiosInstance.get('/customer')
                set({customers: res?.data?.customers || [], loading:false, fetched:true})
            }
            catch{

            }
        }
    }
))