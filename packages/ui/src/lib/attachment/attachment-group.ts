import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'el-attachment-group',
  templateUrl: './attachment-group.html',
  styleUrl: './attachment-group.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'el-attachment-group-host',
    role: 'group',
    '[attr.aria-label]': 'ariaLabel() || null',
  },
})
export class ElAttachmentGroup {
  readonly ariaLabel = input('Attachments');
}
