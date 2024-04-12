import { create } from "zustand";
import {
  firestoreAddProduct,
  firestoreRemoveProduct,
  getAllProducts,
} from "../api/productsApi";
import {
  ProductFormInterface,
  ProductInterface,
} from "@/core/interfaces/product.interface";
import { FirebaseError } from "firebase/app";

interface ProductsState {
  products: ProductInterface[];
  error: FirebaseError | null | string;
  loading: boolean;
  loadProducts: (userId: string) => Promise<void>;
  searchProducts: (term: string) => ProductInterface[];
  addProduct: (product: ProductFormInterface) => Promise<void>;
  deleteProduct: (product: ProductInterface) => Promise<void>;
}

export const useProductsStore = create<ProductsState>((set, get) => ({
  products: [],
  error: null,
  loading: true,
  loadProducts: async (userId: string) => {
    try {
      set((state) => ({ ...state, loading: true, error: null }));
      const response = await getAllProducts(userId);
      if (response.error) {
        set((state) => ({ ...state, error: response.error, loading: false }));
      } else {
        set((state) => ({ ...state, products: response.data, loading: false }));
      }
    } catch (error) {
      set((state) => ({
        ...state,
        error: "Une erreur s'est produite lors du chargement des produits.",
        loading: false,
      }));
    }
  },
  searchProducts: (term: string) => {
    return get().products.filter((product) =>
      product.name.toLowerCase().includes(term.toLowerCase())
    );
  },
  addProduct: async (product: ProductFormInterface) => {
    try {
      set((state) => ({ ...state, loading: true, error: null }));
      const response = await firestoreAddProduct(product);
      if (response.error) {
        set((state) => ({ ...state, error: response.error, loading: false }));
      } else {
        await get().loadProducts(product.userId);
        set((state) => ({ ...state, loading: false }));
      }
    } catch (error) {
      set((state) => ({
        ...state,
        error: "Une erreur s'est produite lors de l'ajout du produit.",
        loading: false,
      }));
    }
  },
  deleteProduct: async (product: ProductInterface) => {
    try {
      set((state) => ({ ...state, loading: true, error: null }));
      const response = await firestoreRemoveProduct(product.id);
      if (response.error) {
        set((state) => ({ ...state, error: response.error, loading: false }));
      } else {
        await get().loadProducts(product.userId);
        set((state) => ({ ...state, loading: false }));
      }
    } catch (error) {
      set((state) => ({
        ...state,
        error: "Une erreur s'est produite lors de la suppression du produit.",
        loading: false,
      }));
    }
  },
}));
