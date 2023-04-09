// MIT License
// Copyright (c) 2023 Andrey Vyalkov vyalkov.a@gmail.com
// https://github.com/Andrey153/json-auto-form

import { JSONObject } from "../types/JSONTypes";
import { createSearchFilter, SearchFilter } from "./createSearchFilter";

describe("createSearchFilter", () => {
  const searchText = "b";
  const keySearch = true;
  const valueSearch = true;
  const level = 0;
  const maxChildrenLevel = 10;

  it("createSearchFilter 01", async () => {
    const inValue: JSONObject = {
      key1: "abcd",
    };

    const expectValue: SearchFilter = {
      value: {
        key1: "abcd",
      },
      links: {},
    };

    const result = createSearchFilter(
      inValue,
      searchText,
      keySearch,
      valueSearch,
      level,
      maxChildrenLevel
    );

    expect(result).toEqual(expectValue);
  });

  it("createSearchFilterRecursive 01", async () => {
    const searchText = "0";

    const inValue = {
      key1: 101,
    };

    const expectValue: SearchFilter = {
      value: {
        key1: 101,
      },
      links: {},
    };

    const result = createSearchFilter(
      inValue,
      searchText,
      keySearch,
      valueSearch,
      level,
      maxChildrenLevel
    );

    expect(result).toEqual(expectValue);
  });

  it("createSearchFilterRecursive 02", async () => {
    const inValue = ["abc", "def"];

    const expectValue: SearchFilter = ["abc"];

    const result = createSearchFilter(
      inValue,
      searchText,
      keySearch,
      valueSearch,
      level,
      maxChildrenLevel
    );

    expect(result).toEqual(expectValue);
  });

  it("createSearchFilterRecursive 03", async () => {
    const inValue = [{ key1: "abc" }, { key1: "def" }];

    const expectValue: SearchFilter = [{ key1: "abc" }];

    const result = createSearchFilter(
      inValue,
      searchText,
      keySearch,
      valueSearch,
      level,
      maxChildrenLevel
    );

    expect(result).toEqual(expectValue);
  });

  it("createSearchFilterRecursive 04", async () => {
    const inValue = { key1: { key11: "abc" }, key2: { key21: "def" } };

    const expectValue: SearchFilter = {
      links: { key1: { value: { key11: "abc" }, links: {} } },
    };

    const result = createSearchFilter(
      inValue,
      searchText,
      keySearch,
      valueSearch,
      level,
      maxChildrenLevel
    );

    expect(result).toEqual(expectValue);
  });
});
