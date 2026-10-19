# Site do Funil-Social: landing de captura

Páginas prontas para subir no GitHub Pages em **funilsocial.com.br**.

| Arquivo | O que é |
|---------|---------|
| `index.html` | Landing de captura: e-book grátis por e-mail (Brevo) ou WhatsApp |
| `obrigado.html` | Tela depois do cadastro: baixar o e-book, entrar no WhatsApp, seguir no Instagram |
| `privacidade.html` | Política de privacidade (LGPD) |
| `assets/config.js` | **O único arquivo que você precisa editar** (Brevo, GA4, pixel) |
| `assets/tracking.js` | Aviso de cookies + GA4 + pixel (só carregam se a pessoa aceitar) |
| `ebook/prato-cheio-piauiense.pdf` | Cópia do e-book |
| `CNAME` | Domínio funilsocial.com.br para o GitHub Pages |

Sem configurar nada, o site já funciona em "modo demo": o formulário leva para a tela de obrigado, mas não salva o contato.

---

## Passo a passo (José)

### 1. Brevo: formulário e e-mail de boas-vindas
> Menus conferidos na central de ajuda do Brevo em 19/10/2026. Os formulários ficam em **Marketing**, não em Contatos.

**Formulário**
1. Confira em **Contatos > Configurações > Atributos** se existe o atributo `NOME` (já vem pronto na conta em português).
2. Vá em **Marketing > Formulários** (*Forms*), na aba **Inscrição** (*Sign-up*), e clique em **Criar formulário de inscrição** > **Página inteira / cartão incorporado**.
3. **Configuração:** dê o nome `Funil Social - e-book` e pode ativar os campos de GDPR/consentimento.
4. **Design:** deixe os campos **E-mail** e **Nome** (atributo `NOME`). **Não adicione Captcha**, porque o formulário do nosso site é próprio e o Captcha bloqueia o envio.
5. **Listas:** crie ali mesmo a lista `Leads e-book` e selecione ela.
6. **Confirmação:** escolha **Sem confirmação**. Quem entrega o e-book é a automação abaixo, então assim a pessoa não recebe dois e-mails.
7. **Mensagens:** pode deixar o padrão, porque o nosso site mostra a própria tela de obrigado.
8. **Compartilhar:** escolha **HTML simples** (*Simple HTML*) e procure no código `action="https://....sibforms.com/serve/...."`. Copie esse endereço para `BREVO_FORM_ACTION` no `assets/config.js`, ou mande para o Claude.
9. Clique em **Concluído** (*Done*). Sem isso o formulário não é salvo.

**E-mail de boas-vindas (automação)**
1. Vá em **Automações > Fluxos de trabalho** (*Automations > Workflows*) e clique em **Criar uma automação**.
2. Escolha o modelo pronto **Mensagem de boas-vindas** (*Welcome message*), em português, e clique em **Criar automação**.
3. **Passo 1 (gatilho):** em **Lista**, selecione `Leads e-book`.
4. **Passo 2:** apague o **Atraso** (*Time delay*) para o e-mail sair na hora.
5. **Passo 3 (e-mail):** edite o modelo com o texto de [`../03-email-boas-vindas.md`](../03-email-boas-vindas.md), com o nome em `{{ contact.NOME }}`. Preencha assunto, pré-cabeçalho e remetente, e clique em **Salvar**.
6. Clique em **Ativar automação**. Só quem entrar na lista depois disso recebe o e-mail.
7. Teste: preencha o formulário do site com o seu e-mail e veja se chega.

### 2. Google Analytics 4
Crie a propriedade e o fluxo de dados Web para `funilsocial.com.br`. Copie o ID `G-XXXXXXXXXX` para `GA4_ID`.
Depois, em **Admin > Eventos**, marque `generate_lead` como **evento principal (conversão)**.

### 3. Pixel da Meta (pulado)
Decidimos não usar, porque o projeto não roda anúncios. Deixe `META_PIXEL_ID` vazio.

### 4. GitHub Pages com o domínio
1. Crie um repositório público, por exemplo `funil-social`, e suba **todo o conteúdo desta pasta** (`site/`) na raiz.
2. **Settings > Pages:** Source = branch `main`, pasta `/ (root)`. Em **Custom domain**, coloque `funilsocial.com.br` e marque **Enforce HTTPS** quando liberar.
3. No painel onde o domínio foi registrado (Registro.br), crie os registros DNS:
   - `A` para `@` apontando para `185.199.108.153`, `185.199.109.153`, `185.199.110.153` e `185.199.111.153`
   - `CNAME` para `www` apontando para `SEU-USUARIO.github.io`
4. O DNS pode levar algumas horas. Enquanto isso, o site já abre em `SEU-USUARIO.github.io/funil-social`.

### 5. Antes de divulgar
- [ ] Trocar `[E-MAIL DE CONTATO]` em `privacidade.html` pelo e-mail do projeto
- [ ] Se o e-book mudar, copiar o PDF novo para `ebook/prato-cheio-piauiense.pdf`
- [ ] Testar no celular: cadastro por e-mail, e-mail chegando, download, botão do WhatsApp
- [ ] Conferir no GA4 > Tempo real se `generate_lead` aparece

## Eventos medidos

| Evento GA4 | Pixel | Quando |
|------------|-------|--------|
| `page_view` | `PageView` | Abriu qualquer página |
| `generate_lead` (method: email ou whatsapp) | `Lead` | Pediu o e-book |
| `file_download` | – | Clicou em baixar o e-book |
| `click_whatsapp` | `Contact` | Clicou em qualquer botão de WhatsApp |
| `click_instagram` | – | Clicou para seguir no Instagram |
