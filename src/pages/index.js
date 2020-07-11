import React from 'react'
import dynamic from 'next/dynamic';

const MapWithNoSSR = dynamic(() => import('../components/map'), {
  ssr: false
});

function index() {
  return (
    <div>
     <MapWithNoSSR />
    </div>
  )
}

export default index
