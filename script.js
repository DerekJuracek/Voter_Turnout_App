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
const legend2 = document.getElementById("poverty-legend");
const layerList = document.getElementById("menu");
const inputs = layerList.getElementsByTagName("input");
const layeridP = "cla5wix8s000214l3pe8h6vya";
const layeridM = "cla1p8oxf000f14o4armz7occ";

// map.on("load", () => {
//   //   console.log(map.getStyle().name);
//   if (map.getStyle().name === "Median_Income") {
//     console.log("it works");
//     legend.classList.add("legend");
//   } else {
//     legend.style.color = "black";
//   }
// });

map.on("load", () => {
  console.log(map.getStyle());
});

const nav = new mapboxgl.NavigationControl({
  visualizePitch: true,
});
map.addControl(nav, "top-right");



console.log(map)

// menu.addEventListener('change', () => {
//   if (map.getStyle().name === 'Median_Income') {
//     console.log('you hit it');
//     legend.style.color = 'red';
//   }
// })

// for (const input of inputs) {
//   input.onclick = (layer) => {

//     const layerId = layer.target.id;
//     map.setStyle("mapbox://styles/jpegmountainman/" + layerId);
//     let mapStyle = map.getStyle().name;
//     console.log(mapStyle);
//     if (mapStyle === 'Poverty_Status') {
//       legend.style.color = "red";
//       legend.getElementsByTagName("h4")[0].innerText = "Poverty Status";
//       document.getElementById("1").innerText = "poverty status < average";
//       document.getElementById("2").innerText = "poverty status > average";

//     } else {
//       console.log('median income')
//      legend.style.color = 'black';
//      legend.getElementsByTagName("h4")[0].innerText = "Median Income";
//      document.getElementById("1").innerText = "Income < $50,000";
//     document.getElementById("2").innerText = "Income > $50,000";
//     }
//   };
// };

let popup = new mapboxgl.Popup({
  offset: [0, -7],
  closeButton: false,
  closeOnClick: false
});

for (const input of inputs) {
  input.onclick = (layer) => {
    console.log(layer);
    const layerId = layer.target.id;
    map.setStyle("mapbox://styles/jpegmountainman/" + layerId);

    if (layerId === layeridP) {
      legend2.style.display = "none";
      legend.style.display = "block";
      //   legend.style.color = "green";
    } else {
      legend.style.display = "none";
      legend2.style.display = "block";

      legend.setAttribute("id", "poverty-legend");
      legend.style.color = "black";
    }
  };
}
map.on('click', (e) => {
  const features = map.queryRenderedFeatures(e.point, {layers: ['census-data-ne-income-0hl5n5']});  
  console.log(e);
 
  let censusTract = features[0].properties.NAMELSAD;
  let income = features[0].properties["pointsinpoly_Table_Data2_census_tract_data_master_HOUSEHOLD INCOME IN THE PAST 12 MONTHS (IN 2020 INFLATION-ADJUSTED DOLLARS)!!Median income (dollars)"]
  console.log(income);
  console.log(e.features)
  var lat = e.lngLat.lat;
  var lng = e.lngLat.lng;
  var coordinates = [];
  coordinates.push(lng, lat);
  // const coordinates = e.lngLat.01.slice(",");
  // console.log(coordinates);
  // coordinates = [lng, lat];
  // while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
  //   coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
  //   }
    
    // Populate the popup and set its coordinates
    // based on the feature found.
    popup
    .setLngLat(coordinates)
    .setHTML(`<p>Census Tract: ${censusTract}<p>Median Income: ${income}</p>`)
    .addTo(map);
    });
    
    // map.on('mouseenter', 'census-data-ne-income-0hl5n5', () => {
    //   map.getCanvas().style.cursor = 'pointer';
    //   });

    map.on('mouseleave', 'census-data-ne-income-0hl5n5', function() {
    map.getCanvas().style.cursor = '';
    popup.remove();



});



// map.on('mousemove', (e) => {
//   const features = map.queryRenderedFeatures(e.point);
   
//   // Limit the number of properties we're displaying for
//   // legibility and performance
//   const displayProperties = [
//   'type',
//   'properties',
//   // 'id',
//   // 'layer',
//   // 'source',
//   // 'sourceLayer',
//   // 'state'
//   ];
   
//   const displayFeatures = features.map((feat) => {
//   const displayFeat = {};
//   displayProperties.forEach((prop) => {
//   displayFeat[prop] = feat[prop];
//   });
//   return displayFeat;
//   });
   
  // Write object as string with an indent of two spaces.
  // document.getElementById('features').innerHTML = JSON.stringify(
  // displayFeatures,
  // null,
  // 2
  // );
  // });





// map.on('load', function() {
// map.on('click', 'test', function(e) {
// map.getCanvas().style.cursor = 'pointer';

// var coordinates = e.features[0].geometry.coordinates.slice();
// var title = e.features[0].properties.pointsinpoly_Table_Data2_NAMELSAD;
// var description = e.features[0].properties.pointsinpoly_Table_Data2_NAMELSAD;
// var title2 = e.features[0].properties.title2;
// var description2 = e.features[0].properties.description2;

// Ensure that if the map is zoomed out such that multiple
// copies of the feature are visible, the popup appears
// over the copy being pointed to.
// while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
// coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
// }

// Populate the popup and set its coordinates
// based on the feature found.
// popup
// .setLngLat(coordinates)
// .setHTML(displayProperties )
// .addTo(map);
// });

// map.on('mouseleave', 'test', function() {
// map.getCanvas().style.cursor = '';
// popup.remove();
// });
// });



// map.on("load", () => {
//   map.addSource("income", {
//     type: "geojson",
//     data: "geojson/census_income.geojson"
//   });

//   map.addLayer({
//     id: "income",
//     type: "fill",
//     source: "income",
//     paint: {
//       "fill-color": "red",
//       "fill-opacity": 0.3,
//     },
//   });
// });

// returned object from queryrenderedfeatures
// [
//   {
//     "type": "Feature",
//     "properties": {
//       "COUNTYFP": "111",
//       "GEOID": "31111959700",
//       "NAME": "9597",
//       "NAMELSAD": "Census Tract 9597",
//       "STATEFP": "31",
//       "TRACTCE": "959700",
//       "pointsinpoly_Table_Data2_GEOCODE": "31111959700",
//       "pointsinpoly_Table_Data2_GEOID": "31111959700",
//       "pointsinpoly_Table_Data2_MTFCC": "G5020",
//       "pointsinpoly_Table_Data2_NAMELSAD": "Census Tract 9597",
//       "pointsinpoly_Table_Data2_NUMPOINTS": "0",
//       "pointsinpoly_Table_Data2_SDE_STATE_ID": "0",
//       "pointsinpoly_Table_Data2_Shape_Area": "0.346178592",
//       "pointsinpoly_Table_Data2_Shape_Length": "2.860213416",
//       "pointsinpoly_Table_Data2_TRACT": "959700",
//       "pointsinpoly_Table_Data2_Turnout_Census": "0",
//       "pointsinpoly_Table_Data2_census_tract_data_master_HOUSEHOLD INCOME IN THE PAST 12 MONTHS (IN 2020 INFLATION-ADJUSTED DOLLARS)!!Median income (dollars)": 77188
//     },



    // Create a popup, but don't add it to the map yet.
 







// for (const input of inputs) {
//   input.onclick = (layer) => {
//     console.log(layer);

//     const layerId = layer.target.id;
//     if (layerId === layeridP) {
//       legend.style.color = 'green';
//     }
//    else {

//     legend.setAttribute("id", "poverty-legend");
//     legend.style.color = 'black';
//    }

// };





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

