"use client";

import { motion } from "framer-motion";
import { ShieldIcon, FileTextIcon, AlertTriangleIcon } from "lucide-react";

export default function TermsPage() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="fixed inset-0 -z-50">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#334155] opacity-95" />
        <div className="absolute inset-0 bg-[url('/images/grid-pattern-dark.svg')] opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#3b82f6]/20 via-transparent to-transparent" />
      </div>

      <div className="max-w-4xl mx-auto px-4 py-20 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-3 mb-4">
            <ShieldIcon className="text-blue-400" size={32} />
            <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-sky-300">
              Terms of Service
            </h1>
          </div>
          <p className="text-lg text-blue-100/80">
            Last updated:{" "}
            {new Date().toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </motion.div>

        <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8 shadow-lg shadow-blue-500/10">
          {[
            {
              title: "1. Acceptance of Terms",
              content:
                "By accessing or using Digital Vault services, you agree to be bound by these Terms. If you disagree, please refrain from using our platform.",
            },
            {
              title: "2. Eligibility",
              content:
                "You must be at least 18 years old and comply with all applicable laws in your jurisdiction to use our services.",
            },
            {
              title: "3. Account Security",
              content:
                "You are responsible for maintaining the confidentiality of your account credentials and all activities under your account.",
            },
            {
              title: "4. Prohibited Activities",
              content:
                "Illegal activities, market manipulation, fraud, and any violation of financial regulations are strictly prohibited.",
            },
            {
              title: "5. Limitation of Liability",
              content:
                "Digital Vault shall not be liable for any indirect, incidental, or consequential damages arising from platform use.",
            },
          ].map((section, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="mb-8 last:mb-0"
            >
              <h2 className="text-xl font-semibold mb-3 text-blue-300 flex items-center gap-2">
                <FileTextIcon className="text-blue-400" size={18} />
                {section.title}
              </h2>
              <p className="text-white/80">{section.content}</p>
            </motion.div>
          ))}

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-12 p-6 bg-blue-900/20 border border-blue-500/30 rounded-xl"
          >
            <div className="flex items-start gap-4">
              <AlertTriangleIcon className="text-yellow-400 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-medium text-yellow-300 mb-2">
                  Important Notice
                </h3>
                <p className="text-sm text-white/80">
                  These terms may be updated periodically. Continued use of the
                  platform after changes constitutes acceptance of the new
                  terms.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}