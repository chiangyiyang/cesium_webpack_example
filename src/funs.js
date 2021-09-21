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


export const getLocation = (viewer) => {
  var handler = new Cesium.ScreenSpaceEventHandler(viewer.canvas);
  handler.setInputAction(function (event) {
    let click_pos = viewer.camera.pickEllipsoid(
      event.position,
      viewer.scene.globe.ellipsoid
    );

    if (Cesium.defined(click_pos)) {
      let ellipsoid = viewer.scene.globe.ellipsoid;
      let cartographic = ellipsoid.cartesianToCartographic(click_pos);
      const lon = cartographic.longitude * 180 / Math.PI;
      const lat = cartographic.latitude * 180 / Math.PI;
      // console.log(lon, lat);

      let msg = `<div class="alert alert-primary alert-dismissible fade show" role="alert">
                longitude: ${lon.toFixed(3)}°, latitude: ${lat.toFixed(3)}°
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>`;

      document.getElementById('info').innerHTML = msg;
      setTimeout(() => {
        document.getElementById('info').innerHTML = "";
      }, 3000);

      handler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK);
    }
  }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
}


export const pin = (viewer) => {
  var handler = new Cesium.ScreenSpaceEventHandler(viewer.canvas);
  handler.setInputAction(function (event) {
    let click_pos = viewer.camera.pickEllipsoid(
      event.position,
      viewer.scene.globe.ellipsoid
    );

    if (Cesium.defined(click_pos)) {
      let ellipsoid = viewer.scene.globe.ellipsoid;
      let cartographic = ellipsoid.cartesianToCartographic(click_pos);
      const lon = cartographic.longitude * 180 / Math.PI;
      const lat = cartographic.latitude * 180 / Math.PI;
      // console.log(lon, lat);

      let msg = `<div class="alert alert-primary alert-dismissible fade show" role="alert">
                longitude: ${lon.toFixed(3)}°, latitude: ${lat.toFixed(3)}°
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>`;

      document.getElementById('info').innerHTML = msg;
      setTimeout(() => {
        document.getElementById('info').innerHTML = "";
      }, 3000);



      const pin = viewer.entities.add({
        name: 'Citizens Bank Park',
        position: Cesium.Cartesian3.fromDegrees(lon, lat),
        point: {
          pixelSize: 5,
          color: Cesium.Color.RED,
          outlineColor: Cesium.Color.WHITE,
          outlineWidth: 2
        },
        label: {
          text: 'Your Pin',
          font: '14pt monospace',
          style: Cesium.LabelStyle.FILL_AND_OUTLINE,
          outlineWidth: 2,
          verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
          pixelOffset: new Cesium.Cartesian2(0, -9)
        }
      });


      handler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK);
    }
  }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
}