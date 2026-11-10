import { Suspense } from "react";
import AlunoDetalhes from "@/components/AlunoDetalhes";
import Carregando from "@/components/Carregando";

async function Detalhes({ params }: { params: Promise<{ ra: string }> }) {
  const { ra } = await params;
  return <AlunoDetalhes ra={decodeURIComponent(ra)} />;
}

export default function AlunoDetalhesPage({
  params,
}: {
  params: Promise<{ ra: string }>;
}) {
  return (
    <Suspense fallback={<Carregando />}>
      <Detalhes params={params} />
    </Suspense>
  );
}
