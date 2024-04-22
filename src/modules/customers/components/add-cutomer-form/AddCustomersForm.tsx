"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import "./styles.scss";
import Button from "@/shared/components/button/Button";
import { CustomerFormInterface } from "@/core/interfaces/customer.interface";
import { useCustomersStore } from "@/core/store/CustomersStore";
import { useAuthStore } from "@/core/store/AuthStore";

interface Props {
  className?: string;
  handleReturn: () => void;
}

export default function AddCustomersForm({ className, handleReturn }: Props) {
  const { user } = useAuthStore();
  const { addCustomer } = useCustomersStore();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<CustomerFormInterface>();

  const onSubmit: SubmitHandler<CustomerFormInterface> = async (data) => {
    if (!user?.uid) return console.log("No user id found");
    data.userId = user.uid;
    await addCustomer(data);
    handleReturn();
  };

  return (
    <div className={`add-customer-form ${className}`}>
      <h2>Ajouter un client</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="product-form">
        <div className="form-control">
          <label htmlFor="customer-company">Entreprise :</label>
          <input type="text" id="customer-company" {...register("company")} />
        </div>
        <div className="form-control-row">
          <div className="form-control civility">
            <label htmlFor="customer-civility">Civilité :</label>
            <select id="customer-civility" {...register("civility")}>
              <option>-</option>
              <option value="M.">M.</option>
              <option value="Mme">Mme</option>
            </select>
          </div>
          <div className="form-control lastname">
            <label htmlFor="customer-lastname">Nom :</label>
            <input
              type="text"
              id="customer-lastname"
              {...register("lastname")}
            />
          </div>
        </div>
        <div className="form-control">
          <label htmlFor="customer-firstname">Prénom :</label>
          <input
            type="text"
            id="customer-firstname"
            {...register("firstname")}
          />
        </div>
        <div className="form-control">
          <label htmlFor="customer-email">Email :</label>
          <input type="email" id="customer-email" {...register("email")} />
        </div>
        <div className="form-control">
          <label htmlFor="customer-phone">Téléphone :</label>
          <input type="text" id="customer-phone" {...register("phone")} />
        </div>
        <div className="form-control">
          <label htmlFor="customer-address">Adresse :</label>
          <input type="text" id="customer-address" {...register("address")} />
        </div>
        <div className="form-control">
          <label htmlFor="customer-postal">Code postal :</label>
          <input type="text" id="customer-postal" {...register("postalCode")} />
        </div>
        <div className="form-control">
          <label htmlFor="customer-locality">Ville :</label>
          <input type="text" id="customer-locality" {...register("locality")} />
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
