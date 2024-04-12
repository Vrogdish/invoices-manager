"use client";

import { useCustomersStore } from "@/core/store/CustomersStore";
import { useState } from "react";
import AddCustomersForm from "../../components/add-cutomer-form/AddCustomersForm";
import Button from "@/shared/components/button/Button";
import SearchProducts from "@/modules/products/components/search-products/SearchProducts";
import CustomersList from "../../components/customers-list/CustomersList";

export default function CustomersContainer() {
  const { customers, error, loading, searchCustomers } =
    useCustomersStore();
    const [filteredCustomers, setFilteredCustomers] = useState(customers);
  const [addMode, setAddMode] = useState(false);
  const [filterIsactive, setFilterIsActive] = useState(false);
  const toggleAddMode = () => {
    setAddMode(!addMode);
  };

  const executeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    term.length > 0 ? setFilterIsActive(true) : setFilterIsActive(false);
    setFilteredCustomers(searchCustomers(term));
  };

  return (
    <div className="products-container">
      <h1 className="title">Gestion des clients</h1>

      {addMode ? (
        <>
          <AddCustomersForm handleReturn={toggleAddMode} />
        </>
      ) : (
        <>
          <Button onClick={toggleAddMode}>+ Ajouter un client</Button>
          <SearchProducts onInputChange={executeSearch} />
          <h2>Liste des clients</h2>
          {loading ? (
            <p>Chargement...</p>
          ) : error ? (
            <p>Erreur lors du chargement des données</p>
          ) : (filteredCustomers.length === 0 && filterIsactive) ||
            customers.length === 0 ? (
            <p>Aucun client trouvé</p>
          ) : (
            <>
              <CustomersList
                customers={filterIsactive ? filteredCustomers : customers}
              />
            </>
          )}
        </>
      )}
    </div>
  );
}
