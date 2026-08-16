import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'el-menu-separator',
  template: '',
  styles: `
    :host {
      display: block;
      height: 0;
      margin: 0.25rem 0.5rem;
      border: 0;
      border-block-start: var(--el-border-width) solid
        var(--el-color-outline-variant);
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'el-menu-separator',
    role: 'separator',
  },
})
export class ElMenuSeparator {}
