import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
} from '@angular/core';
import { ElIcon } from '../icon/icon';
import type { ElToastColor } from './toast.service';

export type { ElToastColor } from './toast.service';
export {
  ElToastService,
  type ElToastOptions,
  type ElToastRecord,
} from './toast.service';

const DEFAULT_ICONS: Record<ElToastColor, string> = {
  success: 'circle-check',
  error: 'circle-xmark',
  warning: 'triangle-exclamation',
  info: 'circle-info',
  neutral: 'circle-info',
};

@Component({
  selector: 'el-toast',
  imports: [ElIcon],
  templateUrl: './toast.html',
  styleUrl: './toast.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'el-toast-host',
    role: 'status',
  },
})
export class ElToast {
  readonly color = input<ElToastColor>('neutral');
  readonly title = input('');
  readonly icon = input<string | undefined>(undefined);
  readonly dismissible = input(true, { transform: booleanAttribute });
  readonly dismissed = output<void>();

  protected readonly iconName = computed(() => {
    const icon = this.icon();
    if (icon === '') {
      return null;
    }

    if (icon) {
      return icon;
    }

    return DEFAULT_ICONS[this.color()];
  });

  protected readonly rootClass = computed(() => ({
    'el-toast': true,
    [`el-toast--${this.color()}`]: true,
  }));

  protected onDismiss(): void {
    this.dismissed.emit();
  }
}
