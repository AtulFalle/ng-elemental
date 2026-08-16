export class ElDialogRef<R = unknown> {
  readonly afterClosed: Promise<R | undefined>;

  private settled = false;
  private resolveClosed!: (value: R | undefined) => void;

  constructor(private readonly destroyOverlay: () => void) {
    this.afterClosed = new Promise((resolve) => {
      this.resolveClosed = resolve;
    });
  }

  close(result?: R): void {
    if (this.settled) {
      return;
    }

    this.settled = true;
    this.destroyOverlay();
    this.resolveClosed(result);
  }
}
