const test = require('brittle')
const tmp = require('test-tmp')
const Hypercore = require('../../index.js')

test('open and close', async function (t) {
  const tmpDir = await tmp(t)

  const core = new Hypercore(tmpDir)
  for (let i = 0; i < 100; i++) {
    await core.append(Buffer.of(0))
  }
  await core.close()

  const elapsed = await t.execution(async function () {
    for (let i = 0; i < 100; i++) {
      const core = new Hypercore(tmpDir)
      await core.ready()
      await core.close()
    }
  })

  t.comment(elapsed)
})
