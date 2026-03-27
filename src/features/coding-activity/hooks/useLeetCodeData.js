import { useState, useEffect } from "react";
import { MOCK_LEETCODE_STATS, MOCK_LEETCODE_CALENDAR } from "../data/mockData";

const LEETCODE_USERNAME = "Hiteshree_chauhan_it";
const GQL_ENDPOINT     = "/leetcode-gql/graphql";

// ── GraphQL queries ───────────────────────────────────────────

const STATS_QUERY = `
  query getUserProfile($username: String!) {
    allQuestionsCount {
      difficulty
      count
    }
    matchedUser(username: $username) {
      profile { ranking }
      submitStats {
        acSubmissionNum   { difficulty count submissions }
        totalSubmissionNum { difficulty count submissions }
      }
    }
  }
`;

const CALENDAR_QUERY = `
  query userProfileCalendar($username: String!) {
    matchedUser(username: $username) {
      userCalendar {
        streak
        totalActiveDays
        submissionCalendar
      }
    }
  }
`;

// ── Helpers ───────────────────────────────────────────────────

async function gqlFetch(query, variables) {
  const res = await fetch(GQL_ENDPOINT, {
    method:  "POST",
    headers: { "Content-Type": "application/json" },
    body:    JSON.stringify({ query, variables }),
  });
  if (!res.ok) throw new Error(`GQL HTTP ${res.status}`);
  const json = await res.json();
  if (json.errors?.length) throw new Error(json.errors[0].message);
  return json.data;
}

function parseCalendar(raw) {
  try {
    const obj = typeof raw === "string" ? JSON.parse(raw) : raw;
    const map = {};
    Object.entries(obj ?? {}).forEach(([ts, count]) => {
      const date = new Date(parseInt(ts, 10) * 1000);
      map[date.toISOString().split("T")[0]] = count;
    });
    return map;
  } catch {
    return {};
  }
}

// ── Main hook ─────────────────────────────────────────────────

export function useLeetCodeData() {
  const [stats,      setStats]      = useState(null);
  const [calendarMap,setCalendarMap]= useState({});
  const [loading,    setLoading]    = useState(true);
  const [error,      setError]      = useState(null);
  const [usingMock,  setUsingMock]  = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function loadAll() {
      setLoading(true);
      setError(null);
      setUsingMock(false);

      // ── 1. Stats via LeetCode GraphQL ─────────────────────
      let statsData = null;
      try {
        const data = await gqlFetch(STATS_QUERY, { username: LEETCODE_USERNAME });

        const user    = data.matchedUser;
        const acArr   = user.submitStats.acSubmissionNum;
        const totArr  = user.submitStats.totalSubmissionNum;
        const allQ    = data.allQuestionsCount;         // [{difficulty,count}]

        const getAC    = (d) => acArr.find(s => s.difficulty === d)?.count  ?? 0;
        const getTot   = (d) => totArr.find(s => s.difficulty === d)?.count ?? 0;
        const getAllQ  = (d) => allQ.find(s => s.difficulty === d)?.count   ?? 0;

        const acAll    = getAC("All");
        const totAll   = getTot("All");
        const acceptanceRate = totAll > 0
          ? parseFloat(((acAll / totAll) * 100).toFixed(1))
          : 0;

        statsData = {
          totalSolved:        getAC("All"),
          totalQuestions:     getAllQ("All"),
          easySolved:         getAC("Easy"),
          totalEasy:          getAllQ("Easy"),
          mediumSolved:       getAC("Medium"),
          totalMedium:        getAllQ("Medium"),
          hardSolved:         getAC("Hard"),
          totalHard:          getAllQ("Hard"),
          acceptanceRate,
          ranking:            user.profile.ranking ?? 0,
          contributionPoints: 0,   // not exposed by public GQL
        };
      } catch (err) {
        console.warn("LeetCode GQL stats failed:", err.message);
      }

      // ── 2. Calendar via LeetCode GraphQL ──────────────────
      let calData = null;
      try {
        const data = await gqlFetch(CALENDAR_QUERY, { username: LEETCODE_USERNAME });
        const cal  = data.matchedUser?.userCalendar;
        if (cal) {
          calData = {
            heatmapData:     parseCalendar(cal.submissionCalendar),
            streak:          cal.streak          ?? 0,
            totalActiveDays: cal.totalActiveDays ?? 0,
          };
        }
      } catch (err) {
        console.warn("LeetCode GQL calendar failed (non-blocking):", err.message);
      }

      if (!isMounted) return;

      // ── 3. Merge or fall back to mock ─────────────────────
      if (statsData) {
        if (calData) {
          statsData = {
            ...statsData,
            streak:          calData.streak,
            totalActiveDays: calData.totalActiveDays,
          };
          setCalendarMap(calData.heatmapData);
        } else {
          setCalendarMap(MOCK_LEETCODE_CALENDAR);
        }
        setStats(statsData);
        setUsingMock(false);
        setError(null);
      } else {
        // Full fallback to mock
        console.warn("All LeetCode APIs failed — using mock data");
        setStats(MOCK_LEETCODE_STATS);
        setCalendarMap(MOCK_LEETCODE_CALENDAR);
        setUsingMock(true);
        setError("Live data unavailable — showing demo stats");
      }

      if (isMounted) setLoading(false);
    }

    loadAll();
    return () => { isMounted = false; };
  }, []);

  return {
    username:    LEETCODE_USERNAME,
    setUsername: () => {},
    stats,
    calendarMap,
    loading,
    error,
    usingMock,
  };
}