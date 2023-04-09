// MIT License
// Copyright (c) 2023 Andrey Vyalkov vyalkov.a@gmail.com
// https://github.com/Andrey153/json-auto-form

import { createSearchFilter, SearchFilter } from "./createSearchFilter";

describe("createSearchFilter2", () => {
  const testObject = {
    id: 1,
    name: "John",
    address: {
      street: "123 Main St",
      city: "Anytown",
      state: "CA",
      zip: "12345",
    },
    orders: [
      {
        id: 100,
        date: "2022-01-01",
        items: [
          { name: "Widget", quantity: 1 },
          { name: "Gizmo", quantity: 2 },
        ],
      },
      {
        id: 101,
        date: "2022-02-01",
        items: [
          { name: "Thingamabob", quantity: 1 },
          { name: "Whatchamacallit", quantity: 3 },
        ],
      },
    ],
  };

  it("should return empty object for non-matching search text", () => {
    const searchText = "foobar";
    const result = createSearchFilter(testObject, searchText);
    expect(result).toEqual({ links: {} });
  });

  it("should search for matching value is true", () => {
    const searchText = "widget";
    const result = createSearchFilter(testObject, searchText, true, false);
    const expected: SearchFilter = {
      links: {
        orders: [
          {
            id: 100,
            date: "2022-01-01",
            items: [
              { name: "Widget", quantity: 1 },
              { name: "Gizmo", quantity: 2 },
            ],
          },
        ],
      },
    };
    expect(result).toEqual(expected);
  });

  it("should search for matching value when valueSearch is true", () => {
    const searchText = "123 Main St";
    const result = createSearchFilter(testObject, searchText, true, false);
    const expected: SearchFilter = {
      links: {
        address: {
          value: {
            street: "123 Main St",
            city: "Anytown",
            state: "CA",
            zip: "12345",
          },
          links: {},
        },
      },
    };
    expect(result).toEqual(expected);
  });

  it("should search for matching value in first object level when valueSearch is true", () => {
    const searchText = "John";
    const result = createSearchFilter(testObject, searchText, true, false);
    const expected: SearchFilter = {
      value: testObject,
      links: {},
    };
    expect(result).toEqual(expected);
  });
});
