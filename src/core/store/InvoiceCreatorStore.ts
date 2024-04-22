import { create } from "zustand";

export enum DocumentTypeEnum {
    INVOICE = "invoice",
    ESTIMATE = "estimate",
}

interface InvoiceCreatorState {
    customerSelectedID: string;
    productsSelected: { productID: string; quantity: number }[];
    documentType: DocumentTypeEnum;
    addCustomerID: (customerID: string) => void;
    addProduct: (productID: string, quantity: number) => void;
    removeProduct: (productID: string) => void;
    updateQuantity: (productID: string, quantity: number) => void;
    setDocumentType: (documentType: DocumentTypeEnum) => void;
    resetStore: () => void;
}

export const useInvoiceCreatorStore = create<InvoiceCreatorState>((set) => ({
    customerSelectedID: "",
    productsSelected: [],
    documentType: DocumentTypeEnum.INVOICE,
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
    setDocumentType: (documentType: DocumentTypeEnum) => {
        set((state) => ({ ...state, documentType }));
    },
    resetStore: () => {
        set((state) => ({
            customerSelectedID: "",
            productsSelected: [],
            documentType: DocumentTypeEnum.INVOICE,
        }));
    },
}));