"use client";

import Link from "next/link";
import "./styles.scss";
import {
  firebaseAuthCheck,
  firebaseAuthSignOut,
} from "@/core/auth/firebaseAuth";
import { useAuthStore } from "@/core/store/AuthStore";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCustomersStore } from "@/core/store/CustomersStore";
import { useProductsStore } from "@/core/store/Productstore";

export default function Header() {
  const router = useRouter();
  const { user, signOut, loadProfile } = useAuthStore();
  const { loadCustomers } = useCustomersStore();
  const { loadProducts } = useProductsStore();
  const handleSignOut = async () => {
    await signOut();
    router.push("/sign-in");
  };

  useEffect(() => {
    const fetchAuthState = async () => {
      const auth = await firebaseAuthCheck();
      console.log(auth);
      if (auth.uid) {
        await loadProfile(auth.uid);
        await loadCustomers(auth.uid);
        await loadProducts(auth.uid);
      }
    };
    fetchAuthState();
  }, [loadCustomers, loadProducts, loadProfile]);

  return (
    <header>
      <h1>Gestion de factures</h1>
      <div>
        {user ? (
          <p className="sign-out-link" onClick={handleSignOut}>
            Déconnexion
          </p>
        ) : (
          <Link href={"/sign-in"}>Connexion</Link>
        )}
      </div>
    </header>
  );
}
