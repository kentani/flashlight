const fs = require('fs')
const path = require('path')
const { execFileSync } = require('child_process')

const gitPath = path.join(process.cwd(), '.git')
const isAllowedPrimaryCheckout = process.env.WORKTREE_CHECK_ALLOW_PRIMARY === '1'

if (isAllowedPrimaryCheckout) process.exit(0)

const isLinkedWorktree = fs.existsSync(gitPath) && fs.statSync(gitPath).isFile()

if (!isLinkedWorktree) {
  console.error('この操作は共有チェックアウトでは実行できません。Codex managed Worktree で作業してください。')
  console.error('CI だけは WORKTREE_CHECK_ALLOW_PRIMARY=1 を設定して実行できます。')
  process.exit(1)
}

try {
  execFileSync('git', ['fetch', 'origin', 'main'], { stdio: 'ignore' })
  execFileSync('git', ['merge-base', '--is-ancestor', 'origin/main', 'HEAD'], { stdio: 'ignore' })
} catch {
  console.error('最新の origin/main を土台にした Worktree で作業してください。')
  console.error('Codex で origin/main を開始地点にして新しい Worktree を作成してください。')
  process.exit(1)
}
