import React from "react";

function Tile({
  rowsCount,
  columnsCount,
  legend,
  imgSrc,
  getPosition,
}: {
  rowsCount: number;
  columnsCount: number;
  imgSrc: string;
  legend: string;
  getPosition: (coordinate: { row: number; column: number }) => number;
}) {
  const imgSize = 30;
  const imgMargin = 10;

  const rows = Array.from(Array(rowsCount).keys());
  const columns = Array.from(Array(columnsCount).keys());

  return (
    <div
      style={{
        margin: imgMargin,
        position: "relative",
        float: "left",
      }}
    >
      {legend}
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
                      getPosition({ row, column }) * 90
                    }deg)`,
                  }}
                />
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

Tile.defaultProps = {
  imgSrc: "./tile.png",
};

export default Tile;
