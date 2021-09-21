export const zoomIn = function (viewer, z) {
  let cameraPos = viewer.camera.position;
  let ellipsoid = viewer.scene.globe.ellipsoid;
  let cartographic = ellipsoid.cartesianToCartographic(cameraPos);
  let height = cartographic.height;
  viewer.camera.zoomIn(height * z);
};


export const zoomOut = function (viewer, z) {
  let cameraPos = viewer.camera.position;
  let ellipsoid = viewer.scene.globe.ellipsoid;
  let cartographic = ellipsoid.cartesianToCartographic(cameraPos);
  let height = cartographic.height;
  viewer.camera.zoomOut(height * z);
};


export const flyTo = function (viewer, lon, lat, height) {
  viewer.camera.flyTo({
    destination: Cesium.Cartesian3.fromDegrees(lon, lat, height),
  });
};


