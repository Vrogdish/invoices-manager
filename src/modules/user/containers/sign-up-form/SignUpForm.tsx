"use client";
import React, { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import "./styles.scss";
import Button from "@/shared/components/button/Button";
import { useAuthStore } from "@/core/store/AuthStore";
import { useRouter } from "next/navigation";
import { CivilityEnum, UserProfileInterface } from "@/core/interfaces/userProfile.interface";

type Inputs = {
  user: UserProfileInterface;
  password: string;
};

export default function SignUpForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const { signUp, user } = useAuthStore();
  const router = useRouter();
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    signUp(data.user, data.password);
    router.push("/");
  };

  useEffect(() => {
    if (user) {
      router.push("/profile");
    }
  }, [router, user]);

  return (
    <div className="sign-up">
      <h2>Création de compte</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="sign-up-form">
        <div className="form-control">
          <label htmlFor="company">Société :</label>
          <input type="text" id="company" {...register("user.company")} />
        </div>
        <div className="form-control">
          <label htmlFor="civility">Civilité :</label>
          <select id="civility" {...register("user.civility")}>
            <option value={CivilityEnum.man}>Monsieur</option>
            <option value={CivilityEnum.woman}>Madame</option>
          </select>
        </div>

        <div className="form-control">
          <label htmlFor="lastname">Nom :</label>
          <input type="text" id="lastname" {...register("user.lastName")} />
        </div>
        <div className="form-control">
          <label htmlFor="firstname">Prénom :</label>
          <input type="text" id="firstname" {...register("user.firstName")} />
        </div>
        <div className="form-control">
          <label htmlFor="email">Email :</label>
          <input type="email" id="email" {...register("user.email")} />
        </div>
        <div className="form-control">
          <label htmlFor="password">Mot de passe :</label>
          <input type="password" id="password" {...register("password")} />
        </div>
        <div className="submit">
          <Button theme="cancel" type="button" className="btn">
            Annuler
          </Button>
          <Button className="btn" type="submit">
            Créer un compte
          </Button>
        </div>
      </form>
    </div>
  );
}
