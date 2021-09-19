import { Viewer, TileMapServiceImageryProvider, buildModuleUrl, Rectangle } from "cesium";
import "./style.css";
import * as url from "./img/logo.png";

const logo = document.createElement("img");
logo.className="logo";
logo.src = url.default;
document.getElementById('logo_container').appendChild(logo);

var viewer = new Viewer('cesiumContainer', {
  imageryProvider: new TileMapServiceImageryProvider({
    url: buildModuleUrl('Assets/Textures/NaturalEarthII')
  }),
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
