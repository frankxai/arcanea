# @arcanea/library-pipeline

Library pipeline for Arcanea content processing and distribution.

## Install

```bash
npm install @arcanea/library-pipeline
```

## Usage

```ts
import { LibraryPipeline } from "@arcanea/library-pipeline";

const pipeline = new LibraryPipeline({
  source: "./content",
  output: "./dist",
});

await pipeline.process();
```

## API

### `LibraryPipeline`

Core class for defining and executing content processing pipelines.

- `constructor(config)` — Initialize with source, output, and transform options.
- `process()` — Run the full pipeline from ingestion through distribution.
- `addStage(name, handler)` — Append a custom processing stage.
- `validate()` — Validate pipeline configuration before execution.

### `PipelineConfig`

TypeScript interface for pipeline source paths, output targets, and stage definitions.

### `PipelineResult`

TypeScript interface describing the outcome of a pipeline run, including processed item counts and any errors.

### `createPipeline(config)`

Factory function that returns a configured `LibraryPipeline` instance.

## Pipeline Stages

Content flows through ingestion, transformation, validation, and distribution stages. Custom stages can be inserted at any point using `addStage`.

## License

MIT
