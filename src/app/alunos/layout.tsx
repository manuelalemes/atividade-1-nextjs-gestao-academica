import { Suspense, type ReactNode } from "react";
import AlunosSidebar, {
  AlunosSidebarLinks,
} from "@/components/AlunosSidebar";

export default function AlunosLayout({ children }: { children: ReactNode }) {
  return (
    <div className="area alunos-layout" data-area="alunos">
      <Suspense fallback={<AlunosSidebarLinks pathname="" />}>
        <AlunosSidebar />
      </Suspense>
      <div className="conteudo">{children}</div>
    </div>
  );
}
