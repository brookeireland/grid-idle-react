import { useState } from "react";
import "./App.css";
import { Grid, Mode } from "./types";
import { calculateCost, calculateTickGain } from "./formulas";

function App() {
  const [money, setMoney] = useState(20);
  const [grid, setGrid] = useState<Grid>([
    [null, null, null, null, null],
    [null, null, null, null, null],
    [null, null, null, null, null],
    [null, null, null, null, null],
    [null, null, null, null, null],
  ]);
  const [selectedMode, setSelectedMode] = useState<Mode>("generator");
  const tick = calculateTickGain(grid);

  function handleClick(rIndex: number, cIndex: number) {
    const newGrid = structuredClone(grid);
    let currCell = newGrid[rIndex][cIndex];

    if (!!currCell && currCell?.level >= 5) {
      return;
    }
    const cost = calculateCost(grid, selectedMode, currCell);

    if (money >= cost) {
      if (currCell === null) {
        currCell = { mode: selectedMode, value: 1, level: 1 };
        newGrid[rIndex][cIndex] = currCell;
      } else {
        currCell.value *= 2;
        currCell.level += 1;
      }

      setGrid(newGrid);
      setMoney(money - cost);
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
                      {!cell ? (
                        <>{calculateCost(grid, selectedMode, null)}</>
                      ) : (
                        <>
                          {cell.mode} level {cell.level}
                          <br />
                          increase: {cell.value}
                          <br />
                          {cell.level < 5 ? (
                            <>
                              cost: {calculateCost(grid, selectedMode, cell)}$
                            </>
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
