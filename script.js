document.getElementById("year").textContent = new Date().getFullYear();

document.querySelectorAll('a[target="_blank"]').forEach(link => {
  link.addEventListener('click', () => {
    try {
      const key = 'natinhox_clicks';
      const data = JSON.parse(localStorage.getItem(key) || '{}');
      const href = link.href;
      data[href] = (data[href] || 0) + 1;
      localStorage.setItem(key, JSON.stringify(data));
    } catch (_) {}
  });
});

const shareBtn = document.getElementById("shareBtn");
const shareBtnLabel = document.getElementById("shareBtnLabel");

if (shareBtn) {
  const defaultLabel = shareBtnLabel.textContent;

  shareBtn.addEventListener("click", async () => {
    const shareData = {
      title: document.title,
      text: "Confira o perfil oficial do NATINHOX!",
      url: location.href
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (_) {}
      return;
    }

    try {
      await navigator.clipboard.writeText(shareData.url);
      shareBtnLabel.textContent = "Link copiado!";
      setTimeout(() => { shareBtnLabel.textContent = defaultLabel; }, 2000);
    } catch (_) {
      shareBtnLabel.textContent = shareData.url;
    }
  });
}
