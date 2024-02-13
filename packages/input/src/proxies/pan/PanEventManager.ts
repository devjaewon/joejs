import { HandsSource } from '~/sources/common/HandsSource';
import { PanEvent } from './PanEvent';

export interface PanEventManager {
  get current(): PanEvent | null;

  process(source: HandsSource): void;

  clear(): void;
}
