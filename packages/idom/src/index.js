import { IDom } from './IDom';
import './IDomAttributeManager';
import './IDomEventManager';
import './IDomStyleManager';
import './IDomTreeManager';
import './IDomUtilManager';

export * from './IDom';

export default function (element) {
  return new IDom(element);
}
