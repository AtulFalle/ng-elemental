import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
} from '@angular/core';
import { ElIcon } from '../icon/icon';

export type ElAlertColor = 'neutral' | 'success' | 'error' | 'warning' | 'info';

const DEFAULT_ICONS: Record<ElAlertColor, string> = {
  success: 'circle-check',
  error: 'circle-xmark',
  warning: 'triangle-exclamation',
  info: 'circle-info',
  neutral: 'circle-info',
};

@Component({
  selector: 'el-alert',
  imports: [ElIcon],
  templateUrl: './alert.html',
  styleUrl: './alert.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'el-alert-host',
    '[attr.role]': 'role()',
  },
})
export class ElAlert {
  readonly color = input<ElAlertColor>('info');
  readonly title = input('');
  readonly icon = input<string | undefined>(undefined);
  readonly dismissible = input(false, { transform: booleanAttribute });
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

  protected readonly role = computed(() => {
    const color = this.color();
    return color === 'error' || color === 'warning' ? 'alert' : 'status';
  });

  protected readonly rootClass = computed(() => ({
    'el-alert': true,
    [`el-alert--${this.color()}`]: true,
  }));

  protected onDismiss(): void {
    this.dismissed.emit();
  }
}
