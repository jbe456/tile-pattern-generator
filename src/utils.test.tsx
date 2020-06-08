import { getKey, getTranslations } from "./utils";

test("getKey", () => {
  expect(getKey([[0, 3]])).toBe("03");
  expect(
    getKey([
      [0, 3],
      [1, 2],
    ])
  ).toBe("0312");
});

test("getTranslations", () => {
  expect(getTranslations([[0, 3]])).toStrictEqual([[[0, 3]], [[3, 0]]]);
  expect(getTranslations([[0, 5, 1]])).toStrictEqual([
    [[0, 5, 1]],
    [[5, 1, 0]],
    [[1, 0, 5]],
  ]);
  expect(
    getTranslations([
      [0, 1],
      [2, 0],
    ])
  ).toStrictEqual([
    [
      [0, 1],
      [2, 0],
    ],
    [
      [2, 0],
      [0, 1],
    ],
    [
      [1, 0],
      [0, 2],
    ],
    [
      [0, 2],
      [1, 0],
    ],
  ]);
});
