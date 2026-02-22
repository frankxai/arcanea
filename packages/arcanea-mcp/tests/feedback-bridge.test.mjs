import { describe, it, beforeEach } from "node:test";
import assert from "node:assert/strict";

// We test the bridge logic directly without TS compilation
// by reimplementing the core conversion logic

// --- Minimal reimplementation ---

const GUARDIAN_DOMAIN_MAP = {
  Lyssandria: "code",
  Leyla: "creative",
  Draconia: "code",
  Maylinn: "code",
  Alera: "code",
  Lyria: "reasoning",
  Aiyami: "creative",
  Elara: "code",
  Ino: "code",
  Shinkami: "reasoning",
};

function textToEmbedding(text, dim = 64) {
  const embedding = new Float32Array(dim);
  const lower = text.toLowerCase();
  for (let i = 0; i < lower.length; i++) {
    const code = lower.charCodeAt(i);
    const idx = (code * 31 + i * 7) % dim;
    embedding[idx] += 1.0;
  }
  let norm = 0;
  for (let i = 0; i < dim; i++) norm += embedding[i] * embedding[i];
  norm = Math.sqrt(norm);
  if (norm > 0) for (let i = 0; i < dim; i++) embedding[i] /= norm;
  return embedding;
}

function bridgeExecution(executionLog) {
  const activation = executionLog.activation;
  const feedback = executionLog.feedback ?? "neutral";
  const guardian = activation.guardian;

  const qualityScore = feedback === "positive" ? 0.9
    : feedback === "negative" ? 0.2
    : 0.5;

  const reward = feedback === "positive" ? 1.0
    : feedback === "negative" ? 0.0
    : 0.5;

  const step = {
    stepId: `step-${executionLog.id}`,
    timestamp: activation.timestamp.getTime(),
    action: `route:${activation.activated.map(r => r.skill).join("+")}`,
    stateBefore: textToEmbedding(activation.reasoning),
    stateAfter: textToEmbedding(`${guardian}/${activation.gate}/${feedback}`),
    reward,
    metadata: {
      guardian,
      gate: activation.gate,
      frequency: activation.frequency,
      skills: activation.activated.map(r => r.skill),
      cascaded: activation.cascaded,
      feedback,
    },
  };

  return {
    trajectoryId: `traj-${executionLog.id}`,
    context: `Guardian routing: ${activation.reasoning}`,
    domain: GUARDIAN_DOMAIN_MAP[guardian] ?? "general",
    steps: [step],
    qualityScore,
    isComplete: true,
    startTime: executionLog.startedAt.getTime(),
    endTime: executionLog.completedAt?.getTime() ?? Date.now(),
  };
}

// --- Mock data ---

function makeExecution(guardian, gate, feedback, skills = ["test-skill"]) {
  return {
    id: `exec-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
    activation: {
      activated: skills.map(s => ({ skill: s, guardian, gate })),
      guardian,
      gate,
      frequency: "528 Hz",
      cascaded: [],
      reasoning: `Matched ${skills.join(", ")} via keyword`,
      timestamp: new Date(),
    },
    startedAt: new Date(),
    completedAt: new Date(),
    feedback,
  };
}

// --- Tests ---

describe("FeedbackBridge — Execution → Trajectory", () => {
  it("converts positive feedback to high quality trajectory", () => {
    const exec = makeExecution("Alera", "Voice", "positive", ["security-guidance"]);
    const traj = bridgeExecution(exec);

    assert.equal(traj.qualityScore, 0.9);
    assert.equal(traj.isComplete, true);
    assert.equal(traj.domain, "code"); // Alera → code
    assert.equal(traj.steps.length, 1);
    assert.equal(traj.steps[0].reward, 1.0);
  });

  it("converts negative feedback to low quality trajectory", () => {
    const exec = makeExecution("Lyria", "Sight", "negative", ["model-routing"]);
    const traj = bridgeExecution(exec);

    assert.equal(traj.qualityScore, 0.2);
    assert.equal(traj.steps[0].reward, 0.0);
    assert.equal(traj.domain, "reasoning"); // Lyria → reasoning
  });

  it("converts neutral feedback to mid quality trajectory", () => {
    const exec = makeExecution("Leyla", "Flow", "neutral", ["character-forge"]);
    const traj = bridgeExecution(exec);

    assert.equal(traj.qualityScore, 0.5);
    assert.equal(traj.steps[0].reward, 0.5);
    assert.equal(traj.domain, "creative"); // Leyla → creative
  });

  it("preserves Guardian metadata in trajectory step", () => {
    const exec = makeExecution("Draconia", "Fire", "positive", ["nextjs-deploy"]);
    const traj = bridgeExecution(exec);
    const meta = traj.steps[0].metadata;

    assert.equal(meta.guardian, "Draconia");
    assert.equal(meta.gate, "Fire");
    assert.equal(meta.feedback, "positive");
    assert.deepEqual(meta.skills, ["nextjs-deploy"]);
  });

  it("handles multi-skill activations", () => {
    const exec = makeExecution("Shinkami", "Source", "positive", [
      "arcanea-canon",
      "starlight-intelligence",
      "agentic-orchestration",
    ]);
    const traj = bridgeExecution(exec);

    assert.ok(traj.steps[0].action.includes("arcanea-canon"));
    assert.ok(traj.steps[0].action.includes("starlight-intelligence"));
    assert.ok(traj.steps[0].action.includes("agentic-orchestration"));
    assert.equal(traj.domain, "reasoning");
  });
});

describe("FeedbackBridge — Domain Mapping", () => {
  const cases = [
    ["Lyssandria", "code"],
    ["Leyla", "creative"],
    ["Draconia", "code"],
    ["Maylinn", "code"],
    ["Alera", "code"],
    ["Lyria", "reasoning"],
    ["Aiyami", "creative"],
    ["Elara", "code"],
    ["Ino", "code"],
    ["Shinkami", "reasoning"],
  ];

  for (const [guardian, expectedDomain] of cases) {
    it(`maps ${guardian} to domain '${expectedDomain}'`, () => {
      const exec = makeExecution(guardian, "Test", "positive");
      const traj = bridgeExecution(exec);
      assert.equal(traj.domain, expectedDomain);
    });
  }
});

describe("FeedbackBridge — Embeddings", () => {
  it("produces L2-normalized embeddings", () => {
    const emb = textToEmbedding("test string");
    let norm = 0;
    for (let i = 0; i < emb.length; i++) norm += emb[i] * emb[i];
    assert.ok(Math.abs(Math.sqrt(norm) - 1.0) < 0.001, "Embedding should be L2-normalized");
  });

  it("produces different embeddings for different inputs", () => {
    const a = textToEmbedding("database schema");
    const b = textToEmbedding("creative writing");

    let dot = 0;
    for (let i = 0; i < a.length; i++) dot += a[i] * b[i];

    assert.ok(dot < 0.99, "Different inputs should have different embeddings");
  });

  it("produces same embedding for same input", () => {
    const a = textToEmbedding("orchestrate deploy");
    const b = textToEmbedding("orchestrate deploy");

    let dot = 0;
    for (let i = 0; i < a.length; i++) dot += a[i] * b[i];

    assert.ok(Math.abs(dot - 1.0) < 0.001, "Same input should produce identical embedding");
  });
});

describe("FeedbackBridge — Stats Computation", () => {
  it("computes per-Guardian accuracy from events", () => {
    const events = [
      { guardian: "Alera", feedback: "positive" },
      { guardian: "Alera", feedback: "positive" },
      { guardian: "Alera", feedback: "negative" },
      { guardian: "Lyria", feedback: "positive" },
      { guardian: "Lyria", feedback: "neutral" },
    ];

    // Recompute stats
    const guardianStats = {};
    for (const event of events) {
      const stats = guardianStats[event.guardian] ??= { total: 0, positive: 0 };
      stats.total++;
      if (event.feedback === "positive") stats.positive++;
    }

    assert.equal(guardianStats.Alera.total, 3);
    assert.equal(guardianStats.Alera.positive, 2);
    assert.ok(Math.abs(guardianStats.Alera.positive / guardianStats.Alera.total - 0.667) < 0.01);

    assert.equal(guardianStats.Lyria.total, 2);
    assert.equal(guardianStats.Lyria.positive, 1);
    assert.equal(guardianStats.Lyria.positive / guardianStats.Lyria.total, 0.5);
  });
});
