const year = document.getElementById("year");
if (year) year.textContent = new Date().getFullYear();

(function personalizeGreeting() {
  const el = document.getElementById("greeting");
  if (!el) return;
  const hour = new Date().getHours();
  const timeGreeting = hour < 6 ? "Boa madrugada"
    : hour < 12 ? "Bom dia"
    : hour < 18 ? "Boa tarde"
    : "Boa noite";
  let returning = false;
  try {
    returning = localStorage.getItem("natinhox_visited") === "1";
    localStorage.setItem("natinhox_visited", "1");
  } catch {}
  el.textContent = returning
    ? `${timeGreeting}, bem-vindo de volta`
    : `${timeGreeting}, bem-vindo ao meu universo`;
})();

function celebrate(originEl) {
  if (!originEl || typeof originEl.animate !== "function") return;
  if (typeof matchMedia === "function" && matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  if (document.documentElement?.dataset.effects === "off") return;
  const rect = originEl.getBoundingClientRect();
  const originX = rect.left + rect.width / 2;
  const originY = rect.top + rect.height / 2;
  const colors = ["#3ee7ff", "#8b5cf6", "#53fc18", "#f2b705"];
  for (let i = 0; i < 10; i++) {
    const dot = document.createElement("span");
    dot.className = "confetti-dot";
    dot.setAttribute("aria-hidden", "true");
    dot.style.background = colors[i % colors.length];
    dot.style.left = `${originX}px`;
    dot.style.top = `${originY}px`;
    document.body.appendChild(dot);
    const angle = (Math.PI * 2 * i) / 10;
    const distance = 60 + Math.random() * 40;
    const x = Math.cos(angle) * distance;
    const y = Math.sin(angle) * distance;
    const animation = dot.animate([
      { transform: "translate(-50%,-50%) scale(1)", opacity: 1 },
      { transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) scale(0)`, opacity: 0 }
    ], { duration: 700 + Math.random() * 300, easing: "cubic-bezier(.2,.7,.2,1)" });
    animation.onfinish = () => dot.remove();
  }
}

const liveDot = document.getElementById("statusDot");
const liveOnPlatform = { twitch: false, kick: false };
function updateLiveDot() {
  liveDot?.classList.toggle("is-live", liveOnPlatform.twitch || liveOnPlatform.kick);
}

(function watchTwitchLive() {
  const badge = document.getElementById("twitchLiveBadge");
  const status = document.getElementById("liveStatus");
  const embedWrap = document.getElementById("liveEmbed");
  const embedFrame = document.getElementById("liveEmbedFrame");
  const viewerCount = document.getElementById("liveViewerCount");
  const gameEl = document.getElementById("liveGame");
  if (!liveDot && !badge && !status) return;
  let pending = false;

  function updateGame() {
    if (!gameEl) return;
    fetch("https://decapi.me/twitch/game/natinhox", { cache: "no-store" })
      .then(response => response.ok ? response.text() : Promise.reject())
      .then(text => {
        const game = text.trim();
        if (!game || /^natinhox is offline\.?$/i.test(game)) { gameEl.hidden = true; return; }
        gameEl.textContent = `🎮 Jogando ${game}`;
        gameEl.hidden = false;
      })
      .catch(() => { gameEl.hidden = true; });
  }

  function updateViewerCount() {
    if (!viewerCount) return;
    fetch("https://decapi.me/twitch/viewercount/natinhox", { cache: "no-store" })
      .then(response => response.ok ? response.text() : Promise.reject())
      .then(text => {
        const count = Number(text.trim());
        viewerCount.textContent = Number.isInteger(count) && count >= 0
          ? ` \u00b7 ${count.toLocaleString("pt-BR")} espectadores`
          : "";
      })
      .catch(() => { viewerCount.textContent = ""; });
  }

  function render(state) {
    const live = state === "live";
    liveOnPlatform.twitch = live;
    updateLiveDot();
    badge?.classList.toggle("show", live);
    if (status) status.textContent = live
      ? "Ao vivo agora na Twitch"
      : state === "offline" ? "Offline agora \u00b7 veja as lives anteriores" : "Confira as lives no canal";
    if (embedWrap && embedFrame) {
      if (live && !embedFrame.src) {
        const parent = encodeURIComponent(location.hostname || "renmkxd1.github.io");
        embedFrame.src = `https://player.twitch.tv/?channel=natinhox&parent=${parent}&muted=true`;
      } else if (!live && embedFrame.src) {
        embedFrame.src = "";
      }
      embedWrap.hidden = !live;
    }
    if (live) {
      updateViewerCount();
      updateGame();
    } else {
      if (viewerCount) viewerCount.textContent = "";
      if (gameEl) gameEl.hidden = true;
    }
  }

  async function check({ skipIfHidden = false } = {}) {
    if (pending || (skipIfHidden && document.hidden)) return;
    pending = true;
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);
    try {
      const response = await fetch("https://decapi.me/twitch/uptime/natinhox", {
        cache: "no-store", signal: controller.signal
      });
      if (!response.ok) throw new Error("Status unavailable");
      const text = (await response.text()).trim();
      // Only a duration is positive evidence; API errors must never imply live.
      const duration = /^\d+ (?:years?|months?|weeks?|days?|hours?|minutes?|seconds?)(?:,? \d+ (?:years?|months?|weeks?|days?|hours?|minutes?|seconds?))*$/i;
      render(duration.test(text) ? "live" : /^natinhox is offline\.?$/i.test(text) ? "offline" : "unknown");
    } catch {
      render("unknown");
    } finally {
      clearTimeout(timeout);
      pending = false;
    }
  }

  check();
  setInterval(() => check({ skipIfHidden: true }), 60000);
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) render("unknown");
    else check();
  });
})();

(function watchKickLive() {
  const badge = document.getElementById("kickLiveBadge");
  const status = document.getElementById("kickStatus");
  const followerEl = document.getElementById("kickFollowerCount");
  const embedWrap = document.getElementById("liveEmbedKick");
  const embedFrame = document.getElementById("liveEmbedKickFrame");
  const embedViewerCount = document.getElementById("kickEmbedViewerCount");
  if (!liveDot && !badge && !status && !followerEl && !embedWrap) return;
  let pending = false;
  let followerShown = false;

  function render(state, viewerCount) {
    const live = state === "live";
    liveOnPlatform.kick = live;
    updateLiveDot();
    badge?.classList.toggle("show", live);
    if (status) status.textContent = live ? "Ao vivo agora na Kick" : "Confira as lives no canal";
    if (embedWrap && embedFrame) {
      if (live && !embedFrame.src) {
        embedFrame.src = "https://player.kick.com/natinhox1?muted=true";
      } else if (!live && embedFrame.src) {
        embedFrame.src = "";
      }
      embedWrap.hidden = !live;
    }
    if (embedViewerCount) {
      embedViewerCount.textContent = live && Number.isInteger(viewerCount)
        ? ` · ${viewerCount.toLocaleString("pt-BR")} espectadores`
        : "";
    }
  }

  async function check({ skipIfHidden = false } = {}) {
    if (pending || (skipIfHidden && document.hidden)) return;
    pending = true;
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);
    try {
      const response = await fetch("https://kick.com/api/v2/channels/natinhox1", {
        cache: "no-store", signal: controller.signal
      });
      if (!response.ok) throw new Error("Status unavailable");
      const data = await response.json();
      const live = data?.livestream?.is_live === true;
      render(live ? "live" : "offline", data?.livestream?.viewer_count);
      if (followerEl && !followerShown) {
        const followers = data?.followers_count;
        if (Number.isInteger(followers) && followers >= 0) {
          revealBadge(followerEl, `${followers.toLocaleString("pt-BR")} seguidores na Kick`);
          followerShown = true;
        }
      }
    } catch {
      render("unknown");
    } finally {
      clearTimeout(timeout);
      pending = false;
    }
  }

  check();
  setInterval(() => check({ skipIfHidden: true }), 60000);
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) render("unknown");
    else check();
  });
})();

function revealBadge(el, text) {
  el.textContent = text;
  el.hidden = false;
  requestAnimationFrame(() => el.classList.add("is-in"));
}

(function loadFollowerCount() {
  const el = document.getElementById("followerCount");
  if (!el) return;
  fetch("https://decapi.me/twitch/followcount/natinhox", { cache: "no-store" })
    .then(response => response.ok ? response.text() : Promise.reject())
    .then(text => {
      const count = Number(text.trim());
      if (!Number.isInteger(count) || count < 0) return;
      revealBadge(el, `${count.toLocaleString("pt-BR")} seguidores na Twitch`);
    })
    .catch(() => {});
})();

(function loadGraciosaCommunityCount() {
  const el = document.getElementById("graciosaCount");
  if (!el) return;
  fetch("https://discord.com/api/v10/invites/KwWGzyrzhn?with_counts=true", { cache: "no-store" })
    .then(response => response.ok ? response.json() : Promise.reject())
    .then(data => {
      const members = data.approximate_member_count;
      const online = data.approximate_presence_count;
      if (!Number.isInteger(members) || !Number.isInteger(online) || members < 0 || online < 0) return;
      revealBadge(el, `${members.toLocaleString("pt-BR")} membros · ${online.toLocaleString("pt-BR")} online`);
    })
    .catch(() => {});
})();

const shareBtn = document.getElementById("shareBtn");
const feedback = document.getElementById("shareFeedback");
const fallback = document.getElementById("shareFallback");
const shareUrl = document.getElementById("shareUrl");

if (shareBtn) {
  shareBtn.hidden = false;
  shareBtn.addEventListener("click", async () => {
    const shareData = {
      title: document.title,
      text: "Confira o perfil oficial do NATINHOX!",
      url: document.querySelector('link[rel="canonical"]')?.href || location.href.split(/[?#]/)[0]
    };
    shareBtn.disabled = true;
    if (feedback) feedback.textContent = "";
    if (fallback) fallback.hidden = true;
    try {
      if (navigator.share) {
        try {
          await navigator.share(shareData);
          celebrate(shareBtn);
          return;
        } catch (error) {
          if (error.name === "AbortError") return;
        }
      }
      try {
        await navigator.clipboard.writeText(shareData.url);
        if (feedback) feedback.textContent = "Link copiado!";
        celebrate(shareBtn);
      } catch {
        if (fallback && shareUrl) {
          fallback.hidden = false;
          shareUrl.value = shareData.url;
          shareUrl.focus();
          shareUrl.select();
        }
        if (feedback) feedback.textContent = "Selecione e copie o link abaixo para compartilhar.";
      }
    } finally {
      shareBtn.disabled = false;
    }
  });
}
