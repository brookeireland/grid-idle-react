import { useState } from "react";
import "./App.css";

type Cell = { mode: string; value: number };
type Grid = Array<Array<Cell | null>>;
function App() {
  const [money, setMoney] = useState(20);
  const [grid, setGrid] = useState<Grid>([
    [null, null, null, null, null],
    [null, null, null, null, null],
    [null, null, null, null, null],
    [null, null, null, null, null],
    [null, null, null, null, null],
  ]);

  let tick = 0;
  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 5; j++) {
      let g = grid[i][j];
      if (g) {
        tick = tick + g.value;
      }
    }
  }

  function handleClick(rIndex: number, cIndex: number) {
    if (money >= 10) {
      const newGrid = structuredClone(grid);
      let currCell = newGrid[rIndex][cIndex];
      if (currCell === null) {
        currCell = { mode: "generator", value: 1 };
        newGrid[rIndex][cIndex] = currCell;
      } else {
        currCell.value += 1;
      }

      setGrid(newGrid);
      setMoney(money - 10);
    }
  }

  return (
    <>
      <div>money = {money}</div>
      <button onClick={() => setMoney((m) => m + tick)}>tick by {tick}</button>
      <table>
        <tbody>
          {grid.map((row, rIndex) => {
            return (
              <tr>
                {row.map((cell, cIndex) => {
                  return (
                    <td onClick={() => handleClick(rIndex, cIndex)}>
                      {cell?.value}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

export default App;
