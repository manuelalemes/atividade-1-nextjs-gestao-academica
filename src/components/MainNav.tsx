"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const itens = [
  { href: "/", rotulo: "Início", area: "inicio" },
  { href: "/alunos", rotulo: "Alunos", area: "alunos" },
  { href: "/disciplinas", rotulo: "Disciplinas", area: "disciplinas" },
  { href: "/matriculas", rotulo: "Matrículas", area: "matriculas" },
];

function estaAtivo(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function MainNavLinks({ pathname }: { pathname: string }) {
  return (
    <nav className="main-nav" aria-label="Navegação principal">
      <ul>
        {itens.map((item) => {
          const ativo = estaAtivo(pathname, item.href);
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                data-area={item.area}
                className={ativo ? "ativo" : undefined}
                aria-current={ativo ? "page" : undefined}
              >
                {item.rotulo}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export default function MainNav() {
  const pathname = usePathname();
  return <MainNavLinks pathname={pathname} />;
}
