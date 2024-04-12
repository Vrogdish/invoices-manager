import { create } from "zustand";
import {
  firestoreAddCustomer,
  firestoreRemoveCustomer,
  getAllCustomers,
} from "../api/customersApi";
import {
  CustomerFormInterface,
  CustomerInterface,
} from "@/core/interfaces/customer.interface";
import { FirebaseError } from "firebase/app";

interface CustomersState {
  customers: CustomerInterface[];
  error: FirebaseError | null | string;
  loading: boolean;
  loadCustomers: (userId: string) => Promise<void>;
  searchCustomers: (term: string) => CustomerInterface[];
  addCustomer: (customer: CustomerFormInterface) => Promise<void>;
  deleteCustomer: (customer: CustomerInterface) => Promise<void>;
}

export const useCustomersStore = create<CustomersState>((set, get) => ({
  customers: [],
  error: null,
  loading: true,
  loadCustomers: async (userId: string) => {
    try {
      set((state) => ({ ...state, loading: true, error: null }));
      const response = await getAllCustomers(userId);
      if (response.error) {
        set((state) => ({ ...state, error: response.error, loading: false }));
      } else {
        set((state) => ({ ...state, customers: response.data, loading: false }));
      }
    } catch (error) {
      set((state) => ({
        ...state,
        error: "Une erreur s'est produite lors du chargement des clients.",
        loading: false,
      }));
    }
  },
  searchCustomers: (term: string) => {
    return get().customers.filter((customer) =>
      customer.firstname.toLowerCase().includes(term.toLowerCase())
    );
  },
  addCustomer: async (customer: CustomerFormInterface) => {
    try {
      set((state) => ({ ...state, loading: true, error: null }));
      const response = await firestoreAddCustomer(customer);
      if (response.error) {
        set((state) => ({ ...state, error: response.error, loading: false }));
      } else {
        await get().loadCustomers(customer.userId);
        set((state) => ({ ...state, loading: false }));
      }
    } catch (error) {
      set((state) => ({
        ...state,
        error: "Une erreur s'est produite lors de l'ajout du client.",
        loading: false,
      }));
    }
  },
  deleteCustomer: async (customer: CustomerInterface) => {
    try {
      set((state) => ({ ...state, loading: true, error: null }));
      const response = await firestoreRemoveCustomer(customer.id);
      if (response.error) {
        set((state) => ({ ...state, error: response.error, loading: false }));
      } else {
        await get().loadCustomers(customer.userId);
        set((state) => ({ ...state, loading: false }));
      }
    } catch (error) {
      set((state) => ({
        ...state,
        error: "Une erreur s'est produite lors de la suppression du client.",
        loading: false,
      }));
    }
  },
}));
