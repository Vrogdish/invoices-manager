"use client";

import React from "react";

import { useInvoiceCreatorStore } from "@/core/store/InvoiceCreatorStore";
import { useAuthStore } from "@/core/store/AuthStore";
import { useProductsStore } from "@/core/store/Productstore";
import { useCustomersStore } from "@/core/store/CustomersStore";
import { ProductInterface } from "@/core/interfaces/product.interface";
import InvoicesPDF from "../../components/invoices-pdf/InvoicesPdf";


import dynamic from "next/dynamic";

const PDFDownloadLink = dynamic(
  () => import("@react-pdf/renderer").then((mod) => mod. PDFDownloadLink),
  {
    ssr: false,
    loading: () => <p>Loading...</p>,
  },
);
import "./styles.scss";

export default function PreviewInvoiceContainer() {
  const { customerSelectedID, productsSelected, documentType } = useInvoiceCreatorStore();
  const { products } = useProductsStore();
  const { customers } = useCustomersStore();
  const { user } = useAuthStore();

  const customerToPrint = customers.find(
    (customer) => customer.id === customerSelectedID
  );
  const productsToPrint: {
    product: ProductInterface | undefined;
    quantity: number;
  }[] = productsSelected.map((product) => {
    return {
      product: products.find((p) => p.id === product.productID),
      quantity: product.quantity,
    };
  });

  const invoicePdfComponent = (
    <InvoicesPDF
      customerToPrint={customerToPrint}
      productsToPrint={productsToPrint}
      user={user}
      type={documentType}
    />
  );

  return (
    <div className="preview-invoice">
      <h1>Prévisualisation de ma facture</h1>
      <PDFDownloadLink document={invoicePdfComponent} fileName="facture.pdf">
        {({ loading }) =>
          loading ? "Chargement du PDF..." : "Télécharger le PDF"
        }
      </PDFDownloadLink>
      <div className="pdf-view">{invoicePdfComponent}</div>
    </div>
  );
}
