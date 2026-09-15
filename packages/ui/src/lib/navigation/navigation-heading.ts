import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'el-nav-heading',
  templateUrl: './navigation-heading.html',
  styleUrl: './navigation-heading.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'el-nav-heading-host',
  },
})
export class ElNavHeading {}
