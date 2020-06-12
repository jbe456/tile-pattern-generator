import React, { useState, ReactNode } from "react";
import "./App.css";
import { Form, Slider, Upload, Button, Radio } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import "antd/dist/antd.css";
import Tiles from "./Tiles";
import Tile from "./Tile";

const MAX_COMBINATIONS = 9;
const getMarks = (max: number) =>
  Array.from(new Array(max).keys()).reduce(
    (marks, key) => ({ ...marks, [key + 1]: key + 1 }),
    {}
  );
const randomIntFromInterval = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1) + min);

function App() {
  const rowsCount = 12;
  const columnsCount = 8;

  const [imgSrc, setImgSrc] = useState<string>();
  const [mode, setMode] = useState<string>("patterns");
  const [motifWidth, setMotifWidth] = useState<number>(1);
  const [motifHeight, setMotifHeight] = useState<number>(1);
  const [, updateState] = React.useState();

  const maxWidth = Math.floor(MAX_COMBINATIONS / motifHeight);
  const maxHeight = Math.floor(MAX_COMBINATIONS / motifWidth);

  let commands: ReactNode;
  let content: ReactNode;
  if (mode === "patterns") {
    commands = [
      <Form.Item key="width" label="Pattern width">
        <Slider
          style={{ width: 120 }}
          min={1}
          max={maxWidth}
          marks={getMarks(maxWidth)}
          onChange={(value) => {
            setMotifWidth(value as any);
          }}
        />
      </Form.Item>,
      <Form.Item key="height" label="Pattern height">
        <Slider
          style={{ width: 120 }}
          min={1}
          max={maxHeight}
          marks={getMarks(maxHeight)}
          onChange={(value) => {
            setMotifHeight(value as any);
          }}
        />
      </Form.Item>,
    ];

    content = (
      <Tiles
        rowsCount={rowsCount}
        columnsCount={columnsCount}
        imgSrc={imgSrc}
        motifWidth={motifWidth}
        motifHeight={motifHeight}
      />
    );
  } else {
    commands = (
      <Form.Item>
        <Button
          style={{ margin: 5 }}
          type="primary"
          onClick={() => updateState({})}
        >
          Generate
        </Button>
      </Form.Item>
    );

    content = [1, 2, 3].map((index) => (
      <Tile
        rowsCount={rowsCount}
        columnsCount={columnsCount}
        imgSrc={imgSrc}
        legend={`Random ${index}`}
        getPosition={() => randomIntFromInterval(0, 3)}
      />
    ));
  }

  return (
    <div>
      <Form layout="inline" size="small">
        <Form.Item>
          <Upload
            listType="picture"
            showUploadList={false}
            beforeUpload={(file) => {
              const reader = new FileReader();

              reader.onload = (e) => {
                setImgSrc(e?.target?.result as any);
              };
              reader.readAsDataURL(file);

              // Prevent upload
              return false;
            }}
          >
            <Button style={{ margin: 5 }}>
              <UploadOutlined /> Upload Tile
            </Button>
          </Upload>
        </Form.Item>
        <Form.Item>
          <Radio.Group
            value={mode}
            onChange={(value) => {
              setMode(value.target.value);
            }}
            size="small"
            style={{ margin: 5 }}
          >
            <Radio.Button value="patterns">Patterns</Radio.Button>
            <Radio.Button value="random">Random</Radio.Button>
          </Radio.Group>
        </Form.Item>
        {commands}
      </Form>
      {content}
    </div>
  );
}

export default App;
