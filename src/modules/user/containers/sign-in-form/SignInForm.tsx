"use client";

import Button from "@/shared/components/button/Button";
import { SubmitHandler, useForm } from "react-hook-form";
import { useAuthStore } from "@/core/store/AuthStore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import "./styles.scss";
import ResetPassword from "../../components/reset-password/ResetPassword";

interface Inputs {
  email: string;
  password: string;
}

export default function SignInForm() {
  const [showForgetPasssword, setShowForgetPasssword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const { signIn, user, error, loading } = useAuthStore();
  const router = useRouter();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    signIn(data.email, data.password);
  };

  useEffect(() => {
    if (user) {
      router.push("/profile");
    }
  }, [router, user]);

  return (
    <div className="sign-in">
      {showForgetPasssword ? (
        <ResetPassword onClose={()=>setShowForgetPasssword(false)} />
      ) : (
        <>
          <h2>Connexion</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="sign-in-form">
            <div className="form-control">
              <label htmlFor="sign-in-email">Email</label>
              <input
                type="email"
                id="sign-in-email"
                {...register("email", { required: true })}
                aria-invalid={errors.email ? "true" : "false"}
                placeholder={errors.email ? "Ce champ est obligatoire" : ""}
                className={errors.email ? "error" : ""}
              />
            </div>
            <div className="form-control">
              <label htmlFor="sign-in-password">Mot de passe</label>
              <input
                type="password"
                id="sign-in-password"
                {...register("password", { required: true })}
                aria-invalid={errors.password ? "true" : "false"}
                placeholder={errors.password ? "Ce champ est obligatoire" : ""}
                className={errors.password ? "error" : ""}
              />
            </div>
            <Button
              className="btn"
              type="submit"
              disabled={loading ? true : false}
            >
              {!loading ? "Se connecter" : "Chargement..."}
            </Button>
            <div className="error-message">
              {error && <p>Email ou mot de passe incorrect</p>}
            </div>
            <p className="forget" onClick={() => setShowForgetPasssword(true)}>
              Mot de passe oublié ?
            </p>
          </form>
        </>
      )}
    </div>
  );
}
