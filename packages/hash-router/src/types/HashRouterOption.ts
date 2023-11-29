import { HashRouteId } from "./HashRoute";
import { HashRouterAction } from "./HashRouterAction";
import { HistoryEngine } from "./HistoryEngine";

export interface HashRouteDefinition<Id extends HashRouteId> {
  id: Id;
  hashValue: string;
}

export interface HashRouterInitialOption<Id extends HashRouteId> {
  routes: Array<HashRouteDefinition<Id>>;
  action?: HashRouterAction;
  defaultId?: Id;
  historyEngine?: HistoryEngine;
}

export interface HashRouterOption<Id extends HashRouteId> {
  action: HashRouterAction;
}
