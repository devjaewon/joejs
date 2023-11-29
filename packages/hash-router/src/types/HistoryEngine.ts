export interface HistoryEngine {
  goToHash(hash: string): void;
  replaceToHash(hash: string): void
}
