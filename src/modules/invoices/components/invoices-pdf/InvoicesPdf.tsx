"use client"
import React from "react";

import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";
import { ProductInterface } from "@/core/interfaces/product.interface";
import { CustomerInterface } from "@/core/interfaces/customer.interface";
import { UserProfileInterface } from "@/core/interfaces/userProfile.interface";

const styles = StyleSheet.create({
  page: {
    display: "flex",
    flexDirection: "column",
    padding: 10,
    width: 595,
    height: 842,
    fontSize: 10,
    position: "relative",
  },
  header: {
    
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    padding: "20px 100px",
    backgroundColor: "#E4E4E4",
  },
  contact: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    margin: "40px 0"
  },
  section: {
    margin: 10,
    padding: 10,
    display: "flex",
    flexDirection: "column",
  },
  table: {
    padding: 10,
    display: "flex",
    flexDirection: "column",
  },
  row: {
    display: "flex",
    flexDirection: "row",
    borderBottom: "1px solid black",
  },
  column: {
    display: "flex",
    flexDirection: "row",
    width: "20%",
    padding: 10,
  },
  total : {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    marginTop:20,
    padding: 10,
  },
  textCenter: {
    textAlign: "center",
    
  },
  footer :{
    marginTop: 60,
    textAlign: "center",
    position: "absolute",
    bottom: 0,
    fontSize: 8,
    width: "100%",
    padding: 20,
  }
});

interface Props {
    customerToPrint : CustomerInterface | undefined;
    productsToPrint : {
      product: ProductInterface | undefined;
      quantity: number;
    }[];
    user : UserProfileInterface | null;
}

export default function InvoicesPDF({customerToPrint, productsToPrint, user}: Props) {
  const totalHT = productsToPrint.reduce(
    (acc, product) =>
      acc + (product.product?.price ? product.product.price * product.quantity : 0),
    0
  );
  const totalTVA = totalHT * 0.2;
  const totalTTC = totalHT + totalTVA;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.title}>Facture</Text>
          <View style={styles.section}>
            <Text>Facture n° : 1</Text>
            <Text>Fait le : {new Date().toDateString()}</Text>
          </View>
        </View>
        <View style={styles.contact}>
          <View style={styles.section}>
            <Text>{user?.company}</Text>
            <Text>
              {user?.lastName} {user?.firstName}
            </Text>
            <Text>{user?.address}</Text>
            <Text>
              {user?.postalCode}-{user?.city}
            </Text>
          </View>
          <View style={styles.section}>
            <Text>{customerToPrint?.company}</Text>
            <Text>
              {customerToPrint?.lastname} {customerToPrint?.firstname}
            </Text>
            <Text>{customerToPrint?.address}</Text>
            <Text>
              {customerToPrint?.postalCode}-{customerToPrint?.locality}
            </Text>
          </View>
        </View>
        <View style={styles.table}>
          <View style={styles.row}>
            <Text style={styles.column}>Référence</Text>
            <Text style={styles.column}>Produit</Text>
            <Text style={styles.column}>Prix unitaire HT</Text>
            <Text style={styles.column}>Quantité</Text>
            <Text style={styles.column}>Total HT</Text>
          </View>
          {productsToPrint.map((product) => (
            <View key={product.product?.id} style={styles.row}>
              <Text style={styles.column}>{product.product?.reference}</Text>
              <Text style={styles.column}>{product.product?.name}</Text>
              <Text style={styles.column}>
                {product.product?.price.toFixed(2)} €
              </Text>
              <Text style={styles.column}>{product.quantity}</Text>
              <Text style={styles.column}>
                {product.product?.price &&
                  (product.product.price * product.quantity).toFixed(2)}{" "}
                €
              </Text>
            </View>
          ))}
        </View>
        <View style={styles.total}>
          <Text>
            Total HT : {totalHT.toFixed(2)} €
          </Text>
          <Text>Montant TVA 20% : {totalTVA.toFixed(2)} € </Text>
          <Text>
            Total TTC : {totalTTC.toFixed(2)} €
          </Text>
          <Text></Text>
        </View>
        <View style={styles.footer}>
          <Text>Facturation en ligne. Vous aussi créez vos factures simplement à l&apos;adresse suivante : https://www.invoices-manager.exemple.com</Text>
        </View>
      </Page>
    </Document>
  );
}
