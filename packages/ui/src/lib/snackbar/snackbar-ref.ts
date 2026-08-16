export class ElSnackbarRef {
  readonly afterClosed: Promise<void>;
  readonly actionClick: Promise<void>;

  private settled = false;
  private actionSettled = false;
  private resolveClosed!: () => void;
  private resolveAction!: () => void;

  constructor(private readonly destroyOverlay: () => void) {
    this.afterClosed = new Promise((resolve) => {
      this.resolveClosed = resolve;
    });
    this.actionClick = new Promise((resolve) => {
      this.resolveAction = resolve;
    });
  }

  notifyAction(): void {
    if (!this.actionSettled) {
      this.actionSettled = true;
      this.resolveAction();
    }
  }

  close(): void {
    if (this.settled) {
      return;
    }

    this.settled = true;
    this.destroyOverlay();
    this.resolveClosed();
  }
}
