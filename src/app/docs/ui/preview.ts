import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-preview',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="docs-preview">
      <div class="docs-preview__label">Preview</div>
      <div class="docs-preview__content">
        <ng-content />
      </div>
    </div>
  `,
  styles: `
    .docs-preview {
      border: 1px solid var(--docs-border);
      border-radius: 0.5rem;
      overflow: visible;
      margin-block: 1rem;
    }

    .docs-preview__label {
      padding: 0.5rem 0.75rem;
      font-size: 0.75rem;
      font-weight: 600;
      color: var(--docs-muted);
      border-bottom: 1px solid var(--docs-border);
      background: var(--docs-surface-muted);
    }

    .docs-preview__content {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 0.75rem;
      padding: 2rem 1.5rem;
      background: var(--docs-surface);
    }
  `,
})
export class Preview {}
