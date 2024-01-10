import React, { useEffect, useState, useRef } from 'react';
import constants from '../../../../../config/constants';

const Geofencing = (props) => {
  const [map, setMap] = useState(null);
  const [polygon, setPolygon] = useState([]);
  const [mapRendered, setMapRendered] = useState(false);

  
  const smoothZoom = (map, max, cnt) => {
    if (cnt >= max) {
      return;
    } else {
      const z = window.google.maps.event.addListener(map, 'zoom_changed', function (event) {
        window.google.maps.event.removeListener(z);
        smoothZoom(map, max, cnt + 1);
      });
      setTimeout(function () {
        map.setZoom(cnt);
      }, 80);
    }
  };

  const callCenter = (data) => {
    if (window.google && map) {
      const location = new window.google.maps.LatLng(data[0], data[1]);
      map.panTo(location);
      smoothZoom(map, 12, map.getZoom());
    }
  };

  const updatePolygon = (data) => {
    const { handleSave } = props;
    console.log('Polygon Coordinates:', data);
    setPolygon(data);
    handleSave(data);
  };

  const renderUpdatePolygon = () => {
    const google = window.google;

    if (!polygon || polygon.length === 0) {
      console.warn('Polygon data is empty or undefined.');
      return;
    }

    const subArea = new window.google.maps.Polygon({
      paths: polygon.map((val) => ({ lat: val[0], lng: val[1] })),
      fillOpacity: 0.5,
      strokeWeight: 2,
      strokeColor: '#57ACF9',
      clickable: true,
      editable: true,
      draggable: true,
      zIndex: 1,
    });

    subArea.setMap(map);

    const handleDragEnd = () => {
      const tempArray = [];
      subArea.getPath().getArray().forEach((val) => {
        tempArray.push([val.lat(), val.lng()]);
      });
      updatePolygon(tempArray);
    };

    google.maps.event.addListener(subArea, 'dragend', handleDragEnd);

    google.maps.event.addListener(subArea.getPath(), 'insert_at', getPath);
    google.maps.event.addListener(subArea.getPath(), 'remove_at', getPath);
    google.maps.event.addListener(subArea.getPath(), 'set_at', getPath);

    function getPath() {
      const path = subArea.getPath();
      const len = path.getLength();
      const tempArray = [];
      for (let i = 0; i < len; i++) {
        const temp = this.getAt(i);
        tempArray.push([temp.lat(), temp.lng()]);
      }
      updatePolygon(tempArray);
    }
  };

  const renderNewPolygon = (drawingManager) => {
    const polygonArray = [];
    const google = window.google;

    google.maps.event.addListener(drawingManager, 'polygoncomplete', function (polygon) {
      drawingManager.setDrawingMode(null);
      drawingManager.setOptions({
        drawingControl: false,
      });
      polygon.setOptions({
        id: 1,
        editable: true,
        draggable: true,
      });

      for (let i = 0; i < polygon.getPath().getLength(); i++) {
        const temp = polygon.getPath().getAt(i);
        polygonArray.push([temp.lat(), temp.lng()]);
      }

      updatePolygon(polygonArray);

      google.maps.event.addListener(polygon, 'dragend', function () {
        const tempArray = [];
        this.getPath().getArray().forEach((val) => {
          tempArray.push([val.lat(), val.lng()]);
        });
        updatePolygon(tempArray);
      });

      google.maps.event.addListener(polygon.getPath(), 'insert_at', getPath);
      google.maps.event.addListener(polygon.getPath(), 'remove_at', getPath);
      google.maps.event.addListener(polygon.getPath(), 'set_at', getPath);

      function getPath() {
        const path = polygon.getPath();
        const len = path.getLength();
        const tempArray = [];
        for (let i = 0; i < len; i++) {
          const temp = this.getAt(i);
          tempArray.push([temp.lat(), temp.lng()]);
        }
        updatePolygon(tempArray);
      }
    });
  };

  const initMap = () => {
    const { polygon } = props;
    // Create A Map
    const newMap = new window.google.maps.Map(document.getElementById('map'), {
      center: { lat: constants.MAP_CENTER?.lat, lng: constants.MAP_CENTER?.lng },
      zoom: 10,
    });

    const drawingManager = new window.google.maps.drawing.DrawingManager({
      drawingMode: window.google.maps.drawing.OverlayType.POLYGON,
      drawingControl: true,
      drawingControlOptions: {
        position: window.google.maps.ControlPosition.TOP_CENTER,
        drawingModes: [window.google.maps.drawing.OverlayType.POLYGON],
      },
      circleOptions: {
        fillColor: '#ffff00',
        fillOpacity: 1,
        strokeWeight: 5,
        clickable: false,
        editable: true,
        zIndex: 1,
      },
      polygonOptions: {
        fillColor: '#BCDCF9',
        fillOpacity: 0.5,
        strokeWeight: 2,
        strokeColor: '#57ACF9',
        clickable: true,
        editable: true,
        draggable: true,
        zIndex: 1,
      },
    });

    drawingManager.setMap(newMap);

    if (polygon?.length > 0) {
      drawingManager.setDrawingMode(null);
      drawingManager.setOptions({
        drawingControl: false,
      });
      renderUpdatePolygon();
    } else {
      renderNewPolygon(drawingManager);
    }

    setMap(newMap);
    setMapRendered(true);
  };

  useEffect(() => {
    renderMap();
  }, []);

  function renderMap() {
    loadScript("https://maps.googleapis.com/maps/api/js?key=" + constants.GOOGLE_MAP_KEY + "&libraries=geometry,drawing,places&callback=initMap");
    window.initMap = initMap;
  }
  useEffect(() => {
    if (mapRendered && props.polygon !== polygon) {
      updatePolygon(props.polygon);
      renderUpdatePolygon();
    }
  }, [props.polygon, polygon, mapRendered]);

  return (
    <div>
      <main style={{ height: '400px', width: '100%' }}>
        <div id="map" style={{ height: '100%', width: '100%' }}></div>
      </main>
    </div>
  );
};

function loadScript(url) {
  const index = window.document.getElementsByTagName('script')[0];

  const script = window.document.createElement('script');
  script.src = url;
  script.async = true;
  script.defer = true;
  index.parentNode.insertBefore(script, index);
}

export default Geofencing;
