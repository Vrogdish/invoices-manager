"use client"

import { firebaseResetPassword } from "@/core/auth/firebaseAuth";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import "./styles.scss";
import Button from "@/shared/components/button/Button";
import { Dialog, DialogTrigger, DialogPortal, DialogOverlay, DialogContent, DialogTitle, DialogDescription, DialogClose } from "@radix-ui/react-dialog";

interface Inputs {
  email: string;
}

interface Props {
  onClose: () => void;
}

export default function ResetPassword({ onClose }: Props) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data: Inputs) => {
    firebaseResetPassword(data.email);
    setIsDialogOpen(true);
    console.log(data);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    onClose();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="forget-form">
      <h2>Réinitialisation du mot de passe</h2>
      <div className="form-control">
        <label htmlFor="reset-password-email">Adresse email </label>
        <input
          type="email"
          id="reset-password-email"
          {...register("email", { required: true })}
          aria-invalid={errors.email ? "true" : "false"}
          placeholder={errors.email ? "Ce champ est obligatoire" : ""}
          className={errors.email ? "error" : ""}
        />
      </div>
      <Dialog open={isValid && isDialogOpen}>
        <DialogTrigger asChild>
            <button type="submit">Envoyer</button>
        </DialogTrigger>
        <DialogPortal>
          <DialogOverlay className="DialogOverlay" />
          <DialogContent className="DialogContent">
            <DialogTitle className="DialogTitle">Réinitialisation du mot de passe</DialogTitle>
            <DialogDescription className="DialogDescription">
              Un Email de réinitialisation de mot de passe a été envoyé à votre adresse email
            </DialogDescription>
            <DialogClose asChild>
              <div className="dialogClose">
                <Button onClick={closeDialog} >OK</Button>
                </div>
            </DialogClose>
          </DialogContent>
        </DialogPortal>
      </Dialog>
    </form>
  );
}
