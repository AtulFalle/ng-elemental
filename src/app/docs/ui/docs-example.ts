import {
  ChangeDetectionStrategy,
  Component,
  contentChild,
  input,
  model,
  TemplateRef,
} from '@angular/core';
import {
  ElIcon,
  ElSegmentedButton,
  ElSegmentedButtonItem,
} from '@ng-elemental/ui';
import { CodeBlock } from './code-block';

export type DocsExampleMode = 'preview' | 'code' | 'standards';

@Component({
  selector: 'app-docs-example',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ElIcon,
    ElSegmentedButton,
    ElSegmentedButtonItem,
    CodeBlock,
  ],
  templateUrl: './docs-example.html',
  styleUrl: './docs-example.scss',
})
export class DocsExample {
  readonly code = input('');
  readonly language = input('html');
  readonly mode = model<DocsExampleMode>('preview');
  readonly standards = contentChild<TemplateRef<unknown>>('standards');

  protected setMode(value: string): void {
    if (value === 'preview' || value === 'code' || value === 'standards') {
      this.mode.set(value);
    }
  }
}
