import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { DOC_NAV } from '../nav';

@Component({
  selector: 'app-doc-layout',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './doc-layout.html',
  styleUrl: './doc-layout.scss',
})
export class DocLayout {
  protected readonly nav = DOC_NAV;
}
