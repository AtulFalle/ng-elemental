import { DestroyRef, inject, Injectable, signal } from '@angular/core';

export type ElToastColor = 'neutral' | 'success' | 'error' | 'warning' | 'info';

export interface ElToastOptions {
  color?: ElToastColor;
  title?: string;
  duration?: number;
  dismissible?: boolean;
}

export interface ElToastRecord {
  id: string;
  message: string;
  color: ElToastColor;
  title: string;
  dismissible: boolean;
}

const MAX_TOASTS = 5;
const DEFAULT_DURATION = 4000;

@Injectable({ providedIn: 'root' })
export class ElToastService {
  private nextId = 0;
  private readonly timers = new Map<string, ReturnType<typeof setTimeout>>();
  readonly toasts = signal<ElToastRecord[]>([]);

  constructor() {
    inject(DestroyRef).onDestroy(() => this.clear());
  }

  show(message: string, options: ElToastOptions = {}): string {
    const id = `el-toast-${++this.nextId}`;
    const duration = options.duration ?? DEFAULT_DURATION;
    const record: ElToastRecord = {
      id,
      message,
      color: options.color ?? 'neutral',
      title: options.title ?? '',
      dismissible: options.dismissible ?? true,
    };

    this.toasts.update((list) => {
      const next = [...list, record];
      if (next.length <= MAX_TOASTS) {
        return next;
      }

      const dropped = next.slice(0, next.length - MAX_TOASTS);
      for (const toast of dropped) {
        this.clearTimer(toast.id);
      }

      return next.slice(next.length - MAX_TOASTS);
    });

    if (duration > 0) {
      this.timers.set(
        id,
        setTimeout(() => this.dismiss(id), duration),
      );
    }

    return id;
  }

  dismiss(id: string): void {
    this.clearTimer(id);
    this.toasts.update((list) => list.filter((toast) => toast.id !== id));
  }

  clear(): void {
    for (const id of this.timers.keys()) {
      this.clearTimer(id);
    }

    this.toasts.set([]);
  }

  private clearTimer(id: string): void {
    const timer = this.timers.get(id);
    if (timer) {
      clearTimeout(timer);
      this.timers.delete(id);
    }
  }
}
