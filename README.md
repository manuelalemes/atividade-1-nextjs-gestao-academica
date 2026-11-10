# Gestão Acadêmica

Atividade 1 – Rotas e navegação no Next.js · Laboratório de Desenvolvimento Web (Fatec)

Aplicação web para consultar e cadastrar alunos e matrículas e consultar as disciplinas de um curso.
Feita com Next.js (App Router), TypeScript e `src/`.

## Como executar

```bash
npm install
npm run dev
```

Acesse http://localhost:3000.

## Rotas

| Rota | Descrição |
| --- | --- |
| `/` | Página inicial |
| `/alunos` | Lista de alunos |
| `/alunos/[ra]` | Detalhes de um aluno pelo RA |
| `/alunos/novo` | Cadastro de aluno |
| `/disciplinas` | Catálogo de disciplinas (dados fixos) |
| `/matriculas` | Tabela de matrículas |
| `/matriculas/nova` | Cadastro de matrícula |

## Estado e persistência

- Alunos e matrículas ficam em um contexto React (`src/context/AppContext.tsx`), compartilhado entre as páginas.
- No primeiro acesso, os registros vêm dos arquivos de `src/data/`; os cadastros novos são salvos no `localStorage` do navegador.
- As disciplinas são uma coleção fixa. Se o cadastro não puder ser salvo, a aplicação mostra o erro e não conclui a operação.
- Sem banco de dados, API, autenticação ou escrita nos arquivos de `data/`.
