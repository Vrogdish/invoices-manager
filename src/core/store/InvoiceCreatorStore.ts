import { create } from "zustand";

interface InvoiceCreatorState {
    customerSelectedID: string;
    productsSelected: { productID: string; quantity: number }[];
    addCustomerID: (customerID: string) => void;
    addProduct: (productID: string, quantity: number) => void;
    removeProduct: (productID: string) => void;
    updateQuantity: (productID: string, quantity: number) => void;
}

export const useInvoiceCreatorStore = create<InvoiceCreatorState>((set) => ({
    customerSelectedID: "",
    productsSelected: [],
    addCustomerID: (customerID: string) => {
        set((state) => ({ ...state, customerSelectedID: customerID }));
    },
    addProduct: (productID: string, quantity: number) => {
        set((state) => ({
            ...state,
            productsSelected: [...state.productsSelected, { productID, quantity }],
        }));
    },
    removeProduct: (productID: string) => {
        set((state) => ({
            ...state,
            productsSelected: state.productsSelected.filter((product) => product.productID !== productID),
        }));
    },
    updateQuantity: (productID: string, quantity: number) => {
        set((state) => ({
            ...state,
            productsSelected: state.productsSelected.map((product) =>
                product.productID === productID ? { productID, quantity } : product
            ),
        }));
    },
}));