export type HashRouteId = symbol | string | number;

export interface HashRoute<Id extends HashRouteId> {
  id: Id;
  hashValue: string;
  index: number;
}

export type HashRouteMap<Id extends HashRouteId> = {
  [id in Id]: HashRoute<Id>;
};
