import React from "react";
import { Project } from "@/data/projects";
import { Video, MessageSquare, Zap, Shield, FileText, CheckCircle2, Database, Terminal, Cpu } from "lucide-react";

interface ProjectVisualProps {
  project: Project;
}

export const ProjectVisual: React.FC<ProjectVisualProps> = ({ project }) => {
  const renderVisualContent = () => {
    switch (project.visualType) {
      case "webrtc-realtime":
        return (
          <div className="w-full h-full p-4 flex flex-col justify-between font-mono text-xs select-none">
            {/* Window header */}
            <div className="flex items-center justify-between border-b border-[var(--hairline)] pb-3">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#3DDC84] animate-pulse" />
                <span className="text-[var(--text-primary)] font-semibold">STUDY_ROOM #402 [LIVE]</span>
              </div>
              <span className="text-[10px] text-[#3DDC84] bg-[#3DDC84]/10 border border-[#3DDC84]/20 px-2 py-0.5 rounded-control">
                WebRTC MESH: CONNECTED
              </span>
            </div>

            {/* Video participants preview */}
            <div className="grid grid-cols-2 gap-2 my-3">
              <div className="aspect-video rounded-control bg-[var(--bg)] border border-[var(--hairline)] p-2.5 flex flex-col justify-between">
                <div className="flex items-center justify-between text-[10px] text-[var(--text-secondary)]">
                  <span>Peer 01 (Host)</span>
                  <Video size={11} className="text-[#3DDC84]" />
                </div>
                <div className="flex items-center justify-center text-xs font-semibold text-[var(--text-primary)]">
                  [1080p WebRTC Stream]
                </div>
                <span className="text-[9px] text-[#3DDC84]">AUDIO / VIDEO OK</span>
              </div>

              <div className="aspect-video rounded-control bg-[var(--bg)] border border-[var(--hairline)] p-2.5 flex flex-col justify-between">
                <div className="flex items-center justify-between text-[10px] text-[var(--text-secondary)]">
                  <span>Peer 02</span>
                  <Video size={11} className="text-[#3DDC84]" />
                </div>
                <div className="flex items-center justify-center text-xs font-semibold text-[var(--text-primary)]">
                  [720p WebRTC Stream]
                </div>
                <span className="text-[9px] text-[#3DDC84]">LATENCY: 28ms</span>
              </div>
            </div>

            {/* Bottom socket telemetry */}
            <div className="p-2.5 rounded-control bg-[var(--bg)] border border-[var(--hairline)] space-y-1.5 text-[11px]">
              <div className="flex items-center justify-between text-[var(--text-secondary)]">
                <span className="flex items-center gap-1">
                  <MessageSquare size={11} className="text-[#3DDC84]" />
                  WebSocket Stream
                </span>
                <span className="text-[10px]">Redis Pub/Sub Sync</span>
              </div>
              <p className="text-[var(--text-primary)] text-[10px] truncate">
                &gt; Tutor booked via Stripe Escrow · Atomic lock released · Session active
              </p>
            </div>
          </div>
        );

      case "ai-pipeline":
        return (
          <div className="w-full h-full p-4 flex flex-col justify-between font-mono text-xs select-none">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-[var(--hairline)] pb-3">
              <div className="flex items-center gap-2">
                <Cpu size={14} className="text-[#3DDC84]" />
                <span className="text-[var(--text-primary)] font-semibold">AI_ANALYSIS_PIPELINE</span>
              </div>
              <span className="text-[10px] text-[#3DDC84] bg-[#3DDC84]/10 border border-[#3DDC84]/20 px-2 py-0.5 rounded-control">
                ZOD SCHEMA VALIDATED
              </span>
            </div>

            {/* Analysis Scorecard simulation */}
            <div className="my-3 space-y-2.5">
              <div className="p-3 rounded-control bg-[var(--bg)] border border-[var(--hairline)] flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-[var(--text-secondary)] block">TARGET ROLE ALIGNMENT</span>
                  <span className="text-sm font-bold text-[var(--text-primary)]">Full-Stack Engineer</span>
                </div>
                <div className="text-right">
                  <span className="text-base font-bold text-[#3DDC84]">92% MATCH</span>
                  <span className="text-[10px] text-[var(--text-secondary)] block">Token Budget: 1,840</span>
                </div>
              </div>

              {/* Extraction stream */}
              <div className="p-2.5 rounded-control bg-[var(--bg)] border border-[var(--hairline)] space-y-1 text-[10px] text-[var(--text-secondary)]">
                <div className="flex items-center justify-between">
                  <span className="text-[#3DDC84]">✓ Spatial PDF Bounding Extraction</span>
                  <span>4 cols merged</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#3DDC84]">✓ Skills & Experience Chunking</span>
                  <span>3 sub-prompts</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#3DDC84]">✓ Structured Diagnostic Persisted</span>
                  <span>MongoDB OK</span>
                </div>
              </div>
            </div>

            {/* Telemetry Footer */}
            <div className="flex items-center justify-between text-[10px] text-[var(--text-secondary)] pt-2 border-t border-[var(--hairline)]">
              <span>Next.js App Router UI</span>
              <span className="text-[#3DDC84]">Inference Time: 3.2s</span>
            </div>
          </div>
        );

      case "caching-payments":
        return (
          <div className="w-full h-full p-4 flex flex-col justify-between font-mono text-xs select-none">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-[var(--hairline)] pb-3">
              <div className="flex items-center gap-2">
                <Zap size={14} className="text-[#3DDC84]" />
                <span className="text-[var(--text-primary)] font-semibold">VOYA_RESERVATION_GATEWAY</span>
              </div>
              <span className="text-[10px] text-[#3DDC84] bg-[#3DDC84]/10 border border-[#3DDC84]/20 px-2 py-0.5 rounded-control">
                CACHE HIT: 42ms
              </span>
            </div>

            <div className="my-3 space-y-2.5">
              <div className="p-3 rounded-control bg-[var(--bg)] border border-[var(--hairline)] flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-[var(--text-secondary)] block">ITINERARY QUERY CACHE</span>
                  <span className="text-xs font-bold text-[var(--text-primary)]">Redis Key: dest:tokyo:2024</span>
                </div>
                <span className="text-xs text-[#3DDC84] font-semibold">TTL: 580s</span>
              </div>

              <div className="p-3 rounded-control bg-[var(--bg)] border border-[var(--hairline)] flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-[var(--text-secondary)] block">STRIPE WEBHOOK DISPATCH</span>
                  <span className="text-xs text-[var(--text-primary)]">checkout.session.completed</span>
                </div>
                <span className="text-[10px] text-[#3DDC84] flex items-center gap-1">
                  <Shield size={10} />
                  SIGNATURE VERIFIED
                </span>
              </div>
            </div>

            <div className="p-2.5 rounded-control bg-[var(--bg)] border border-[var(--hairline)] flex items-center justify-between text-[10px] text-[var(--text-secondary)]">
              <span className="flex items-center gap-1 text-[var(--text-primary)]">
                <FileText size={11} className="text-[#3DDC84]" />
                Itinerary PDF Compiled
              </span>
              <span className="text-[#3DDC84]">Streamed to Client</span>
            </div>
          </div>
        );

      case "acid-database":
      default:
        return (
          <div className="w-full h-full p-4 flex flex-col justify-between font-mono text-xs select-none">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-[var(--hairline)] pb-3">
              <div className="flex items-center gap-2">
                <Database size={14} className="text-[#3DDC84]" />
                <span className="text-[var(--text-primary)] font-semibold">MYSQL_TRANSACTION_ENGINE</span>
              </div>
              <span className="text-[10px] text-[#3DDC84] bg-[#3DDC84]/10 border border-[#3DDC84]/20 px-2 py-0.5 rounded-control">
                ACID ISOLATION: OK
              </span>
            </div>

            <div className="my-3 space-y-2">
              <div className="p-2.5 rounded-control bg-[var(--bg)] border border-[var(--hairline)] space-y-1 font-mono text-[10px]">
                <div className="text-[#3DDC84]">&gt; START TRANSACTION;</div>
                <div className="text-[var(--text-secondary)] pl-3">
                  INSERT INTO invoices (id, client_id, subtotal_cents) VALUES (104, 12, 450000);
                </div>
                <div className="text-[var(--text-secondary)] pl-3">
                  INSERT INTO invoice_items (invoice_id, tax_cents) VALUES (104, 81000);
                </div>
                <div className="text-[#3DDC84]">&gt; COMMIT;</div>
              </div>

              <div className="p-2 rounded-control bg-[var(--bg)] border border-[var(--hairline)] flex items-center justify-between text-[10px]">
                <span className="text-[var(--text-secondary)]">Precision Math:</span>
                <span className="text-[#3DDC84] font-semibold">Zero IEEE-754 Floating Drift</span>
              </div>
            </div>

            <div className="flex items-center justify-between text-[10px] text-[var(--text-secondary)] pt-2 border-t border-[var(--hairline)]">
              <span>Normalized Foreign Keys</span>
              <span className="text-[#3DDC84]">PDF Stream: Active</span>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="relative w-full aspect-[16/11] sm:aspect-[16/10] rounded-xl border border-[var(--hairline)] bg-[var(--surface)] shadow-lg overflow-hidden group hover:border-[#3DDC84]/40 transition-all">
      {/* Browser chrome top bar */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-[var(--hairline)] bg-[var(--bg)]/70">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
          <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#3DDC84]/80" />
        </div>
        <span className="font-mono text-[10px] text-[var(--text-secondary)]">
          https://{project.id}.local/preview
        </span>
        <span className="w-4" />
      </div>

      {/* Rendered architectural / UI content */}
      <div className="w-full h-[calc(100%-37px)] bg-[var(--surface)]">
        {renderVisualContent()}
      </div>
    </div>
  );
};
