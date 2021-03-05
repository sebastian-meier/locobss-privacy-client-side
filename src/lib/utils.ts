export const niceNumbers = (n:number): string => {
  return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

export const makePoint = (x: number, y: number): {
  type: "Feature";
  properties: {};
  geometry: {
    type: "Point";
    coordinates: [number, number];
  };
} => {
  return {
      type: "Feature",
      properties: {},
      geometry: {
        type: "Point",
        coordinates: [x, y]
      }
    }
};

export const makeMultiPolygon = (geom: [number, number][][][]): {
  type: "Feature";
  properties: {};
  geometry: {
    type: "MultiPolygon";
    coordinates: [number, number][][][];
  };
} => {
  return {
      type: "Feature",
      properties: {},
      geometry: {
        type: "MultiPolygon",
        coordinates: geom
      }
    }
};