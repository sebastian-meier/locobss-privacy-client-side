import {writable, Writable} from 'svelte/store';

export const townHalls:Writable<{
  lat: number,
  lon: number
}[]> = writable([]);

export const supermarkets:Writable<{
  lat: number,
  lon: number
}[]> = writable([]);

export const postcodeDense:Writable<{
  [key: number]: 0 | 1
}> = writable({});

export const germany:Writable<GeoJSON> = writable({ type:"Features", features:[] });
export const ror:Writable<GeoJSON> = writable({ type:"Features", features:[] });
export const climateZones:Writable<GeoJSON> = writable({ type:"Features", features:[] });

export const loaded:Writable<boolean> = writable(false);

export const load = ():Promise<void> => {
  return Promise.all([
    fetch('/assets/data/town-halls.csv')
      .then((data) => {
        return data.text();
      })
      .then((txt) => {
        townHalls.set(txt.split('\n').map((l) => {
          const values = l.split(',');
          return {
            lat: parseFloat(values[0]),
            lon: parseFloat(values[1])
          }
        }).filter((s, si) => si > 0));
      }),
    fetch('/assets/data/supermarkets.csv')
      .then((data) => {
        return data.text();
      })
      .then((txt) => {
        supermarkets.set(txt.split('\n').map((l) => {
          const values = l.split(',');
          return {
            lat: parseFloat(values[0]),
            lon: parseFloat(values[1])
          }
        }).filter((s, si) => si > 0));
      }),
    fetch('/assets/data/germany.geojson')
      .then((data) => {
        return data.json();
      })
      .then((json) => {
        germany.set(json);
      }),
    fetch('/assets/data/climate-zones.geojson')
      .then((data) => {
        return data.json();
      })
      .then((json) => {
        climateZones.set(json);
      }),
    fetch('/assets/data/ror.geojson')
      .then((data) => {
        return data.json();
      })
      .then((json) => {
        ror.set(json);
      }),
    fetch('/assets/data/postcode-dense.csv')
      .then((data) => {
        return data.text();
      })
      .then((txt) => {
        const csv = txt.split('\n').map((l) => {
          const values = l.split(',');
          return [
            parseInt(values[0]),
            parseInt(values[1])
          ]
        });
        const postcodes = {};
        csv.forEach((c) => {
          postcodes[c[0]] = c[1];
        });
        postcodeDense.set(postcodes);
      }),
  ]).then(() => {
    loaded.set(true);
  });
};