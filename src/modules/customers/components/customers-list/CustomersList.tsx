"use client";

import Image from "next/image";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from "@radix-ui/react-dialog";
import Button from "@/shared/components/button/Button";
import { useCustomersStore } from "@/core/store/CustomersStore";
import { CustomerInterface } from "@/core/interfaces/customer.interface";
import "./styles.scss";

interface Props {
  customers: CustomerInterface[];
  className?: string;
}

export default function CustomersList({ customers, className }: Props) {
  const { deleteCustomer } = useCustomersStore();

  const handleDelete = (customer: CustomerInterface) => async () => {
    await deleteCustomer(customer);
  };

  return (
    <div className={`customers-list ${className}`}>
      <table>
        <thead>
          <tr>
            <th>Nom</th>
            <th>Prénom</th>
            <th>Adresse</th>
            <th>Ville</th>
            <th>Téléphone</th>
            <th className="delete">Supprimer</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <tr key={customer.id}>
              <td>{customer.lastname}</td>
              <td>{customer.firstname}</td>
              <td>{customer.address}</td>
              <td>{customer.locality}</td>
              <td>{customer.phone}</td>
              <td className="delete">
                <Dialog>
                  <DialogTrigger asChild>
                    <Image
                      src={"/icons/delete.png"}
                      alt="supprimer"
                      width={30}
                      height={30}
                    />
                  </DialogTrigger>
                  <DialogPortal>
                    <DialogOverlay className="DialogOverlay" />
                    <DialogContent className="DialogContent">
                      <DialogTitle className="DialogTitle">
                        Suppression
                      </DialogTitle>
                      <DialogDescription className="DialogDescription">
                        Etes vous sûr de vouloir supprimer ce client ?
                      </DialogDescription>
                      <DialogClose asChild>
                        <div className="dialogClose">
                          <Button theme="cancel">NON</Button>
                          <Button type="submit" onClick={handleDelete(customer)}>
                            OUI
                          </Button>
                        </div>
                      </DialogClose>
                    </DialogContent>
                  </DialogPortal>
                </Dialog>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
