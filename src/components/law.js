import React, { useEffect, useState } from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import styles from './law.module.css';
import Head from 'next/head';
import Location from './location';

const pointerIcon = new L.Icon({
  iconUrl: '../../assets/pointerIcon.svg',
  iconRetinaUrl: '../../assets/pointerIcon.svg',
  iconAnchor: [5, 55],
  popupAnchor: [10, -44],
  iconSize: [25, 55],
  shadowSize: [68, 95],
  shadowAnchor: [20, 92],
});

function Law() {
  const [position, setPosition] = useState([51.505, -0.09]);
  const [loaded, setLoaded] = useState(false);
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(function (position) {
        console.log('Latitude is :', position.coords.latitude);
        console.log('Longitude is :', position.coords.longitude);
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
        setPosition([position.coords.latitude, position.coords.longitude]);
        setLoaded(true);
      });
    }
    return () => {};
  }, []);

  return (
    <div className={styles['leaflet-container']}>
      <div>
        <Head>
          <title>The Law says vote</title>
          <link
            href='https://unpkg.com/leaflet@1.6.0/dist/leaflet.css'
            rel='stylesheet'
            key='test'
          />
        </Head>
      </div>
      {loaded ? (
        <Map
          center={position}
          zoom={17}
          className={styles['leaflet-container']}
        >
          <TileLayer
            url='https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw'
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={position} icon={pointerIcon}>
            <Popup
              maxWidth='auto'
              maxHeight='300'
              className={styles.leafletpopup}
            >
              <b>
                <h2>The Law says Vote</h2>
              </b>
              <span>
                <Location lonlat={position} />
              </span>
              <br />
            </Popup>
          </Marker>
        </Map>
      ) : (
        <span>loading</span>
      )}
    </div>
  );
}

export default Law;
