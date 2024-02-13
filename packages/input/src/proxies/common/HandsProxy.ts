import { HandsSource } from '~/sources';

export interface HandsProxy {
  enable(): void;
  disable(): void;
  bind(source: HandsSource): void;
}
