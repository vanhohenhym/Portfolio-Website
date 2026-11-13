"use client";

import React, { useEffect, useRef } from "react";

interface AuroraBlob {
  baseX: number;
  baseY: number;
  orbitX: number;
  orbitY: number;
  speedX: number;
  speedY: number;
  phase: number;
  radiusRatio: number;
  color: string;
  alpha: number;
}

interface EmberParticle {
  x: number;
  y: number;
  radius: number;
  speedY: number;
  driftAmp: number;
  driftFreq: number;
  phase: number;
  alpha: number;
  color: string;
}

const AURORA_BLOBS: AuroraBlob[] = [
  {
    baseX: 0.25,
    baseY: 0.28,
    orbitX: 0.22,
    orbitY: 0.18,
    speedX: 0.00024,
    speedY: 0.00019,
    phase: 0.4,
    radiusRatio: 0.48,
    color: "234, 76, 21", // #EA4C15 Vibrant Sunset Orange
    alpha: 0.22,
  },
  {
    baseX: 0.78,
    baseY: 0.34,
    orbitX: 0.2,
    orbitY: 0.24,
    speedX: 0.00018,
    speedY: 0.00023,
    phase: 2.1,
    radiusRatio: 0.52,
    color: "143, 36, 6", // #8F2406 Deep Crimson/Rust
    alpha: 0.24,
  },
  {
    baseX: 0.52,
    baseY: 0.7,
    orbitX: 0.26,
    orbitY: 0.16,
    speedX: 0.00021,
    speedY: 0.00015,
    phase: 4.0,
    radiusRatio: 0.46,
    color: "255, 123, 41", // #FF7B29 Warm Golden Amber
    alpha: 0.15,
  },
  {
    baseX: 0.18,
    baseY: 0.82,
    orbitX: 0.18,
    orbitY: 0.2,
    speedX: 0.00016,
    speedY: 0.00022,
    phase: 1.3,
    radiusRatio: 0.42,
    color: "234, 76, 21", // #EA4C15
    alpha: 0.18,
  },
  {
    baseX: 0.82,
    baseY: 0.78,
    orbitX: 0.19,
    orbitY: 0.22,
    speedX: 0.00025,
    speedY: 0.00017,
    phase: 5.2,
    radiusRatio: 0.44,
    color: "143, 36, 6", // #8F2406
    alpha: 0.2,
  },
];

const EMBER_COLORS = [
  "255, 123, 41", // #FF7B29
  "234, 76, 21", // #EA4C15
  "255, 168, 92", // soft warm amber highlight
];

export function AmbientVideoBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    let dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    // Fewer particles on phones keeps the effect cheap.
    const emberCount = width < 640 ? 24 : 46;
    const embers: EmberParticle[] = Array.from({ length: emberCount }, (_, idx) => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: 1 + Math.random() * 3,
      speedY: 0.22 + Math.random() * 0.55,
      driftAmp: 0.18 + Math.random() * 0.45,
      driftFreq: 0.0008 + Math.random() * 0.0014,
      phase: idx * 0.7 + Math.random() * Math.PI * 2,
      alpha: 0.15 + Math.random() * 0.4,
      color: EMBER_COLORS[idx % EMBER_COLORS.length],
    }));

    let rafId = 0;
    let running = false;

    const drawFrame = (time: number) => {
      // Base Molten Obsidian canvas (#080301)
      ctx.globalCompositeOperation = "source-over";
      ctx.fillStyle = "#080301";
      ctx.fillRect(0, 0, width, height);

      // Layer A: Liquid Mesh / Lava Aurora blobs
      ctx.globalCompositeOperation = "lighter";
      const minDim = Math.max(width, height);

      for (const blob of AURORA_BLOBS) {
        const cx =
          (blob.baseX + Math.sin(time * blob.speedX + blob.phase) * blob.orbitX) *
          width;
        const cy =
          (blob.baseY + Math.cos(time * blob.speedY + blob.phase) * blob.orbitY) *
          height;
        const morph = 1 + 0.1 * Math.sin(time * 0.0003 + blob.phase);
        const r = Math.max(240, minDim * blob.radiusRatio * morph);

        const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
        grad.addColorStop(0, `rgba(${blob.color}, ${blob.alpha})`);
        grad.addColorStop(0.45, `rgba(${blob.color}, ${blob.alpha * 0.45})`);
        grad.addColorStop(1, `rgba(${blob.color}, 0)`);

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.fill();
      }

      // Layer B: Drifting Bokeh Embers
      for (const ember of embers) {
        ember.y -= ember.speedY;
        ember.x += Math.sin(time * ember.driftFreq + ember.phase) * ember.driftAmp;

        if (ember.y < -ember.radius * 4) {
          ember.y = height + ember.radius * 4;
          ember.x = Math.random() * width;
        }
        if (ember.x < -20) ember.x = width + 20;
        if (ember.x > width + 20) ember.x = -20;

        const glowRadius = ember.radius * 3.5;
        const emberGrad = ctx.createRadialGradient(
          ember.x,
          ember.y,
          0,
          ember.x,
          ember.y,
          glowRadius
        );
        emberGrad.addColorStop(0, `rgba(${ember.color}, ${ember.alpha})`);
        emberGrad.addColorStop(
          0.4,
          `rgba(${ember.color}, ${ember.alpha * 0.45})`
        );
        emberGrad.addColorStop(1, `rgba(${ember.color}, 0)`);

        ctx.fillStyle = emberGrad;
        ctx.beginPath();
        ctx.arc(ember.x, ember.y, glowRadius, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      // Keep a painted frame when motion is reduced.
      if (motionQuery.matches) drawFrame(0);
    };

    resize();
    window.addEventListener("resize", resize);

    const animate = (time: number) => {
      if (!running) return;
      drawFrame(time);
      rafId = requestAnimationFrame(animate);
    };

    const start = () => {
      if (running) return;
      running = true;
      rafId = requestAnimationFrame(animate);
    };

    const stop = () => {
      running = false;
      if (rafId) cancelAnimationFrame(rafId);
      rafId = 0;
    };

    const syncMotion = () => {
      stop();
      if (motionQuery.matches) {
        drawFrame(0);
      } else {
        start();
      }
    };

    syncMotion();
    if (typeof motionQuery.addEventListener === "function") {
      motionQuery.addEventListener("change", syncMotion);
    } else if (typeof (motionQuery as unknown as { addListener?: (cb: () => void) => void }).addListener === "function") {
      (motionQuery as unknown as { addListener: (cb: () => void) => void }).addListener(syncMotion);
    }

    return () => {
      stop();
      if (typeof motionQuery.removeEventListener === "function") {
        motionQuery.removeEventListener("change", syncMotion);
      } else if (typeof (motionQuery as unknown as { removeListener?: (cb: () => void) => void }).removeListener === "function") {
        (motionQuery as unknown as { removeListener: (cb: () => void) => void }).removeListener(syncMotion);
      }
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#080301]"
      aria-hidden="true"
    >
      {/* Continuous 60fps Liquid Aurora + Floating Embers Canvas */}
      <canvas ref={canvasRef} className="block w-full h-full" />

      {/* Cinematic Radial Vignette */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at center, transparent 45%, rgba(5, 2, 1, 0.8) 100%)",
        }}
      />

      {/* Subtle SVG Film Grain Overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.04] mix-blend-overlay film-grain-overlay" />
    </div>
  );
}

