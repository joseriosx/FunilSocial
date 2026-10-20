# Funil Social: landing page do e-book

Site no ar em **[funilsocial.com.br](https://funilsocial.com.br)**.

O Funil Social é um projeto de extensão de Teresina-PI que ensina marketing digital para quem tem projetos locais. Para isso, montamos um funil de verdade, do post no Instagram até uma página de doação, e mostramos como cada etapa funciona. **A doação é simulada:** nada é cobrado e nenhum dado de pagamento é pedido.

Esta landing page é a **etapa 2 do funil**: ela oferece um presente útil (o e-book) e abre a conversa antes de qualquer pedido.

```
Post no Instagram → Landing do e-book (esta página) → E-mail e WhatsApp → Doação simulada → Agradecimento
```

## A isca: o e-book

**Prato Cheio Piauiense: 50 receitas da nossa terra.** Receitas do Piauí em 6 categorias, do café à sobremesa, feitas para ler no celular. As receitas com o selo "rende muito" servem 8 pessoas ou mais, ligando o e-book à causa do projeto: a fome e as famílias em situação de vulnerabilidade.

## As páginas

| Página | O que faz |
|--------|-----------|
| [`index.html`](index.html) | Apresenta o e-book e pede só o necessário para enviá-lo: nome e e-mail, ou uma mensagem no WhatsApp |
| [`obrigado.html`](obrigado.html) | Confirma o pedido pelo nome, libera o download e convida para o WhatsApp e o Instagram |
| [`doar.html`](doar.html) | Página de doação **simulada** (etapa 4), com teste A/B, PIX e cartão de demonstração |
| [`obrigado-doacao.html`](obrigado-doacao.html) | Agradece, mostra o que a doação viraria, indica um jeito real de ajudar e convida para o WhatsApp |
| [`privacidade.html`](privacidade.html) | Política de privacidade (LGPD): quais dados pedimos, para quê e como pedir para apagar |

## Como a página funciona

**Duas formas de receber.** A pessoa escolhe entre e-mail e WhatsApp. Pelo e-mail, preenche nome e e-mail e marca o consentimento; pelo WhatsApp, abre uma conversa com a mensagem já escrita.

**Consentimento claro.** O formulário só é enviado com a caixa de consentimento marcada, e o texto explica o que a pessoa vai receber e como cancelar. Um campo escondido barra robôs.

**Entrega na hora.** Depois do cadastro, a tela de obrigado chama a pessoa pelo nome e libera o download do e-book. Uma cópia também segue por e-mail.

**Métricas com permissão.** As métricas só começam depois que a pessoa aceita o aviso de cookies. Cada etapa importante vira um evento medido:

| Evento | Quando acontece |
|--------|-----------------|
| `page_view` | Abriu qualquer página |
| `generate_lead` | Pediu o e-book (por e-mail ou WhatsApp) |
| `file_download` | Baixou o e-book |
| `click_whatsapp` | Clicou em um botão de WhatsApp |
| `click_instagram` | Clicou para seguir no Instagram |
| `ab_view` | Abriu a página de doação (com a versão vista) |
| `select_item` | Escolheu marmita, cesta ou outro valor |
| `begin_checkout` | Clicou em "Quero doar": **é a métrica do teste A/B** |
| `add_payment_info` | Escolheu PIX ou cartão |
| `doacao_simulada` | Concluiu a doação simulada |

Todo evento das páginas de doação leva o parâmetro `variante` (`a` ou `b`).

## O teste A/B da doação

Só uma coisa muda entre as versões, para dar para saber o que fez diferença:

- **Versão A:** as opções mostram o valor em reais (R$ 15 marmita, R$ 90 cesta básica, outro valor a partir de R$ 5).
- **Versão B:** as opções mostram o que a doação vira (1 almoço quentinho, comida para uma família, "R$ 40 = 2 marmitas").

Cada pessoa cai numa versão por sorteio e vê sempre a mesma. Para abrir uma versão de propósito: `doar.html?v=a` ou `doar.html?v=b`. Ganha a versão com a maior taxa de `begin_checkout` ÷ `ab_view`.

## O que dá para aprender com ela

- **Isca digital:** oferecer algo de valor antes de pedir qualquer coisa.
- **Pedir pouco:** só nome e e-mail, ou nenhum dado no caminho do WhatsApp.
- **Transparência:** a página explica que é um projeto educativo e mostra em que ponto do funil a pessoa está.
- **Uma ação por tela:** o botão verde é sempre o próximo passo.
- **LGPD na prática:** consentimento explícito, política de privacidade e métricas só com permissão.
- **Medir para melhorar:** cada clique importante vira um número para comparar depois.

## Estrutura

```
index.html          landing do e-book
obrigado.html       tela depois do cadastro
doar.html           doação simulada com teste A/B
obrigado-doacao.html agradecimento depois da doação
privacidade.html    política de privacidade
CNAME               domínio funilsocial.com.br
assets/
  config.js         configuração central (contatos, links e integrações)
  tracking.js       aviso de cookies e eventos
  ab.js             sorteio da versão A/B da doação
  style.css         visual da página
  *.png / *.jpg     logo, ícone, capa do e-book e imagem de compartilhamento
ebook/
  prato-cheio-piauiense.pdf
```

Site estático, sem build: HTML, CSS e JavaScript puros, publicado pelo GitHub Pages.

## Identidade

- **Slogan:** Doações que chegam mais longe.
- **Cores:** off-white `#F4F1E9`, verde `#00C853`, preto `#000000`, cinza `#D8D8D8`
- **Fontes:** Archivo Black nos títulos, Inter no texto

---

🎓 Projeto educativo · Teresina-PI · [Instagram @funil.social](https://instagram.com/funil.social)
