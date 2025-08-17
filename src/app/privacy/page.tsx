"use client";

import { motion } from "framer-motion";
import { LockIcon, EyeOffIcon, DatabaseIcon, ServerIcon } from "lucide-react";

export default function PrivacyPage() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Градиентный фон */}
      <div className="fixed inset-0 -z-50">
        <div className="absolute inset-0 bg-gradient-to-br from-[#111827] via-[#1f2937] to-[#374151] opacity-95" />
        <div className="absolute inset-0 bg-[url('/images/grid-pattern-dark.svg')] opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#8b5cf6]/20 via-transparent to-transparent" />
      </div>

      <div className="max-w-4xl mx-auto px-4 py-20 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-3 mb-4">
            <LockIcon className="text-purple-400" size={32} />
            <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-violet-300">
              Privacy Policy
            </h1>
          </div>
          <p className="text-lg text-purple-100/80">
            Effective:{" "}
            {new Date().toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </motion.div>

        <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8 shadow-lg shadow-purple-500/10">
          {[
            {
              icon: <DatabaseIcon className="text-fuchsia-400" />,
              title: "Data Collection",
              content:
                "We collect necessary information including wallet addresses, transaction history, and device information to provide and improve our services.",
            },
            {
              icon: <ServerIcon className="text-blue-400" />,
              title: "Data Usage",
              content:
                "Your data is used solely for platform operations, security, compliance with regulations, and service improvements. We never sell your data.",
            },
            {
              icon: <EyeOffIcon className="text-emerald-400" />,
              title: "Data Protection",
              content:
                "We implement industry-standard security measures including encryption, 2FA, and regular audits to protect your information.",
            },
            {
              icon: <LockIcon className="text-yellow-400" />,
              title: "Your Rights",
              content:
                "You may request access, correction, or deletion of your personal data, subject to legal and operational requirements.",
            },
          ].map((section, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="mb-8 last:mb-0 p-6 bg-white/5 rounded-xl"
            >
              <div className="flex items-start gap-4">
                <div className="p-2 bg-white/10 rounded-lg mt-1">
                  {section.icon}
                </div>
                <div>
                  <h2 className="text-xl font-semibold mb-3 text-white">
                    {section.title}
                  </h2>
                  <p className="text-white/80">{section.content}</p>
                </div>
              </div>
            </motion.div>
          ))}

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-12 p-6 bg-purple-900/20 border border-purple-500/30 rounded-xl"
          >
            <h3 className="font-medium text-purple-300 mb-4">
              Changes to This Policy
            </h3>
            <p className="text-white/80">
              We may update this policy periodically. Material changes will be
              communicated through our platform or email. Your continued use
              constitutes acceptance.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}