import { useState } from "react";
import "./App.css";

type Cell = { mode: string; value: number; level: number };
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
  const [baseCost, setBaseCost] = useState(10);
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
    const newGrid = structuredClone(grid);
    let currCell = newGrid[rIndex][cIndex];

    if (!!currCell && currCell?.level >= 5) {
      return;
    }
    const cost = !!currCell?.value
      ? baseCost * (currCell?.value + 1)
      : baseCost;

    if (money >= cost) {
      if (currCell === null) {
        currCell = { mode: "generator", value: 1, level: 1 };
        newGrid[rIndex][cIndex] = currCell;
      } else {
        currCell.value *= 2;
        currCell.level += 1;
      }

      setGrid(newGrid);
      setMoney(money - cost);
      setBaseCost(baseCost + 1);
    }
  }
  //leech
  //color
  //right click to remove

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
                    <td
                      onClick={() => handleClick(rIndex, cIndex)}
                      onContextMenu={() => handleClick(rIndex, cIndex)}
                    >
                      {!!!cell?.value ? (
                        <>{baseCost}</>
                      ) : (
                        <>
                          {cell?.mode} level {cell?.level}
                          <br />
                          increase: {cell?.value}
                          <br />
                          {cell?.level < 5 ? (
                            <>cost: {baseCost * (cell?.value + 1)}$</>
                          ) : (
                            <></>
                          )}
                        </>
                      )}
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
