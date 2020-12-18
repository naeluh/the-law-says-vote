import React, { useEffect, useState } from 'react';
import Vote from './data';
const opencage = require('opencage-api-client');

function Location({ lonlat }) {
  const [location, setLocation] = useState('unknown');
  const [loaded, setLoaded] = useState(false);
  console.log(lonlat);
  useEffect(() => {
    opencage
      .geocode({ q: lonlat, key: process.env.OCD_API_KEY })
      .then(data => {
        console.log(data);
        if (data.status.code == 200) {
          if (data.results.length > 0) {
            var place = data.results[0];
            console.log(place.formatted);
            console.log(place.components.road);
            console.log(place.annotations.timezone.name);
            // 1263 Pacific Ave. Kansas City, KS
            // `${place.components.road} ${place.components.city}, ${place.components.state_code}`
            setLocation('1263 Pacific Ave. Kansas City KS');
            setLoaded(true);
          }
        } else if (data.status.code == 402) {
          console.log('hit free-trial daily limit');
          console.log('become a customer: https://opencagedata.com/pricing');
          setLocation('hit free-trial daily limit');
          setLoaded(true);
        } else {
          // other possible response codes:
          // https://opencagedata.com/api#codes
          console.log('error', data.status.message);
          setLocation(data.status.message);
          setLoaded(true);
        }
      })
      .catch(error => {
        console.log('error', error.message);
        setLocation(error.message);
        setLoaded(true);
      });
    return () => {};
  }, []);

  return (
    <div>
      {loaded ? (
        <span>
          <b>
            <p>{location} Voting Rules:</p>
          </b>{' '}
          <Vote address={location} />{' '}
        </span>
      ) : (
        `loading... `
      )}
    </div>
  );
}

Location.propTypes = {};

export default Location;
