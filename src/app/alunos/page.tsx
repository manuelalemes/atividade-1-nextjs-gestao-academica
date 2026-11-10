"use client";

import Link from "next/link";
import Carregando from "@/components/Carregando";
import { useApp } from "@/context/AppContext";

export default function AlunosPage() {
  const { alunos, pronto } = useApp();

  return (
    <>
      <h1>Alunos</h1>
      {!pronto ? (
        <Carregando />
      ) : (
        <>
          <p className="total">
            Total de alunos: <strong>{alunos.length}</strong>
          </p>
          {alunos.length === 0 ? (
            <p className="aviso">Nenhum aluno cadastrado.</p>
          ) : (
            <ul className="lista">
              {alunos.map((aluno) => (
                <li key={aluno.ra}>
                  <Link href={`/alunos/${aluno.ra}`}>
                    <span className="lista-nome">{aluno.name}</span>
                    <span className="lista-ra">RA {aluno.ra}</span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </>
  );
}
