"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { useApp } from "@/context/AppContext";

export default function AlunoForm() {
  const { cadastrarAluno } = useApp();
  const [ra, setRa] = useState("");
  const [nome, setNome] = useState("");
  const [erro, setErro] = useState<string | null>(null);
  const [cadastrado, setCadastrado] = useState<string | null>(null);

  function enviar(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setCadastrado(null);

    const resultado = cadastrarAluno(ra, nome);
    if (!resultado.ok) {
      setErro(resultado.erro);
      return;
    }

    setErro(null);
    setCadastrado(ra.trim());
    setRa("");
    setNome("");
  }

  return (
    <form className="form" onSubmit={enviar} noValidate>
      {erro && (
        <p className="mensagem erro" role="alert">
          {erro}
        </p>
      )}
      {cadastrado && (
        <p className="mensagem sucesso" role="status">
          Aluno cadastrado com sucesso.{" "}
          <Link href={`/alunos/${Number(cadastrado)}`}>Ver detalhes</Link>
        </p>
      )}

      <label htmlFor="ra">RA</label>
      <input
        id="ra"
        name="ra"
        type="text"
        inputMode="numeric"
        autoComplete="off"
        value={ra}
        onChange={(e) => setRa(e.target.value)}
      />

      <label htmlFor="nome">Nome completo</label>
      <input
        id="nome"
        name="nome"
        type="text"
        autoComplete="off"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
      />

      <div className="form-acoes">
        <button type="submit" className="botao">
          Cadastrar
        </button>
        <Link href="/alunos" className="link-voltar">
          Voltar para a listagem
        </Link>
      </div>
    </form>
  );
}
