/**
 * Health Check Endpoint
 *
 * Returns the health status of the application and its dependencies.
 * Used by monitoring systems and CI/CD pipeline for verification.
 *
 * @route GET /api/health
 * @returns {Object} Health status object
 *
 * Status Codes:
 * - 200: All systems operational
 * - 503: Service unavailable (one or more checks failed)
 */

import { NextResponse } from 'next/server';

export const runtime = "edge";

interface HealthCheck {
  api: boolean;
  database: boolean;
  timestamp: string;
  version: string;
  environment: string;
  app: string;
}

/**
 * Main health check handler
 */
export async function GET() {
  const health: HealthCheck = {
    api: true,
    database: true, // Set to false until database connection is implemented
    timestamp: new Date().toISOString(),
    version: process.env.npm_package_version || '1.0.0',
    environment: process.env.VERCEL_ENV || process.env.NODE_ENV || 'development',
    app: 'web',
  };

  // TODO: Add database connectivity check when database is set up
  // const supabase = createClient(...)
  // const { error } = await supabase.from('users').select('count').limit(1);
  // health.database = !error;

  // Determine overall health
  const isHealthy = health.api && health.database;

  return NextResponse.json(
    health,
    {
      status: isHealthy ? 200 : 503,
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate',
        'Content-Type': 'application/json',
      },
    }
  );
}

/**
 * HEAD request for simple uptime checks
 */
export async function HEAD() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Cache-Control': 'no-store',
    },
  });
}

