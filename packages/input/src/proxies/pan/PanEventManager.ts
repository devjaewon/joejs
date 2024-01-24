import { HandsSource } from '~/sources/common/HandsSource';
import { PanEvent } from './PanEvent';

export interface PanEventManager<Source extends HandsSource<unknown>> {
  get current(): PanEvent | null;

  process(source: Source): void;

  clear(): void;
}
