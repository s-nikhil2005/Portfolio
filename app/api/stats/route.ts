import { NextResponse } from "next/server";
import { projectsData } from "@/data/projects";

const LEETCODE_USERNAME = "Nikhil_Singh2005";
const CODECHEF_USERNAME = "nikhil_singh2";

export const revalidate = 3600;

// ----------------------------------------
// LeetCode Stats
// ----------------------------------------
async function getLeetCodeStats() {
  const query = `
    query userProfile($username: String!) {
      matchedUser(username: $username) {
        submitStats {
          acSubmissionNum {
            difficulty
            count
          }
        }
      }
    }
  `;

  const response = await fetch("https://leetcode.com/graphql", {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
      Referer: "https://leetcode.com/",
    },

    body: JSON.stringify({
      query,
      variables: {
        username: LEETCODE_USERNAME,
      },
    }),

    next: {
      revalidate: 3600,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch LeetCode stats");
  }

  const data = await response.json();

  const submissions =
    data?.data?.matchedUser?.submitStats?.acSubmissionNum ?? [];

  // "All" already contains the total.
  // Do NOT add Easy + Medium + Hard.
  const allProblems = submissions.find(
    (item: { difficulty: string; count: number }) =>
      item.difficulty === "All"
  );

  return Number(allProblems?.count ?? 0);
}

// ----------------------------------------
// CodeChef Stats
// ----------------------------------------
async function getCodeChefStats() {
  const response = await fetch(
    `https://www.codechef.com/users/${CODECHEF_USERNAME}`,
    {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/153.0.0.0 Safari/537.36",
      },

      next: {
        revalidate: 3600,
      },
    }
  );

  if (!response.ok) {
    throw new Error(
      `Failed to fetch CodeChef profile: ${response.status}`
    );
  }

  const html = await response.text();

  // CodeChef currently renders:
  // (Highest Rating 1251)
  const ratingMatch = html.match(
    /Highest Rating\s*([0-9]+)/i
  );

  if (!ratingMatch) {
    throw new Error("CodeChef rating could not be found");
  }

  const rating = Number(ratingMatch[1]);

  if (!Number.isFinite(rating)) {
    throw new Error("Invalid CodeChef rating");
  }

  return rating;
}

// ----------------------------------------
// API Route
// ----------------------------------------
export async function GET() {
  try {
    const [leetcode, codechefRating] = await Promise.all([
      getLeetCodeStats(),
      getCodeChefStats(),
    ]);

    return NextResponse.json({
      projects: projectsData.length,
      leetcode,
      codechefRating,
    });
  } catch (error) {
    console.error("Stats API error:", error);

    return NextResponse.json(
      {
        projects: projectsData.length,
        leetcode: 0,
        codechefRating: 0,
      },
      {
        status: 500,
      }
    );
  }
}