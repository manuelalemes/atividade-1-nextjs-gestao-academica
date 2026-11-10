import Link from "next/link";

export default function Home() {
  return (
    <section className="home">
      <h1>Gestão Acadêmica</h1>
      <p className="lead">
        Sistema para consultar e cadastrar alunos e matrículas, além de
        consultar as disciplinas de um curso. Escolha uma área para começar.
      </p>

      <div className="home-links">
        <Link href="/alunos" className="home-card" data-area="alunos">
          <h2>Alunos</h2>
          <p>Consulte os alunos cadastrados e cadastre novos alunos.</p>
        </Link>
        <Link href="/disciplinas" className="home-card" data-area="disciplinas">
          <h2>Disciplinas</h2>
          <p>Consulte o catálogo de disciplinas do curso.</p>
        </Link>
        <Link href="/matriculas" className="home-card" data-area="matriculas">
          <h2>Matrículas</h2>
          <p>Consulte as matrículas e vincule alunos às disciplinas.</p>
        </Link>
      </div>
    </section>
  );
}
