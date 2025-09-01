#!/bin/bash

# 📥 Frank Content Import Automation
# Import and organize content from frank-input folder

set -e

echo "📥 Importing Frank's content into Arcanea platform..."

# Check if frank-input exists
if [ ! -d "frank-input" ]; then
    echo "❌ frank-input directory not found"
    echo "   Create it using: mkdir -p frank-input/{apis,content,requirements,feedback,assets,credentials}"
    exit 1
fi

echo "🔍 Scanning frank-input directory..."

# Import API keys to environment
echo "🔑 Processing API keys..."
if [ -d "frank-input/apis" ]; then
    for env_file in frank-input/apis/*.env; do
        if [ -f "$env_file" ]; then
            filename=$(basename "$env_file")
            echo "   📋 Found: $filename"
            
            # Append to main .env if not already present
            while IFS= read -r line; do
                if [[ $line =~ ^[A-Z_]+= ]] && ! grep -q "^${line%%=*}=" .env 2>/dev/null; then
                    echo "$line" >> .env
                    echo "   ✅ Added: ${line%%=*}"
                fi
            done < "$env_file"
        fi
    done
    echo "✅ API keys processed"
else
    echo "⚠️  No API keys folder found"
fi

# Import content
echo "📚 Processing content..."
CONTENT_DIR="content/frank-imported"
mkdir -p "$CONTENT_DIR"

if [ -d "frank-input/content" ]; then
    for content_type in frank-input/content/*/; do
        if [ -d "$content_type" ]; then
            type_name=$(basename "$content_type")
            echo "   📁 Importing $type_name content..."
            
            mkdir -p "$CONTENT_DIR/$type_name"
            cp -r "$content_type"/* "$CONTENT_DIR/$type_name/" 2>/dev/null || echo "   Note: Some files skipped"
            
            # Create index file for each content type
            cat > "$CONTENT_DIR/$type_name/INDEX.md" << EOF
# Frank's $type_name Content

Imported from: frank-input/content/$type_name/
Imported on: $(date)

## Files in this directory:
$(ls "$CONTENT_DIR/$type_name/" | grep -v INDEX.md | sed 's/^/- /')

## Usage:
This content can be used as source material for:
- Realm creation
- AI training
- Course development
- Community content

EOF
        fi
    done
    echo "✅ Content imported to $CONTENT_DIR"
else
    echo "⚠️  No content folder found"
fi

# Process requirements
echo "📋 Processing requirements..."
if [ -f "frank-input/requirements/priority-features.md" ]; then
    echo "   ✅ Priority features found"
    
    # Create development backlog
    BACKLOG_FILE="docs/DEVELOPMENT_BACKLOG.md"
    cat > "$BACKLOG_FILE" << EOF
# Arcanea Development Backlog

Generated from Frank's requirements on: $(date)

## High Priority Features
$(grep -A 20 "Must Have\|Priority 1" frank-input/requirements/priority-features.md 2>/dev/null || echo "- Review frank-input/requirements/priority-features.md")

## Medium Priority Features
$(grep -A 20 "Should Have\|Priority 2" frank-input/requirements/priority-features.md 2>/dev/null || echo "- Review priority-features.md for medium priority items")

## Future Enhancements
$(grep -A 20 "Nice to Have\|Future" frank-input/requirements/priority-features.md 2>/dev/null || echo "- Review priority-features.md for future items")

## Source
- Original file: frank-input/requirements/priority-features.md
- Last updated: $(date)
EOF
    echo "   ✅ Development backlog created: $BACKLOG_FILE"
else
    echo "   📝 No priority features file found"
    echo "      Create: frank-input/requirements/priority-features.md"
fi

# Process feedback
echo "💬 Processing feedback..."
if [ -d "frank-input/feedback" ]; then
    FEEDBACK_DIR="docs/frank-feedback"
    mkdir -p "$FEEDBACK_DIR"
    
    for feedback_file in frank-input/feedback/*.md; do
        if [ -f "$feedback_file" ]; then
            filename=$(basename "$feedback_file")
            cp "$feedback_file" "$FEEDBACK_DIR/"
            echo "   ✅ Imported: $filename"
        fi
    done
    
    # Create feedback summary
    cat > "$FEEDBACK_DIR/FEEDBACK_SUMMARY.md" << EOF
# Frank's Feedback Summary

Imported on: $(date)

## Available Feedback Files:
$(ls frank-input/feedback/*.md 2>/dev/null | xargs -I {} basename {} | sed 's/^/- /' || echo "- No feedback files found")

## How to Use:
1. Review feedback files regularly
2. Address issues and suggestions
3. Update implementation based on insights
4. Archive completed feedback

## Process:
- New feedback → Review → Implement → Archive
EOF
    echo "✅ Feedback imported to $FEEDBACK_DIR"
else
    echo "   📝 No feedback folder found"
fi

# Process assets
echo "🎨 Processing assets..."
if [ -d "frank-input/assets" ]; then
    ASSETS_DIR="content/assets/frank-assets"
    mkdir -p "$ASSETS_DIR"
    
    # Copy brand assets
    if [ -d "frank-input/assets/brand" ]; then
        cp -r frank-input/assets/brand "$ASSETS_DIR/"
        echo "   ✅ Brand assets imported"
        
        # Create brand guide from assets
        if [ -f "frank-input/assets/brand/colors.md" ]; then
            cp frank-input/assets/brand/colors.md docs/BRAND_COLORS.md
            echo "   ✅ Brand colors documented"
        fi
    fi
    
    # Copy other assets
    for asset_type in frank-input/assets/*/; do
        if [ -d "$asset_type" ]; then
            type_name=$(basename "$asset_type")
            if [ "$type_name" != "brand" ]; then
                cp -r "$asset_type" "$ASSETS_DIR/"
                echo "   ✅ $type_name assets imported"
            fi
        fi
    done
else
    echo "   📝 No assets folder found"
fi

# Generate import summary
echo "📊 Generating import summary..."
SUMMARY_FILE="docs/FRANK_IMPORT_SUMMARY.md"
cat > "$SUMMARY_FILE" << EOF
# Frank's Content Import Summary

Import completed on: $(date)

## What was imported:

### API Keys
$([ -d "frank-input/apis" ] && echo "✅ API keys processed and added to .env" || echo "❌ No API keys found")

### Content
$([ -d "$CONTENT_DIR" ] && echo "✅ Content imported to $CONTENT_DIR" || echo "❌ No content imported")
$([ -d "$CONTENT_DIR" ] && find "$CONTENT_DIR" -type d -mindepth 1 -maxdepth 1 | sed 's/^/- /' || echo "")

### Requirements
$([ -f "docs/DEVELOPMENT_BACKLOG.md" ] && echo "✅ Development backlog created" || echo "❌ No requirements processed")

### Feedback
$([ -d "docs/frank-feedback" ] && echo "✅ Feedback imported" || echo "❌ No feedback found")

### Assets
$([ -d "$ASSETS_DIR" ] && echo "✅ Assets imported to $ASSETS_DIR" || echo "❌ No assets imported")

## Next Steps:
1. Review imported content in respective directories
2. Check development backlog for priorities: docs/DEVELOPMENT_BACKLOG.md
3. Apply brand assets to the platform
4. Implement high-priority features
5. Address any feedback items

## Import Process:
Run this script anytime you add new content to frank-input:
\`\`\`bash
./scripts/import-frank-content.sh
\`\`\`

EOF

echo ""
echo "🎉 Frank's content import completed successfully!"
echo ""
echo "📋 Summary:"
echo "   📄 Import report: $SUMMARY_FILE"
echo "   📚 Imported content: $CONTENT_DIR (if any)"
echo "   🎯 Development backlog: docs/DEVELOPMENT_BACKLOG.md (if any)"
echo "   💬 Feedback: docs/frank-feedback/ (if any)"
echo "   🎨 Assets: $ASSETS_DIR (if any)"
echo ""
echo "🔄 To re-import after adding new content:"
echo "   ./scripts/import-frank-content.sh"
echo ""
echo "✨ Your content is now ready to be integrated into the platform!"