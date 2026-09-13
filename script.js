const year = document.getElementById("year");
if (year) year.textContent = new Date().getFullYear();

(function watchTwitchLive() {
  const dot = document.getElementById("statusDot");
  const badge = document.getElementById("twitchLiveBadge");
  const status = document.getElementById("liveStatus");
  if (!dot && !badge && !status) return;
  let pending = false;

  function render(state) {
    const live = state === "live";
    dot?.classList.toggle("is-live", live);
    badge?.classList.toggle("show", live);
    if (status) status.textContent = live
      ? "Ao vivo agora na Twitch"
      : state === "offline" ? "Offline agora \u00b7 veja as lives anteriores" : "Confira as lives no canal";
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
          return;
        } catch (error) {
          if (error.name === "AbortError") return;
        }
      }
      try {
        await navigator.clipboard.writeText(shareData.url);
        if (feedback) feedback.textContent = "Link copiado!";
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
