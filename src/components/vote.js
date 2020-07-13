import React, { useEffect, useState } from 'react';
import fetch from 'node-fetch';
const convert = require('xml-js');

function vote({ state }) {
  const [loaded, setLoaded] = useState(false);
  const [data, setData] = useState(false);
  useEffect(() => {
    console.log(`https://www.fvap.gov/xml-api/${state}/ballot-rules.xml`);

    let dataAsJson = {};
    fetch(
      `https://cors-anywhere.herokuapp.com/https://www.fvap.gov/xml-api/${state}/ballot-rules.xml`,
      {}
    )
      .then(response => response.text())
      .then(str =>
        JSON.parse(convert.xml2json(str, { compact: true, spaces: 1 }))
      )
      .then(results => {
        console.log(results.evag['ballot-rules'].fpca['ballot-rule']);
        setData(results.evag['ballot-rules'].fpca['ballot-rule']);
        setLoaded(true);
      })
      .catch(error => {
        console.log('error', error.message);
        setData(error.message);
        setLoaded(true);
      });
    return () => {};
  }, []);
  const mystyle = {
    maxHeight: '150px',
    overflowY: 'auto',
  };
  return (
    <div style={mystyle}>
      {loaded
        ? data.map(d => (
            <div key={d.label._text}>
              {' '}
              <b> {d.label._text}</b>
              <p> {d.instructions._text}</p>{' '}
            </div>
          ))
        : `loading voting rules ... `}
    </div>
  );
}

export default vote;
