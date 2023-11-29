import { BrowserHistoryEngine } from "./BrowserHistoryEngine";
import { InvalidArgumentError } from "./error/InvalidArgumentError";
import { HashRoute, HashRouteId, HashRouteMap } from "./types/HashRoute";
import { HashRouterAction } from "./types/HashRouterAction";
import { HashRouterInitialOption, HashRouterOption } from "./types/HashRouterOption";
import { HistoryEngine } from "./types/HistoryEngine";

export class HashRouter<Id extends HashRouteId> {
  private _routeMap: HashRouteMap<Id>;
  private _currentId: Id | null;
  private _historyEngine: HistoryEngine;
  private _opt: HashRouterOption<Id>;

  constructor(opt: HashRouterInitialOption<Id>) {
    this._routeMap = opt.routes.reduce<HashRouteMap<Id>>((m, routeDef, i) => {
      m[routeDef.id] = {
        id: routeDef.id,
        hashValue: routeDef.hashValue,
        index: i,
      };

      return m;
    }, {} as HashRouteMap<Id>);
    this._currentId = opt.defaultId ?? null;
    this._historyEngine = opt.historyEngine ?? new BrowserHistoryEngine();
    this._opt = {
      action: opt.action ?? HashRouterAction.HASH_AND_HISTORY_CHANGE,
    };
  }

  get currentRoute(): HashRoute<Id> | null {
    return this._getRouteById(this._currentId);
  }

  get currentIndex(): number {
    return this.currentRoute?.index ?? -1;
  }

  get currentId(): Id | null {
    return this.currentId;
  }

  goTo(id: Id): void {
    const route = this._getRouteById(id);
    if (!route) {
      throw new InvalidArgumentError();
    }

    this._goToHash(route.hashValue);
  }
  
  goByIndex(index: number): void {
    const route = this._getRouteByIndex(index);
    if (!route) {
      throw new InvalidArgumentError();
    }

    this._goToHash(route.hashValue);
  }

  private _getRouteById(id: Id | null): HashRoute<Id> | null {
    return this._routeMap[id as Id] || null;
  }

  private _getRouteByIndex(index: number): HashRoute<Id> | null {
    if (index < 0) {
      return null;
    }

    const route = Object
      .values<HashRoute<Id>>(this._routeMap)
      .find(route => route.index === index);

    return route || null;
  }

  private _goToHash(hash: string): void {
    switch (this._opt.action) {
      case HashRouterAction.HASH_CHANGE:
        this._historyEngine.replaceToHash(hash);
        break;
      case HashRouterAction.HASH_AND_HISTORY_CHANGE:
        this._historyEngine.goToHash(hash);
        break;
    }
  }
}
