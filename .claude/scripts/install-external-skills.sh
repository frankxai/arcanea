#!/bin/bash
#
# Arcanea External Skills Installer
# Pulls high-value skills from community repositories
#
# Usage: ./install-external-skills.sh [tier]
#   tier: 1 (critical), 2 (recommended), 3 (all), or specific skill name
#

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
SKILLS_DIR="${SCRIPT_DIR}/../skills/external"
TEMP_DIR="/tmp/arcanea-skills"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}"
echo "╔═══════════════════════════════════════════════════════════════╗"
echo "║         ARCANEA EXTERNAL SKILLS INSTALLER                     ║"
echo "║         \"Wisdom flows from many sources\"                      ║"
echo "╚═══════════════════════════════════════════════════════════════╝"
echo -e "${NC}"

# Create directories
mkdir -p "$SKILLS_DIR"
mkdir -p "$TEMP_DIR"

# Function to install a skill
install_skill() {
    local name=$1
    local source=$2
    local path=$3

    echo -e "${YELLOW}Installing: ${name}${NC}"

    if [ -d "${SKILLS_DIR}/${name}" ]; then
        echo -e "${GREEN}  ✓ Already installed${NC}"
        return 0
    fi

    case $source in
        "anthropics")
            if [ ! -d "${TEMP_DIR}/anthropics-skills" ]; then
                echo "  Cloning Anthropic skills repo..."
                git clone --depth 1 https://github.com/anthropics/skills.git "${TEMP_DIR}/anthropics-skills" 2>/dev/null || true
            fi
            if [ -d "${TEMP_DIR}/anthropics-skills/skills/${path}" ]; then
                cp -r "${TEMP_DIR}/anthropics-skills/skills/${path}" "${SKILLS_DIR}/${name}"
                echo -e "${GREEN}  ✓ Installed from Anthropic official${NC}"
            else
                echo -e "${RED}  ✗ Skill not found in repo${NC}"
            fi
            ;;

        "antigravity")
            if [ ! -d "${TEMP_DIR}/antigravity-skills" ]; then
                echo "  Cloning Antigravity skills repo..."
                git clone --depth 1 https://github.com/sickn33/antigravity-awesome-skills.git "${TEMP_DIR}/antigravity-skills" 2>/dev/null || true
            fi
            if [ -d "${TEMP_DIR}/antigravity-skills/${path}" ]; then
                cp -r "${TEMP_DIR}/antigravity-skills/${path}" "${SKILLS_DIR}/${name}"
                echo -e "${GREEN}  ✓ Installed from Antigravity (624+ skills)${NC}"
            else
                echo -e "${RED}  ✗ Skill not found in repo${NC}"
            fi
            ;;

        "voltagent")
            if [ ! -d "${TEMP_DIR}/voltagent-skills" ]; then
                echo "  Cloning VoltAgent skills repo..."
                git clone --depth 1 https://github.com/VoltAgent/awesome-agent-skills.git "${TEMP_DIR}/voltagent-skills" 2>/dev/null || true
            fi
            if [ -d "${TEMP_DIR}/voltagent-skills/${path}" ]; then
                cp -r "${TEMP_DIR}/voltagent-skills/${path}" "${SKILLS_DIR}/${name}"
                echo -e "${GREEN}  ✓ Installed from VoltAgent (200+ skills)${NC}"
            else
                echo -e "${RED}  ✗ Skill not found in repo${NC}"
            fi
            ;;

        *)
            echo -e "${RED}  ✗ Unknown source: ${source}${NC}"
            ;;
    esac
}

# Tier 1: Critical Skills (Immediate Need)
install_tier1() {
    echo -e "\n${BLUE}=== TIER 1: CRITICAL SKILLS ===${NC}\n"

    # Document skills from Anthropic
    install_skill "docx" "anthropics" "docx"
    install_skill "pdf" "anthropics" "pdf"
    install_skill "pptx" "anthropics" "pptx"
    install_skill "xlsx" "anthropics" "xlsx"
}

# Tier 2: High-Value Skills (Recommended)
install_tier2() {
    echo -e "\n${BLUE}=== TIER 2: HIGH-VALUE SKILLS ===${NC}\n"

    # Development skills
    install_skill "typescript-expert" "antigravity" "development/typescript-expert"
    install_skill "react-patterns" "antigravity" "development/react-patterns"
    install_skill "test-driven-development" "antigravity" "testing/test-driven-development"

    # AI/LLM skills
    install_skill "prompt-engineer" "antigravity" "data-ai/prompt-engineer"
    install_skill "rag-engineer" "voltagent" "ai/rag-engineer"

    # Security skills
    install_skill "api-security-best-practices" "antigravity" "security/api-security-best-practices"
}

# Tier 3: Nice-to-Have Skills
install_tier3() {
    echo -e "\n${BLUE}=== TIER 3: ADDITIONAL SKILLS ===${NC}\n"

    # Architecture
    install_skill "senior-architect" "antigravity" "architecture/senior-architect"
    install_skill "c4-context" "antigravity" "architecture/c4-context"

    # Business
    install_skill "copywriting" "antigravity" "business/copywriting"
    install_skill "seo-audit" "antigravity" "business/seo-audit"

    # Infrastructure
    install_skill "docker-expert" "antigravity" "infrastructure/docker-expert"
    install_skill "vercel-deployment" "antigravity" "infrastructure/vercel-deployment"

    # Testing
    install_skill "testing-patterns" "antigravity" "testing/testing-patterns"

    # Workflow
    install_skill "brainstorming" "antigravity" "general/brainstorming"
    install_skill "doc-coauthoring" "antigravity" "general/doc-coauthoring"
}

# Main execution
TIER=${1:-1}

case $TIER in
    1)
        install_tier1
        ;;
    2)
        install_tier1
        install_tier2
        ;;
    3|all)
        install_tier1
        install_tier2
        install_tier3
        ;;
    *)
        # Try to install specific skill
        echo "Looking for skill: $TIER"
        # Add custom logic here
        ;;
esac

# Cleanup
echo -e "\n${YELLOW}Cleaning up temporary files...${NC}"
# Optionally remove temp dir: rm -rf "$TEMP_DIR"

# Summary
echo -e "\n${GREEN}"
echo "╔═══════════════════════════════════════════════════════════════╗"
echo "║                    INSTALLATION COMPLETE                       ║"
echo "╚═══════════════════════════════════════════════════════════════╝"
echo -e "${NC}"

echo -e "Skills installed to: ${SKILLS_DIR}"
echo ""
echo "Installed skills:"
ls -1 "$SKILLS_DIR" 2>/dev/null | sed 's/^/  - /' || echo "  (none)"

echo ""
echo -e "${BLUE}Next steps:${NC}"
echo "  1. Review installed skills in $SKILLS_DIR"
echo "  2. Customize skills for Arcanea patterns"
echo "  3. Update agent configurations if needed"
echo ""
echo -e "${GREEN}Sources:${NC}"
echo "  - https://github.com/anthropics/skills"
echo "  - https://github.com/sickn33/antigravity-awesome-skills"
echo "  - https://github.com/VoltAgent/awesome-agent-skills"
