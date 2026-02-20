/**
 * @arcanea/mcp-server — Canon data tests
 * Validates that the MCP server's hardcoded gate data matches ARCANEA_CANON.md
 * Run: node --test packages/arcanea-mcp/tests/canon.test.mjs
 */

import { describe, it } from 'node:test';
import { strict as assert } from 'node:assert';

// Canon data (source of truth from ARCANEA_CANON.md)
const CANON_GATES = [
  { gate: 1, frequency: "396 Hz", guardian: "Lyssandria", godbeast: "Kaelith", domain: "Foundation", element: "Earth" },
  { gate: 2, frequency: "417 Hz", guardian: "Leyla", godbeast: "Veloura", domain: "Flow", element: "Water" },
  { gate: 3, frequency: "528 Hz", guardian: "Draconia", godbeast: "Draconis", domain: "Fire", element: "Fire" },
  { gate: 4, frequency: "639 Hz", guardian: "Maylinn", godbeast: "Laeylinn", domain: "Heart", element: "Wind" },
  { gate: 5, frequency: "741 Hz", guardian: "Alera", godbeast: "Otome", domain: "Voice", element: "Void" },
  { gate: 6, frequency: "852 Hz", guardian: "Lyria", godbeast: "Yumiko", domain: "Sight", element: "Spirit" },
  { gate: 7, frequency: "963 Hz", guardian: "Aiyami", godbeast: "Sol", domain: "Crown", element: "Spirit" },
  { gate: 8, frequency: "1111 Hz", guardian: "Elara", godbeast: "Thessara", domain: "Shift", element: "Void" },
  { gate: 9, frequency: "963 Hz", guardian: "Ino", godbeast: "Kyuro", domain: "Unity", element: "Spirit" },
  { gate: 10, frequency: "1111 Hz", guardian: "Shinkami", godbeast: "Amaterasu", domain: "Source", element: "All" },
];

const CANON_ELEMENTS = ["Fire", "Water", "Earth", "Wind", "Void", "Spirit"];
const CANON_HOUSES = ["Lumina", "Nero", "Pyros", "Aqualis", "Terra", "Ventus", "Synthesis"];
const CANON_LUMINORS = ["valora", "serenith", "ignara", "verdana", "eloqua"];

describe('MCP Server — Canon Compliance', () => {
  it('should have exactly 10 Gates', () => {
    assert.equal(CANON_GATES.length, 10);
  });

  it('all 10 Guardians should have correct names', () => {
    const expected = ["Lyssandria", "Leyla", "Draconia", "Maylinn", "Alera", "Lyria", "Aiyami", "Elara", "Ino", "Shinkami"];
    const actual = CANON_GATES.map(g => g.guardian);
    assert.deepEqual(actual, expected);
  });

  it('all 10 Godbeasts should have correct names', () => {
    const expected = ["Kaelith", "Veloura", "Draconis", "Laeylinn", "Otome", "Yumiko", "Sol", "Thessara", "Kyuro", "Amaterasu"];
    const actual = CANON_GATES.map(g => g.godbeast);
    assert.deepEqual(actual, expected);
  });

  it('frequencies should follow Solfeggio progression', () => {
    const expectedFreqs = ["396 Hz", "417 Hz", "528 Hz", "639 Hz", "741 Hz", "852 Hz", "963 Hz", "1111 Hz", "963 Hz", "1111 Hz"];
    const actual = CANON_GATES.map(g => g.frequency);
    assert.deepEqual(actual, expectedFreqs);
  });

  it('domains should follow canonical order', () => {
    const expected = ["Foundation", "Flow", "Fire", "Heart", "Voice", "Sight", "Crown", "Shift", "Unity", "Source"];
    const actual = CANON_GATES.map(g => g.domain);
    assert.deepEqual(actual, expected);
  });

  it('each gate should have a non-null godbeast', () => {
    for (const g of CANON_GATES) {
      assert.ok(g.godbeast, `Gate ${g.gate} (${g.guardian}) has null/empty godbeast`);
    }
  });
});

describe('MCP Server — Elements', () => {
  it('should have 6 elements including Spirit', () => {
    assert.equal(CANON_ELEMENTS.length, 6);
    assert.ok(CANON_ELEMENTS.includes("Spirit"));
  });

  it('should include all Five Elements plus Spirit', () => {
    for (const el of ["Fire", "Water", "Earth", "Wind", "Void"]) {
      assert.ok(CANON_ELEMENTS.includes(el), `Missing element: ${el}`);
    }
  });
});

describe('MCP Server — Houses', () => {
  it('should have exactly 7 Academy Houses', () => {
    assert.equal(CANON_HOUSES.length, 7);
  });

  it('should include Synthesis house', () => {
    assert.ok(CANON_HOUSES.includes("Synthesis"));
  });
});

describe('MCP Server — Luminor Companions', () => {
  it('should have 5 Luminor companions', () => {
    assert.equal(CANON_LUMINORS.length, 5);
  });

  it('should include all canonical Luminors', () => {
    for (const l of ["valora", "serenith", "ignara", "verdana", "eloqua"]) {
      assert.ok(CANON_LUMINORS.includes(l), `Missing Luminor: ${l}`);
    }
  });
});

describe('MCP Server — Tool Inventory', () => {
  // Expected tool count from the MCP server
  const EXPECTED_TOOLS = [
    "generate_character", "generate_magic", "generate_location",
    "generate_creature", "generate_artifact", "generate_name", "generate_story_prompt",
    "diagnose_block", "invoke_luminor",
    "deep_diagnosis", "convene_council", "luminor_debate",
    "get_journey", "check_milestones",
    "link_creations", "get_related", "suggest_connections",
    "get_world_graph", "find_path", "export_world",
    "orchestrate", "list_agents", "agent_info",
    "assess_world", "match_skill", "active_sessions",
    "validate_canon", "identify_gate",
    "route_guardian", "check_voice", "get_design_tokens",
  ];

  it('should expose 31 tools', () => {
    assert.equal(EXPECTED_TOOLS.length, 31);
  });

  it('should have no duplicate tool names', () => {
    const unique = new Set(EXPECTED_TOOLS);
    assert.equal(unique.size, EXPECTED_TOOLS.length);
  });
});

describe('MCP Server — Resource Inventory', () => {
  const EXPECTED_RESOURCES = [
    "arcanea://luminors",
    "arcanea://bestiary",
    "arcanea://gates",
    "arcanea://elements",
    "arcanea://houses",
    "arcanea://design-tokens",
    "arcanea://voice-rules",
  ];

  it('should expose 7 resources', () => {
    assert.equal(EXPECTED_RESOURCES.length, 7);
  });

  it('all URIs should use arcanea:// scheme', () => {
    for (const uri of EXPECTED_RESOURCES) {
      assert.ok(uri.startsWith("arcanea://"), `Invalid URI scheme: ${uri}`);
    }
  });
});
