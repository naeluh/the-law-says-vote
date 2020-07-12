import React from 'react';
import dynamic from 'next/dynamic';

const MapWithNoSSR = dynamic(() => import('../components/law'), {
  ssr: false,
});

function map() {
  return (
    <div>
      <MapWithNoSSR />
      <style jsx>
        {`
          .map-root {
            height: 100%;
          }
          .leaflet-container {
            height: 400px !important;
            width: 80%;
            margin: 0 auto;
          }
        `}
      </style>
    </div>
  );
}

export default map;
