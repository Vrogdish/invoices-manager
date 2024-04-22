import { NavLink } from "@/shared/interfaces/navlink.interface";
import Link from "next/link";
import { usePathname } from "next/navigation";
import "./styles.scss";

interface Props {
  items: NavLink;
  className?: string;
}

export default function Navlink({ items, className }: Props) {
  const pathname = usePathname();
  return (
    <Link
      href={items.href}
      className={`link ${className} ${pathname === items.href ? "active-link" : ""}`}
    >
      {items.label}
    </Link>
  );
}
