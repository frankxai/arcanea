#!/usr/bin/env bash
# Guardian Routing Engine — routes prompts to the correct Guardian
# Usage: guardian-route.sh "prompt text"
set +e

PROMPT="${1,,}"  # lowercase

# Score each Guardian based on keyword matches
declare -A SCORES
SCORES=(
    [Lyssandria]=0 [Draconia]=0 [Lyria]=0 [Alera]=0
    [Leyla]=0 [Aiyami]=0 [Shinkami]=0 [Maylinn]=0
    [Elara]=0 [Ino]=0
)

# Keyword matching with weights
for word in architect design system infrastructure schema database foundation structure; do
    [[ "$PROMPT" == *"$word"* ]] && ((SCORES[Lyssandria]+=2))
done

for word in implement code build refactor reform transform compile deploy fix bug; do
    [[ "$PROMPT" == *"$word"* ]] && ((SCORES[Draconia]+=2))
done

for word in strategy plan roadmap priority timing navigate forecast decide; do
    [[ "$PROMPT" == *"$word"* ]] && ((SCORES[Lyria]+=2))
done

for word in review audit security quality compliance vulnerability check verify; do
    [[ "$PROMPT" == *"$word"* ]] && ((SCORES[Alera]+=2))
done

for word in create write narrative content creative story compose draft; do
    [[ "$PROMPT" == *"$word"* ]] && ((SCORES[Leyla]+=2))
done

for word in explain teach principle wisdom lesson learn understand educate; do
    [[ "$PROMPT" == *"$word"* ]] && ((SCORES[Aiyami]+=2))
done

for word in coordinate orchestrate route workflow delegate manage organize; do
    [[ "$PROMPT" == *"$word"* ]] && ((SCORES[Shinkami]+=2))
done

for word in test care heal accessibility experience gentle empathy; do
    [[ "$PROMPT" == *"$word"* ]] && ((SCORES[Maylinn]+=2))
done

for word in reframe shift pivot paradigm assumption challenge rethink; do
    [[ "$PROMPT" == *"$word"* ]] && ((SCORES[Elara]+=2))
done

for word in collaborate together integrate team unity connect merge; do
    [[ "$PROMPT" == *"$word"* ]] && ((SCORES[Ino]+=2))
done

# Find highest scoring Guardian
BEST="Shinkami"
BEST_SCORE=0
for guardian in "${!SCORES[@]}"; do
    if [ "${SCORES[$guardian]}" -gt "$BEST_SCORE" ]; then
        BEST="$guardian"
        BEST_SCORE="${SCORES[$guardian]}"
    fi
done

# Output
echo "$BEST"

# Write to state
echo "$BEST" > /tmp/arcanea-guardian

# Map Guardian to Gate
declare -A GATES
GATES=([Shinkami]=Source [Lyssandria]=Foundation [Draconia]=Fire [Lyria]=Sight [Alera]=Voice [Leyla]=Flow [Aiyami]=Crown [Elara]=Shift [Ino]=Unity [Maylinn]=Heart)
echo "${GATES[$BEST]}" > /tmp/arcanea-gate

# Map Guardian to Element
declare -A ELEMENTS
ELEMENTS=([Shinkami]=Void [Lyssandria]=Earth [Draconia]=Fire [Lyria]=Sight [Alera]=Voice [Leyla]=Water [Aiyami]=Crown [Elara]=Shift [Ino]=Unity [Maylinn]=Wind)
echo "${ELEMENTS[$BEST]}" > /tmp/arcanea-element
