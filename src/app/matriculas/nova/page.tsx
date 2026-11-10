import type { Metadata } from "next";
import MatriculaForm from "@/components/MatriculaForm";

export const metadata: Metadata = { title: "Nova matrícula" };

export default function NovaMatriculaPage() {
  return (
    <section className="area" data-area="matriculas">
      <h1>Nova matrícula</h1>
      <MatriculaForm />
    </section>
  );
}
