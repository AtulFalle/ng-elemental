import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'el-attachment-description',
  templateUrl: './attachment-description.html',
  styleUrl: './attachment-description.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'el-attachment-description-host',
  },
})
export class ElAttachmentDescription {}
