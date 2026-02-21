const API_KEY = import.meta.env.VITE_API_KEY;

export const getUpcomingMatches = async (leagueCode) => {
  try {
    const response = await fetch(
      `/api/competitions/${leagueCode}/matches?status=SCHEDULED,IN_PLAY`,
      {
        headers: {
          "X-Auth-Token": API_KEY,
        },
      }
    );

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
