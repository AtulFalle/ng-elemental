import {
  ChangeDetectionStrategy,
  Component,
  input,
  signal,
} from '@angular/core';

@Component({
  selector: 'app-docs-snippet',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './docs-snippet.html',
  styleUrl: './docs-snippet.scss',
})
export class DocsSnippet {
  readonly code = input.required<string>();

  protected readonly copied = signal(false);

  protected async copy(): Promise<void> {
    await navigator.clipboard.writeText(this.code());
    this.copied.set(true);
    setTimeout(() => this.copied.set(false), 2000);
  }
}
