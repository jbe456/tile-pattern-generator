import React, { useState } from "react";
import "./App.css";
import { Form, Slider, Upload, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import "antd/dist/antd.css";
import Tiles from "./Tiles";

const MAX_COMBINATIONS = 9;
const getMarks = (max: number) =>
  Array.from(new Array(max).keys()).reduce(
    (marks, key) => ({ ...marks, [key + 1]: key + 1 }),
    {}
  );

function App() {
  const [imgSrc, setImgSrc] = useState<string>();
  const [motifWidth, setMotifWidth] = useState<number>(1);
  const [motifHeight, setMotifHeight] = useState<number>(1);

  const maxWidth = Math.floor(MAX_COMBINATIONS / motifHeight);
  const maxHeight = Math.floor(MAX_COMBINATIONS / motifWidth);

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
            <Button>
              <UploadOutlined /> Upload Tile
            </Button>
          </Upload>
        </Form.Item>
        <Form.Item label="Pattern width">
          <Slider
            style={{ width: 120 }}
            min={1}
            max={maxWidth}
            marks={getMarks(maxWidth)}
            onChange={(value) => {
              setMotifWidth(value as any);
            }}
          />
        </Form.Item>
        <Form.Item label="Pattern height">
          <Slider
            style={{ width: 120 }}
            min={1}
            max={maxHeight}
            marks={getMarks(maxHeight)}
            onChange={(value) => {
              setMotifHeight(value as any);
            }}
          />
        </Form.Item>
      </Form>
      <Tiles
        imgSrc={imgSrc}
        motifWidth={motifWidth}
        motifHeight={motifHeight}
      />
    </div>
  );
}

export default App;
