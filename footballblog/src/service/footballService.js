export const getUpcomingMatches = async (leagueCode) => {
  try {
    // This now points to your Vercel Serverless Function
    const response = await fetch(`/api/matches?leagueCode=${leagueCode}`);

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const data = await response.json();
    return data.matches || [];
  } catch (error) {
    console.error("Failed to fetch matches:", error);
    return [];
  }
};