const { test } = require('node:test');
const assert = require('node:assert/strict');
const vm = require('node:vm');
const fs = require('node:fs');
const source = fs.readFileSync(require('node:path').join(__dirname, '../script.js'), 'utf8');

async function setup({ body = 'natinhox is offline', ok = true, networkError = false, navigator = {}, followBody = '246', followOk = true } = {}) {
  const elements = new Map();
  for (const id of ['year', 'statusDot', 'twitchLiveBadge', 'liveStatus', 'followerCount', 'shareBtn', 'shareFeedback', 'shareFallback', 'shareUrl']) {
    elements.set(id, { hidden: true, textContent: '', classList: { toggle(name, value) { this[name] = value; } },
      addEventListener(name, fn) { this[name] = fn; }, focus() { this.focused = true; }, select() { this.selected = true; } });
  }
  let interval;
  const document = { hidden: false, getElementById: id => elements.get(id), querySelector: () => ({ href: 'https://example.com/profile/' }), addEventListener() {} };
  vm.runInNewContext(source, { document, navigator, location: { href: 'https://example.com/?private=1#section' }, Date, AbortController,
    setTimeout, clearTimeout, setInterval: fn => { interval = fn; },
    fetch: async url => {
      if (typeof url === 'string' && url.includes('followcount')) {
        return { ok: followOk, text: async () => followBody };
      }
      if (networkError) throw Error('network');
      return { ok, text: async () => body };
    } });
  await new Promise(resolve => setImmediate(resolve));
  return { elements, document, refresh: interval };
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
test('valid follower count is shown', async () => {
  const { elements } = await setup({ followBody: '1234' });
  assert.equal(elements.get('followerCount').hidden, false);
  assert.equal(elements.get('followerCount').textContent, '1.234 seguidores na Twitch');
});
for (const options of [{ followBody: 'Rate limit exceeded' }, { followBody: '-3' }, { followBody: '12.5' }, { followBody: '', followOk: false }]) {
  test(`invalid follower count stays hidden: ${JSON.stringify(options)}`, async () => {
    const { elements } = await setup(options);
    assert.equal(elements.get('followerCount').hidden, true);
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
