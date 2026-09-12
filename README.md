# NATINHOX — Landing Page

Página estática pronta para substituir o Linktree.

**Ao vivo em:** https://renmkxd1.github.io/landing-page-natinhox/
(repositório: https://github.com/renmkxd1/landing-page-natinhox)

## Arquivos
- `index.html`
- `styles.css`
- `script.js`
- `favicon.svg`
- `avatar-natinhox.png`
- `manifest.json` — permite "Adicionar à tela inicial" (PWA) no Android/Chrome
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

## Observações
- O `script.js` registra cliques somente no navegador do visitante via
  `localStorage`. Para analytics real, integre Plausible, Google Analytics,
  Meta Pixel ou solução própria.
- O botão "Compartilhar perfil" usa a Web Share API nativa (mobile) e cai
  para copiar o link via clipboard em navegadores desktop.
- O `manifest.json` usa `favicon.svg` como ícone. Isso funciona para
  "Adicionar à tela inicial" no Android/Chrome, mas o iOS/Safari exige um
  PNG dedicado (`apple-touch-icon`, 180×180) que ainda não foi gerado —
  se quiser esse suporte no iPhone, gere um PNG a partir do `favicon.svg`
  e adicione `<link rel="apple-touch-icon" href="apple-touch-icon.png">`
  no `<head>`.
