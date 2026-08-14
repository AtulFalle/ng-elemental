import {
  ChangeDetectionStrategy,
  Component,
  input,
  signal,
} from '@angular/core';

@Component({
  selector: 'app-code-block',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="docs-code-block">
      <div class="docs-code-block__header">
        <span class="docs-code-block__lang">{{ language() }}</span>
        <button
          type="button"
          class="docs-code-block__copy"
          (click)="copy()"
          [attr.aria-label]="copied() ? 'Copied' : 'Copy code'"
        >
          {{ copied() ? 'Copied' : 'Copy' }}
        </button>
      </div>
      <pre><code>{{ code() }}</code></pre>
    </div>
  `,
  styles: `
    .docs-code-block {
      border: 1px solid var(--docs-border);
      border-radius: 0.5rem;
      overflow: hidden;
      background: var(--docs-code-bg);
    }

    .docs-code-block__header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0.5rem 0.75rem;
      border-bottom: 1px solid var(--docs-border);
      background: var(--docs-code-header-bg);
    }

    .docs-code-block__lang {
      font-family: var(--el-font-mono);
      font-size: 0.75rem;
      color: var(--docs-muted);
      text-transform: lowercase;
    }

    .docs-code-block__copy {
      border: 1px solid var(--docs-border);
      border-radius: 0.25rem;
      background: var(--docs-surface);
      color: var(--docs-muted);
      font-family: var(--el-font-sans);
      font-size: 0.75rem;
      padding: 0.125rem 0.5rem;
      cursor: pointer;
    }

    .docs-code-block__copy:hover {
      color: var(--docs-fg);
    }

    pre {
      margin: 0;
      padding: 1rem;
      overflow-x: auto;
    }

    code {
      font-family: var(--el-font-mono);
      font-size: 0.8125rem;
      line-height: 1.6;
      color: var(--docs-code-fg);
      white-space: pre;
    }
  `,
})
export class CodeBlock {
  readonly code = input.required<string>();
  readonly language = input('typescript');

  protected readonly copied = signal(false);

  protected async copy(): Promise<void> {
    await navigator.clipboard.writeText(this.code());
    this.copied.set(true);
    setTimeout(() => this.copied.set(false), 2000);
  }
}
