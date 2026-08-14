import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from '@angular/core';
import { EL_ATTACHMENT } from './attachment.token';

@Component({
  selector: 'el-attachment-title',
  templateUrl: './attachment-title.html',
  styleUrl: './attachment-title.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'el-attachment-title-host',
  },
})
export class ElAttachmentTitle {
  private readonly attachment = inject(EL_ATTACHMENT, { optional: true });

  protected readonly titleClass = computed(() => {
    const state = this.attachment?.state() ?? 'done';
    return {
      'el-attachment-title': true,
      'el-attachment-title--shimmer':
        state === 'uploading' || state === 'processing',
    };
  });
}
