import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  ElementRef,
  inject,
  input,
  model,
  signal,
  viewChild,
} from '@angular/core';
import { ElAttachment } from '../attachment/attachment';
import { ElAttachmentAction } from '../attachment/attachment-action';
import { ElAttachmentActions } from '../attachment/attachment-actions';
import { ElAttachmentContent } from '../attachment/attachment-content';
import { ElAttachmentDescription } from '../attachment/attachment-description';
import { ElAttachmentMedia } from '../attachment/attachment-media';
import { ElAttachmentTitle } from '../attachment/attachment-title';
import { ElButton } from '../button/button';
import { ElFormError } from '../form-error/form-error';
import { ElIcon, type ElIconSize } from '../icon/icon';
import {
  defaultFileIconName,
  fileExtensionLabel,
  filterIncomingFiles,
  formatFileSize,
  isImageFile,
} from './file-upload-utils';

export type ElFileUploadSize = 'sm' | 'md' | 'lg';

interface ElFileUploadItem {
  readonly file: File;
  readonly key: string;
  readonly previewUrl: string | null;
  readonly iconName: string;
  readonly description: string;
}

@Component({
  selector: 'el-file-upload',
  imports: [
    ElAttachment,
    ElAttachmentAction,
    ElAttachmentActions,
    ElAttachmentContent,
    ElAttachmentDescription,
    ElAttachmentMedia,
    ElAttachmentTitle,
    ElButton,
    ElFormError,
    ElIcon,
  ],
  templateUrl: './file-upload.html',
  styleUrl: './file-upload.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'el-file-upload-host',
  },
})
export class ElFileUpload {
  private readonly destroyRef = inject(DestroyRef);
  private readonly previewUrls = new Map<File, string>();
  private dragDepth = 0;

  readonly files = model<File[]>([]);
  readonly multiple = input(false, { transform: booleanAttribute });
  readonly accept = input('');
  readonly maxFiles = input<number | null>(null);
  readonly maxSize = input<number | null>(null);
  readonly disabled = input(false, { transform: booleanAttribute });
  readonly size = input<ElFileUploadSize>('md');
  readonly browseLabel = input('Browse files');
  readonly dropTitle = input('Drop files here');

  private readonly fileInput =
    viewChild<ElementRef<HTMLInputElement>>('fileInput');

  protected readonly dragActive = signal(false);
  protected readonly dragReject = signal(false);
  protected readonly validationError = signal<string | null>(null);

  protected readonly rootClass = computed(() => ({
    'el-file-upload': true,
    [`el-file-upload--${this.size()}`]: true,
    'el-file-upload--disabled': this.disabled(),
    'el-file-upload--active': this.dragActive() && !this.dragReject(),
    'el-file-upload--reject': this.dragReject(),
  }));

  protected readonly dropzoneClass = computed(() => ({
    'el-file-upload__dropzone': true,
    'el-file-upload__dropzone--active': this.dragActive() && !this.dragReject(),
    'el-file-upload__dropzone--reject': this.dragReject(),
    'el-file-upload__dropzone--disabled': this.disabled(),
  }));

  protected readonly iconSize = computed((): ElIconSize => {
    const size = this.size();
    return size === 'lg' ? 'lg' : size === 'sm' ? 'sm' : 'md';
  });

  protected readonly items = computed((): ElFileUploadItem[] =>
    this.files().map((file, index) => ({
      file,
      key: `${file.name}-${file.size}-${file.lastModified}-${index}`,
      previewUrl: this.previewUrls.get(file) ?? null,
      iconName: defaultFileIconName(file),
      description: `${fileExtensionLabel(file.name)} · ${formatFileSize(file.size)}`,
    })),
  );

  constructor() {
    this.destroyRef.onDestroy(() => this.revokeAllPreviews());
  }

  protected openFilePicker(event?: Event): void {
    event?.stopPropagation();
    if (this.disabled()) {
      return;
    }
    this.fileInput()?.nativeElement.click();
  }

  protected onDropzoneKeydown(event: Event): void {
    event.preventDefault();
    this.openFilePicker(event);
  }

  protected onFileInputChange(event: Event): void {
    const inputEl = event.target as HTMLInputElement;
    const list = inputEl.files;
    if (list?.length) {
      this.commitFiles(Array.from(list));
    }
    inputEl.value = '';
  }

  protected onDragEnter(event: DragEvent): void {
    event.preventDefault();
    if (this.disabled()) {
      return;
    }
    this.dragDepth += 1;
    this.dragActive.set(true);
    this.dragReject.set(this.isDragRejected(event));
  }

  protected onDragOver(event: DragEvent): void {
    event.preventDefault();
    if (this.disabled()) {
      return;
    }
    this.dragActive.set(true);
    this.dragReject.set(this.isDragRejected(event));
    if (event.dataTransfer) {
      event.dataTransfer.dropEffect = this.dragReject() ? 'none' : 'copy';
    }
  }

  protected onDragLeave(event: DragEvent): void {
    event.preventDefault();
    this.dragDepth = Math.max(0, this.dragDepth - 1);
    if (this.dragDepth === 0) {
      this.dragActive.set(false);
      this.dragReject.set(false);
    }
  }

  protected onDrop(event: DragEvent): void {
    event.preventDefault();
    this.dragDepth = 0;
    this.dragActive.set(false);
    this.dragReject.set(false);
    if (this.disabled()) {
      return;
    }
    const list = event.dataTransfer?.files;
    if (list?.length) {
      this.commitFiles(Array.from(list));
    }
  }

  protected removeFile(file: File): void {
    this.revokePreview(file);
    this.files.update((current) => current.filter((item) => item !== file));
    this.validationError.set(null);
  }

  private commitFiles(incoming: File[]): void {
    const result = filterIncomingFiles({
      incoming,
      current: this.files(),
      multiple: this.multiple(),
      accept: this.accept(),
      maxFiles: this.maxFiles(),
      maxSize: this.maxSize(),
    });

    this.validationError.set(result.error);

    if (result.accepted.length === 0) {
      return;
    }

    for (const file of result.accepted) {
      if (isImageFile(file)) {
        this.ensurePreviewUrl(file);
      }
    }

    if (!this.multiple()) {
      for (const existing of this.files()) {
        if (!result.accepted.includes(existing)) {
          this.revokePreview(existing);
        }
      }
      this.files.set(result.accepted);
      return;
    }

    this.files.update((current) => [...current, ...result.accepted]);
  }

  private isDragRejected(event: DragEvent): boolean {
    const accept = this.accept().trim();
    if (!accept) {
      return false;
    }
    const items = event.dataTransfer?.items;
    if (!items?.length) {
      return false;
    }
    for (let i = 0; i < items.length; i += 1) {
      const item = items[i];
      if (!item || item.kind !== 'file') {
        continue;
      }
      const type = item.type;
      if (!type) {
        continue;
      }
      const tokens = accept.split(',').map((part) => part.trim().toLowerCase());
      const matched = tokens.some((token) => {
        if (!token || token.startsWith('.')) {
          return true;
        }
        if (token.endsWith('/*')) {
          return type.startsWith(token.slice(0, -1));
        }
        return type === token;
      });
      if (!matched) {
        return true;
      }
    }
    return false;
  }

  private ensurePreviewUrl(file: File): string {
    const existing = this.previewUrls.get(file);
    if (existing) {
      return existing;
    }
    const url = URL.createObjectURL(file);
    this.previewUrls.set(file, url);
    return url;
  }

  private revokePreview(file: File): void {
    const url = this.previewUrls.get(file);
    if (url) {
      URL.revokeObjectURL(url);
      this.previewUrls.delete(file);
    }
  }

  private revokeAllPreviews(): void {
    for (const url of this.previewUrls.values()) {
      URL.revokeObjectURL(url);
    }
    this.previewUrls.clear();
  }
}
