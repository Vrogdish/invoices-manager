import { NavLink } from "@/shared/interfaces/navlink.interface";
import Link from "next/link";

interface Props {
  items: NavLink;
  className?: string;
}

export default function Navlink({ items, className }: Props) {
  return (
    <Link href={items.href} className={`link ${className}`}>
      {items.label}
    </Link>
  );
}
