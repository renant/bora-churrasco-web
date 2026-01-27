# Checklist de Acessibilidade (A11y)

Use este checklist em PRs que mexem em UI, componentes, fluxos ou conteúdo.

## 1. Semantica e Landmarks
- Existe apenas um `<main>` por pagina.
- O layout possui skip link funcional (p. ex. "Pular para o conteudo").
- Estrutura de headings faz sentido (um `h1` principal e hierarquia coerente).

## 2. Teclado e Foco
- Todo controle interativo e alcancavel por Tab.
- Enter e Space acionam botoes e toggles.
- ESC fecha dialogos/sheets/modais.
- O foco fica visivel (focus ring claro e consistente).
- A ordem de foco acompanha a ordem visual/logica.

## 3. Nome, Papel e Estado
- Icon buttons possuem `aria-label`.
- Toggles usam `aria-pressed` (ou papel equivalente).
- Campos com erro usam `aria-invalid` e `aria-describedby`.

## 4. Feedback e Estados
- Mensagens importantes usam `aria-live="polite"` (ou `assertive` quando necessario).
- Estados de carregamento/sucesso/erro nao dependem apenas de cor.

## 5. Midia e Conteudo
- Imagens informativas possuem `alt` significativo.
- Imagens decorativas usam `alt=""`.
- Iframes possuem `title` descritivo.
- Links externos usam `rel="noopener noreferrer"` quando `target="_blank"`.

## 6. Contraste e Toque
- Texto e componentes tem contraste suficiente.
- Alvos de toque sao >= 44x44px (especialmente no mobile).

## Validacao Manual Rapida (fluxo principal)
Percorra por teclado (Tab/Shift+Tab/Enter/Espaco/ESC) o fluxo:
1. `/participantes`
2. `/assados`
3. `/bebidas`
4. `/tempo`
5. `/resultado`

Checar especialmente:
- Skip link vai para o conteudo.
- CheckButtons funcionam por teclado.
- Dialogo de recuperacao prende foco e fecha com ESC.
- Feedback de copia/compartilhar e anunciado por leitor de tela.
