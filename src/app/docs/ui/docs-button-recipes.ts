import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  computed,
  inject,
  signal,
} from '@angular/core';
import { ElButton, ElIcon } from '@ng-elemental/ui';

@Component({
  selector: 'app-docs-button-recipes',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ElButton, ElIcon],
  templateUrl: './docs-button-recipes.html',
  styleUrl: './docs-button-recipes.scss',
})
export class DocsButtonRecipes {
  private readonly destroyRef = inject(DestroyRef);
  private readonly timeouts = new Set<ReturnType<typeof setTimeout>>();

  protected readonly progressState = signal<'idle' | 'running' | 'success'>(
    'idle',
  );
  protected readonly copied = signal(false);
  protected readonly slideOn = signal(false);
  protected readonly saveState = signal<'idle' | 'loading' | 'success'>('idle');
  protected readonly favorited = signal(false);
  protected readonly sparkleBurstId = signal(0);

  protected readonly copyLabel = computed(() =>
    this.copied() ? 'Copied' : 'Copy',
  );

  protected readonly sparkleParticles = [
    {
      id: 1,
      x: 8,
      y: -28,
      size: 5,
      delay: '0ms',
      color: 'var(--el-color-warning)',
      diamond: false,
    },
    {
      id: 2,
      x: 24,
      y: -18,
      size: 4,
      delay: '40ms',
      color: 'var(--el-color-error)',
      diamond: true,
    },
    {
      id: 3,
      x: 28,
      y: 6,
      size: 6,
      delay: '80ms',
      color: 'var(--el-color-warning)',
      diamond: false,
    },
    {
      id: 4,
      x: 16,
      y: 24,
      size: 4,
      delay: '50ms',
      color: 'var(--el-color-success)',
      diamond: false,
    },
    {
      id: 5,
      x: -10,
      y: 26,
      size: 5,
      delay: '90ms',
      color: 'var(--el-color-warning)',
      diamond: true,
    },
    {
      id: 6,
      x: -26,
      y: 8,
      size: 4,
      delay: '30ms',
      color: 'var(--el-color-error)',
      diamond: false,
    },
    {
      id: 7,
      x: -24,
      y: -16,
      size: 6,
      delay: '70ms',
      color: 'var(--el-color-success)',
      diamond: false,
    },
    {
      id: 8,
      x: -6,
      y: -30,
      size: 3,
      delay: '20ms',
      color: 'var(--el-color-warning)',
      diamond: true,
    },
  ] as const;

  constructor() {
    this.destroyRef.onDestroy(() => {
      for (const id of this.timeouts) {
        clearTimeout(id);
      }
      this.timeouts.clear();
    });
  }

  protected runProgress(): void {
    if (this.progressState() !== 'idle') {
      return;
    }
    this.progressState.set('running');
    this.later(() => {
      this.progressState.set('success');
      this.later(() => this.progressState.set('idle'), 1800);
    }, 1100);
  }

  protected async copyRecipe(): Promise<void> {
    if (this.copied()) {
      return;
    }
    try {
      await navigator.clipboard.writeText('npx @ng-elemental/cli add button');
    } catch {
      // Demo still morphs if clipboard permission is denied.
    }
    this.copied.set(true);
    this.later(() => this.copied.set(false), 2000);
  }

  protected playSlide(): void {
    if (this.slideOn()) {
      return;
    }
    this.slideOn.set(true);
    this.later(() => this.slideOn.set(false), 650);
  }

  protected runSave(): void {
    if (this.saveState() !== 'idle') {
      return;
    }
    this.saveState.set('loading');
    this.later(() => {
      this.saveState.set('success');
      this.later(() => this.saveState.set('idle'), 1800);
    }, 1200);
  }

  protected toggleFavorite(): void {
    this.favorited.update((value) => !value);
    this.sparkleBurstId.update((id) => id + 1);
    const burstId = this.sparkleBurstId();
    this.later(() => {
      if (this.sparkleBurstId() === burstId) {
        this.sparkleBurstId.set(0);
      }
    }, 800);
  }

  private later(fn: () => void, ms: number): void {
    const id = setTimeout(() => {
      this.timeouts.delete(id);
      fn();
    }, this.motionMs(ms));
    this.timeouts.add(id);
  }

  private motionMs(ms: number): number {
    if (
      typeof matchMedia === 'function' &&
      matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return Math.min(ms, 80);
    }
    return ms;
  }
}
