"use client";

import Link from "next/link";
import Carregando from "@/components/Carregando";
import { useApp } from "@/context/AppContext";

export default function MatriculasPage() {
  const { alunos, disciplinas, matriculas, pronto } = useApp();

  return (
    <section className="area" data-area="matriculas">
      <div className="titulo-acoes">
        <h1>Matrículas</h1>
        <Link href="/matriculas/nova" className="botao">
          Nova matrícula
        </Link>
      </div>

      {!pronto ? (
        <Carregando />
      ) : (
        <>
          <p className="total">
            Total de matrículas: <strong>{matriculas.length}</strong>
          </p>
          {matriculas.length === 0 ? (
            <p className="aviso">Nenhuma matrícula cadastrada.</p>
          ) : (
            <div className="tabela-wrap">
              <table className="tabela">
                <thead>
                  <tr>
                    <th>RA</th>
                    <th>Aluno</th>
                    <th>Disciplina</th>
                  </tr>
                </thead>
                <tbody>
                  {matriculas.map((m) => {
                    const aluno = alunos.find((a) => a.ra === m.student_ra);
                    const disciplina = disciplinas.find(
                      (d) => d.id === m.course_id,
                    );
                    return (
                      <tr key={`${m.student_ra}-${m.course_id}`}>
                        <td>{m.student_ra}</td>
                        <td>{aluno?.name ?? "—"}</td>
                        <td>{disciplina?.name ?? "—"}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}
    </section>
  );
}
