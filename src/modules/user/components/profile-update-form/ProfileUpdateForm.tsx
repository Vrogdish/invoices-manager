import React from "react";
import "./styles.scss";
import { useAuthStore } from "@/core/store/AuthStore";
import { UserProfileFormInterface } from "@/core/interfaces/userProfile.interface";
import { SubmitHandler, useForm } from "react-hook-form";
import Button from "@/shared/components/button/Button";
import { update } from "firebase/database";

interface Props {
  closeEditor: () => void;
}

export default function ProfileUpdateForm({ closeEditor }: Props) {
  const { user, udpateProfile } = useAuthStore();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<UserProfileFormInterface>();

  const handleClose = () => {
    closeEditor();
  };

  const onSubmit: SubmitHandler<UserProfileFormInterface> = async (data) => {
    await udpateProfile(data);
    handleClose();
    console.log(data);
  };

  return (
    <form className="update-card" onSubmit={handleSubmit(onSubmit)}>
      <div className="item">
        <label>Entreprise :</label>
        <input
          type="text"
          defaultValue={user?.company}
          {...register("company")}
        />
      </div>
      <div className="item">
        <label>Civilité :</label>
        <select {...register("civility")} defaultValue={user?.civility}>
          <option value="M">M.</option>
          <option value="Mme">Mme</option>
        </select>
      </div>
      <div className="item">
        <label>Nom :</label>
        <input
          type="text"
          defaultValue={user?.lastName}
          {...register("lastName")}
        />
      </div>
      <div className="item">
        <label>Prénom :</label>
        <input
          type="text"
          defaultValue={user?.firstName}
          {...register("firstName")}
        />
      </div>
      <div className="item">
        <label>Téléphone :</label>
        <input
          type="text"
          defaultValue={user?.phoneNumber}
          {...register("phoneNumber")}
        />
      </div>
      <div className="item">
        <label>Adresse :</label>
        <input
          type="text"
          defaultValue={user?.address}
          {...register("address")}
        />
      </div>
      <div className="item">
        <label>Ville :</label>
        <input type="text" defaultValue={user?.city} {...register("city")} />
      </div>
      <div className="item">
        <label>Code postal :</label>
        <input
          type="text"
          defaultValue={user?.postalCode}
          {...register("postalCode")}
        />
      </div>
      <div className="item">
        <label>Pays :</label>
        <input
          type="text"
          defaultValue={user?.country}
          {...register("country")}
        />
      </div>
       <div className="form-btn">
        <Button
          theme="cancel"
          className="btn"
          type="button"
          onClick={handleClose}
        >
          Annuler
        </Button>
        <Button className="btn" type="submit">
          Enregistrer
        </Button>
      </div>
    </form>
  );
}
