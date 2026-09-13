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
- **Graciosa Roleplay** — banner dourado logo abaixo da Twitch/Kick, com a
  logo oficial (`graciosa-logo.png`), badge "PARCEIRO OFICIAL" e botões para
  Discord/Instagram da cidade.
- **Apoie o NATINHOX** — banner com a arte de doação/LivePix
  (`apoie-natinhox.png`) e CTA "Doar via LivePix".
- **Patrocinadores** — seção com aviso de que aceito parcerias/patrocínios e
  3 espaços vazios (`sponsor-slot`) reservados para logos de marcas
  parceiras. Para preencher um espaço, troque o `<div class="sponsor-slot">`
  correspondente em `index.html` por um `<a>` com a logo do patrocinador.

## Ícones de plataforma
Os ícones de TikTok, YouTube, Instagram, Discord e Twitch/Kick são SVGs
inline (path oficial da marca) da biblioteca
[Simple Icons](https://simpleicons.org/) (licença CC0). O ícone da Marvia
System usa o ícone `trending-up` da [Lucide](https://lucide.dev/) (licença
ISC). Kwai não tem ícone na Simple Icons, por isso mantém um monograma "K".

## Observações
- O `script.js` registra cliques somente no navegador do visitante via
  `localStorage`. Para analytics real, integre Plausible, Google Analytics,
  Meta Pixel ou solução própria.
- O botão "Compartilhar perfil" usa a Web Share API nativa (mobile) e cai
  para copiar o link via clipboard em navegadores desktop.
- "Adicionar à tela inicial" funciona tanto no Android/Chrome (via
  `manifest.json` + ícones PNG) quanto no iOS/Safari (via
  `icons/apple-touch-icon.png`, 180×180). Se trocar o logo, regenere os
  três PNGs em `icons/` a partir do novo `favicon.svg`.
- O indicador "AO VIVO" (bolinha do avatar + selo no card da Twitch) consulta
  `decapi.me` (serviço público e gratuito, sem login/token) para saber se o
  canal `natinhox` está ao vivo na Twitch. É a única chamada externa que o
  site faz — se o serviço cair, o indicador simplesmente some/mantém o
  estado "offline", sem quebrar a página. Não cobre a Kick (a API pública da
  Kick bloqueia chamadas de outros domínios via CORS).
