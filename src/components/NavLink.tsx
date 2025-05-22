"use client";

import { usePathname } from "next/navigation";
import Link, { LinkProps } from "next/link";
import { FC, HTMLAttributes, ReactNode } from "react";
import { clsx } from "clsx";

// Define NavLink props by extending LinkProps and HTMLAttributes
type NavLinkProps = Omit<LinkProps, "href"> &
  Omit<HTMLAttributes<HTMLAnchorElement>, "href"> & {
    href: string;
    exact?: boolean;
    children: ReactNode;
    className?: string | ((props: { isActive: boolean }) => string);
  };

const NavLink: FC<NavLinkProps> = ({
  href,
  exact = false,
  children,
  className = "",
  ...props
}) => {
  const pathname = usePathname();
  const isActive = exact ? pathname === href : pathname.startsWith(href);

  const computedClassName =
    typeof className === "function" ? clsx({ isActive }) : className;

  return (
    <Link href={href} className={computedClassName} {...props}>
      {children}
    </Link>
  );
};

export default NavLink;
