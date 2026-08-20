#!/usr/bin/env bash

set -euo pipefail

repo_root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
story_root="$repo_root/apps/web/public/story/the-living-arc"
instagram_out="$story_root/social/instagram"
reels_out="$story_root/social/reels"
evidence_out="$repo_root/release-evidence/living-arc/social"

mkdir -p "$instagram_out" "$reels_out" "$evidence_out"

serif_font="Palatino-Roman"
sans_font="Helvetica"
sans_bold_font="Helvetica-Bold"
ink="#05070d"
moonbone="#f1e9d7"
cyan="#62f4de"
gold="#d6b468"

render_carousel_slide() {
  local background="$1"
  local output="$2"
  local eyebrow="$3"
  local title="$4"
  local body="$5"
  local footer="$6"
  local crop_gravity="$7"
  local shade_percent="$8"

  convert "$background" \
    -auto-orient -resize '1080x1350^' -gravity "$crop_gravity" -extent 1080x1350 \
    -fill "$ink" -colorize "$shade_percent" \
    -stroke 'rgba(214,180,104,0.72)' -strokewidth 1 -draw 'line 80,72 1000,72' \
    \( -background none -fill "$cyan" -font "$sans_bold_font" -pointsize 27 -kerning 3 \
      -gravity northwest -size 920x80 caption:"$eyebrow" \) \
    -gravity northwest -geometry +80+96 -composite \
    \( -background none -fill "$moonbone" -font "$serif_font" -pointsize 76 -kerning 1 \
      -gravity northwest -size 920x430 caption:"$title" \) \
    -gravity northwest -geometry +80+245 -composite \
    \( -background none -fill "$moonbone" -font "$sans_font" -pointsize 45 \
      -gravity northwest -size 920x310 caption:"$body" \) \
    -gravity northwest -geometry +80+795 -composite \
    -stroke 'rgba(214,180,104,0.48)' -strokewidth 1 -draw 'line 80,1196 1000,1196' \
    \( -background none -fill "$gold" -font "$sans_bold_font" -pointsize 25 -kerning 2 \
      -gravity northwest -size 920x80 caption:"$footer" \) \
    -gravity northwest -geometry +80+1220 -composite \
    -strip -quality 92 "$output"
}

render_reel_card() {
  local background="$1"
  local output="$2"
  local eyebrow="$3"
  local title="$4"
  local footer="$5"
  local crop_gravity="$6"

  convert "$background" \
    -auto-orient -resize '1080x1920^' -gravity "$crop_gravity" -extent 1080x1920 \
    -fill "$ink" -colorize 48 \
    -stroke 'rgba(214,180,104,0.68)' -strokewidth 1 -draw 'line 90,180 990,180' \
    \( -background none -fill "$cyan" -font "$sans_bold_font" -pointsize 29 -kerning 3 \
      -gravity northwest -size 900x90 caption:"$eyebrow" \) \
    -gravity northwest -geometry +90+210 -composite \
    \( -background none -fill "$moonbone" -font "$serif_font" -pointsize 88 -kerning 1 \
      -gravity northwest -size 900x600 caption:"$title" \) \
    -gravity northwest -geometry +90+410 -composite \
    \( -background none -fill "$gold" -font "$sans_bold_font" -pointsize 28 -kerning 2 \
      -gravity northwest -size 900x100 caption:"$footer" \) \
    -gravity northwest -geometry +90+1660 -composite \
    -strip -quality 92 "$output"
}

render_carousel_slide \
  "$story_root/wallpapers/living-arc-desktop.webp" \
  "$instagram_out/01-cover.jpg" \
  '01 // SERIES PREMIERE' \
  $'HE CAN SAVE\nEVERYONE.' \
  'He only has to end choice.' \
  'SWIPE TO ENTER THE LIVING ARC' \
  center 54

render_carousel_slide \
  "$story_root/webtoon/episode-00-aftermath.webp" \
  "$instagram_out/02-mercy.jpg" \
  '02 // THE LAST WITNESS' \
  $'THE MERCY\nIS REAL.' \
  'Malachar removes the wound. The relief is immediate. Good people follow him because his power works.' \
  'WITNESS → MERCY → DOMINION' \
  east 60

render_carousel_slide \
  "$story_root/webtoon/episode-00-hands.webp" \
  "$instagram_out/03-price.jpg" \
  '03 // THE PRICE' \
  $'YOUR WOUND\nBECOMES\nHIS MAP.' \
  'While he carries it, every choice made by that wound becomes predictable—and preventable.' \
  'HE SAVES THE PERSON. THEN OWNS THE FUTURE.' \
  west 70

render_carousel_slide \
  "$story_root/wallpapers/living-arc-desktop.webp" \
  "$instagram_out/04-choice.jpg" \
  '04 // THE UNWRITTEN GATE' \
  $'KEEP THE WOUND\nOR GIVE HIM\nTHE MEMORY?' \
  'The story remembers your choice. Canon never pretends you changed the past.' \
  'CHOOSE AT ARCANEA.AI/STORY/THE-LIVING-ARC' \
  center 62

render_carousel_slide \
  "$story_root/wallpapers/living-arc-desktop.webp" \
  "$instagram_out/05-concord.jpg" \
  '05 // LORD OF THE LIVING ELEMENTS' \
  $'POWER DOES NOT\nOBEY. IT ANSWERS.' \
  'Earth holds. Water remembers. Fire chooses. Wind releases. Spirit becomes.' \
  'CONCORD, NOT COMMAND.' \
  center 62

render_carousel_slide \
  "$story_root/wallpapers/living-arc-desktop.webp" \
  "$instagram_out/06-opposition.jpg" \
  '06 // THE LIVING OPPOSITION' \
  $'SHE HIDES THE\nUNWRITTEN.\nHE ASKS POWER\nFOR CONSENT.' \
  'Lumara protects choices prediction discarded. Elyon refuses to make mastery another name for control.' \
  'LUMARA // ELYON' \
  south 63

render_carousel_slide \
  "$story_root/webtoon/episode-00-eiren-gate.webp" \
  "$instagram_out/07-webtoon.jpg" \
  '07 // WEBTOON EPISODE 00' \
  $'THE HAND\nHE RELEASED' \
  'Before Malachar tried to end choice, he honored one choice he could not survive.' \
  'READ THE VERTICAL PROLOGUE NOW' \
  center 58

render_carousel_slide \
  "$story_root/wallpapers/living-arc-phone.webp" \
  "$instagram_out/08-enter.jpg" \
  '08 // READ · SCROLL · KEEP' \
  $'ENTER\nTHE LIVING ARC.' \
  'Read Episode 00. Explore the saga. Download the 4K first-dawn wallpapers.' \
  'ARCANEA.AI/STORY/THE-LIVING-ARC' \
  center 58

render_reel_card \
  "$story_root/wallpapers/living-arc-phone.webp" \
  "$reels_out/01-save-everyone.jpg" \
  'THE LIVING ARC' \
  $'HE CAN SAVE\nEVERYONE.' \
  'HE ONLY HAS TO END CHOICE.' \
  center

render_reel_card \
  "$story_root/webtoon/episode-00-aftermath.webp" \
  "$reels_out/02-mercy-is-real.jpg" \
  'THE LAST WITNESS' \
  $'THE MERCY\nIS REAL.' \
  'THE FUTURE IS THE PRICE.' \
  east

render_reel_card \
  "$story_root/webtoon/episode-00-hands.webp" \
  "$reels_out/03-honored-one.jpg" \
  'EPISODE 00' \
  $'BEFORE HE ENDED\nCHOICE, HE\nHONORED ONE.' \
  'THE HAND HE RELEASED' \
  center

render_reel_card \
  "$story_root/wallpapers/living-arc-phone.webp" \
  "$reels_out/04-enter.jpg" \
  'READ · SCROLL · KEEP' \
  $'ENTER\nTHE LIVING ARC.' \
  'ARCANEA.AI/STORY/THE-LIVING-ARC' \
  center

ffmpeg -y \
  -loop 1 -t 4.5 -i "$reels_out/01-save-everyone.jpg" \
  -loop 1 -t 4.5 -i "$reels_out/02-mercy-is-real.jpg" \
  -loop 1 -t 4.5 -i "$reels_out/03-honored-one.jpg" \
  -loop 1 -t 4.5 -i "$reels_out/04-enter.jpg" \
  -filter_complex \
  '[0:v]fps=30,fade=t=in:st=0:d=0.35,fade=t=out:st=4.15:d=0.35[v0];
   [1:v]fps=30,fade=t=in:st=0:d=0.35,fade=t=out:st=4.15:d=0.35[v1];
   [2:v]fps=30,fade=t=in:st=0:d=0.35,fade=t=out:st=4.15:d=0.35[v2];
   [3:v]fps=30,fade=t=in:st=0:d=0.35,fade=t=out:st=4.15:d=0.35[v3];
   [v0][v1][v2][v3]concat=n=4:v=1:a=0[outv]' \
  -map '[outv]' -c:v libx264 -preset medium -crf 22 -pix_fmt yuv420p -movflags +faststart \
  "$reels_out/living-arc-launch-reel.mp4" >/dev/null 2>&1

convert "$reels_out/04-enter.jpg" -resize '420x654^' -gravity center -extent 420x654 \
  -strip -quality 92 "$reels_out/living-arc-reel-cover-420x654.jpg"

montage "$instagram_out"/0*.jpg -thumbnail 270x337 -tile 4x2 -geometry +12+12 \
  -background "$ink" -quality 88 "$evidence_out/instagram-contact-sheet.jpg"

montage "$reels_out"/0*.jpg -thumbnail 270x480 -tile 4x1 -geometry +12+12 \
  -background "$ink" -quality 88 "$evidence_out/reel-contact-sheet.jpg"

zip -q -j -FS "$instagram_out/living-arc-instagram-carousel.zip" "$instagram_out"/0*.jpg

identify -format '%f %wx%h %b\n' "$instagram_out"/0*.jpg "$reels_out"/*.jpg
ffprobe -v error -show_entries stream=width,height,r_frame_rate -show_entries format=duration,size \
  -of default=noprint_wrappers=1 "$reels_out/living-arc-launch-reel.mp4"
