const API_KEY = import.meta.env.VITE_API_KEY;

export const getUpcomingMatches = async (leagueCode) => {
  try {
    // ✅ Change this line to the FULL URL of the API provider
    const response = await fetch(
      `https://api.football-data.org/v4/competitions/${leagueCode}/matches?status=SCHEDULED,IN_PLAY`,
      {
        headers: {
          "X-Auth-Token": API_KEY,
        },
      }
    );

    if (!response.ok) {
      // If you get a 403 here, it's because the API Key is missing in Vercel
      throw new Error(`Error: ${response.status}`);
    }

    const data = await response.json();
    return data.matches || [];
  } catch (error) {
    console.error("Failed to fetch matches:", error);
    return [];
  }
};