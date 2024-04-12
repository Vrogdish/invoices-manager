import SignInForm from "@/modules/user/containers/sign-in-form/SignInForm";
import Button from "@/shared/components/button/Button";
import Link from "next/link";
import React from "react";
import "./styles.scss";

export default function page() {
  return (
    <main>
      <SignInForm />
      <div className="no-account">
        <h2>Vous n&apos;avez pas encore de compte ?</h2>
        <Link href={"/sign-up"}>
          <Button>Créer un compte</Button>
        </Link>
      </div>
    </main>
  );
}
