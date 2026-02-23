"use client";

import { useState, useCallback, useRef } from "react";
import {
  Upload,
  Download,
  FileJson,
  FileText,
  FolderDown,
  AlertCircle,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { usePromptBooksStore } from "@/lib/prompt-books/store";
import * as service from "@/lib/prompt-books/service";
import { mdToPromptData, isPromptMarkdown } from "@/lib/prompt-books/markdown";
import { createClient } from "@/lib/supabase/client";

interface ImportExportPanelProps {
  onClose: () => void;
}

type ImportResult = { success: number; failed: number; errors: string[] };

export function ImportExportPanel({ onClose }: ImportExportPanelProps) {
  const {
    collections,
    activeCollectionId,
    _userId: userId,
  } = usePromptBooksStore();
  const [importing, setImporting] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [result, setResult] = useState<ImportResult | null>(null);
  const [targetCollectionId, setTargetCollectionId] = useState(
    activeCollectionId || "",
  );
  const fileInputRef = useRef<HTMLInputElement>(null);

  // ─── Import ───────────────────────────────────────────

  const handleFileSelect = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (!files || files.length === 0) return;

      setImporting(true);
      setResult(null);
      const client = createClient();
      const importResult: ImportResult = { success: 0, failed: 0, errors: [] };

      for (const file of Array.from(files)) {
        try {
          const text = await file.text();

          if (file.name.endsWith(".json")) {
            // JSON import (collection export format)
            const data = JSON.parse(text);
            if (data.prompts && Array.isArray(data.prompts)) {
              await service.importFromJson(client, userId!, data);
              importResult.success += data.prompts.length;
            } else if (data.content) {
              // Single prompt JSON
              await service.createPrompt(client, userId!, {
                title: data.title || file.name.replace(".json", ""),
                content: data.content,
                promptType: data.promptType || "general",
                collectionId: targetCollectionId || undefined,
              });
              importResult.success++;
            }
          } else if (file.name.endsWith(".md") || file.name.endsWith(".txt")) {
            // Markdown/text import
            if (isPromptMarkdown(text)) {
              const promptData = mdToPromptData(text);
              await service.createPrompt(client, userId!, {
                title: promptData.title || file.name.replace(/\.(md|txt)$/, ""),
                content: promptData.content || text,
                promptType: promptData.promptType || "general",
                negativeContent: promptData.negativeContent,
                systemPrompt: promptData.systemPrompt,
                collectionId: targetCollectionId || undefined,
              });
            } else {
              // Plain text → general prompt
              const firstLine = text
                .split("\n")[0]
                .replace(/^#+\s*/, "")
                .trim();
              await service.createPrompt(client, userId!, {
                title: firstLine || file.name.replace(/\.(md|txt)$/, ""),
                content: text,
                promptType: "general",
                collectionId: targetCollectionId || undefined,
              });
            }
            importResult.success++;
          }
        } catch (err) {
          importResult.failed++;
          importResult.errors.push(
            `${file.name}: ${err instanceof Error ? err.message : "Unknown error"}`,
          );
        }
      }

      setResult(importResult);
      setImporting(false);

      // Reload prompts
      usePromptBooksStore.getState().loadPrompts();

      // Reset file input
      if (fileInputRef.current) fileInputRef.current.value = "";
    },
    [userId, targetCollectionId],
  );

  // ─── Export ───────────────────────────────────────────

  const handleExportCollection = useCallback(
    async (collectionId: string) => {
      setExporting(true);
      try {
        const client = createClient();
        const data = await service.exportCollectionAsJson(client, collectionId);
        const collection = collections.find((c) => c.id === collectionId);
        const filename = `${collection?.name.replace(/\s+/g, "-").toLowerCase() || "collection"}-export.json`;

        const blob = new Blob([JSON.stringify(data, null, 2)], {
          type: "application/json",
        });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = filename;
        a.click();
        URL.revokeObjectURL(url);
      } finally {
        setExporting(false);
      }
    },
    [collections],
  );

  const handleExportAll = useCallback(async () => {
    setExporting(true);
    try {
      const client = createClient();
      const allData: Record<string, unknown> = {
        exportedAt: new Date().toISOString(),
        collections: [],
      };

      for (const collection of collections) {
        const data = await service.exportCollectionAsJson(
          client,
          collection.id,
        );
        (allData.collections as unknown[]).push({
          ...data,
          collectionName: collection.name,
        });
      }

      const blob = new Blob([JSON.stringify(allData, null, 2)], {
        type: "application/json",
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `arcanea-prompt-books-export-${new Date().toISOString().slice(0, 10)}.json`;
      a.click();
      URL.revokeObjectURL(url);
    } finally {
      setExporting(false);
    }
  }, [collections]);

  return (
    <div className="space-y-6">
      {/* Import Section */}
      <section>
        <h3 className="text-xs font-display text-text-primary mb-3 uppercase tracking-wider">
          Import
        </h3>

        <div className="glass-subtle rounded-xl p-4 space-y-3">
          {/* Target collection */}
          <div>
            <label className="text-[10px] font-sans text-text-muted mb-1 block">
              Import into collection
            </label>
            <select
              value={targetCollectionId}
              onChange={(e) => setTargetCollectionId(e.target.value)}
              className="w-full bg-white/[0.03] border border-white/10 rounded-lg px-3 py-2 text-xs font-sans text-text-primary focus:outline-none"
            >
              <option value="">No collection (uncategorized)</option>
              {collections.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          {/* File drop zone */}
          <div
            className={cn(
              "border-2 border-dashed rounded-xl p-6 text-center transition-colors cursor-pointer",
              "border-white/10 hover:border-brand-accent/30 hover:bg-white/[0.02]",
            )}
            onClick={() => fileInputRef.current?.click()}
          >
            <Upload className="w-6 h-6 text-text-muted/40 mx-auto mb-2" />
            <p className="text-xs font-sans text-text-muted">
              Drop files or click to browse
            </p>
            <p className="text-[10px] font-sans text-text-muted/50 mt-1">
              .json, .md, .txt supported
            </p>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept=".json,.md,.txt,.markdown"
            multiple
            className="hidden"
            onChange={handleFileSelect}
          />

          {importing && (
            <p className="text-xs font-sans text-brand-accent animate-pulse">
              Importing...
            </p>
          )}

          {result && (
            <div
              className={cn(
                "rounded-lg p-3 text-xs font-sans",
                result.failed > 0
                  ? "bg-error/10 text-error"
                  : "bg-success/10 text-success",
              )}
            >
              <div className="flex items-center gap-1.5">
                {result.failed > 0 ? (
                  <AlertCircle className="w-3.5 h-3.5" />
                ) : (
                  <Check className="w-3.5 h-3.5" />
                )}
                <span>
                  {result.success} imported, {result.failed} failed
                </span>
              </div>
              {result.errors.length > 0 && (
                <ul className="mt-2 space-y-0.5 text-[10px] text-error/70">
                  {result.errors.map((err, i) => (
                    <li key={i}>{err}</li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Export Section */}
      <section>
        <h3 className="text-xs font-display text-text-primary mb-3 uppercase tracking-wider">
          Export
        </h3>

        <div className="glass-subtle rounded-xl p-4 space-y-2">
          <Button
            onClick={handleExportAll}
            disabled={exporting || collections.length === 0}
            className="w-full justify-start gap-2 glass text-xs"
          >
            <FolderDown className="w-3.5 h-3.5" />
            Export All Collections (JSON)
          </Button>

          {collections.length > 0 && (
            <div className="pt-2 border-t border-white/[0.04] space-y-1">
              <p className="text-[10px] font-sans text-text-muted mb-1">
                Export single collection:
              </p>
              {collections.map((c) => (
                <button
                  key={c.id}
                  onClick={() => handleExportCollection(c.id)}
                  disabled={exporting}
                  className={cn(
                    "w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-sans text-left",
                    "text-text-secondary hover:text-text-primary hover:bg-white/[0.03] transition-colors",
                  )}
                >
                  <FileJson className="w-3 h-3 text-text-muted shrink-0" />
                  {c.name}
                  <span className="text-[10px] text-text-muted/50 ml-auto">
                    {c.promptCount} prompts
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
