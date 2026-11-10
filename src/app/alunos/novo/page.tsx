import type { Metadata } from "next";
import AlunoForm from "@/components/AlunoForm";

export const metadata: Metadata = { title: "Cadastrar aluno" };

export default function NovoAlunoPage() {
  return (
    <>
      <h1>Cadastrar aluno</h1>
      <AlunoForm />
    </>
  );
}
