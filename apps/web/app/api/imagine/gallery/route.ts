import { list } from '@vercel/blob';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    if (!process.env.BLOB_READ_WRITE_TOKEN) {
      return NextResponse.json({ images: [], hasStorage: false });
    }

    const { blobs } = await list({
      prefix: 'imagine/',
      limit: 100,
    });

    const images = blobs
      .sort((a, b) => new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime())
      .map((blob) => ({
        url: blob.url,
        pathname: blob.pathname,
        uploadedAt: blob.uploadedAt,
        size: blob.size,
      }));

    return NextResponse.json({ images, hasStorage: true });
  } catch (error) {
    console.error('Gallery API error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to load gallery' },
      { status: 500 }
    );
  }
}
