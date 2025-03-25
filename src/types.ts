export const MODES = ["generator", "leech"] as const;
export type Mode = (typeof MODES)[number];
export type Cell = { mode: Mode; value: number; level: number };
export type Grid = Array<Array<Cell | null>>;

export const BaseCost: Record<Mode, number> = {
  generator: 10,
  leech: 20,
};
// type Mode = "generator" | "leech";

// for (const m of MODES) {
//   const c = BaseCost[m];
// }
