mapboxgl.accessToken =
  "pk.eyJ1IjoianBlZ21vdW50YWlubWFuIiwiYSI6ImNsMDMxMG9hZTBmeHAzZG1tOTd2NWxhZnkifQ.aXMcmbPG90l2w8KFx8E2RA";
const map = new mapboxgl.Map({
  container: "map", // container ID
  // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
  style: "mapbox://styles/jpegmountainman/cla5wix8s000214l3pe8h6vya", // style URL
  center: [-99.60554664374831, 41.478777848167454], // starting position [lng, lat]
  zoom: 5.5, // starting zoom
  projection: "globe", // display the map as a 3D globe
  customAttribution: "Civic Nebraska",
});
const legend = document.getElementById("state-legend");

map.on("load", () => {
  //   console.log(map.getStyle().name);
  if (map.getStyle().name === "Median_Income") {
    console.log("it works");
    legend.classList.add("legend");
  } else {
    legend.style.color = "black";
  }
});

map.on("load", () => {
  console.log(map.getStyle());
});

const nav = new mapboxgl.NavigationControl({
  visualizePitch: true,
});
map.addControl(nav, "top-right");

const layerList = document.getElementById("menu");
const inputs = layerList.getElementsByTagName("input");

for (const input of inputs) {
  input.onclick = (layer) => {
    const layerId = layer.target.id;
    map.setStyle("mapbox://styles/jpegmountainman/" + layerId);
  };
}

// const styles = map.getStyle().layers;
// console.log(styles);

// map.on("load", () => {
//   map.addSource("income", {
//     type: "geojson",
//     data: "census_income.geojson",
//   });

//   map.addLayer({
//     id: "points",
//     type: "fill",
//     source: "income",
//     paint: {
//       "fill-color": "red",
//       "fill-opacity": 0.5,
//       "line-color": "black",
//       "line-width": 1,
//     },
//   });
// });

// if (navigator.geolocation) {
//   navigator.geolocation.getCurrentPosition(function (position) {
//     console.log(position);
//     const lat = position.coords.latitude;
//     const long = position.coords.longitude;

//     map.on("click", (mapEvent) => {
//       //   console.log(mapEvent);
//       coords = mapEvent.lngLat;
//       const Lat = mapEvent.lngLat.lat;
//       const lng = mapEvent.lngLat.lng;

//       const popup = new mapboxgl.Popup({ offset: 25 }).setText(
//         `You clicked at ${Lat}, ${lng} `
//       );
//       const marker1 = new mapboxgl.Marker()
//         .setLngLat([lng, Lat])
//         .setPopup(popup)
//         .addTo(map);
//     });
//   });
// }
