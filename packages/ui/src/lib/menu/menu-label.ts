import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'el-menu-label',
  template: `<span class="el-menu-label"><ng-content /></span>`,
  styles: `
    :host {
      display: block;
      padding: 0.5rem 0.5rem 0.25rem;
    }

    .el-menu-label {
      color: var(--el-color-on-surface-variant);
      font-family: var(--el-font-sans);
      font-size: 0.6875rem;
      font-weight: 600;
      letter-spacing: 0.04em;
      line-height: 1.2;
      text-transform: uppercase;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'el-menu-label-host',
  },
})
export class ElMenuLabel {}
