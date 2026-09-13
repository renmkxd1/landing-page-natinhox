# NATINHOX — Landing Page

Página estática pronta para substituir o Linktree.

**Ao vivo em:** https://renmkxd1.github.io/landing-page-natinhox/
(repositório: https://github.com/renmkxd1/landing-page-natinhox)

## Arquivos
- `index.html`
- `styles.css`
- `script.js`
- `favicon.svg`
- `avatar-natinhox.png` (+ `.webp`) — foto de perfil
- `graciosa-logo.png` (+ `.webp`) — logo da Graciosa Roleplay (banner de destaque)
- `apoie-natinhox.png` (+ `.webp`) — arte de apoio/LivePix (banner "Apoie o NATINHOX")
- `og-banner.png` — imagem 1200×630 usada nas prévias de compartilhamento (WhatsApp/Twitter/Discord)
- `manifest.json` — permite "Adicionar à tela inicial" (PWA) no Android/Chrome/iOS
- `icons/` — apple-touch-icon.png (180×180) e ícones PNG do manifest (192/512), gerados a partir do `favicon.svg`
- `fonts/` — Inter e Orbitron auto-hospedadas (sem dependência do Google Fonts)
- `robots.txt` / `sitemap.xml` — SEO técnico

## Publicação (GitHub Pages)
O deploy já está configurado: qualquer `git push` para a branch `main` atualiza
o site automaticamente em https://renmkxd1.github.io/landing-page-natinhox/.

```bash
git add -A
git commit -m "sua mensagem"
git push
```

### Hospedagem compartilhada (alternativa)
Envie todos os arquivos (incluindo a pasta `fonts/`) para a pasta pública do
domínio, normalmente `public_html/`, `www/` ou a raiz configurada pelo provedor.

### Vercel / Netlify / Cloudflare Pages (alternativa)
Publique esta pasta como site estático. Não há build obrigatório.

## Personalização
### Foto/logo
O avatar já usa a foto `avatar-natinhox.png` (`.avatar img` no `styles.css`).
Para trocar a foto, basta substituir o arquivo mantendo o mesmo nome, ou
atualizar o `src` do `<img>` em `index.html`.

As três imagens principais (avatar, logo da Graciosa e arte de apoio) são
servidas via `<picture>` com uma versão `.webp` (menor) e fallback `.png`
para navegadores antigos. Ao trocar qualquer uma delas, gere também o
`.webp` correspondente (mesmo nome, extensão diferente) — por exemplo com
`cwebp arquivo.png -q 82 -o arquivo.webp` — senão o navegador some direto
para o `.png`, que é mais pesado.

### Se for trocar de domínio
As tags `og:url`, `og:image`, `twitter:image`, `<link rel="canonical">`, o
JSON-LD no `<head>` e o `Sitemap:` em `robots.txt`/`sitemap.xml` usam a URL
absoluta do GitHub Pages. Se registrar um domínio próprio, atualize essas
referências (`https://renmkxd1.github.io/landing-page-natinhox/` → seu domínio).
O player embutido da Twitch (ao vivo) não precisa de ajuste manual — ele lê
o domínio automaticamente (`location.hostname`) — mas só funciona no domínio
que estiver sendo servido no momento.

## Links configurados
- Twitch: https://www.twitch.tv/natinhox
- Kick: https://kick.com/natinhox1
- TikTok: https://www.tiktok.com/@oficial_natinhox
- YouTube: https://youtube.com/@natinhox1
- Instagram: https://www.instagram.com/natinhox_/
- Discord NATINHOX: https://discord.gg/thczBVge
- LivePix: https://www.livepix.gg/natinhox
- Kwai: perfil Natinhox
- Graciosa Roleplay Discord: https://discord.gg/KwWGzyrzhn
- Graciosa Roleplay Instagram: https://www.instagram.com/graciosaroleplay/
- Marvia System: https://www.marviasistem.com.br/

## Seções em destaque
- **Saudação personalizada**: o texto acima do nome muda com o horário de quem
  visita ("Bom dia" / "Boa tarde" / "Boa noite" / "Boa madrugada", calculado no
  navegador da pessoa) e reconhece quem já esteve na página antes ("bem-vindo
  de volta"), usando só `localStorage` local — nada é enviado a lugar nenhum.
- **Player ao vivo**: quando o NATINHOX está transmitindo na Twitch e/ou na
  Kick, a live correspondente aparece embutida logo abaixo dos cards de
  canais — sem precisar clicar em nada — junto com o número de espectadores
  em tempo real. Cada plataforma tem seu próprio card, selo "AO VIVO",
  contagem de seguidores e player, checados de forma independente.
- **Graciosa Roleplay** — banner dourado depois das redes sociais, com a
  logo oficial (`graciosa-logo.png`), badge "PARCEIRO OFICIAL" e botões para
  Discord/Instagram da cidade.
- **Apoie o NATINHOX** — banner com a arte de doação/LivePix
  (`apoie-natinhox.png`) e CTA "Doar via LivePix".
- **Parcerias**: convite direto com botão de contato pelo Discord, substituindo os espaços vazios de marcas.
- **Navegação**: topo compacto e atalhos que permanecem visíveis durante a rolagem. Canais primeiro, comunidade e redes em seguida, depois parceiro, apoio e projetos.
- **Redes**: Discord em destaque; demais redes em duas colunas no desktop e uma no celular, com descrições completas.
- **Compartilhamento**: disponível no rodapé, com os mesmos recursos de cópia e
  compartilhamento nativo, e uma pequena celebração animada (confete) quando o
  link é compartilhado ou copiado com sucesso — desativada automaticamente se
  os efeitos estiverem pausados ou o dispositivo preferir menos movimento.
- **Perguntas frequentes**: seção em acordeão (`<details>`/`<summary>`, sem JS) antes do
  rodapé, com atalho próprio na navegação rápida. As respostas também aparecem como
  `FAQPage` no JSON-LD do `<head>` para aparecer em resultados de busca do Google.

## Ícones de plataforma
Os ícones de TikTok, YouTube, Instagram, Discord e Twitch/Kick são SVGs
inline (path oficial da marca) da biblioteca
[Simple Icons](https://simpleicons.org/) (licença CC0). O ícone da Marvia
System usa o ícone `trending-up` da [Lucide](https://lucide.dev/) (licença
ISC). Kwai não tem ícone na Simple Icons, por isso mantém um monograma "K".

## Observações
- Analytics real via [GoatCounter](https://www.goatcounter.com/) (site
  `natinhox.goatcounter.com`): visualizações de página e cliques por link
  (Twitch, Kick, TikTok, YouTube, Instagram, Discord, Kwai, LivePix, Graciosa,
  Marvia System, botão de compartilhar). Sem cookies, sem banner de
  consentimento. Painel em https://natinhox.goatcounter.com/. Para adicionar
  rastreamento em um novo link, inclua `data-goatcounter-click="Nome"` no
  `<a>` correspondente em `index.html`.
- O botão "Compartilhar perfil" usa a Web Share API nativa (mobile) e cai
  para copiar o link via clipboard em navegadores desktop.
- "Adicionar à tela inicial" funciona tanto no Android/Chrome (via
  `manifest.json` + ícones PNG) quanto no iOS/Safari (via
  `icons/apple-touch-icon.png`, 180×180). Se trocar o logo, regenere os
  três PNGs em `icons/` a partir do novo `favicon.svg`.
- A bolinha "ao vivo" no avatar acende se **qualquer uma** das duas plataformas
  estiver ao vivo (Twitch ou Kick) — não é exclusiva da Twitch.
- O selo "AO VIVO" no card da Twitch consulta
  `decapi.me` (serviço público e gratuito, sem login/token) para saber se o
  canal `natinhox` está ao vivo na Twitch. O mesmo serviço também informa o
  número de seguidores da Twitch, exibido abaixo do status no card ("X
  seguidores na Twitch").
- O card da Kick tem o mesmo tratamento: selo "AO VIVO", espectadores e
  seguidores, consultando `kick.com/api/v2/channels/natinhox1` (API pública
  da própria Kick, sem login/token, que já responde com CORS liberado).
  Igual à Twitch, qualquer erro ou resposta inesperada mantém o texto neutro
  "Confira as lives no canal" — nunca assume "ao vivo" por engano.
- Quando a Kick está ao vivo, o player oficial (`player.kick.com`) também
  carrega embutido, com o mesmo comportamento do player da Twitch (silenciado
  por padrão, criado só quando a live é confirmada, removido quando termina
  ou a aba fica em segundo plano). Diferente da Twitch, o embed da Kick
  **não exige o parâmetro `parent`/domínio autorizado** — funciona em
  qualquer domínio sem ajuste, inclusive se você trocar de domínio no futuro.
- Quando a live está ativa, o jogo atual (`decapi.me/twitch/game/natinhox`)
  aparece no card da Twitch ("🎮 Jogando GTA V"), atualizado junto com o
  status a cada 60 segundos. Some automaticamente quando a live termina ou a
  consulta falha.
- Quando o status acima detecta a live ativa, o player oficial da Twitch
  (`player.twitch.tv`) é carregado embutido logo abaixo dos cards de canais,
  silenciado por padrão — quem chega na página já assiste sem precisar clicar
  em nada. O player usa o parâmetro `parent` com o domínio atual da página
  (`location.hostname`); **se o site for movido para outro domínio, o embed
  simplesmente não carrega até você atualizar isso** (veja "Se for trocar de
  domínio" acima — o mesmo cuidado se aplica aqui). O iframe só é criado
  quando a live é confirmada e é removido assim que ela termina ou a aba
  fica em segundo plano, para não gastar dados à toa. O número de
  espectadores (endpoint `decapi.me/twitch/viewercount/natinhox`) é
  atualizado junto com a checagem de status a cada 60 segundos.
- O banner da Graciosa Roleplay mostra membros e pessoas online em tempo real
  (ex.: "79 membros · 15 online"), via API pública e sem autenticação do
  Discord (`discord.com/api/v10/invites/<código>?with_counts=true`, mesmo
  código do convite usado no botão "Entrar no Discord"). Se o convite expirar
  ou o serviço falhar, o número simplesmente não aparece. Junto com a Twitch
  (`decapi.me`) e a Kick (`kick.com/api/v2`), são as únicas consultas
  externas que o site faz, além do analytics — todas falham em silêncio, sem
  quebrar a página.

## Melhorias de navegação e confiabilidade
- Atalhos para Lives, Redes, Graciosa RP, Apoie, Parcerias e FAQ, com acesso por teclado.
- Botão "Voltar ao topo" (canto inferior direito) aparece depois de rolar a página;
  usa `href="#top"` como link real (funciona sem JavaScript) e o JS (`effects.js`)
  só controla quando ele fica visível.
- Status Twitch e Kick atualizados a cada 60 segundos enquanto a página está
  visível, com limite de 8 segundos por consulta. Apenas uma resposta válida
  e explícita ativa o selo "AO VIVO"; erros HTTP, falhas de rede e respostas
  desconhecidas usam texto neutro em ambos os cards.
- Compartilhamento usa a URL canônica, sem parâmetros ou âncoras. Se a opção
  nativa falhar, tenta copiar; se a cópia falhar, exibe um campo selecionável.
  Cancelar o compartilhamento nativo encerra a ação normalmente.
- Feedback acessível, alvos de toque maiores e movimento reduzido também nas
  animações de pseudoelementos.

## Verificação local
Requer Node.js para os testes (nenhuma dependência adicional):

```bash
node --test tests/script.test.cjs
```

Para abrir a página via HTTP, na pasta do projeto:

```bash
python -m http.server 4173 --bind 127.0.0.1
```

Acesse http://127.0.0.1:4173. Os testes cobrem respostas da Twitch e caminhos
alternativos do compartilhamento; não comprovam disponibilidade dos perfis externos.
## Acabamento premium
- `premium.css`: painel de perfil, acabamento dos cards, luz ambiente e ajustes responsivos.
- `effects.js`: luz seguindo o cursor em dispositivos com mouse, entrada suave das
  seções e indicação da seção atual no menu. Sem bibliotecas adicionais.
- O botão no topo permite pausar os efeitos. A preferência de movimento reduzido
  do dispositivo é respeitada automaticamente. O conteúdo permanece visível sem JavaScript.
- Ao publicar, envie também `premium.css` e `effects.js` junto aos arquivos existentes.
