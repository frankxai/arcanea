// Type declarations for modules without types

declare module 'exifr' {
  export interface ExifrOptions {
    pick?: string[];
    skip?: string[];
    translateKeys?: boolean;
    translateValues?: boolean;
    reviveValues?: boolean;
    sanitize?: boolean;
    mergeOutput?: boolean;
  }

  export interface ExifData {
    [key: string]: unknown;
    Make?: string;
    Model?: string;
    DateTimeOriginal?: Date;
    ExposureTime?: number;
    FNumber?: number;
    ISO?: number;
    FocalLength?: number;
    GPSLatitude?: number;
    GPSLongitude?: number;
    ImageWidth?: number;
    ImageHeight?: number;
    Orientation?: number;
  }

  export function parse(input: Buffer | ArrayBuffer | string | File | Blob, options?: ExifrOptions): Promise<ExifData | null>;
  export function thumbnail(input: Buffer | ArrayBuffer | string | File | Blob): Promise<Buffer | null>;
  export function gps(input: Buffer | ArrayBuffer | string | File | Blob): Promise<{ latitude: number; longitude: number } | null>;
  export function orientation(input: Buffer | ArrayBuffer | string | File | Blob): Promise<number | null>;

  const exifr: {
    parse: typeof parse;
    thumbnail: typeof thumbnail;
    gps: typeof gps;
    orientation: typeof orientation;
  };

  export default exifr;
}

declare module 'image-size' {
  export interface ISizeCalculationResult {
    width: number | undefined;
    height: number | undefined;
    orientation?: number;
    type?: string;
  }

  export function imageSize(input: Buffer | string): ISizeCalculationResult;
  export function imageSizeFromBuffer(buffer: Buffer): ISizeCalculationResult;

  export default imageSize;
}
