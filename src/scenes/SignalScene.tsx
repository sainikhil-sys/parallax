import React, { useState, useRef } from 'react';
import { ParallaxLayer } from '../components/parallax/ParallaxLayer';
import { Badge } from '../components/ui/Badge';
import { Progress } from '../components/ui/Progress';
import { Separator } from '../components/ui/Separator';
import { Tooltip } from '../components/ui/Tooltip';
import { Dialog } from '../components/ui/Dialog';
import { MagneticButton } from '../components/ui/MagneticButton';
import { Radioactive, Cpu, Terminal, CheckCircle } from '@phosphor-icons/react';

export const SignalScene: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [calibration, setCalibration] = useState(88);

  return (
    <section
      id="signal"
      ref={containerRef}
      className="relative min-h-[160vh] w-full bg-[#050505] overflow-hidden py-32 flex flex-col justify-between px-6 sm:px-12 select-none"
    >
      {/* Background Volumetric Horizon Glow */}
      <ParallaxLayer
        speed={0.12}
        triggerRef={containerRef}
        className="absolute inset-0 pointer-events-none"
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-t from-[#00F0FF]/10 via-[#00F0FF]/5 to-transparent blur-[140px] rounded-full" />
      </ParallaxLayer>

      {/* Narrative Section Header */}
      <div className="relative z-30 max-w-4xl mx-auto text-center w-full pt-6">
        <div className="inline-flex items-center gap-3 font-mono text-xs text-[#858585] tracking-[0.25em] uppercase mb-4">
          <span className="text-[#00F0FF] font-semibold">05</span>
          <span className="text-white/20">/</span>
          <span>05</span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#00F0FF] mx-1" />
          <span className="text-[#F5F5F0]/80">CONVERGENCE</span>
        </div>

        <div className="font-mono text-xs text-[#00F0FF] tracking-widest uppercase mb-3 flex items-center justify-center gap-2">
          <CheckCircle size={14} weight="fill" className="text-[#00F0FF]" />
          <span>SIGNAL FOUND.</span>
        </div>

        <h2 className="font-display font-black text-5xl sm:text-7xl lg:text-8xl tracking-tight uppercase text-white leading-tight">
          YOU MADE IT
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white via-white/80 to-[#00F0FF]">
            THROUGH THE LAYERS.
          </span>
        </h2>
      </div>

      {/* ============================================================
          DISCOVERED TACTILE INTERFACE OBJECT (Not a dashboard!)
          ============================================================ */}
      <div className="relative z-20 max-w-lg mx-auto w-full my-auto perspective-1200">
        <ParallaxLayer
          speed={0.65}
          scale={[0.95, 1.05]}
          triggerRef={containerRef}
          className="w-full transform-style-3d"
        >
          <div className="p-7 sm:p-9 rounded-3xl bg-[#0a0a0a]/90 border border-white/[0.12] backdrop-blur-2xl shadow-[0_0_80px_rgba(0,0,0,0.85)] relative group">
            {/* Ambient Corner Accent */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-[#00F0FF]/10 rounded-tr-3xl blur-2xl pointer-events-none" />

            {/* Console Meta */}
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2 font-mono text-xs tracking-widest text-[#F5F5F0]">
                <Radioactive size={16} className="text-[#00F0FF] animate-pulse" />
                <span>TERMINAL ARTIFACT</span>
              </div>
              <Badge variant="glow">CONNECTED</Badge>
            </div>

            <Separator className="mb-5" />

            {/* Telemetry & Metrics */}
            <div className="space-y-5">
              <div>
                <div className="flex justify-between font-mono text-xs text-[#858585] mb-2 tracking-wider">
                  <span>LAYER COHERENCE</span>
                  <span className="text-[#00F0FF] font-semibold">{calibration}%</span>
                </div>
                <Progress value={calibration} />
              </div>

              <div className="grid grid-cols-2 gap-3 pt-1">
                <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                  <span className="font-mono text-[9px] text-[#858585] block tracking-wider uppercase">
                    PARALLAX AXIS
                  </span>
                  <span className="font-display font-bold text-lg text-white">10 STRATA</span>
                </div>

                <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                  <span className="font-mono text-[9px] text-[#858585] block tracking-wider uppercase">
                    FRAME JITTER
                  </span>
                  <span className="font-display font-bold text-lg text-[#00F0FF]">ZERO</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-3 pt-3">
                <Tooltip content="Inspect raw telemetry archive" side="top">
                  <MagneticButton
                    onClick={() => setIsDialogOpen(true)}
                    ariaLabel="Inspect artifact"
                    variant="primary"
                    className="w-full sm:w-auto"
                  >
                    <Terminal size={15} />
                    <span>INSPECT ARTIFACT</span>
                  </MagneticButton>
                </Tooltip>

                <Tooltip content="Recalibrate sensors" side="top">
                  <MagneticButton
                    onClick={() => setCalibration((prev) => (prev >= 100 ? 80 : prev + 5))}
                    ariaLabel="Recalibrate sensors"
                    variant="outline"
                    className="w-full sm:w-auto"
                  >
                    <Cpu size={15} />
                    <span>RECALIBRATE</span>
                  </MagneticButton>
                </Tooltip>
              </div>
            </div>
          </div>
        </ParallaxLayer>
      </div>

      {/* Discovered Inspection Dialog */}
      <Dialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        title="SPATIAL TELEMETRY ARCHIVE"
        subtitle="VIRTUAL PARALLAX MATRIX LOG"
      >
        <div className="space-y-4 font-mono text-xs">
          <p className="text-[#858585] leading-relaxed">
            All 5 spatial environments were parsed with decoupled z-indexes, GPU acceleration, and velocity-linked inertia curves.
          </p>
          <div className="p-3 rounded-lg bg-black/70 border border-white/[0.08] text-[#00F0FF] space-y-1">
            <div>CAMERA ENGINE: LENIS VIRTUAL WHEEL</div>
            <div>SCROLL MATRIX: GSAP SCROLLTRIGGER 3D</div>
            <div>VERIFICATION: 120 FPS FLUID COMPOSITE</div>
          </div>
          <p className="text-[#858585]">
            Engineered for Techfest IIT Bombay web-development exhibition.
          </p>
        </div>
      </Dialog>
    </section>
  );
};

export default SignalScene;
