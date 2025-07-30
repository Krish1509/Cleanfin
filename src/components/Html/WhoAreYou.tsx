import React, { useState } from "react";

const tabData = [
  {
    label: "ANALYSIS",
    description:
      "Platea convallis magnis sed proin quam praesent et nisl. Odio massa aliquet blandit congue ipsum auctor. Natoque viverra laoreet proin aptent facilisi. Faucibus tristique integer nibh nostra massa proin iaculis eu dui.",
    features: [
      "Better Resource Management",
      "Improved Communication",
      "Increased Efficiency",
      "Higher Quality Outcomes"
    ]
  },
  {
    label: "STRATEGY",
    description:
      "Natoque viverra laoreet proin aptent facilisi. Faucibus tristique integer nibh nostra massa proin iaculis eu dui. Odio massa aliquet blandit congue ipsum auctor. Platea convallis magnis sed proin quam praesent et nisl.",
    features: [
      "Improved Communication",
      "Higher Quality Outcomes",
      "Increased Efficiency",
      "Better Resource Management"
    ]
  },
  {
    label: "EXECUTION",
    description:
      "Faucibus tristique integer nibh nostra massa proin iaculis eu dui. Platea convallis magnis sed proin quam praesent et nisl. Odio massa aliquet blandit congue ipsum auctor. Natoque viverra laoreet proin aptent facilisi.",
    features: [
      "Higher Quality Outcomes",
      "Increased Efficiency",
      "Better Resource Management",
      "Improved Communication"
    ]
  }
];

const PageContent: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section className="max-w-3xl mx-auto py-12 px-4">
      {/* Tag */}
      <div className="border border-black rounded-full px-4 py-1 text-xs font-medium inline-block mb-6">
        WHO WE ARE
      </div>

      {/* Heading */}
      <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
        Better strategy with<br />quality business
      </h1>

      {/* Tabs */}
      <div className="flex border-b mb-6">
        {tabData.map((tab, idx) => (
          <button
            key={tab.label}
            className={`px-6 py-2 font-semibold focus:outline-none ${
              activeTab === idx
                ? "border-b-2 border-black text-black"
                : "text-gray-500"
            } transition`}
            onClick={() => setActiveTab(idx)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Description */}
      <p className="text-gray-600 mb-6">
        {tabData[activeTab].description}
      </p>

      {/* Features */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 text-gray-800 text-sm">
        {tabData[activeTab].features.map((feature) => (
          <div key={feature} className="flex items-center space-x-2">
            <span className="text-green-700 text-lg">✓</span>
            <span>{feature}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PageContent;