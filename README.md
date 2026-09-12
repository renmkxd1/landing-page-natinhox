# NATINHOX — Landing Page

Página estática pronta para substituir o Linktree.

## Arquivos
- `index.html`
- `styles.css`
- `script.js`
- `favicon.svg`
- `avatar-natinhox.png`

## Publicação em hospedagem compartilhada
Envie todos os arquivos para a pasta pública do domínio, normalmente:
- `public_html/`
- `www/`
- ou a pasta raiz configurada pelo provedor.

## Vercel / Netlify / Cloudflare Pages
Publique esta pasta como site estático. Não há build obrigatório.

## Personalização
### Foto/logo
O avatar já usa a foto `avatar-natinhox.png` (`.avatar img` no `styles.css`).
Para trocar a foto, basta substituir o arquivo mantendo o mesmo nome, ou
atualizar o `src` do `<img>` em `index.html`.

### Antes de publicar
- Troque `avatar-natinhox.png` nas tags `og:image`/`twitter:image` (em
  `index.html`) por uma URL absoluta (ex.: `https://seudominio.com/avatar-natinhox.png`)
  assim que o domínio final estiver definido — algumas redes (Discord, WhatsApp)
  não resolvem imagens relativas ao gerar o preview do link.
- Adicione uma tag `<link rel="canonical" href="https://seudominio.com/">`
  no `<head>` quando souber o domínio final.

## Links configurados
- Twitch: https://www.twitch.tv/natinhox
- Kick: https://kick.com/natinhox1
- TikTok: https://www.tiktok.com/@oficial_natinhox
- YouTube: https://youtube.com/@natinhox1
- Instagram: https://www.instagram.com/natinhox_/
- Discord NATINHOX: https://discord.gg/MXScyEtW
- LivePix: https://www.livepix.gg/natinhox
- Kwai: perfil Natinhox
- Graciosa Roleplay Discord: https://discord.gg/KwWGzyrzhn
- Graciosa Roleplay Instagram: https://www.instagram.com/graciosaroleplay/
- Marvia System: https://www.marviasistem.com.br/

## Observação
O `script.js` registra cliques somente no navegador do visitante via `localStorage`.
Para analytics real, integre Plausible, Google Analytics, Meta Pixel ou solução própria.
