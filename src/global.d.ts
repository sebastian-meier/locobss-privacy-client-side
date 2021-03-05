export {}

declare global {
  const __global: {
    env: {
      MAPBOXKEY: string;
    }
  };

  type GeoJSON = {
    type: string;
    features: {
      type: 'Feature';
      properties: {
        [key: string]: string | number | boolean;
      },
      geometry: {
        type: 'Polygon';
        coordinates: number[][][]
      } | {
        type: 'MultiPolygon';
        coordinates: number[][][][]
      }
    }[];
  };
}
