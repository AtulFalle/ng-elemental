import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { ElToast } from './toast';
import { ElToastService } from './toast.service';

export type ElToasterPosition =
  | 'top-start'
  | 'top-end'
  | 'bottom-start'
  | 'bottom-end';

@Component({
  selector: 'el-toaster',
  imports: [ElToast],
  templateUrl: './toaster.html',
  styleUrl: './toaster.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'el-toaster',
    '[class.el-toaster--top-start]': 'position() === "top-start"',
    '[class.el-toaster--top-end]': 'position() === "top-end"',
    '[class.el-toaster--bottom-start]': 'position() === "bottom-start"',
    '[class.el-toaster--bottom-end]': 'position() === "bottom-end"',
  },
})
export class ElToaster {
  private readonly toastService = inject(ElToastService);

  readonly position = input<ElToasterPosition>('bottom-end');

  protected readonly toasts = this.toastService.toasts;

  protected onDismissed(id: string): void {
    this.toastService.dismiss(id);
  }
}
