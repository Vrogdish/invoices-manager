"use client";

import { useCustomersStore } from "@/core/store/CustomersStore";
import { useProductsStore } from "@/core/store/Productstore";
import { Autocomplete, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import "./styles.scss";
import {
  DocumentTypeEnum,
  useInvoiceCreatorStore,
} from "@/core/store/InvoiceCreatorStore";
import ProductSelectedTable from "../../components/product-Selected-table/ProductSelectedTable";
import Button from "@/shared/components/button/Button";
import Link from "next/link";

export default function CreateInvoiceContainer() {
  const [customerSearchList, setCustomerSearchList] = useState<
    { label: string; value: string }[]
  >([]);
  const [productSearchList, setProductSearchList] = useState<
    { label: string; value: string }[]
  >([]);
  const [productToAdd, setProductToAdd] = useState<string>("");
  const {
    addCustomerID,
    addProduct,
    productsSelected,
    customerSelectedID,
    resetStore,
    documentType,
  } = useInvoiceCreatorStore();
  const { customers } = useCustomersStore();
  const { products } = useProductsStore();

  useEffect(() => {
    const customerList = customers.map((customer) => ({
      label: customer.firstname + " " + customer.lastname,
      value: customer.id,
    }));
    const productList = products.map((product) => ({
      label: product.name,
      value: product.id,
    }));
    setCustomerSearchList(customerList);
    setProductSearchList(productList);
  }, [customers, products]);

  const HandleAddProductToList = (productID: string) => {
    if (
      !productID ||
      productsSelected.some((product) => product.productID === productID)
    )
      return;
    addProduct(productID, 1);
  };

  return (
    <div className="create-invoice">
      <h1 className="title">
        Création de{" "}
        {documentType === DocumentTypeEnum.INVOICE ? "facture" : "devis"}
      </h1>
      <form className="invoice-form">
        <div className="invoice-search">
          <Autocomplete
            disablePortal
            isOptionEqualToValue={(option, value) =>
              option.value === value.value
            }
            onChange={(event, value) => addCustomerID(value?.value || "")}
            id="combo-box-demo"
            options={customerSearchList}
            size="small"
            sx={{ width: 600 }}
            renderInput={(params) => (
              <TextField {...params} label="Sélectionner un client " />
            )}
          />

          <div className="add-product">
            <Autocomplete
              disablePortal
              isOptionEqualToValue={(option, value) =>
                option.value === value.value
              }
              onChange={(event, value) => setProductToAdd(value?.value || "")}
              id="combo-box-demo"
              options={productSearchList}
              size="small"
              sx={{ width: 600 }}
              renderInput={(params) => (
                <TextField {...params} label="Rechercher un produit" />
              )}
            />
            <Button
              type="button"
              onClick={() => HandleAddProductToList(productToAdd)}
            >
              Ajouter
            </Button>
          </div>
        </div>
        <h2>
          Liste des produits ajouté à votre{" "}
          {documentType === DocumentTypeEnum.INVOICE ? "facture" : "devis"}
        </h2>
        <ProductSelectedTable />
        <div className="invoice-submit">
          <Link href="/" onClick={() => resetStore()}>
            <Button type="button" theme="cancel">
              Annuler
            </Button>
          </Link>
          <Link href="/pdf-preview">
            <Button
              type="button"
              disabled={
                !customerSelectedID || productsSelected.length === 0
                  ? true
                  : false
              }
            >
              voir{" "}
              {documentType === DocumentTypeEnum.INVOICE
                ? "la facture"
                : "le devis"}
            </Button>
          </Link>
        </div>
      </form>
    </div>
  );
}
