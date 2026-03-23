import { createServer, IncomingMessage, ServerResponse } from "http";
import { existsSync, readFileSync, appendFileSync, mkdirSync, statSync } from "fs";
import { join } from "path";
import { execFile } from "child_process";
import pc from "picocolors";
import { VERSION } from "../index.js";

const ARCANEA_DIR = join(process.env.HOME || process.env.USERPROFILE || "~", ".arcanea");
const EVENTS_FILE = join(ARCANEA_DIR, "swarm-events.jsonl");

export interface SwarmEvent {
  type: "agent-spawn" | "agent-complete" | "agent-error" | "magic-word" | "session-start";
  agent?: string;
  team?: string;
  description?: string;
  status?: "running" | "complete" | "error";
  durationMs?: number;
  timestamp: number;
  meta?: Record<string, unknown>;
}

export function logEvent(event: SwarmEvent): void {
  mkdirSync(ARCANEA_DIR, { recursive: true });
  appendFileSync(EVENTS_FILE, JSON.stringify(event) + "\n");
}

function readEvents(): SwarmEvent[] {
  if (!existsSync(EVENTS_FILE)) return [];
  const content = readFileSync(EVENTS_FILE, "utf-8").trim();
  if (!content) return [];
  return content.split("\n").map(line => {
    try { return JSON.parse(line); }
    catch { return null; }
  }).filter(Boolean) as SwarmEvent[];
}

const clients: Set<ServerResponse> = new Set();

function broadcast(event: SwarmEvent): void {
  const data = `data: ${JSON.stringify(event)}\n\n`;
  for (const client of clients) {
    try { client.write(data); }
    catch { clients.delete(client); }
  }
}

function handleSSE(req: IncomingMessage, res: ServerResponse): void {
  res.writeHead(200, {
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
    "Connection": "keep-alive",
    "Access-Control-Allow-Origin": "*"
  });
  clients.add(res);
  req.on("close", () => clients.delete(res));
  const events = readEvents();
  res.write(`data: ${JSON.stringify({ type: "initial", events })}\n\n`);
}

function handleAPI(_req: IncomingMessage, res: ServerResponse): void {
  const events = readEvents();
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ events }));
}

function openBrowser(url: string): void {
  if (process.platform === "darwin") {
    execFile("open", [url], () => {});
  } else if (process.platform === "win32") {
    execFile("cmd", ["/c", "start", url], () => {});
  } else {
    execFile("xdg-open", [url], () => {});
  }
}

function getDashboardHTML(): string {
  // All event data rendered via textContent (safe DOM methods) in the JS below.
  // No user-supplied HTML is set via innerHTML — only structured data from JSONL.
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Arcanea Swarm Viz</title>
<style>
*{margin:0;padding:0;box-sizing:border-box}
:root{--bg:#0a0a1a;--surface:#111128;--border:#1e1e3a;--teal:#7fffd4;--gold:#ffd700;--blue:#78a6ff;
--red:#ff4757;--text:#e0e0e0;--dim:#666;--green:#2ed573;--purple:#a855f7}
body{background:var(--bg);color:var(--text);font-family:'Segoe UI',system-ui,sans-serif;min-height:100vh}
.header{background:linear-gradient(135deg,#0d0d2b,#1a1a3e);border-bottom:1px solid var(--border);padding:16px 24px;display:flex;align-items:center;gap:16px}
.header h1{font-size:20px;color:var(--teal);font-weight:600}
.header .version{color:var(--dim);font-size:12px}
.header .status{margin-left:auto;display:flex;align-items:center;gap:8px}
.dot{width:8px;height:8px;border-radius:50%;background:var(--green);animation:pulse 2s infinite}
@keyframes pulse{0%,100%{opacity:1}50%{opacity:0.4}}
.stats{display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:12px;padding:16px 24px}
.stat{background:var(--surface);border:1px solid var(--border);border-radius:8px;padding:16px;text-align:center}
.stat .label{font-size:11px;color:var(--dim);text-transform:uppercase;letter-spacing:1px;margin-bottom:4px}
.stat .value{font-size:28px;font-weight:700;color:var(--teal)}
.stat .value.gold{color:var(--gold)}
.stat .value.blue{color:var(--blue)}
.main{display:grid;grid-template-columns:1fr 300px;gap:16px;padding:0 24px 24px;height:calc(100vh - 200px)}
.events{background:var(--surface);border:1px solid var(--border);border-radius:8px;overflow:hidden;display:flex;flex-direction:column}
.events .title{padding:12px 16px;border-bottom:1px solid var(--border);font-size:13px;font-weight:600;display:flex;align-items:center;gap:8px}
.events .title .count{color:var(--dim);font-weight:400}
.event-list{flex:1;overflow-y:auto;padding:8px}
.event{padding:8px 12px;border-radius:6px;margin-bottom:4px;font-size:13px;display:flex;align-items:flex-start;gap:8px;animation:fadeIn 0.3s ease}
@keyframes fadeIn{from{opacity:0;transform:translateY(-4px)}to{opacity:1;transform:translateY(0)}}
.event .time{color:var(--dim);font-size:11px;min-width:60px;font-family:monospace}
.event .badge{padding:2px 6px;border-radius:4px;font-size:10px;font-weight:600;text-transform:uppercase}
.badge-spawn{background:#7fffd420;color:var(--teal)}
.badge-complete{background:#2ed57320;color:var(--green)}
.badge-error{background:#ff475720;color:var(--red)}
.badge-magic{background:#ffd70020;color:var(--gold)}
.event .desc{flex:1;word-break:break-word}
.event .agent-name{color:var(--blue);font-weight:500}
.event .dur{color:var(--dim);font-size:11px;font-family:monospace}
.sidebar{display:flex;flex-direction:column;gap:12px}
.panel{background:var(--surface);border:1px solid var(--border);border-radius:8px;padding:12px 16px}
.panel .title{font-size:13px;font-weight:600;margin-bottom:12px}
.bar-row{display:flex;align-items:center;gap:8px;margin-bottom:8px;font-size:12px}
.bar-label{min-width:80px;color:var(--dim)}
.bar-track{flex:1;height:8px;background:var(--bg);border-radius:4px;overflow:hidden}
.bar-fill{height:100%;border-radius:4px;transition:width 0.5s ease}
.fill-creative{background:var(--teal)}.fill-coding{background:var(--blue)}.fill-writing{background:var(--green)}
.fill-research{background:var(--gold)}.fill-production{background:var(--purple)}.fill-development{background:var(--blue)}
.fill-teacher{background:#ff6b81}.fill-visionary{background:var(--gold)}.fill-default{background:var(--teal)}
.bar-value{min-width:30px;text-align:right;font-family:monospace;color:var(--dim)}
.timing{font-family:monospace;font-size:13px}
.timing .row{display:flex;justify-content:space-between;padding:4px 0;border-bottom:1px solid var(--border)}
.timing .row:last-child{border:none}
.timing .label{color:var(--dim)}
.timing .val{color:var(--teal)}
.empty{text-align:center;padding:60px 20px;color:var(--dim)}
.empty h3{color:var(--teal);margin-bottom:12px;font-size:16px}
.empty p{font-size:13px;max-width:400px;margin:0 auto;line-height:1.6}
.empty code{background:var(--bg);padding:2px 6px;border-radius:4px;font-size:12px;color:var(--gold)}
</style>
</head>
<body>
<div class="header">
  <h1>Arcanea Swarm Viz</h1>
  <span class="version">v${VERSION}</span>
  <div class="status">
    <span class="dot" id="statusDot"></span>
    <span id="statusText" style="font-size:12px;color:var(--dim)">Connecting...</span>
  </div>
</div>
<div class="stats">
  <div class="stat"><div class="label">Total Spawns</div><div class="value" id="statTotal">0</div></div>
  <div class="stat"><div class="label">Active Now</div><div class="value gold" id="statActive">0</div></div>
  <div class="stat"><div class="label">Success Rate</div><div class="value blue" id="statSuccess">-</div></div>
  <div class="stat"><div class="label">Avg Duration</div><div class="value" id="statAvg">-</div></div>
</div>
<div class="main">
  <div class="events">
    <div class="title">Live Event Feed <span class="count" id="eventCount">(0 events)</span></div>
    <div class="event-list" id="eventList"></div>
  </div>
  <div class="sidebar">
    <div class="panel"><div class="title">Team Utilization</div><div id="teamBars"></div></div>
    <div class="panel">
      <div class="title">Timing (ms)</div>
      <div class="timing">
        <div class="row"><span class="label">Avg</span><span class="val" id="timAvg">-</span></div>
        <div class="row"><span class="label">P50</span><span class="val" id="timP50">-</span></div>
        <div class="row"><span class="label">P95</span><span class="val" id="timP95">-</span></div>
      </div>
    </div>
    <div class="panel"><div class="title">Top Agents</div><div id="agentList" style="font-size:12px"></div></div>
  </div>
</div>
<script>
// Uses safe DOM methods (createElement, textContent) — no innerHTML with untrusted data
let allEvents = [];
const fillClasses = {creative:'fill-creative',coding:'fill-coding',writing:'fill-writing',research:'fill-research',production:'fill-production',development:'fill-development',teacher:'fill-teacher',visionary:'fill-visionary'};

function fmtTime(ts) {
  return new Date(ts).toLocaleTimeString('en-US',{hour12:false,hour:'2-digit',minute:'2-digit',second:'2-digit'});
}
function fmtDur(ms) {
  if (!ms) return '';
  return ms < 1000 ? ms+'ms' : (ms/1000).toFixed(1)+'s';
}

function mkEl(tag, cls, text) {
  const el = document.createElement(tag);
  if (cls) el.className = cls;
  if (text) el.textContent = text;
  return el;
}

function showEmpty() {
  const list = document.getElementById('eventList');
  list.textContent = '';
  const d = mkEl('div','empty');
  const h = mkEl('h3',null,'Waiting for agent activity...');
  const p = mkEl('p',null,'Events appear here as agents spawn and complete. Use ultraworld or ultracode in Claude Code.');
  d.appendChild(h); d.appendChild(p);
  list.appendChild(d);
}

function addEvent(event) {
  const list = document.getElementById('eventList');
  const empty = list.querySelector('.empty');
  if (empty) empty.remove();

  const el = mkEl('div','event');
  el.appendChild(mkEl('span','time',fmtTime(event.timestamp)));

  const badgeCls = event.type==='agent-spawn'?'badge badge-spawn':
                   event.type==='agent-complete'?'badge badge-complete':
                   event.type==='agent-error'?'badge badge-error':'badge badge-magic';
  const badgeTxt = event.type==='agent-spawn'?'SPAWN':
                   event.type==='agent-complete'?'DONE':
                   event.type==='agent-error'?'ERR':'MAGIC';
  el.appendChild(mkEl('span',badgeCls,badgeTxt));
  if (event.agent) el.appendChild(mkEl('span','agent-name',event.agent));
  if (event.description) el.appendChild(mkEl('span','desc',event.description));
  if (event.durationMs) el.appendChild(mkEl('span','dur',fmtDur(event.durationMs)));

  list.appendChild(el);
  list.scrollTop = list.scrollHeight;
}

function updateStats() {
  const spawns = allEvents.filter(e=>e.type==='agent-spawn');
  const completes = allEvents.filter(e=>e.type==='agent-complete');
  const errors = allEvents.filter(e=>e.type==='agent-error');
  const durs = completes.filter(e=>e.durationMs).map(e=>e.durationMs).sort((a,b)=>a-b);

  document.getElementById('statTotal').textContent = spawns.length;
  document.getElementById('statActive').textContent = Math.max(0,spawns.length-completes.length-errors.length);
  document.getElementById('statSuccess').textContent = spawns.length>0?((completes.length/spawns.length)*100).toFixed(0)+'%':'-';
  document.getElementById('statAvg').textContent = durs.length>0?fmtDur(Math.round(durs.reduce((a,b)=>a+b,0)/durs.length)):'-';
  document.getElementById('timAvg').textContent = durs.length>0?Math.round(durs.reduce((a,b)=>a+b,0)/durs.length):'-';
  document.getElementById('timP50').textContent = durs.length>0?durs[Math.floor(durs.length*0.5)]:'-';
  document.getElementById('timP95').textContent = durs.length>0?durs[Math.floor(durs.length*0.95)]:'-';
  document.getElementById('eventCount').textContent = '('+allEvents.length+' events)';

  // Team bars — built with safe DOM methods
  const teams = {};
  const total = (spawns.length+completes.length)||1;
  for (const e of [...spawns,...completes]) if(e.team) teams[e.team]=(teams[e.team]||0)+1;
  const barsEl = document.getElementById('teamBars');
  barsEl.textContent = '';
  for (const [team,count] of Object.entries(teams).sort((a,b)=>b[1]-a[1])) {
    const pct = ((count/total)*100).toFixed(0);
    const row = mkEl('div','bar-row');
    row.appendChild(mkEl('span','bar-label',team));
    const track = mkEl('div','bar-track');
    const fill = mkEl('div','bar-fill '+(fillClasses[team]||'fill-default'));
    fill.style.width = pct+'%';
    track.appendChild(fill);
    row.appendChild(track);
    row.appendChild(mkEl('span','bar-value',String(count)));
    barsEl.appendChild(row);
  }

  // Agent list
  const agents = {};
  for (const e of [...spawns,...completes]) if(e.agent) agents[e.agent]=(agents[e.agent]||0)+1;
  const agentEl = document.getElementById('agentList');
  agentEl.textContent = '';
  for (const [agent,count] of Object.entries(agents).sort((a,b)=>b[1]-a[1]).slice(0,8)) {
    const row = mkEl('div','bar-row');
    row.appendChild(mkEl('span','bar-label',agent));
    const val = mkEl('span','bar-value',String(count));
    val.style.color = 'var(--teal)';
    row.appendChild(val);
    agentEl.appendChild(row);
  }
}

function connect() {
  const es = new EventSource('/stream');
  es.onmessage = function(e) {
    const data = JSON.parse(e.data);
    if (data.type==='initial') {
      allEvents = data.events||[];
      document.getElementById('eventList').textContent = '';
      if (allEvents.length===0) showEmpty();
      else for (const ev of allEvents.slice(-100)) addEvent(ev);
      updateStats();
    } else {
      allEvents.push(data);
      addEvent(data);
      updateStats();
    }
  };
  es.onopen = function() {
    document.getElementById('statusDot').style.background='var(--green)';
    document.getElementById('statusText').textContent='Connected';
  };
  es.onerror = function() {
    document.getElementById('statusDot').style.background='var(--red)';
    document.getElementById('statusText').textContent='Reconnecting...';
    es.close();
    setTimeout(connect,3000);
  };
}
connect();
</script>
</body>
</html>`;
}

export function startVizServer(port: number = 3737): void {
  mkdirSync(ARCANEA_DIR, { recursive: true });

  let lastSize = 0;
  try { lastSize = existsSync(EVENTS_FILE) ? statSync(EVENTS_FILE).size : 0; } catch {}

  const server = createServer((req, res) => {
    if (req.url === "/stream") {
      handleSSE(req, res);
    } else if (req.url === "/api/events") {
      handleAPI(req, res);
    } else if (req.url === "/api/test-event" && req.method === "POST") {
      let body = "";
      req.on("data", (chunk: Buffer) => { body += chunk.toString(); });
      req.on("end", () => {
        try {
          const event = JSON.parse(body) as SwarmEvent;
          event.timestamp = event.timestamp || Date.now();
          logEvent(event);
          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ ok: true }));
        } catch {
          res.writeHead(400);
          res.end("Invalid JSON");
        }
      });
    } else {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(getDashboardHTML());
    }
  });

  const pollInterval = setInterval(() => {
    try {
      if (!existsSync(EVENTS_FILE)) return;
      const currentSize = statSync(EVENTS_FILE).size;
      if (currentSize > lastSize) {
        const content = readFileSync(EVENTS_FILE, "utf-8");
        const newContent = content.slice(lastSize);
        lastSize = currentSize;
        for (const line of newContent.trim().split("\n")) {
          if (!line) continue;
          try { broadcast(JSON.parse(line)); }
          catch {}
        }
      }
    } catch {}
  }, 500);

  server.on("close", () => clearInterval(pollInterval));

  server.listen(port, () => {
    console.log(pc.cyan(`\nArcanea Swarm Viz v${VERSION}`));
    console.log(pc.green(`Dashboard: http://localhost:${port}`));
    console.log(pc.dim(`Events log: ${EVENTS_FILE}`));
    console.log(pc.dim(`SSE stream: http://localhost:${port}/stream`));
    console.log(pc.dim(`Press Ctrl+C to stop\n`));
    openBrowser(`http://localhost:${port}`);
  });
}
