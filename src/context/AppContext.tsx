"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { alunos as alunosIniciais, type Aluno } from "@/data/alunos";
import { disciplinas, type Disciplina } from "@/data/disciplinas";
import {
  matriculas as matriculasIniciais,
  type Matricula,
} from "@/data/matriculas";

const STORAGE_KEY = "gestao-academica:v1";

export type Resultado = { ok: true } | { ok: false; erro: string };

type Armazenado = { alunos: Aluno[]; matriculas: Matricula[] };

type AppContextValue = {
  alunos: Aluno[];
  matriculas: Matricula[];
  /** Coleção fixa: nunca é alterada pela aplicação. */
  disciplinas: Disciplina[];
  /** true depois que o estado salvo no navegador foi lido. */
  pronto: boolean;
  cadastrarAluno: (ra: string, nome: string) => Resultado;
  cadastrarMatricula: (ra: number, disciplinaId: number) => Resultado;
};

const AppContext = createContext<AppContextValue | null>(null);

function lerArmazenamento(): Armazenado | null {
  try {
    const bruto = window.localStorage.getItem(STORAGE_KEY);
    if (!bruto) return null;
    const dados = JSON.parse(bruto);
    if (!Array.isArray(dados?.alunos) || !Array.isArray(dados?.matriculas)) {
      return null;
    }
    return {
      alunos: dados.alunos.filter(
        (a: Aluno) => typeof a?.ra === "number" && typeof a?.name === "string",
      ),
      matriculas: dados.matriculas.filter(
        (m: Matricula) =>
          typeof m?.student_ra === "number" && typeof m?.course_id === "number",
      ),
    };
  } catch {
    return null;
  }
}

/** Tenta salvar no navegador. Retorna a mensagem de erro ou null se deu certo. */
function gravarArmazenamento(dados: Armazenado): string | null {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(dados));
    return null;
  } catch {
    return "Não foi possível salvar o cadastro no navegador. Verifique se o armazenamento do navegador está disponível e tente novamente.";
  }
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [alunos, setAlunos] = useState<Aluno[]>(alunosIniciais);
  const [matriculas, setMatriculas] = useState<Matricula[]>(matriculasIniciais);
  const [pronto, setPronto] = useState(false);

  // Primeiro acesso: usa os arquivos de data/. Acessos seguintes: usa o que foi salvo.
  // localStorage só existe no navegador, então a leitura precisa acontecer em um efeito.
  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    const salvo = lerArmazenamento();
    if (salvo) {
      setAlunos(salvo.alunos);
      setMatriculas(salvo.matriculas);
    }
    setPronto(true);
  }, []);
  /* eslint-enable react-hooks/set-state-in-effect */

  const cadastrarAluno = useCallback(
    (raTexto: string, nomeTexto: string): Resultado => {
      const ra = raTexto.trim();
      const nome = nomeTexto.trim().replace(/\s+/g, " ");

      if (!ra) return { ok: false, erro: "Informe o RA do aluno." };
      if (!/^\d+$/.test(ra) || ra.length > 15) {
        return {
          ok: false,
          erro: "O RA deve conter apenas números (até 15 dígitos).",
        };
      }
      if (!nome) return { ok: false, erro: "Informe o nome completo do aluno." };
      if (nome.split(" ").length < 2) {
        return {
          ok: false,
          erro: "Informe o nome completo (nome e sobrenome).",
        };
      }

      const raNumero = Number(ra);
      if (alunos.some((a) => a.ra === raNumero)) {
        return { ok: false, erro: `Já existe um aluno cadastrado com o RA ${ra}.` };
      }

      const novosAlunos = [...alunos, { ra: raNumero, name: nome }];
      const erro = gravarArmazenamento({ alunos: novosAlunos, matriculas });
      if (erro) return { ok: false, erro };

      setAlunos(novosAlunos);
      return { ok: true };
    },
    [alunos, matriculas],
  );

  const cadastrarMatricula = useCallback(
    (ra: number, disciplinaId: number): Resultado => {
      if (!alunos.some((a) => a.ra === ra)) {
        return { ok: false, erro: "Selecione um aluno válido." };
      }
      if (!disciplinas.some((d) => d.id === disciplinaId)) {
        return { ok: false, erro: "Selecione uma disciplina válida." };
      }
      if (
        matriculas.some(
          (m) => m.student_ra === ra && m.course_id === disciplinaId,
        )
      ) {
        return {
          ok: false,
          erro: "Este aluno já está matriculado nesta disciplina.",
        };
      }

      const novasMatriculas = [
        ...matriculas,
        { student_ra: ra, course_id: disciplinaId },
      ];
      const erro = gravarArmazenamento({ alunos, matriculas: novasMatriculas });
      if (erro) return { ok: false, erro };

      setMatriculas(novasMatriculas);
      return { ok: true };
    },
    [alunos, matriculas],
  );

  const valor = useMemo(
    () => ({
      alunos,
      matriculas,
      disciplinas,
      pronto,
      cadastrarAluno,
      cadastrarMatricula,
    }),
    [alunos, matriculas, pronto, cadastrarAluno, cadastrarMatricula],
  );

  return <AppContext.Provider value={valor}>{children}</AppContext.Provider>;
}

export function useApp(): AppContextValue {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp deve ser usado dentro de <AppProvider>.");
  return ctx;
}
