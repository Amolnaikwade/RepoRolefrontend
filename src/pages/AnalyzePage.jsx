import React from "react";
import { useLocation } from "react-router-dom";

const AnalyzePage = () => {
  const { state } = useLocation();

  if (!state) {
    return <div className="p-10 text-center text-white">No data found</div>;
  }

  const { repo, languages, frameworks, roles } = state;

  return (
    <div className="min-h-screen bg-[#0b0f17] text-white p-6">

      {/* Top Section */}
      <div className="grid md:grid-cols-2 gap-4">

        {/* Repo */}
        <div className="bg-[#111827] p-5 rounded-xl border border-gray-700">
          <p className="text-sm text-gray-400">Repository</p>
          <h2 className="text-lg font-semibold text-orange-400">
            {repo?.name}
          </h2>
          <p className="text-sm text-gray-400 break-all">
            {repo?.url}
          </p>
        </div>

        {/* Structure (dummy for now) */}
        <div className="bg-[#111827] p-5 rounded-xl border border-gray-700">
          <p className="text-sm text-gray-400 mb-2">Structure</p>

          <div className="flex flex-wrap gap-2">
            {["src", "components", "pages", "utils"].map((item, i) => (
              <span
                key={i}
                className="bg-gray-800 px-3 py-1 rounded-full text-xs"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Roles */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">
          Role Matches ({roles?.length})
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          {roles?.map((role) => (
            <div
              key={role.roleId}
              className="bg-[#111827] p-6 rounded-xl border border-gray-700 shadow-lg"
            >
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-bold">{role.title}</h3>
                <span className="text-xl font-bold text-green-400">
                  {Math.round(role.finalScore)}%
                </span>
              </div>

              {/* Match Score */}
              <div className="mt-4">
                <p className="text-sm text-gray-400">Match Score</p>
                <div className="w-full bg-gray-700 h-2 rounded mt-1">
                  <div
                    className="bg-green-500 h-2 rounded"
                    style={{ width: `${role.finalScore}%` }}
                  />
                </div>
              </div>

              {/* Confidence */}
              <div className="mt-4">
                <p className="text-sm text-gray-400">Confidence</p>
                <div className="w-full bg-gray-700 h-2 rounded mt-1">
                  <div
                    className="bg-yellow-400 h-2 rounded"
                    style={{ width: `${role.confidence}%` }}
                  />
                </div>
              </div>

              {/* Signals */}
              <div className="mt-4">
                <p className="text-sm text-gray-400 mb-2">
                  Matched Signals
                </p>

                <ul className="text-sm space-y-1">
                  {role.matchedSignals?.slice(0, 5).map((s, i) => (
                    <li key={i} className="flex justify-between">
                      <span>{s.signal}</span>
                      <span className="text-green-400">+{s.score}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tech Stack */}
      <div className="grid md:grid-cols-3 gap-4 mt-8">

        {/* Languages */}
        <Card title="Languages" items={languages} />

        {/* Frameworks */}
        <Card title="Frameworks" items={frameworks} />

        {/* Runtime */}
        <Card title="Runtime" items={["Node.js"]} />

      </div>
    </div>
  );
};

const Card = ({ title, items }) => (
  <div className="bg-[#111827] p-5 rounded-xl border border-gray-700">
    <p className="text-sm text-gray-400 mb-2">{title}</p>

    <div className="flex flex-wrap gap-2">
      {items?.length ? (
        items.map((item, i) => (
          <span
            key={i}
            className="bg-blue-900/40 text-blue-400 px-3 py-1 rounded-full text-xs"
          >
            {item}
          </span>
        ))
      ) : (
        <p className="text-gray-500 text-sm">None detected</p>
      )}
    </div>
  </div>
);

export default AnalyzePage;