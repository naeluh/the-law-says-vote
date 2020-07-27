import fetch from '../../lib/fetch';
const LANG = 'en';

export default async function getVoteData(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).end();
  }

  if (!process.env.GCI) {
    return res.status(401).json({
      errors: [
        {
          message:
            'A Civic Information API key is required to execute this request',
        },
      ],
    });
  }

  const QUERY = req.query.q;

  console.log(
    `https://www.googleapis.com/civicinfo/v2/voterinfo?key=${process.env.GCI}&address=${QUERY}`
  );

  const response = await fetch(
    `https://www.googleapis.com/civicinfo/v2/voterinfo?key=${process.env.GCI}&address=${QUERY}`
  );

  if (response.ok) {
    const data = await response.json();
    // Cache the Twitter response for 3 seconds, to avoid hitting the Giphy API limits
    // of 450 requests every 15 minutes (with app auth)
    console.log(data);
    res.setHeader('Cache-Control', 's-maxage=3, stale-while-revalidate');
    res.status(200).json({ data });
  } else {
    res.status(400).json({
      errors: [
        {
          message: `Fetch to the Civic Information API failed with code: ${response.status}`,
        },
      ],
    });
  }
}
