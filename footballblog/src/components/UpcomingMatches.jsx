import React, { useEffect, useRef, useState } from "react";
import { getUpcomingMatches } from "../service/footballService";

function UpcomingMatches() {
  const [league, setLeague] = useState("PL");
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(false);


  const cache = useRef({});

  useEffect(() => {
    const fetchMatches = async () => {
      setLoading(true);

      try {
        if (cache.current[league]) {
          setMatches(cache.current[league]);
        } else {
          const data = await getUpcomingMatches(league);
          const sliced = data.slice(0, 12);

          cache.current[league] = sliced;
          setMatches(sliced);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchMatches();
  }, [league]);

   

  return (
  <div className="py-20">
    {/* Header */}
    <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-6">
      <div>
        <h2 className="text-4xl font-bold text-white">
          Upcoming <span className="text-[#1E73E8]">Matches</span>
        </h2>
        <p className="text-gray-400 mt-2">
          Stay updated with the next big fixtures.
        </p>
      </div>

      {/* League Dropdown */}
      <select
        value={league}
        onChange={(e) => setLeague(e.target.value)}
        className="bg-[#222B45] text-white px-4 py-2 rounded-lg border border-[#2E3A5E] focus:outline-none focus:border-[#1E73E8]"
      >
        <option value="PL">Premier League</option>
        <option value="PD">La Liga</option>
        <option value="BL1">Bundesliga</option>
        <option value="SA">Serie A</option>
        <option value="FL1">Ligue 1</option>
        <option value="CL">Champions League</option>
      </select>
    </div>

    {/* Loading */}
    {loading ? (
      <p className="text-center text-gray-400">Loading matches...</p>
    ) : matches.length === 0 ? (
      <p className="text-center text-gray-500">
        No upcoming matches available.
      </p>
    ) : (
      <div className="bg-[#1B233A] border border-[#2E3A5E] rounded-2xl p-6 max-h-125 overflow-y-auto custom-scrollbar">
       <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {matches.map((match) => {
          const isLive =
            match.status === "IN_PLAY" ||
            match.status === "LIVE";

          return (
            <div
              key={match.id}
              className="relative bg-[#222B45] p-6 rounded-2xl border border-[#2E3A5E] hover:border-[#1E73E8] transition-all duration-300 hover:shadow-[0_0_20px_rgba(30,115,232,0.4)]"
            >
              {/* 🔴 LIVE BADGE */}
              {isLive && (
                <span className="absolute top-4 right-4 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full animate-pulse shadow-md">
                  🔴 LIVE
                </span>
              )}

              {/* Competition */}
              <div className="flex items-center gap-2 mb-4">
                {match.competition.emblem && (
                  <img
                    src={match.competition.emblem}
                    alt="league"
                    className="w-6 h-6"
                  />
                )}
                <span className="text-sm text-gray-400">
                  {match.competition.name}
                </span>
              </div>

              {/* Teams */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex flex-col items-center text-center w-2/5">
                  {match.homeTeam.crest && (
                    <img
                      src={match.homeTeam.crest}
                      alt="home"
                      className="w-12 h-12 mb-2"
                    />
                  )}
                  <p className="text-white font-semibold text-sm">
                    {match.homeTeam.shortName ||
                      match.homeTeam.name}
                  </p>
                </div>

                {/* Center */}
                <div className="text-[#1E73E8] font-bold text-lg text-center">
                  {isLive ? (
                    <span className="text-white">
                      {match.score?.fullTime?.home ?? 0} -{" "}
                      {match.score?.fullTime?.away ?? 0}
                    </span>
                  ) : (
                    "VS"
                  )}
                </div>

                <div className="flex flex-col items-center text-center w-2/5">
                  {match.awayTeam.crest && (
                    <img
                      src={match.awayTeam.crest}
                      alt="away"
                      className="w-12 h-12 mb-2"
                    />
                  )}
                  <p className="text-white font-semibold text-sm">
                    {match.awayTeam.shortName ||
                      match.awayTeam.name}
                  </p>
                </div>
              </div>

              {/* Date */}
              <div className="text-center text-gray-400 text-sm border-t border-[#2E3A5E] pt-4">
                {new Date(match.utcDate).toLocaleDateString()} •{" "}
                {new Date(match.utcDate).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </div>
            </div>
          );
        })}
      </div>
      </div>
    )}
  </div>
);
}

export default UpcomingMatches;

