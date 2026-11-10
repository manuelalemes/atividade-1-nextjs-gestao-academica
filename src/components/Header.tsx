import Link from "next/link";
import { Suspense } from "react";
import MainNav, { MainNavLinks } from "./MainNav";

export default function Header() {
  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link href="/" className="brand">
          Gestão Acadêmica
        </Link>
        <Suspense fallback={<MainNavLinks pathname="" />}>
          <MainNav />
        </Suspense>
      </div>
    </header>
  );
}
