import "./model/GroundVehicle.glb";
import { Modal } from 'bootstrap/dist/js/bootstrap.bundle.min.js'

let left_click_handler = null;


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
    duration: 1,
  });
};


export const getLocation = (viewer) => {
  if (left_click_handler !== null) {
    left_click_handler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK);
    left_click_handler = null;
  }
  left_click_handler = new Cesium.ScreenSpaceEventHandler(viewer.canvas);
  left_click_handler.setInputAction(function (event) {
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
                longitude: ${lon.toFixed(5)}°, latitude: ${lat.toFixed(5)}°
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>`;

      document.getElementById('info').innerHTML = msg;
      setTimeout(() => {
        document.getElementById('info').innerHTML = "";
      }, 3000);

      left_click_handler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK);
      left_click_handler = null;
    }
  }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
}


export const pin = (viewer) => {
  if (left_click_handler !== null) {
    left_click_handler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK);
    left_click_handler = null;
  }
  left_click_handler = new Cesium.ScreenSpaceEventHandler(viewer.canvas);
  left_click_handler.setInputAction(function (event) {
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

      left_click_handler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK);
      left_click_handler=null;
    }
  }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
}

export const place3DModel = (viewer) => {
  if (left_click_handler !== null) {
    left_click_handler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK);
    left_click_handler = null;
  }
  left_click_handler = new Cesium.ScreenSpaceEventHandler(viewer.canvas);
  left_click_handler.setInputAction(function (event) {
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

      let position = Cesium.Cartesian3.fromDegrees(lon, lat);
      let heading = Cesium.Math.toRadians(0.0);
      let pitch = Cesium.Math.toRadians(0.0);
      let roll = Cesium.Math.toRadians(0.0);
      let orientation = Cesium.Transforms.headingPitchRollQuaternion(position, new Cesium.HeadingPitchRoll(heading, pitch, roll));

      let entity = viewer.entities.add({
        position: position,
        orientation: orientation,
        model: {
          uri: './model/GroundVehicle.glb'
        },
        properties: {
          lon: lon,
          lat: lat,
          heading: 0,
          pitch: 0,
          roll: 0,
        }
      });

      left_click_handler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK);
      left_click_handler = null;

    }
  }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
}


function pickEntity(viewer, windowPosition) {
  var picked = viewer.scene.pick(windowPosition);
  if (Cesium.defined(picked)) {
    var id = Cesium.defaultValue(picked.id, picked.primitive.id);
    if (id instanceof Cesium.Entity) {
      return id;
    }
  }
  return undefined;
};


function drillPickEntities(viewer, windowPosition) {
  var i;
  var entity;
  var picked;
  var pickedPrimitives = viewer.scene.drillPick(windowPosition);
  var length = pickedPrimitives.length;
  var result = [];
  var hash = {};

  for (i = 0; i < length; i++) {
    picked = pickedPrimitives[i];
    entity = Cesium.defaultValue(picked.id, picked.primitive.id);
    if (entity instanceof Cesium.Entity &&
      !Cesium.defined(hash[entity.id])) {
      result.push(entity);
      hash[entity.id] = true;
    }
  }
  return result;
};

export const pick3DModel = (viewer) => {
  if (left_click_handler !== null) {
    left_click_handler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK);
    left_click_handler = null;
  }
  left_click_handler = new Cesium.ScreenSpaceEventHandler(viewer.canvas);
  left_click_handler.setInputAction(function (event) {
    const entity = pickEntity(viewer, event.position);
    if (typeof entity !== 'undefined') {
      let id = entity.id;
      let lon = entity.properties.lon.getValue();
      let lat = entity.properties.lat.getValue();
      let heading = entity.properties.heading.getValue();
      let pitch = entity.properties.pitch.getValue();
      let roll = entity.properties.roll.getValue();

      // show dialog for update orientation
      let msg = `
      <div class="modal fade" id="infoBox" tabindex="-1" aria-labelledby="infoBoxLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="infoBoxLabel">ID: ${id}</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              Longitude: <input type="text" id="lon" value="${lon}"><br>
              Latitude: <input type="text" id="lat" value="${lat}"><br>
              Heading: <input type="text" id="heading" value="${heading}"><br>
              Pitch: <input type="text" id="pitch" value="${pitch}"><br>
              Roll: <input type="text" id="roll" value="${roll}"><br>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" class="btn btn-primary" id="save_btn">Save changes</button>
            </div>
          </div>
        </div>
      </div>`;
      document.getElementById('model').innerHTML = msg;

      var info = new Modal(document.getElementById('infoBox'));
      info.show();

      var myModal = document.getElementById('save_btn')

      myModal.addEventListener('click', function (event) {

        lon = parseFloat(document.getElementById('lon').value);
        lat = parseFloat(document.getElementById('lat').value);
        let position = Cesium.Cartesian3.fromDegrees(lon, lat);
        heading = parseFloat(document.getElementById('heading').value);
        pitch = parseFloat(document.getElementById('pitch').value);
        roll = parseFloat(document.getElementById('roll').value);
        let orientation = Cesium.Transforms.headingPitchRollQuaternion(
          position,
          new Cesium.HeadingPitchRoll(heading / 180 * Math.PI, pitch / 180 * Math.PI, roll / 180 * Math.PI));

        entity.position.setValue(position);
        entity.orientation.setValue(orientation);
        entity.properties.lon = lon;
        entity.properties.lat = lat;
        entity.properties.heading = heading;
        entity.properties.pitch = pitch;
        entity.properties.roll = roll;

        info.hide();
      })
    }

    left_click_handler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK);
    left_click_handler = null;
  }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
}
