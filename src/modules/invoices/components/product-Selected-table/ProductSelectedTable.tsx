import { useInvoiceCreatorStore } from "@/core/store/InvoiceCreatorStore";
import { useProductsStore } from "@/core/store/Productstore";
import Image from "next/image";
import React from "react";
import "./styles.scss";



export default function ProductSelectedTable() {
  const { products } = useProductsStore();
  const { productsSelected, removeProduct,updateQuantity } = useInvoiceCreatorStore();

  const getProductbyID = (productID: string) => {
    return products.find((product) => product.id === productID);
  };
  return (
   <div className="invoice-table">{productsSelected.length === 0 ? <p>Aucun produit sélectionné</p> : 
      <table>
        <thead>
          <tr>
            <th className="ref">Réference</th>
            <th>Produit</th>
            <th className="quantity">Quantité</th>
            <th>Supprimer</th>
          </tr>
        </thead>
        <tbody>
          {productsSelected.map((product) => {
            const productData = getProductbyID(product.productID);
            if (!productData) return null;
            return (
              <tr key={product.productID}>
                <td className="ref">{productData.reference}</td>
                <td>{productData.name}</td>
                <td className="quantity">
                  <input type="number" 
                  min={1}
                  defaultValue={product.quantity} 
                  onChange={
                    (e) => updateQuantity(product.productID, parseInt(e.target.value))
                  } 
                  />
                  </td>
                <td className="delete">
                  <Image
                    src={"/icons/delete.png"}
                    alt="delete"
                    width={30}
                    height={30}
                    onClick={() => removeProduct(product.productID)}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>}
 </div>
  );
}
