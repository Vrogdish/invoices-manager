"use client";

import { useProductsStore } from "@/core/store/Productstore";
import { useEffect, useState } from "react";
import ProductList from "../../components/products-list/ProductList";
import SearchProducts from "../../components/search-products/SearchProducts";
import AddProductForm from "../../components/add-product-form/AddProductForm";
import "./styles.scss";
import Button from "@/shared/components/button/Button";
import { useAuthStore } from "@/core/store/AuthStore";

export default function ProductsContainer() {
  const { products, error, loading, searchProducts } =
    useProductsStore();
  const { user } = useAuthStore();

  const [addMode, setAddMode] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [filterIsactive, setFilterIsActive] = useState(false);

  const toggleAddMode = () => {
    setAddMode(!addMode);
  };

  const executeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    term.length > 0 ? setFilterIsActive(true) : setFilterIsActive(false);
    setFilteredProducts(searchProducts(term));
  };

  return (
    <div className="products-container">
      <h1 className="title">Gestion des Produits</h1>

      {addMode ? (
        <>
          <AddProductForm handleReturn={toggleAddMode} />
        </>
      ) : (
        <>
          <Button onClick={toggleAddMode}>+ Ajouter un produit</Button>
          <SearchProducts onInputChange={executeSearch} />
          <h2>Liste des produits</h2>
          {loading ? (
            <p>Chargement...</p>
          ) : error ? (
            <p>Erreur lors du chargement des données</p>
          ) : (filteredProducts.length === 0 && filterIsactive) ||
            products.length === 0 ? (
            <p>Aucun Produit trouvé</p>
          ) : (
            <>
              <ProductList
                products={filterIsactive ? filteredProducts : products}
              />
            </>
          )}
        </>
      )}
    </div>
  );
}
