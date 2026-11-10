"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { useApp } from "@/context/AppContext";
import Carregando from "./Carregando";

export default function MatriculaForm() {
  const router = useRouter();
  const { alunos, disciplinas, pronto, cadastrarMatricula } = useApp();
  const [ra, setRa] = useState("");
  const [disciplinaId, setDisciplinaId] = useState("");
  const [erro, setErro] = useState<string | null>(null);

  if (!pronto) return <Carregando />;

  function enviar(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!ra) {
      setErro("Selecione um aluno.");
      return;
    }
    if (!disciplinaId) {
      setErro("Selecione uma disciplina.");
      return;
    }

    const resultado = cadastrarMatricula(Number(ra), Number(disciplinaId));
    if (!resultado.ok) {
      setErro(resultado.erro);
      return;
    }

    router.push("/matriculas");
  }

  return (
    <form className="form" onSubmit={enviar} noValidate>
      {erro && (
        <p className="mensagem erro" role="alert">
          {erro}
        </p>
      )}

      <label htmlFor="aluno">Aluno</label>
      <select
        id="aluno"
        name="aluno"
        value={ra}
        onChange={(e) => setRa(e.target.value)}
      >
        <option value="">Selecione um aluno</option>
        {alunos.map((a) => (
          <option key={a.ra} value={a.ra}>
            {a.ra} – {a.name}
          </option>
        ))}
      </select>

      <label htmlFor="disciplina">Disciplina</label>
      <select
        id="disciplina"
        name="disciplina"
        value={disciplinaId}
        onChange={(e) => setDisciplinaId(e.target.value)}
      >
        <option value="">Selecione uma disciplina</option>
        {disciplinas.map((d) => (
          <option key={d.id} value={d.id}>
            {d.id} – {d.name}
          </option>
        ))}
      </select>

      <div className="form-acoes">
        <button type="submit" className="botao">
          Cadastrar
        </button>
        <Link href="/matriculas" className="link-voltar">
          Voltar para a listagem
        </Link>
      </div>
    </form>
  );
}
