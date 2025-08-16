"use client";

import Image from "next/image";
import { FiUser } from "react-icons/fi";

interface BonusTask {
  id: number;
  title: string;
  description: string;
  buttons: string[];
  ticketImageSrc: string;
}

const bonusTasks: BonusTask[] = [
  {
    id: 1,
    title: "Deposit Task",
    description: "Deposit 100 USD within the period",
    buttons: ["Deposit"],
    ticketImageSrc: "/assets/Group 2.png",
  },
  {
    id: 2,
    title: "First Trading",
    description: "Complete the first trading ≥ 300 USD to receive 20 USDT",
    buttons: ["Trade"],
    ticketImageSrc: "/assets/Group 2.png",
  },
  {
    id: 3,
    title: "Cumulative Net Deposit & Trading Mission",
    description: "Deposit 3,000 equivalent assets and trade 30,000,000 USD.",
    buttons: ["Trade", "Deposit"],
    ticketImageSrc: "/assets/Group 3.png",
  },
];

export default function BonusSection(): JSX.Element {
  return (
    <section className="rounded-2xl p-16 relative text-white max-w-full">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm text-gray-400 mb-1">New User Exclusive</p>
          <h1 className="text-4xl font-extrabold leading-tight mb-2">
            1,000 USD Bonus Awaits!
          </h1>
          <div className="flex items-center text-gray-400 text-sm">
            <FiUser className="mr-2" size={16} />
            <span>
              Total Participants:{" "}
              <span className="font-semibold text-white">85,379</span>
            </span>
          </div>
        </div>
        {/* Right side image */}
        <div className="relative w-48 h-40">
          <Image
            src="/assets/Group 1.png"
            alt="Bonus Illustration"
            fill
            style={{ objectFit: "contain" }}
            priority
          />
        </div>
      </div>

      {/* Bonus Tasks List */}
      <div className="space-y-6">
        {bonusTasks.map((task) => (
          <div
            key={task.id}
            className="bg-[#1a1a2e] rounded-xl flex items-center p-6 relative overflow-hidden"
          >
            {/* Limited task label */}
            <div className="absolute top-0 left-0 bg-purple-600 rounded-tr-xl rounded-bl-xl px-3 py-1 text-xs font-semibold select-none z-10">
              Limited task
            </div>

            {/* Left ticket image */}
            <div className="flex-shrink-0 relative w-40 h-24 mr-8">
              <Image
                src={task.ticketImageSrc}
                alt={`Bonus ticket for ${task.title}`}
                fill
                style={{ objectFit: "contain" }}
                priority
              />
            </div>

            {/* Right side content */}
            <div className="flex flex-col flex-grow">
              <h3 className="text-white font-semibold text-lg mb-1">
                {task.title}
              </h3>
              <p className="text-gray-400 text-sm mb-4">{task.description}</p>
            </div>

            {/* Buttons aligned to right end */}
            <div className="ml-auto flex space-x-4">
              {task.buttons.map((btn) => (
                <button
                  key={btn}
                  className="bg-purple-600 hover:bg-purple-700 transition-colors rounded-full px-6 py-2 text-white font-semibold text-sm"
                >
                  {btn}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}