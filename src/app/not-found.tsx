import Link from "next/link";

export default function NotFound() {
  return (
    <section className="nao-encontrado">
      <h1>Endereço não encontrado</h1>
      <p>A página que você tentou acessar não existe.</p>
      <Link href="/" className="botao">
        Voltar ao início
      </Link>
    </section>
  );
}
