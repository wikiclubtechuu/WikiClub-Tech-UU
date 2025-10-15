"use client";
import { contributors } from "../../data/contributors/contributors"
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

export default function ContributorsPage() {
  const [selected, setSelected] = useState<string | null>(null);
  const sortedContributors = [...contributors].sort((a, b) => b.merged - a.merged);

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      {/* Header */}
      <div className="max-w-5xl mx-auto text-center mb-10">
        <h1 className="text-3xl font-bold mb-2 flex justify-center items-center gap-2">
          🏆 Contribution Leaderboard
        </h1>
        <p className="text-gray-600">Recognizing members for their valuable contributions</p>
      </div>

      {/* Leaderboard Table */}
      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
        <table className="w-full border-collapse">
          <thead className="bg-blue-900 text-white">
            <tr>
              <th className="py-3 px-6 text-left">Rank</th>
              <th className="py-3 px-6 text-left">Contributor</th>
              <th className="py-3 px-6 text-left">Contributions</th>
            </tr>
          </thead>
          <tbody>
            {sortedContributors.map((c, index) => (
              <tr
                key={c.id}
                onClick={() => setSelected(selected === c.id ? null : c.id)}
                className="cursor-pointer hover:bg-yellow-50 transition"
              >
                <td className="py-3 px-6 font-semibold">
                  {index + 1 === 1 ? "🥇" : index + 1 === 2 ? "🥈" : index + 1 === 3 ? "🥉" : "🏅"}{" "}
                  {index + 1}
                </td>
                <td className="py-3 px-6 font-medium">{c.name}</td>
                <td className="py-3 px-6">
                  Total: {c.merged} 
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Expandable Links Section */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="max-w-5xl mx-auto mt-4 bg-yellow-50 rounded-lg shadow-md p-4"
          >
            <h2 className="font-semibold mb-2">Links for Verification:</h2>
            <ul className="list-disc list-inside space-y-1">
              {contributors
                .find((c: typeof contributors[number]) => c.id === selected)
                ?.links.map((link: string, i: number) => (
                  <li key={i}>
                    <Link
                      href={link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-700 hover:underline"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Latest Contributions & Form */}
      <div className="max-w-5xl mx-auto mt-12">
        <h2 className="text-2xl font-semibold mb-4">Latest Contributions</h2>

        <div className="bg-white rounded-lg shadow p-6 mb-4">
          <h3 className="font-semibold text-lg mb-2">Submit a Contribution</h3>
          <p className="text-gray-600 mb-4">
            If you want to record a contribution, please use the official submission form:
          </p>

          <Link
            href="https://forms.gle/NkaFccXFqPV6Ndgy8"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-blue-700 text-white px-4 py-2 rounded-md hover:bg-blue-800 transition"
          >
            Open Contribution Form
          </Link>
        </div>
      </div>
    </div>
  );
}