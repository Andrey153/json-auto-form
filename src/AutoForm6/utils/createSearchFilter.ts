// MIT License
// Copyright (c) 2023 Andrey Vyalkov vyalkov.a@gmail.com
// https://github.com/Andrey153/json-auto-form

import { JSONArray, JSONObject, JSONValue } from "../types/JSONTypes";
import { getJsonType } from "./getJsonType";
import { isFilteredObjectRecursive } from "./isFilteredObjectRecursive";

export type ObjectFilter = {
  value?: JSONObject;
  links: { [key: string]: SearchFilter };
};

export type SearchFilter = ObjectFilter | JSONValue[];

export function createSearchFilter(
  inValue: JSONObject | JSONArray,
  searchText: string,
  keySearch = true,
  valueSearch = true,
  level: number = 0,
  maxChildrenLevel = 50
): SearchFilter {
  return createSearchFilterRecursive(
    inValue,
    searchText.toLowerCase(),
    keySearch,
    valueSearch,
    level,
    maxChildrenLevel
  );
}

export function createSearchFilterRecursive(
  inValue: JSONObject | JSONArray,
  searchText: string,
  keySearch = true,
  valueSearch = true,
  childrenLevel: number = 0,
  maxChildrenLevel = 50
): SearchFilter {
  // check all fields if value present return object

  let result: SearchFilter = { links: {} };

  const typeValue = getJsonType(inValue);

  if (typeValue === "JSONArray") {
    result = (inValue as JSONArray).filter((value) =>
      isFilteredObjectRecursive(
        value as JSONObject,
        searchText,
        keySearch,
        valueSearch,
        childrenLevel + 1,
        maxChildrenLevel
      )
    );
  } else if (typeValue === "JSONObject") {
    if (
      isFilteredObjectRecursive(
        inValue as JSONObject,
        searchText,
        keySearch,
        valueSearch,
        childrenLevel + 1,
        childrenLevel + 2
      )
    ) {
      result.value = inValue as JSONObject;
    }
    Object.entries(inValue as JSONObject).find(([key, value]) => {
      const typeValue = getJsonType(value);
      if (typeValue === "JSONObject" || typeValue === "JSONArray") {
        const res = createSearchFilterRecursive(
          value as JSONObject | JSONArray,
          searchText,
          keySearch,
          valueSearch,
          childrenLevel + 1,
          maxChildrenLevel
        );
        if (Array.isArray(res)) {
          if (res.length) (result as ObjectFilter).links[key] = res;
        } else if (
          (res as ObjectFilter).value ||
          Object.keys((res as ObjectFilter).links).length
        ) {
          (result as ObjectFilter).links[key] = res;
        }
      }
    });
  }

  return result;
}
