export default async function handler(req, res) {
  const { leagueCode } = req.query;
  const API_KEY = process.env.VITE_API_KEY; 

  try {
    const response = await fetch(
      `https://api.football-data.org/v4/competitions/${leagueCode}/matches?status=SCHEDULED,IN_PLAY`,
      {
        headers: { "X-Auth-Token": API_KEY },
      }
    );

    const data = await response.json();
    
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch data" });
  }
}