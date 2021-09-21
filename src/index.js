import { Viewer, TileMapServiceImageryProvider, buildModuleUrl, Rectangle } from "cesium";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap-icons/font/bootstrap-icons.css";

import "./img/logo.png";
import "./style.css";

import { zoomIn, zoomOut, flyTo, getLocation, pin, place3DModel } from "./funs";


var viewer = new Viewer('cesiumContainer', {
  // imageryProvider: new TileMapServiceImageryProvider({
  //   url: buildModuleUrl('Assets/Textures/NaturalEarthII')
  // }),
  // terrainProvider: Cesium.createWorldTerrain(),
  shouldAnimate: true,
  timeline: false,
  animation: false,
  shadow: false,
  infoBox: false,
  selectionIndicator: false,
  geocoder: false,
  homeButton: false,
  baseLayerPicker: false,
  navigationHelpButton: false,
  sceneModePicker: false,
});
viewer._cesiumWidget._creditContainer.style.display = 'none';

viewer.camera.setView({
  destination: Rectangle.fromDegrees(
    120, 21.5,
    122, 25.5
  ),
});

document.getElementById("zoom_in_ico").onclick = () => zoomIn(viewer,0.8);
document.getElementById("zoom_out_ico").onclick = () => zoomOut(viewer,1.2);
document.getElementById("fly_to_ico").onclick = () => flyTo(viewer, 121.505, 23.5, 100);
document.getElementById("search_location_ico").onclick = () => getLocation(viewer);
document.getElementById("pin_ico").onclick = () => pin(viewer);
document.getElementById("3d_ico").onclick = () => place3DModel(viewer);
