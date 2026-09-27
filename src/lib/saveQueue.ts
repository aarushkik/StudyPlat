/** Retains the newest snapshot in memory until storage has actually committed it. */
export function createSaveQueue<T>(write: (value: T) => Promise<void>) {
  let latest: T;
  let revision = 0;
  let durableRevision = 0;
  let running: Promise<void> | null = null;

  const flush = async (): Promise<void> => {
    if (running) {
      await running;
      if (durableRevision < revision) await flush();
      return;
    }
    if (durableRevision === revision) return;
    running = (async () => {
      while (durableRevision < revision) {
        const committing = revision;
        const value = latest;
        await write(value);
        durableRevision = committing;
      }
    })().finally(() => { running = null; });
    await running;
  };

  return {
    save(value: T): Promise<void> {
      latest = value;
      revision += 1;
      return flush();
    },
    flush,
  };
}
