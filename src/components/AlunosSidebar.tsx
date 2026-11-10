"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function AlunosSidebarLinks({ pathname }: { pathname: string }) {
  const emCadastro = pathname === "/alunos/novo";

  return (
    <aside className="sidebar">
      <h2>Alunos</h2>
      <nav aria-label="Menu da área de alunos">
        <ul>
          <li>
            <Link
              href="/alunos"
              className={!emCadastro ? "ativo" : undefined}
              aria-current={!emCadastro ? "page" : undefined}
            >
              Listagem
            </Link>
          </li>
          <li>
            <Link
              href="/alunos/novo"
              className={emCadastro ? "ativo" : undefined}
              aria-current={emCadastro ? "page" : undefined}
            >
              Cadastrar aluno
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
}

export default function AlunosSidebar() {
  const pathname = usePathname();
  return <AlunosSidebarLinks pathname={pathname} />;
}
