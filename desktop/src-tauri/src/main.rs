//! Arcanea Desktop - Rust Backend
//! 
//! Handles:
//! - Agent registry management
//! - Workflow execution
//! - Local SQLite database
//! - AI provider routing
//! - File system operations

#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

use std::collections::HashMap;
use std::sync::Arc;
use tauri::{Manager, State};
use tokio::sync::RwLock;
use serde::{Deserialize, Serialize};
use chrono::Utc;
use uuid::Uuid;

// Agent system modules
mod agents;
mod workflows;
mod database;
mod ai_router;

use agents::{AgentRegistry, Agent};
use workflows::{WorkflowEngine, WorkflowResult};
use database::Database;
use ai_router::AIRouter;

/// Application state shared across commands
pub struct AppState {
    agent_registry: Arc<RwLock<AgentRegistry>>,
    workflow_engine: Arc<RwLock<WorkflowEngine>>,
    database: Arc<RwLock<Database>>,
    ai_router: Arc<RwLock<AIRouter>>,
}

impl AppState {
    async fn new() -> anyhow::Result<Self> {
        let database = Database::new().await?;
        let agent_registry = AgentRegistry::load().await?;
        let workflow_engine = WorkflowEngine::new(agent_registry.clone());
        let ai_router = AIRouter::new();

        Ok(Self {
            agent_registry: Arc::new(RwLock::new(agent_registry)),
            workflow_engine: Arc::new(RwLock::new(workflow_engine)),
            database: Arc::new(RwLock::new(database)),
            ai_router: Arc::new(RwLock::new(ai_router)),
        })
    }
}

// Command: Get all agents
#[tauri::command]
async fn get_agents(state: State<'_, AppState>) -> Result<Vec<Agent>, String> {
    let registry = state.agent_registry.read().await;
    Ok(registry.get_all_agents())
}

// Command: Get agent by ID
#[tauri::command]
async fn get_agent(state: State<'_, AppState>, id: String) -> Result<Option<Agent>, String> {
    let registry = state.agent_registry.read().await;
    Ok(registry.get_agent(&id))
}

// Command: Invoke agent
#[tauri::command]
async fn invoke_agent(
    state: State<'_, AppState>,
    agent_id: String,
    task: String,
    context: Option<HashMap<String, String>>,
) -> Result<AgentInvocationResult, String> {
    let start = Utc::now();
    
    // Get agent
    let registry = state.agent_registry.read().await;
    let agent = registry.get_agent(&agent_id)
        .ok_or_else(|| format!("Agent '{}' not found", agent_id))?;
    drop(registry);

    // Build prompt
    let prompt = build_agent_prompt(&agent, &task, context.as_ref());

    // Route to AI
    let router = state.ai_router.read().await;
    let response = router.generate(&agent, &prompt).await
        .map_err(|e| format!("AI generation failed: {}", e))?;
    drop(router);

    // Store in database
    let db = state.database.read().await;
    let invocation_id = Uuid::new_v4().to_string();
    db.store_invocation(&invocation_id, &agent_id, &task, &response, Utc::now() - start).await
        .map_err(|e| format!("Database error: {}", e))?;

    Ok(AgentInvocationResult {
        id: invocation_id,
        agent: agent.name,
        agent_id: agent.id,
        specialty: agent.specialty,
        response,
        execution_time_ms: (Utc::now() - start).num_milliseconds(),
        timestamp: Utc::now().to_rfc3339(),
    })
}

// Command: Start workflow
#[tauri::command]
async fn start_workflow(
    state: State<'_, AppState>,
    workflow_id: String,
    task: String,
    options: Option<WorkflowOptions>,
) -> Result<WorkflowResult, String> {
    let engine = state.workflow_engine.read().await;
    let result = engine.execute(&workflow_id, &task, options).await
        .map_err(|e| format!("Workflow failed: {}", e))?;
    Ok(result)
}

// Command: Get workflows list
#[tauri::command]
async fn get_workflows(state: State<'_, AppState>) -> Result<Vec<WorkflowInfo>, String> {
    let engine = state.workflow_engine.read().await;
    Ok(engine.list_workflows())
}

// Command: Store prompt
#[tauri::command]
async fn store_prompt(
    state: State<'_, AppState>,
    name: String,
    content: String,
    tags: Vec<String>,
) -> Result<String, String> {
    let db = state.database.read().await;
    let id = Uuid::new_v4().to_string();
    db.store_prompt(&id, &name, &content, &tags).await
        .map_err(|e| format!("Database error: {}", e))?;
    Ok(id)
}

// Command: Get prompts
#[tauri::command]
async fn get_prompts(state: State<'_, AppState>) -> Result<Vec<PromptRecord>, String> {
    let db = state.database.read().await;
    db.get_prompts().await
        .map_err(|e| format!("Database error: {}", e))
}

// Command: Update config
#[tauri::command]
async fn update_config(
    state: State<'_, AppState>,
    key: String,
    value: String,
) -> Result<(), String> {
    let db = state.database.read().await;
    db.set_config(&key, &value).await
        .map_err(|e| format!("Database error: {}", e))
}

// Command: Get config
#[tauri::command]
async fn get_config(state: State<'_, AppState>, key: String) -> Result<Option<String>, String> {
    let db = state.database.read().await;
    db.get_config(&key).await
        .map_err(|e| format!("Database error: {}", e))
}

// Helper functions
fn build_agent_prompt(agent: &Agent, task: &str, context: Option<&HashMap<String, String>>) -> String {
    let mut prompt = format!("You are {} from the {} Court.\n", agent.name, agent.court);
    prompt.push_str(&format!("Specialty: {}\n", agent.specialty));
    prompt.push_str(&format!("Frequency: {}Hz\n\n", agent.frequency));
    prompt.push_str(&format!("Task: {}\n", task));
    
    if let Some(ctx) = context {
        prompt.push_str("\nContext:\n");
        for (key, value) in ctx {
            prompt.push_str(&format!("- {}: {}\n", key, value));
        }
    }
    
    prompt.push_str(&format!("\nProvide your specialized contribution as {}.", agent.name));
    prompt
}

// Data structures
#[derive(Serialize, Deserialize, Debug)]
pub struct AgentInvocationResult {
    pub id: String,
    pub agent: String,
    pub agent_id: String,
    pub specialty: String,
    pub response: String,
    pub execution_time_ms: i64,
    pub timestamp: String,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct WorkflowOptions {
    pub theme: Option<String>,
    pub genre: Option<String>,
    pub tone: Option<String>,
    pub scope: Option<String>,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct WorkflowInfo {
    pub id: String,
    pub name: String,
    pub description: String,
    pub agent_count: usize,
    pub phases: usize,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct PromptRecord {
    pub id: String,
    pub name: String,
    pub content: String,
    pub tags: Vec<String>,
    pub created_at: String,
}

fn main() {
    tauri::Builder::default()
        .setup(|app| {
            // Initialize app state
            tauri::async_runtime::block_on(async {
                let state = AppState::new().await
                    .expect("Failed to initialize app state");
                app.manage(state);
            });
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![
            get_agents,
            get_agent,
            invoke_agent,
            start_workflow,
            get_workflows,
            store_prompt,
            get_prompts,
            update_config,
            get_config,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
