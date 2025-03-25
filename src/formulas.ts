import { BaseCost, Cell, Grid, Mode } from "./types";

export function calculateTickGain(grid: Grid) {
  let tick = sumGridProperties(grid, (c) => c.value);
  return tick;
}

export function calculateCost(
  grid: Grid,
  selectedMode: Mode,
  cell: Cell | null
) {
  let levelSum = sumGridProperties(grid, (c) => c.level);
  const cost = cell
    ? levelSum + BaseCost[cell.mode] * (cell.value + 1)
    : levelSum + BaseCost[selectedMode];

  return cost;
}

//make more flexible :)
function sumGridProperties(
  grid: Grid,
  fn: (cell: Cell, row: number, col: number) => number
) {
  let val = 0;
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      let c = grid[i][j];
      if (c) {
        val = val + fn(c, i, j);
      }
    }
  }
  return val;
}
