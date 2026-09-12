"use client";

import React, { useEffect, useState } from "react";

interface StatsData {
  projects: number;
  leetcode: number;
  codechefRating: number;
}

interface Stat {
  value: string;
  label: string;
}

export const AboutStats: React.FC = () => {
  const [stats, setStats] = useState<StatsData | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch("/api/stats");

        if (!response.ok) {
          throw new Error("Failed to fetch stats");
        }

        const data: StatsData = await response.json();

        setStats(data);
      } catch (error) {
        console.error("Failed to load developer stats:", error);
      }
    };

    fetchStats();
  }, []);

  const displayStats: Stat[] = [
    {
      value: stats ? `${stats.projects}+` : "—",
      label: "Projects Built",
    },
    {
      value: stats ? `${stats.leetcode}` : "—",
      label: "LeetCode Problems",
    },
    {
      value: stats ? `${stats.codechefRating}` : "—",
      label: "CodeChef Rating",
    },
  ];

  return (
    <div className="w-full border-y border-[var(--hairline)] py-5">
      <div className="grid grid-cols-3">
        {displayStats.map((stat) => (
          <div
            key={stat.label}
            className="flex flex-col items-center text-center"
          >
            <span className="font-mono text-xl md:text-2xl font-semibold text-[#3DDC84]">
              {stat.value}
            </span>

            <span className="mt-1 font-mono text-[10px] md:text-xs text-[var(--text-secondary)]">
              {stat.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};