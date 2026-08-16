import {
  afterRenderEffect,
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  inject,
  input,
  model,
  numberAttribute,
  output,
  untracked,
} from '@angular/core';
import { ElIcon } from '../icon/icon';

export type ElSnackbarColor = 'neutral' | 'success' | 'error' | 'warning' | 'info';
export type ElSnackbarPosition = 'bottom' | 'top';

@Component({
  selector: 'el-snackbar',
  imports: [ElIcon],
  templateUrl: './snackbar.html',
  styleUrl: './snackbar.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'el-snackbar-host',
    '[attr.role]': 'liveRole()',
    '[attr.aria-live]': 'livePoliteness()',
    'aria-atomic': 'true',
  },
})
export class ElSnackbar {
  private readonly destroyRef = inject(DestroyRef);

  readonly open = model(false);
  readonly message = input('');
  readonly action = input('');
  readonly color = input<ElSnackbarColor>('neutral');
  readonly duration = input(4000, { transform: numberAttribute });
  readonly dismissible = input(true, { transform: booleanAttribute });
  readonly position = input<ElSnackbarPosition>('bottom');
  readonly actionClick = output<void>();

  private timer: ReturnType<typeof setTimeout> | null = null;

  protected readonly liveRole = computed(() =>
    this.color() === 'error' ? 'alert' : 'status',
  );

  protected readonly livePoliteness = computed(() =>
    this.color() === 'error' ? 'assertive' : 'polite',
  );

  protected readonly rootClass = computed(() => ({
    'el-snackbar': true,
    [`el-snackbar--${this.color()}`]: true,
    [`el-snackbar--${this.position()}`]: true,
  }));

  constructor() {
    this.destroyRef.onDestroy(() => this.clearTimer());

    afterRenderEffect(() => {
      const isOpen = this.open();
      const duration = this.duration();
      untracked(() => this.syncTimer(isOpen, duration));
    });
  }

  protected onAction(): void {
    this.actionClick.emit();
    this.close();
  }

  close(): void {
    if (!this.open()) {
      return;
    }

    this.open.set(false);
  }

  private syncTimer(isOpen: boolean, duration: number): void {
    this.clearTimer();
    if (!isOpen || duration <= 0) {
      return;
    }

    this.timer = setTimeout(() => this.close(), duration);
  }

  private clearTimer(): void {
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
  }
}
