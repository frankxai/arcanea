#!/usr/bin/env bash
set -euo pipefail

ARCANEA_ROOT="${1:-/mnt/c/Users/frank/Arcanea}"
CODEX_HOME="${CODEX_HOME:-$HOME/.codex}"
CODEX_SKILLS_DIR="${CODEX_HOME}/skills"
CODEX_CONFIG="${CODEX_HOME}/config.toml"
CLAUDE_SKILLS_ROOT="${ARCANEA_ROOT}/.claude/skills"
ORACLE_SKILLS_ROOT="${ARCANEA_ROOT}/claude-code-oracle-skills/skills"
MCP_JSON="${ARCANEA_ROOT}/.mcp.json"
SYNC_TAG_BEGIN="# BEGIN ARCANEA MCP SYNC"
SYNC_TAG_END="# END ARCANEA MCP SYNC"

mkdir -p "${CODEX_SKILLS_DIR}"

link_skill_dirs() {
  local root="$1"
  local prefix="$2"
  local skill_file rel skill_dir skill_name target

  while IFS= read -r skill_file; do
    skill_dir="$(dirname "${skill_file}")"
    rel="${skill_dir#${root}/}"
    skill_name="${prefix}__${rel//\//__}"
    target="${CODEX_SKILLS_DIR}/${skill_name}"

    if [ -L "${target}" ] || [ -d "${target}" ]; then
      rm -rf "${target}"
    fi
    ln -s "${skill_dir}" "${target}"
  done < <(find "${root}" -type f \( -name "SKILL.md" -o -name "skill.md" \) | sort -u)
}

write_mcp_block() {
  if [ ! -f "${MCP_JSON}" ]; then
    echo "WARN: MCP config not found at ${MCP_JSON}; skipping MCP sync."
    return
  fi

  local tmp_cfg
  tmp_cfg="$(mktemp)"
  cp "${CODEX_CONFIG}" "${tmp_cfg}" 2>/dev/null || true

  sed -i "/${SYNC_TAG_BEGIN}/,/${SYNC_TAG_END}/d" "${tmp_cfg}"

  cat >> "${tmp_cfg}" <<'EOF'

# BEGIN ARCANEA MCP SYNC
[mcp_servers.next-devtools]
command = "npx"
args = ["-y", "next-devtools-mcp@latest"]

[mcp_servers.github]
command = "npx"
args = ["-y", "@modelcontextprotocol/server-github"]

[mcp_servers.figma-remote-mcp]
url = "https://mcp.figma.com/mcp"

[mcp_servers.notion]
url = "https://mcp.notion.com/mcp"

[mcp_servers.linear-server]
url = "https://mcp.linear.app/sse"

[mcp_servers.playwright]
command = "npx"
args = ["-y", "@executeautomation/playwright-mcp-server"]
# END ARCANEA MCP SYNC
EOF

  mkdir -p "$(dirname "${CODEX_CONFIG}")"
  cp "${tmp_cfg}" "${CODEX_CONFIG}"
  rm -f "${tmp_cfg}"
}

if [ -d "${CLAUDE_SKILLS_ROOT}" ]; then
  link_skill_dirs "${CLAUDE_SKILLS_ROOT}" "claude"
else
  echo "WARN: Claude skills root not found: ${CLAUDE_SKILLS_ROOT}"
fi

if [ -d "${ORACLE_SKILLS_ROOT}" ]; then
  link_skill_dirs "${ORACLE_SKILLS_ROOT}" "oracle"
else
  echo "WARN: Oracle skills root not found: ${ORACLE_SKILLS_ROOT}"
fi

write_mcp_block

echo "Synced skills into ${CODEX_SKILLS_DIR}"
echo "Synced Arcanea MCP entries into ${CODEX_CONFIG}"
echo "Restart Codex to pick up new skills and MCP config."
