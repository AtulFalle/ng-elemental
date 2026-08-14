import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'el-form-error',
  templateUrl: './form-error.html',
  styleUrl: './form-error.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'el-form-error',
    role: 'alert',
  },
})
export class ElFormError {}
