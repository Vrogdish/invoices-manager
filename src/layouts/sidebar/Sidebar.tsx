"use client"

import "./styles.scss";
import { NavLink } from "@/shared/interfaces/navlink.interface";
import Navlink from "@/shared/components/navlink/Navlink";
import Button from "@/shared/components/button/Button";
import { useAuthStore } from "@/core/store/AuthStore";
import Link from "next/link";

export default function Sidebar() {
  const { user } = useAuthStore();
  const navLinksAuth: NavLink[] = [
    {
      href: "/products",
      label: "Mes produits",
    },
    {
      href: "/customers",
      label: "Mes clients",
    },
    {
      href: "/invoices",
      label: "Factures archivées",
    },
    {
      href: "/invoices",
      label: "Devis archivés",
    },
    {
      href: "/help",
      label: "Aide et contact",
    },
  ];

  const navLinksNoAuth: NavLink[] = [
    {
      href: "help",
      label: "Aide et contact",
    },
  ];
  return (
    <nav className="sidebar">
      <div className="content">
        {user ? (
          <>
            <div className="picture"></div>
            <p className="user">{user.firstName} {user.lastName}</p>
            <Link href="/invoice">
            <Button className="btn">+ Nouvelle facture</Button>
            </Link>
            <Button className="btn">+ Nouveau devis</Button>
            <div className="separator"></div>
            <ul>
              {navLinksAuth.map((item, index) => (
                <li key={index}>
                  <Navlink items={item} />
                </li>
              ))}
            </ul>
            <div className="separator"></div>
          </>
        ) : (
          <>
          <div className="picture"></div>
          <ul>
            {navLinksNoAuth.map((item, index) => (
              <li key={index}>
                <Navlink items={item} />
              </li>
            ))}
          </ul>
          <div className="separator"></div>
          </>
        )}
      </div>
    </nav>
  );
}
