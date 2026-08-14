import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
} from '@angular/core';
import { ElButton, type ElButtonSize } from '../button/button';

@Component({
  selector: 'el-attachment-action',
  imports: [ElButton],
  templateUrl: './attachment-action.html',
  styleUrl: './attachment-action.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'el-attachment-action-host',
  },
})
export class ElAttachmentAction {
  /** Accessible name for icon-only actions. */
  readonly ariaLabel = input.required<string>();
  /** Font Awesome icon name without `fa-` prefix. */
  readonly icon = input('xmark');
  readonly disabled = input(false, { transform: booleanAttribute });
  readonly size = input<ElButtonSize>('sm');

  readonly clicked = output<MouseEvent>();

  protected readonly buttonSize = computed((): ElButtonSize => this.size());

  protected onClick(event: MouseEvent): void {
    this.clicked.emit(event);
  }
}
