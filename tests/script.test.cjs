const { test } = require('node:test');
const assert = require('node:assert/strict');
const vm = require('node:vm');
const fs = require('node:fs');
const source = fs.readFileSync(require('node:path').join(__dirname, '../script.js'), 'utf8');

async function setup({ body = 'natinhox is offline', ok = true, networkError = false, navigator = {},
  followBody = '246', followOk = true, discordBody = { approximate_member_count: 79, approximate_presence_count: 15 }, discordOk = true,
  viewerBody = '1234', visited = false, reducedMotion = false } = {}) {
  const elements = new Map();
  for (const id of ['year', 'greeting', 'statusDot', 'twitchLiveBadge', 'liveStatus', 'followerCount', 'graciosaCount', 'liveEmbed', 'liveEmbedFrame', 'liveViewerCount', 'shareBtn', 'shareFeedback', 'shareFallback', 'shareUrl']) {
    elements.set(id, { hidden: true, textContent: '', src: '', classList: { toggle(name, value) { this[name] = value; }, add(name) { this[name] = true; } },
      addEventListener(name, fn) { this[name] = fn; }, focus() { this.focused = true; }, select() { this.selected = true; } });
  }
  let interval;
  const store = visited ? { natinhox_visited: '1' } : {};
  const localStorage = { getItem: key => (key in store ? store[key] : null), setItem: (key, value) => { store[key] = String(value); } };
  const document = {
    hidden: false,
    documentElement: { dataset: {} },
    body: { appendChild() {} },
    createElement: () => ({ style: {}, setAttribute() {}, animate: () => ({ onfinish: null }), remove() {} }),
    getElementById: id => elements.get(id),
    querySelector: () => ({ href: 'https://example.com/profile/' }),
    addEventListener() {}
  };
  vm.runInNewContext(source, { document, navigator, location: { href: 'https://example.com/?private=1#section', hostname: 'example.com' }, Date, AbortController,
    setTimeout, clearTimeout, setInterval: fn => { interval = fn; }, requestAnimationFrame: fn => fn(),
    localStorage, matchMedia: () => ({ matches: reducedMotion }),
    fetch: async url => {
      if (typeof url === 'string' && url.includes('followcount')) {
        return { ok: followOk, text: async () => followBody };
      }
      if (typeof url === 'string' && url.includes('viewercount')) {
        return { ok: true, text: async () => viewerBody };
      }
      if (typeof url === 'string' && url.includes('discord.com')) {
        return { ok: discordOk, json: async () => discordBody };
      }
      if (networkError) throw Error('network');
      return { ok, text: async () => body };
    } });
  await new Promise(resolve => setImmediate(resolve));
  return { elements, document, store, refresh: interval };
}

for (const body of ['1 hour, 2 minutes', '45 seconds', '2 days, 1 hour, 0 minutes, 2 seconds']) {
  test(`valid duration: ${body}`, async () => {
    const { elements } = await setup({ body });
    assert.equal(elements.get('twitchLiveBadge').classList.show, true);
  });
}
for (const options of [{ body: 'natinhox is offline' }, { body: 'Rate limit exceeded' }, { body: '' }, { body: '<html>Error</html>' }, { body: '1 hour', ok: false }, { networkError: true }]) {
  test(`never false live: ${JSON.stringify(options)}`, async () => {
    const { elements } = await setup(options);
    assert.equal(elements.get('twitchLiveBadge').classList.show, false);
  });
}
test('live embed loads and shows when live', async () => {
  const { elements } = await setup({ body: '1 hour, 2 minutes' });
  assert.equal(elements.get('liveEmbed').hidden, false);
  assert.equal(elements.get('liveEmbedFrame').src, 'https://player.twitch.tv/?channel=natinhox&parent=example.com&muted=true');
});
for (const options of [{ body: 'natinhox is offline' }, { networkError: true }]) {
  test(`live embed stays hidden and unloaded: ${JSON.stringify(options)}`, async () => {
    const { elements } = await setup(options);
    assert.equal(elements.get('liveEmbed').hidden, true);
    assert.equal(elements.get('liveEmbedFrame').src, '');
  });
}
test('viewer count is shown while live', async () => {
  const { elements } = await setup({ body: '1 hour, 2 minutes', viewerBody: '1234' });
  assert.equal(elements.get('liveViewerCount').textContent, ' · 1.234 espectadores');
});
for (const options of [{ body: 'natinhox is offline' }, { networkError: true }]) {
  test(`viewer count stays empty when offline: ${JSON.stringify(options)}`, async () => {
    const { elements } = await setup(options);
    assert.equal(elements.get('liveViewerCount').textContent, '');
  });
}
test('greeting personalizes for a first-time visitor and marks them as visited', async () => {
  const { elements, store } = await setup({});
  assert.match(elements.get('greeting').textContent, /, bem-vindo ao meu universo$/i);
  assert.equal(store.natinhox_visited, '1');
});
test('greeting welcomes back a returning visitor', async () => {
  const { elements } = await setup({ visited: true });
  assert.match(elements.get('greeting').textContent, /, bem-vindo de volta$/i);
});
test('valid follower count is shown', async () => {
  const { elements } = await setup({ followBody: '1234' });
  assert.equal(elements.get('followerCount').hidden, false);
  assert.equal(elements.get('followerCount').textContent, '1.234 seguidores na Twitch');
  assert.equal(elements.get('followerCount').classList['is-in'], true);
});
for (const options of [{ followBody: 'Rate limit exceeded' }, { followBody: '-3' }, { followBody: '12.5' }, { followBody: '', followOk: false }]) {
  test(`invalid follower count stays hidden: ${JSON.stringify(options)}`, async () => {
    const { elements } = await setup(options);
    assert.equal(elements.get('followerCount').hidden, true);
  });
}
test('valid Graciosa community count is shown', async () => {
  const { elements } = await setup({ discordBody: { approximate_member_count: 79, approximate_presence_count: 15 } });
  assert.equal(elements.get('graciosaCount').hidden, false);
  assert.equal(elements.get('graciosaCount').textContent, '79 membros · 15 online');
});
for (const options of [
  { discordBody: { approximate_member_count: -1, approximate_presence_count: 2 } },
  { discordBody: { approximate_member_count: 79 } },
  { discordBody: {}, discordOk: false }
]) {
  test(`invalid Graciosa community count stays hidden: ${JSON.stringify(options)}`, async () => {
    const { elements } = await setup(options);
    assert.equal(elements.get('graciosaCount').hidden, true);
  });
}
test('clipboard receives canonical URL', async () => {
  let copied;
  const { elements } = await setup({ navigator: { clipboard: { writeText: async value => { copied = value; } } } });
  await elements.get('shareBtn').click();
  assert.equal(copied, 'https://example.com/profile/');
  assert.equal(elements.get('shareFeedback').textContent, 'Link copiado!');
  assert.equal(elements.get('shareBtn').disabled, false);
});
test('failed native sharing falls back to selected manual URL', async () => {
  const { elements } = await setup({ navigator: { share: async () => { throw Error('blocked'); } } });
  await elements.get('shareBtn').click();
  assert.equal(elements.get('shareFallback').hidden, false);
  assert.equal(elements.get('shareUrl').selected, true);
  assert.equal(elements.get('shareUrl').value, 'https://example.com/profile/');
});
test('cancelled sharing does not copy or open fallback', async () => {
  const { elements } = await setup({ navigator: { share: async () => { throw { name: 'AbortError' }; } } });
  await elements.get('shareBtn').click();
  assert.equal(elements.get('shareFallback').hidden, true);
  assert.equal(elements.get('shareFeedback').textContent, '');
  assert.equal(elements.get('shareBtn').disabled, false);
});
