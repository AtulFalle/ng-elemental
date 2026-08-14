/** Human-readable file size (e.g. `2.4 MB`). */
export function formatFileSize(bytes: number): string {
  if (!Number.isFinite(bytes) || bytes < 0) {
    return '0 B';
  }
  if (bytes < 1024) {
    return `${bytes} B`;
  }
  const units = ['KB', 'MB', 'GB', 'TB'] as const;
  let value = bytes / 1024;
  let unitIndex = 0;
  while (value >= 1024 && unitIndex < units.length - 1) {
    value /= 1024;
    unitIndex += 1;
  }
  const rounded = value >= 10 || unitIndex === 0 ? Math.round(value) : Math.round(value * 10) / 10;
  return `${rounded} ${units[unitIndex]}`;
}

/** Uppercase extension label from a file name (fallback `FILE`). */
export function fileExtensionLabel(fileName: string): string {
  const dot = fileName.lastIndexOf('.');
  if (dot <= 0 || dot === fileName.length - 1) {
    return 'FILE';
  }
  return fileName.slice(dot + 1).toUpperCase();
}

export function isImageFile(file: File): boolean {
  return file.type.startsWith('image/');
}

export function defaultFileIconName(file: File): string {
  const type = file.type;
  const name = file.name.toLowerCase();
  if (type.startsWith('image/') || /\.(png|jpe?g|gif|webp|svg)$/.test(name)) {
    return 'file-image';
  }
  if (type === 'application/pdf' || name.endsWith('.pdf')) {
    return 'file-pdf';
  }
  if (
    type.includes('zip') ||
    type.includes('compressed') ||
    /\.(zip|rar|7z|gz|tar)$/.test(name)
  ) {
    return 'file-zipper';
  }
  if (
    type.includes('javascript') ||
    type.includes('typescript') ||
    type.includes('json') ||
    /\.(tsx?|jsx?|json|css|scss|html)$/.test(name)
  ) {
    return 'file-code';
  }
  if (type.includes('sheet') || /\.(xlsx?|csv)$/.test(name)) {
    return name.endsWith('.csv') ? 'file-csv' : 'file-excel';
  }
  return 'file-lines';
}

/**
 * Whether `file` matches a native `accept` attribute value.
 * Empty accept accepts everything.
 */
export function fileMatchesAccept(file: File, accept: string): boolean {
  const trimmed = accept.trim();
  if (!trimmed) {
    return true;
  }

  const tokens = trimmed.split(',').map((part) => part.trim().toLowerCase());
  const fileName = file.name.toLowerCase();
  const mime = file.type.toLowerCase();

  return tokens.some((token) => {
    if (!token) {
      return false;
    }
    if (token.startsWith('.')) {
      return fileName.endsWith(token);
    }
    if (token.endsWith('/*')) {
      const prefix = token.slice(0, -1);
      return mime.startsWith(prefix);
    }
    return mime === token;
  });
}

export interface FileSelectionResult {
  readonly accepted: File[];
  readonly error: string | null;
}

export function filterIncomingFiles(options: {
  readonly incoming: readonly File[];
  readonly current: readonly File[];
  readonly multiple: boolean;
  readonly accept: string;
  readonly maxFiles: number | null;
  readonly maxSize: number | null;
}): FileSelectionResult {
  const { incoming, current, multiple, accept, maxFiles, maxSize } = options;

  if (incoming.length === 0) {
    return { accepted: [], error: null };
  }

  const accepted: File[] = [];
  let error: string | null = null;

  for (const file of incoming) {
    if (!fileMatchesAccept(file, accept)) {
      error = `"${file.name}" is not an accepted file type.`;
      continue;
    }
    if (maxSize != null && file.size > maxSize) {
      error = `"${file.name}" exceeds the maximum size of ${formatFileSize(maxSize)}.`;
      continue;
    }
    accepted.push(file);
  }

  if (!multiple) {
    const first = accepted[0];
    if (!first) {
      return { accepted: [], error };
    }
    return { accepted: [first], error };
  }

  const capacity =
    maxFiles == null ? Number.POSITIVE_INFINITY : Math.max(0, maxFiles - current.length);

  if (capacity <= 0) {
    return {
      accepted: [],
      error: maxFiles == null ? error : `You can upload at most ${maxFiles} files.`,
    };
  }

  if (accepted.length > capacity) {
    error =
      error ??
      (maxFiles == null
        ? null
        : `Only ${capacity} more file${capacity === 1 ? '' : 's'} can be added.`);
    return { accepted: accepted.slice(0, capacity), error };
  }

  return { accepted, error };
}
