import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  Injector,
  signal,
} from '@angular/core';
import { Router } from '@angular/router';
import {
  ElAutocomplete,
  ElAutocompleteEmpty,
  ElAutocompleteItem,
  ElDialog,
  ElEmptyState,
  ElIcon,
} from '@ng-elemental/ui';
import { DOC_NAV } from '../nav';

export interface DocsSearchItem {
  path: string;
  label: string;
  section: string;
}

@Component({
  selector: 'app-docs-search',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ElAutocomplete,
    ElAutocompleteEmpty,
    ElAutocompleteItem,
    ElDialog,
    ElEmptyState,
    ElIcon,
  ],
  templateUrl: './docs-search.html',
  styleUrl: './docs-search.scss',
  host: {
    class: 'docs-search',
    '(document:keydown)': 'onDocumentKeydown($event)',
  },
})
export class DocsSearch {
  private readonly router = inject(Router);
  private readonly host = inject(ElementRef<HTMLElement>);
  private readonly injector = inject(Injector);

  protected readonly items: DocsSearchItem[] = DOC_NAV.flatMap((section) =>
    section.items.map((item) => ({
      path: item.path,
      label: item.label,
      section: section.title,
    })),
  );

  protected readonly dialogOpen = signal(false);
  protected readonly listOpen = signal(false);
  protected readonly query = signal('');
  protected readonly selected = signal('');
  protected readonly isMac = DocsSearch.detectMac();
  protected readonly shortcutHint = this.isMac ? '⌘ K' : 'Ctrl K';

  protected openSearch(): void {
    this.query.set('');
    this.selected.set('');
    this.listOpen.set(true);
    this.dialogOpen.set(true);

    afterNextRender(
      () => {
        const input = this.host.nativeElement.querySelector('input');
        if (!(input instanceof HTMLInputElement)) {
          return;
        }
        input.focus();
        input.dispatchEvent(
          new KeyboardEvent('keydown', {
            key: 'ArrowDown',
            bubbles: true,
            cancelable: true,
          }),
        );
      },
      { injector: this.injector },
    );
  }

  protected closeSearch(): void {
    this.resetSearchState();
    this.dialogOpen.set(false);
  }

  protected onDialogOpenChange(open: boolean): void {
    this.dialogOpen.set(open);
    if (!open) {
      this.resetSearchState();
    }
  }

  protected onListOpenChange(open: boolean): void {
    this.listOpen.set(open);
    if (!open && this.dialogOpen()) {
      this.closeSearch();
    }
  }

  protected onSelected(path: string): void {
    if (!this.dialogOpen() || !path) {
      return;
    }
    void this.router.navigateByUrl(path);
    this.closeSearch();
  }

  private resetSearchState(): void {
    this.listOpen.set(false);
    this.query.set('');
    this.selected.set('');
  }

  protected onDocumentKeydown(event: KeyboardEvent): void {
    if (!(event.ctrlKey || event.metaKey) || event.key.toLowerCase() !== 'k') {
      return;
    }

    if (this.dialogOpen()) {
      event.preventDefault();
      this.closeSearch();
      return;
    }

    const target = event.target;
    if (target instanceof HTMLElement) {
      const tag = target.tagName;
      if (
        tag === 'INPUT' ||
        tag === 'TEXTAREA' ||
        tag === 'SELECT' ||
        target.isContentEditable
      ) {
        return;
      }
    }

    event.preventDefault();
    this.openSearch();
  }

  private static detectMac(): boolean {
    if (typeof navigator === 'undefined') {
      return false;
    }
    const platform =
      (navigator as Navigator & { userAgentData?: { platform?: string } })
        .userAgentData?.platform ??
      navigator.platform ??
      '';
    return /Mac|iPhone|iPad|iPod/i.test(platform) || /Mac/i.test(navigator.userAgent);
  }
}
