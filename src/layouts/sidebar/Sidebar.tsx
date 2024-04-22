"use client";

import "./styles.scss";
import { NavLink } from "@/shared/interfaces/navlink.interface";
import Navlink from "@/shared/components/navlink/Navlink";
import Button from "@/shared/components/button/Button";
import { useAuthStore } from "@/core/store/AuthStore";
import Link from "next/link";
import Image from "next/image";
import {
  DocumentTypeEnum,
  useInvoiceCreatorStore,
} from "@/core/store/InvoiceCreatorStore";

export default function Sidebar() {
  const { user } = useAuthStore();
  const { setDocumentType } = useInvoiceCreatorStore();
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
            <Link href="/profile">
              <div className="picture">
                <Image
                  src={user.imageUrl || "/icons/user.jpg"}
                  alt="user"
                  fill
                  className="user-image"
                />
              </div>

              <p className="user">
                {user.firstName} {user.lastName}
              </p>
            </Link>
            <Link
              href="/invoice"
              onClick={() => setDocumentType(DocumentTypeEnum.INVOICE)}
            >
              <Button className="btn">+ Nouvelle facture</Button>
            </Link>
            <Link
              href="/invoice"
              onClick={() => setDocumentType(DocumentTypeEnum.ESTIMATE)}
            >
              <Button className="btn">+ Nouveau devis</Button>
            </Link>
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
