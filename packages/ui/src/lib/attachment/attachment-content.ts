import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'el-attachment-content',
  templateUrl: './attachment-content.html',
  styleUrl: './attachment-content.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'el-attachment-content-host',
  },
})
export class ElAttachmentContent {}
