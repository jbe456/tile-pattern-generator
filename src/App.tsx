import React, { useState } from "react";
import "./App.css";
import { Form, Slider, Upload, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import "antd/dist/antd.css";
import Tiles from "./Tiles";

function App() {
  const [imgSrc, setImgSrc] = useState<string>();
  const [motifWidth, setMotifWidth] = useState<number>();
  const [motifHeight, setMotifHeight] = useState<number>();

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
            style={{ width: 80 }}
            min={1}
            max={4}
            marks={{ 1: "1", 2: "2", 3: "3", 4: "4" }}
            onChange={(value) => {
              setMotifWidth(value as any);
            }}
          />
        </Form.Item>
        <Form.Item label="Pattern height">
          <Slider
            style={{ width: 80 }}
            min={1}
            max={4}
            marks={{ 1: "1", 2: "2", 3: "3", 4: "4" }}
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
