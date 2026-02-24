// Canon Validation Tool

interface ValidationIssue {
  type: "error" | "warning";
  message: string;
  suggestion?: string;
}

const canonicalNames = {
  guardians: ["Lyssandria", "Leyla", "Draconia", "Maylinn", "Alera", "Lyria", "Aiyami", "Elara", "Ino", "Shinkami"],
  godbeasts: ["Kaelith", "Veloura", "Draconis", "Laeylinn", "Otome", "Yumiko", "Sol", "Vaelith", "Kyuro"],
  elements: ["Fire", "Water", "Earth", "Wind", "Void", "Spirit"],
  houses: ["Lumina", "Nero", "Pyros", "Aqualis", "Terra", "Ventus", "Synthesis"],
};

const incorrectTerms: Record<string, string> = {
  "light element": "Fire's creation aspect (Light is not a separate element)",
  "shadow element": "Corrupted Void (Shadow is Void without Spirit)",
  "darkness is evil": "Nero is NOT evil - Shadow is the Dark Lord's perversion of Void",
  "dark side": "Consider using 'Shadow' or 'Corrupted Void' for evil aspects",
};

const guardianGateMap: Record<string, number> = {
  lyssandria: 1, leyla: 2, draconia: 3, maylinn: 4, alera: 5,
  lyria: 6, aiyami: 7, elara: 8, ino: 9, shinkami: 10,
};

export async function validateCanon(
  content: string,
  contentType?: string
): Promise<{ content: Array<{ type: string; text: string }> }> {
  const issues: ValidationIssue[] = [];
  const suggestions: string[] = [];
  const lowerContent = content.toLowerCase();

  // Check for incorrect terms
  for (const [incorrect, correct] of Object.entries(incorrectTerms)) {
    if (lowerContent.includes(incorrect)) {
      issues.push({
        type: "warning",
        message: `Found potentially incorrect term: "${incorrect}"`,
        suggestion: correct,
      });
    }
  }

  // Check for Nero being portrayed as evil
  if (lowerContent.includes("nero") && (lowerContent.includes("evil") || lowerContent.includes("villain"))) {
    issues.push({
      type: "error",
      message: "Nero should not be portrayed as evil",
      suggestion: "Nero is the Primordial Darkness, necessary and balanced. Malachar and Shadow are the evil forces.",
    });
  }

  // Check Guardian-Gate associations
  for (const [guardian, gate] of Object.entries(guardianGateMap)) {
    if (lowerContent.includes(guardian)) {
      const guardianIndex = lowerContent.indexOf(guardian);
      const nearbyText = lowerContent.substring(
        Math.max(0, guardianIndex - 50),
        Math.min(lowerContent.length, guardianIndex + 50)
      );

      for (let i = 1; i <= 10; i++) {
        if (i !== gate && (nearbyText.includes(`gate ${i}`) || nearbyText.includes(`${i}th gate`))) {
          issues.push({
            type: "error",
            message: `${guardian.charAt(0).toUpperCase() + guardian.slice(1)} is Guardian of Gate ${gate}, not Gate ${i}`,
          });
        }
      }
    }
  }

  // Content-type specific suggestions
  if (contentType === "story") {
    suggestions.push(
      "Use 'the Song' or 'the Arcane' for formal magic references",
      "Show magic through effect, not technical description",
      "Reference the Arc for cycles of creation and destruction"
    );
  } else if (contentType === "character") {
    suggestions.push(
      "Check that any Guardian/Godbeast names are spelled correctly",
      "Ensure elemental affiliations are from the Five Elements",
      "Verify magic rank matches Gates opened (0-2: Apprentice, 3-4: Mage, etc.)"
    );
  }

  const isValid = issues.filter((i) => i.type === "error").length === 0;

  return {
    content: [{
      type: "text",
      text: JSON.stringify({
        valid: isValid,
        issueCount: issues.length,
        issues,
        suggestions,
        summary: isValid
          ? "Content appears canon-compliant. Review suggestions for polish."
          : `Found ${issues.filter((i) => i.type === "error").length} canon violations to fix.`,
      }, null, 2),
    }],
  };
}
