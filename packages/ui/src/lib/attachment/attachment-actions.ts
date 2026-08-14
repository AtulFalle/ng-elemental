import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'el-attachment-actions',
  templateUrl: './attachment-actions.html',
  styleUrl: './attachment-actions.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'el-attachment-actions-host',
  },
})
export class ElAttachmentActions {}
