import type { Metadata } from "next";
import { disciplinas } from "@/data/disciplinas";

export const metadata: Metadata = { title: "Disciplinas" };

export default function DisciplinasPage() {
  return (
    <section className="area" data-area="disciplinas">
      <h1>Disciplinas</h1>
      <p className="total">
        Total de disciplinas: <strong>{disciplinas.length}</strong>
      </p>
      <ul className="cartoes">
        {disciplinas.map((d) => (
          <li key={d.id} className="cartao">
            <span className="cartao-id">{d.id}</span>
            <span className="cartao-nome">{d.name}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
