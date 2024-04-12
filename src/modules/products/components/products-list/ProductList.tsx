"use client";

import { ProductInterface } from "../../../../core/interfaces/product.interface";
import Image from "next/image";
import "./styles.scss";
import { useProductsStore } from "@/core/store/Productstore";
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

interface Props {
  products: ProductInterface[];
  className?: string;
}

export default function ProductList({ products, className }: Props) {
  const { deleteProduct } = useProductsStore();

  const handleDelete = (product: ProductInterface) => async () => {
    await deleteProduct(product);
  };

  return (
    <div className={`products-list ${className}`}>
      <table>
        <thead>
          <tr>
            <th>Ref.</th>
            <th>Produit</th>
            <th>Prix</th>
            <th>Description</th>
            <th className="delete">Supprimer</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.reference}</td>
              <td>{product.name}</td>
              <td>{product.price.toFixed(2)} €</td>
              <td>{product.description}</td>
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
                        Etes vous sûr de vouloir supprimer ce produit ?
                      </DialogDescription>
                      <DialogClose asChild>
                        <div className="dialogClose">
                          <Button theme="cancel">NON</Button>
                          <Button type="submit" onClick={handleDelete(product)}>
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
