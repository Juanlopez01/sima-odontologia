"use client";

import { useState, useTransition, useRef, useEffect } from "react";
import { Save, Loader2, RotateCcw } from "lucide-react";
import type { EstadoDiente } from "@/lib/supabase/types";
import { actualizarOdontograma } from "@/app/admin/actions";

/* ─── Configuración de estados ──────────────────────────── */

const ESTADOS = [
  { value: "sano"       as EstadoDiente, label: "Sano",       fill: "#ffffff", stroke: "#94a3b8", text: "#334155", dashed: false },
  { value: "caries"     as EstadoDiente, label: "Caries",     fill: "#fca5a5", stroke: "#dc2626", text: "#7f1d1d", dashed: false },
  { value: "arreglo"    as EstadoDiente, label: "Arreglo",    fill: "#93c5fd", stroke: "#2563eb", text: "#1e3a8a", dashed: false },
  { value: "corona"     as EstadoDiente, label: "Corona",     fill: "#fde68a", stroke: "#d97706", text: "#78350f", dashed: false },
  { value: "implante"   as EstadoDiente, label: "Implante",   fill: "#ddd6fe", stroke: "#7c3aed", text: "#3b0764", dashed: false },
  { value: "extraccion" as EstadoDiente, label: "Extracción", fill: "#3f3f46", stroke: "#18181b", text: "#ffffff", dashed: false },
  { value: "ausente"    as EstadoDiente, label: "Ausente",    fill: "#f8fafc", stroke: "#cbd5e1", text: "#94a3b8", dashed: true  },
] as const;

const ESTADO_MAP = Object.fromEntries(ESTADOS.map(e => [e.value, e])) as Record<EstadoDiente, typeof ESTADOS[number]>;

/* ─── Geometría dental ─────────────────────────────────── */

type TType = "molar" | "premolar" | "canine" | "incisor_c" | "incisor_l";

const CROWN_H: Record<TType, number> = { molar: 33, premolar: 30, canine: 31, incisor_c: 29, incisor_l: 27 };
const ROOT_H:  Record<TType, number> = { molar: 21, premolar: 17, canine: 19, incisor_c: 15, incisor_l: 13 };
const TOOTH_W: Record<TType, number> = { molar: 27, premolar: 22, canine: 18, incisor_c: 19, incisor_l: 16 };

function ttype(num: number): TType {
  const d = num % 10;
  if (d >= 6) return "molar";
  if (d >= 4) return "premolar";
  if (d === 3) return "canine";
  if (d === 1) return "incisor_c";
  return "incisor_l";
}

// Cuánto se eleva/baja la encía según distancia al centro (índice 0=wisdom, 1=central incisor)
const ARCH_OFF = [16, 14, 11, 7, 4, 1, 0, 0]; // index = digit - 1

function archOff(num: number) { return ARCH_OFF[(num % 10) - 1] ?? 0; }

interface Tooth { num: number; x: number; w: number; tt: TType; ao: number }

function buildRow(nums: number[]): Tooth[] {
  const result: Tooth[] = [];
  let x = 80;
  nums.forEach((num, i) => {
    if (i === 8) x += 6; // gap de línea media
    const tt = ttype(num);
    result.push({ num, x, w: TOOTH_W[tt], tt, ao: archOff(num) });
    x += TOOTH_W[tt] + 2;
  });
  return result;
}

const UPPER = buildRow([18,17,16,15,14,13,12,11, 21,22,23,24,25,26,27,28]);
const LOWER = buildRow([48,47,46,45,44,43,42,41, 31,32,33,34,35,36,37,38]);

const SVG_W = 556;
const SVG_H = 316;
const U_BASE = 118; // y de la encía superior en los dientes frontales
const L_BASE = 198; // y de la encía inferior en los dientes frontales
const GUM_FILL   = "#fde8d8";
const GUM_STROKE = "#e8c4b0";
const ROOT_COLOR  = "#f3e0d3";

/* ─── Ruta suavizada por puntos (Catmull-Rom → Bezier) ─── */

function smoothPath(pts: [number, number][]): string {
  if (pts.length < 2) return "";
  let d = `M ${pts[0][0]},${pts[0][1]}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[Math.max(0, i - 1)];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[Math.min(pts.length - 1, i + 2)];
    const cp1x = p1[0] + (p2[0] - p0[0]) / 6;
    const cp1y = p1[1] + (p2[1] - p0[1]) / 6;
    const cp2x = p2[0] - (p3[0] - p1[0]) / 6;
    const cp2y = p2[1] - (p3[1] - p1[1]) / 6;
    d += ` C ${cp1x.toFixed(1)},${cp1y.toFixed(1)} ${cp2x.toFixed(1)},${cp2y.toFixed(1)} ${p2[0]},${p2[1]}`;
  }
  return d;
}

const upperGumPts: [number, number][] = UPPER.map(t => [t.x + t.w / 2, U_BASE - t.ao]);
const lowerGumPts: [number, number][] = LOWER.map(t => [t.x + t.w / 2, L_BASE + t.ao]);
const upperPath = smoothPath(upperGumPts);
const lowerPath = smoothPath(lowerGumPts);

const L_EDGE = UPPER[0].x;
const R_EDGE = UPPER[UPPER.length - 1].x + UPPER[UPPER.length - 1].w;

/* ─── Componente diente (SVG) ──────────────────────────── */

function ToothEl({
  t, estado, isUpper, isSelected, onClick,
}: {
  t: Tooth; estado: EstadoDiente; isUpper: boolean; isSelected: boolean;
  onClick: (e: React.MouseEvent<SVGGElement>) => void;
}) {
  const cfg = ESTADO_MAP[estado];
  const ch = CROWN_H[t.tt];
  const rh = ROOT_H[t.tt];
  const rw = Math.max(t.w * 0.48, 6);
  const rx = t.x + (t.w - rw) / 2;
  const gumY = isUpper ? U_BASE - t.ao : L_BASE + t.ao;
  const crownY = isUpper ? gumY : gumY - ch;
  const rootY  = isUpper ? gumY - rh : gumY;
  const numY   = isUpper ? rootY - 3 : rootY + rh + 11;
  const crownRx = t.tt === "molar" ? 3 : 4;

  return (
    <g onClick={onClick} className="cursor-pointer group">
      {/* Raíz */}
      {estado !== "ausente" && (
        <rect
          x={rx} y={rootY} width={rw} height={rh}
          rx={rw / 2}
          fill={ROOT_COLOR} stroke={GUM_STROKE} strokeWidth={0.5} opacity={0.85}
        />
      )}

      {/* Corona */}
      <rect
        x={t.x} y={crownY} width={t.w} height={ch} rx={crownRx}
        fill={cfg.fill}
        stroke={isSelected ? "#38BDF8" : cfg.stroke}
        strokeWidth={isSelected ? 2.5 : 1}
        strokeDasharray={cfg.dashed ? "3,2" : undefined}
        className="group-hover:brightness-95 transition-all duration-100"
      />

      {/* Detalle oclusal en molares (línea central) */}
      {(t.tt === "molar" || t.tt === "premolar") && estado === "sano" && (
        <line
          x1={t.x + t.w * 0.3} y1={crownY + ch * 0.35}
          x2={t.x + t.w * 0.7} y2={crownY + ch * 0.65}
          stroke="#e2e8f0" strokeWidth={1} strokeLinecap="round"
        />
      )}

      {/* X de extracción */}
      {estado === "extraccion" && (
        <g stroke="#fca5a5" strokeWidth={1.8} strokeLinecap="round">
          <line x1={t.x + 4} y1={crownY + 4} x2={t.x + t.w - 4} y2={crownY + ch - 4} />
          <line x1={t.x + t.w - 4} y1={crownY + 4} x2={t.x + 4} y2={crownY + ch - 4} />
        </g>
      )}

      {/* Número */}
      <text
        x={t.x + t.w / 2} y={numY}
        textAnchor="middle" fontSize={7.5}
        fill="#94a3b8" fontFamily="system-ui, sans-serif" fontWeight={600}
      >
        {t.num}
      </text>

      {/* Ring de selección */}
      {isSelected && (
        <rect
          x={t.x - 2} y={crownY - 2} width={t.w + 4} height={ch + 4} rx={crownRx + 2}
          fill="none" stroke="#38BDF8" strokeWidth={2} opacity={0.6}
        />
      )}
    </g>
  );
}

/* ─── Editor principal ─────────────────────────────────── */

interface Props { pacienteId: string; initialEstado: Record<string, EstadoDiente> }

export default function OdontogramaEditor({ pacienteId, initialEstado }: Props) {
  const [estados, setEstados] = useState<Record<string, EstadoDiente>>(initialEstado);
  const [selected, setSelected] = useState<number | null>(null);
  const [popPos, setPopPos] = useState<{ x: number; y: number } | null>(null);
  const [isDirty, setIsDirty] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [saveMsg, setSaveMsg] = useState<string | null>(null);
  const popRef = useRef<HTMLDivElement>(null);

  function getEstado(num: number): EstadoDiente {
    return estados[String(num)] ?? "sano";
  }

  function handleClick(num: number, e: React.MouseEvent<SVGGElement>) {
    setSelected(num);
    setPopPos({
      x: Math.min(e.clientX + 10, window.innerWidth - 190),
      y: Math.min(e.clientY + 10, window.innerHeight - 260),
    });
  }

  function handleSelect(num: number, estado: EstadoDiente) {
    setEstados(p => ({ ...p, [String(num)]: estado }));
    setIsDirty(true);
    setSaveMsg(null);
    setSelected(null);
    setPopPos(null);
  }

  function closePopover() { setSelected(null); setPopPos(null); }

  useEffect(() => {
    if (!popPos) return;
    const down = (e: MouseEvent) => {
      if (!popRef.current?.contains(e.target as Node)) closePopover();
    };
    const key = (e: KeyboardEvent) => { if (e.key === "Escape") closePopover(); };
    document.addEventListener("mousedown", down);
    document.addEventListener("keydown", key);
    return () => { document.removeEventListener("mousedown", down); document.removeEventListener("keydown", key); };
  }, [popPos]);

  function handleSave() {
    startTransition(async () => {
      const r = await actualizarOdontograma(pacienteId, estados);
      setSaveMsg(r.error ? `❌ ${r.error}` : "✅ Guardado");
      if (!r.error) setIsDirty(false);
    });
  }

  return (
    <div className="flex flex-col gap-4">
      {/* SVG */}
      <div className="bg-white rounded-2xl border border-sima-gray p-3 overflow-x-auto">
        <div className="flex justify-between text-[10px] text-slate-400 font-semibold px-2 mb-1 min-w-[520px]">
          <span>← Derecho del paciente</span>
          <span className="text-slate-500">ODONTOGRAMA — Notación FDI</span>
          <span>Izquierdo del paciente →</span>
        </div>

        <svg
          viewBox={`0 0 ${SVG_W} ${SVG_H}`}
          className="w-full h-auto min-w-[520px]"
          aria-label="Odontograma interactivo. Hacé click en cada diente para cambiar su estado."
        >
          {/* ── Tejido gingival superior ── */}
          <path
            d={`${upperPath} L ${R_EDGE + 10},0 L ${L_EDGE - 10},0 Z`}
            fill={GUM_FILL} opacity={0.55}
          />
          <path d={upperPath} fill="none" stroke={GUM_STROKE} strokeWidth={2.5} />

          {/* ── Tejido gingival inferior ── */}
          <path
            d={`${lowerPath} L ${R_EDGE + 10},${SVG_H} L ${L_EDGE - 10},${SVG_H} Z`}
            fill={GUM_FILL} opacity={0.55}
          />
          <path d={lowerPath} fill="none" stroke={GUM_STROKE} strokeWidth={2.5} />

          {/* ── Línea media ── */}
          <line
            x1={SVG_W / 2} y1={38} x2={SVG_W / 2} y2={SVG_H - 38}
            stroke="#e2e8f0" strokeWidth={1} strokeDasharray="5,4"
          />

          {/* ── Etiquetas arcada ── */}
          <text x={42} y={U_BASE + 6} fontSize={9} fill="#c9a99c" fontFamily="system-ui">Superior</text>
          <text x={42} y={L_BASE - 6} fontSize={9} fill="#c9a99c" fontFamily="system-ui">Inferior</text>

          {/* ── Dientes superiores ── */}
          {UPPER.map(t => (
            <ToothEl key={t.num} t={t} estado={getEstado(t.num)}
              isUpper isSelected={selected === t.num}
              onClick={e => handleClick(t.num, e)} />
          ))}

          {/* ── Dientes inferiores ── */}
          {LOWER.map(t => (
            <ToothEl key={t.num} t={t} estado={getEstado(t.num)}
              isUpper={false} isSelected={selected === t.num}
              onClick={e => handleClick(t.num, e)} />
          ))}
        </svg>
      </div>

      {/* Leyenda */}
      <div className="flex flex-wrap gap-2">
        {ESTADOS.map(e => (
          <span key={e.value}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border"
            style={{ background: e.fill, borderColor: e.stroke, color: e.text }}
          >
            {e.label}
          </span>
        ))}
      </div>

      {/* Acciones */}
      <div className="flex items-center gap-3 flex-wrap">
        <button onClick={handleSave} disabled={!isDirty || isPending}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-sima-accent text-white font-bold hover:bg-sima-accent-hover disabled:opacity-40 disabled:cursor-not-allowed transition-colors shadow-sm"
        >
          {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          Guardar cambios
        </button>

        {isDirty && (
          <button onClick={() => { setEstados(initialEstado); setIsDirty(false); setSaveMsg(null); }}
            disabled={isPending}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border-2 border-sima-gray text-slate-500 font-semibold hover:border-sima-accent hover:text-sima-accent transition-colors"
          >
            <RotateCcw className="w-4 h-4" /> Deshacer
          </button>
        )}

        {saveMsg && <p className="text-sm font-medium text-slate-600">{saveMsg}</p>}
      </div>

      {/* Popover de estado */}
      {popPos && selected && (
        <div ref={popRef} role="dialog" aria-label={`Estado del diente ${selected}`}
          style={{ position: "fixed", top: popPos.y, left: popPos.x, zIndex: 50 }}
          className="bg-white border border-sima-gray rounded-xl shadow-2xl p-3 w-44"
        >
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">
            Diente {selected}
          </p>
          <div className="flex flex-col gap-1">
            {ESTADOS.map(e => (
              <button key={e.value}
                onClick={() => handleSelect(selected, e.value)}
                className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-semibold border transition-all hover:scale-[1.02]"
                style={{
                  background: e.fill, borderColor: e.stroke, color: e.text,
                  outline: getEstado(selected) === e.value ? "2px solid #38BDF8" : "none",
                  outlineOffset: 2,
                }}
              >
                <span className="w-2.5 h-2.5 rounded-full border flex-shrink-0"
                  style={{ background: e.fill, borderColor: e.stroke }} />
                {e.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
