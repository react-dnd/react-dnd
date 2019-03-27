const cp = require('child_process')
const path = require('path')

const test = require('tap').test

const nodeBinary = process.argv[0]

test('config preload loads .env', t => {
  t.plan(1)

  const { stdout } = cp.spawnSync(
    nodeBinary,
    [
      '-r',
      '../config',
      '-e',
      'console.log(process.env.BASIC)',
      'dotenv_config_encoding=utf8'
    ],
    {
      cwd: path.resolve(__dirname),
      timeout: 5000,
      encoding: 'utf8'
    }
  )

  t.equal(stdout.trim(), 'basic')
})
