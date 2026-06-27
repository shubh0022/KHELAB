"use client";

import React, { useState } from "react";
import { Download, FileText, CheckCircle, Loader2, X } from "lucide-react";

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  targetName: string; // Athlete name or Country name
  targetType: "country" | "athlete";
  additionalData?: any;
}

export default function ReportModal({ isOpen, onClose, targetName, targetType, additionalData }: ReportModalProps) {
  const [loadingType, setLoadingType] = useState<string | null>(null);
  const [completeType, setCompleteType] = useState<string | null>(null);

  if (!isOpen) return null;

  const formats = [
    { name: "PDF", extension: "pdf", desc: "Comprehensive Executive Intelligence Summary" },
    { name: "PowerPoint", extension: "pptx", desc: "Visual Dashboard Slides & Predictions" },
    { name: "Excel", extension: "xlsx", desc: "Granular Biometric & Performance Data" },
    { name: "CSV", extension: "csv", desc: "Machine Learning Telemetry Logs" },
    { name: "JSON", extension: "json", desc: "Structured RAW Node Data Structure" }
  ];

  const handleDownload = (format: string) => {
    setLoadingType(format);
    setCompleteType(null);

    // Simulate AI generation delay
    setTimeout(() => {
      setLoadingType(null);
      setCompleteType(format);

      // Trigger standard file download simulation
      const filename = `KHELAB_${targetType.toUpperCase()}_${targetName.replace(/\s+/g, "_")}_REPORT.${format.toLowerCase()}`;
      let content = "";
      if (format === "JSON") {
        content = JSON.stringify({
          generatedAt: new Date().toISOString(),
          target: targetName,
          type: targetType,
          metrics: additionalData || { status: "Active Prediction Grid" }
        }, null, 2);
      } else {
        content = `--- KHELAB GEN-AI DATA EXPORT ---\nTarget: ${targetName}\nTimestamp: ${new Date().toISOString()}\nStatus: Verified AI Prediction Layer`;
      }

      const blob = new Blob([content], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md px-4">
      <div className="w-full max-w-md glassmorphic-premium rounded-2xl p-6 border border-white/[0.08] overflow-hidden relative">
        {/* Soft glows */}
        <div className="absolute -top-10 -left-10 w-32 h-32 bg-white/[0.01] rounded-full blur-3xl"></div>

        <div className="flex items-center justify-between border-b border-white/[0.08] pb-4 mb-4">
          <div className="flex items-center space-x-2">
            <FileText className="w-4 h-4 text-white" />
            <h3 className="text-sm font-semibold font-sans text-white tracking-wide">Generate Report</h3>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors cursor-pointer">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-4">
          <p className="text-xs text-slate-300 font-medium font-sans">
            Target: <span className="text-white font-semibold">{targetName}</span>
          </p>
          <p className="text-[11px] text-[#86868b] leading-relaxed font-sans">
            Select an export vector. The platform compiles real-time telemetry inputs, historical records, and neural network projections inside a secure data format.
          </p>

          <div className="mt-4 space-y-2.5">
            {formats.map((format) => (
              <div
                key={format.name}
                className="flex items-center justify-between p-3 rounded-xl bg-white/[0.01] border border-white/[0.04] hover:border-white/[0.12] transition-all group"
              >
                <div>
                  <h4 className="text-xs font-semibold font-sans text-white group-hover:text-white transition-colors">
                    {format.name} (.{format.extension})
                  </h4>
                  <p className="text-[10px] text-slate-500 font-sans mt-0.5">{format.desc}</p>
                </div>

                <button
                  onClick={() => handleDownload(format.extension.toUpperCase())}
                  disabled={loadingType !== null}
                  className="flex items-center space-x-1 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] hover:bg-white hover:text-black disabled:opacity-40 text-white font-sans text-[10px] font-medium tracking-wide transition-all cursor-pointer"
                >
                  {loadingType === format.extension.toUpperCase() ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Compiling...</span>
                    </>
                  ) : completeType === format.extension.toUpperCase() ? (
                    <>
                      <CheckCircle className="w-3.5 h-3.5 text-[#30d158]" />
                      <span className="text-[#30d158]">Ready</span>
                    </>
                  ) : (
                    <>
                      <Download className="w-3 h-3" />
                      <span>Generate</span>
                    </>
                  )}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

