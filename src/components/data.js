import React, { useEffect, useState } from 'react';
import fetch from 'node-fetch';

function votingData({ address }) {
  const [loaded, setLoaded] = useState(false);
  const [data, setData] = useState(false);
  useEffect(() => {
    async function getData() {
      try {
        let res = await fetch(`/api/voter?q=${address}`);
        console.log(res);
        setData(null);
        setLoaded(true);
      } catch (error) {
        console.log('error', error.message);
        setData(error.message);
        setLoaded(true);
      }
    }
    getData();

    return () => {};
  }, []);
  const mystyle = {
    maxHeight: '150px',
    overflowY: 'auto',
  };
  return (
    <div style={mystyle}>
      {loaded ? data.map(d => ({ d })) : `loading voting rules ... `}
    </div>
  );
}

export default votingData;
