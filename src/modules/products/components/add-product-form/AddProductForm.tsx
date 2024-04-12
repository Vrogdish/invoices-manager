"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import "./styles.scss";
import Button from "@/shared/components/button/Button";
import { useProductsStore } from "@/core/store/Productstore";
import { ProductFormInterface } from "@/core/interfaces/product.interface";
import { useAuthStore } from "@/core/store/AuthStore";

interface Props {
  className?: string;
  handleReturn: () => void;
}

export default function AddProductForm({ className, handleReturn }: Props) {
  const { addProduct } = useProductsStore();
  const { user } = useAuthStore();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ProductFormInterface>();

  const onSubmit: SubmitHandler<ProductFormInterface> = async (data) => {
    if (!user?.uid) return console.log("No user id found");
    data.price = Number(data.price);
    data.userId = user.uid;
    console.log(data);
    await addProduct(data);
    handleReturn();
  };

  return (
    <div className={`add-product-form ${className}`}>
      <h2>Ajouter un produit</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="product-form">
        <div className="form-control">
          <label htmlFor="reference">Reference :</label>
          <input type="text" id="reference" {...register("reference")} />
        </div>
        <div className="form-control">
          <label htmlFor="name">Nom :</label>
          <input type="text" id="name" {...register("name")} />
        </div>
        <div className="form-control">
          <label htmlFor="price">Prix :</label>
          <input type="number" {...register("price", { required: true })} />
        </div>
        <div className="form-control">
          <label htmlFor="description">Description :</label>
          <textarea id="description" {...register("description")} />
        </div>
        <div className="submit">
          <Button
            className="btn"
            theme="cancel"
            type="button"
            onClick={handleReturn}
          >
            Annuler
          </Button>
          <Button className="btn" type="submit">
            Ajouter
          </Button>
        </div>
      </form>
    </div>
  );
}
