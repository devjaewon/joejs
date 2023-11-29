import { HistoryEngine } from "./types/HistoryEngine";

export class BrowserHistoryEngine implements HistoryEngine {
  goToHash(hash: string): void {
    const nextUrl = this._getFullUrlUpdatedHash(hash);

    window.history.pushState({}, '', nextUrl);
  }

  replaceToHash(hash: string): void {
    const nextUrl = this._getFullUrlUpdatedHash(hash);

    window.history.replaceState({}, '', nextUrl);
  }

  private _getFullUrlUpdatedHash(hash: string) {
    return `${window.origin}${window.location.pathname}${window.location.search}#${hash}`;
  }
}
