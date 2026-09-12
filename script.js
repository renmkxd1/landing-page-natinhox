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
