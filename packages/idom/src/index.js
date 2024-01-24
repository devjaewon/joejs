import { IDom } from './IDom';

export * from './IDom';

export default function (element) {
  return new IDom(element);
}
