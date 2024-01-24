import { HandsSourceToBind } from './HandsSourceToBind';

export interface HandsProxy {
  enable(): void;
  disable(): void;
  bind(source: HandsSourceToBind): void;
}
