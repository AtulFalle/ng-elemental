import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';
import { EL_ATTACHMENT } from './attachment.token';

export type ElAttachmentState =
  | 'idle'
  | 'uploading'
  | 'processing'
  | 'error'
  | 'done';
export type ElAttachmentSize = 'sm' | 'md' | 'lg';
export type ElAttachmentOrientation = 'horizontal' | 'vertical';

@Component({
  selector: 'el-attachment',
  templateUrl: './attachment.html',
  styleUrl: './attachment.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: EL_ATTACHMENT, useExisting: ElAttachment }],
  host: {
    class: 'el-attachment-host',
    '[attr.aria-busy]':
      "state() === 'uploading' || state() === 'processing' ? true : null",
  },
})
export class ElAttachment {
  readonly state = input<ElAttachmentState>('done');
  readonly size = input<ElAttachmentSize>('md');
  readonly orientation = input<ElAttachmentOrientation>('horizontal');

  protected readonly rootClass = computed(() => ({
    'el-attachment': true,
    [`el-attachment--${this.size()}`]: true,
    [`el-attachment--${this.orientation()}`]: true,
    [`el-attachment--${this.state()}`]: true,
  }));
}
