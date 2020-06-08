import React, { CSSProperties } from "react";
import Combinatorics from "js-combinatorics";
import { AutoSizer, List } from "react-virtualized";
import { getKey, getTranslations } from "./utils";

function Tiles({
  motifWidth,
  motifHeight,
  imgSrc,
}: {
  imgSrc: string;
  motifWidth: number;
  motifHeight: number;
}) {
  const imgSize = 30;
  const rowsCount = 12;
  const imgMargin = 10;

  const rows = Array.from(Array(rowsCount).keys());
  const columns = Array.from(Array(8).keys());
  const positions = [0, 1, 2, 3];

  const linePatterns = Combinatorics.baseN(positions, motifWidth).toArray();
  const allCombinations = Combinatorics.baseN(
    linePatterns,
    motifHeight
  ).toArray();

  const alreadySeen: { [key: string]: boolean } = {};
  const worldOfPossible = allCombinations.filter((combination) => {
    const key = getKey(combination);
    const skip = alreadySeen[key];

    if (!alreadySeen[key]) {
      const allTranslations = getTranslations(combination);

      allTranslations
        .map((comb) => getKey(comb))
        .forEach((k) => {
          alreadySeen[k] = true;
        });

      alreadySeen[key] = true;
    }

    return !skip;
  });

  const rowRenderer = ({
    index,
    key,
    style,
  }: {
    index: number;
    key: string;
    style: CSSProperties;
  }) => (
    <div key={key} style={style}>
      <div
        style={{
          margin: imgMargin,
          position: "relative",
          float: "left",
        }}
      >
        № {index}
        {rows.map((row) => {
          return (
            <div key={row} style={{ height: imgSize }}>
              {columns.map((column) => {
                return (
                  <img
                    alt=""
                    key={column}
                    src={imgSrc}
                    style={{
                      width: imgSize,
                      transform: `rotate(${
                        worldOfPossible[index][row % motifHeight][
                          column % motifWidth
                        ] * 90
                      }deg)`,
                    }}
                  />
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );

  return (
    <div>
      <div>Generated {worldOfPossible.length} patterns</div>
      <div style={{ height: "calc(100vh - 72px)" }}>
        <AutoSizer>
          {({ height, width }) => (
            <List
              rowCount={worldOfPossible.length}
              height={height}
              rowHeight={imgSize * rowsCount + 2 * imgMargin}
              rowRenderer={rowRenderer}
              width={width}
            />
          )}
        </AutoSizer>
      </div>
    </div>
  );
}

Tiles.defaultProps = {
  imgSrc: "./tile.png",
  motifWidth: 1,
  motifHeight: 1,
};

export default Tiles;
