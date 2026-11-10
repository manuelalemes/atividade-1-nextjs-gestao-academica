"use client";

import Link from "next/link";
import Carregando from "@/components/Carregando";
import { useApp } from "@/context/AppContext";

export default function AlunoDetalhes({ ra }: { ra: string }) {
  const { alunos, matriculas, disciplinas, pronto } = useApp();

  if (!pronto) {
    return (
      <>
        <h1>Detalhes do aluno</h1>
        <Carregando />
      </>
    );
  }

  const aluno = alunos.find((a) => String(a.ra) === ra);

  if (!aluno) {
    return (
      <>
        <h1>Aluno não encontrado</h1>
        <p className="mensagem erro" role="alert">
          Não existe aluno cadastrado com o RA {ra}.
        </p>
        <Link href="/alunos" className="link-voltar">
          Voltar para a listagem
        </Link>
      </>
    );
  }

  const cursadas = matriculas
    .filter((m) => m.student_ra === aluno.ra)
    .map((m) => disciplinas.find((d) => d.id === m.course_id))
    .filter((d) => d !== undefined);

  return (
    <>
      <h1>Detalhes do aluno</h1>
      <dl className="detalhes">
        <dt>RA</dt>
        <dd>{aluno.ra}</dd>
        <dt>Nome completo</dt>
        <dd>{aluno.name}</dd>
        <dt>Disciplinas matriculadas</dt>
        <dd>
          {cursadas.length === 0 ? (
            "Nenhuma matrícula."
          ) : (
            <ul>
              {cursadas.map((d) => (
                <li key={d.id}>{d.name}</li>
              ))}
            </ul>
          )}
        </dd>
      </dl>
      <Link href="/alunos" className="link-voltar">
        Voltar para a listagem
      </Link>
    </>
  );
}
