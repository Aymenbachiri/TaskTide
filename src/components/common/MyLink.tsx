import Link, { type LinkProps } from "next/link";

interface MyLinkProps extends LinkProps {
  children: React.ReactNode;
  className?: string;
  target?: "_blank" | "_self" | "_parent" | "_top";
  rel?: string;
  onClick?: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
  passHref?: boolean;
}

export function MyLink({
  href,
  children,
  className,
  target,
  rel,
  onClick,
  passHref,
  ...rest
}: MyLinkProps) {
  return (
    <Link
      prefetch={true}
      href={href}
      className={className}
      rel={rel}
      target={target}
      onClick={onClick}
      passHref={passHref}
      {...rest}
    >
      {children}
    </Link>
  );
}
