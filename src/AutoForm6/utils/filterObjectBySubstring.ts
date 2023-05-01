// MIT License
// Copyright (c) 2023 Andrey Vyalkov vyalkov.a@gmail.com
// https://github.com/Andrey153/json-auto-form

// function base on input object create new Object
// witch contain all primitive props if any props key or value contain search substring
// contain just props with object if object or it children contain props with key or value containing substring
// contain just props with array if any children elements with substring
// search by key and value can be optional

import { JSONArray, JSONObject, JSONValue } from '../types/JSONTypes';
import { getJsonType } from './getJsonType';
import { isFilteredObjectRecursive } from './isFilteredObjectRecursive';

export type FilteredObjectType = {
  filteredValue?: JSONValue;
  originalIndex?: JSONObject | JSONArray;
};

export function filterObjectBySubstring(
  inValue: JSONObject | JSONArray,
  searchText: string,
  keySearch = true,
  valueSearch = true,
  childrenLevel = 0,
  maxChildrenLevel = 100,
): FilteredObjectType {
  if (childrenLevel > maxChildrenLevel) {
    console.log(
      'In function isFilteredObjectRecursive achieved maxChildrenLevel = ' + maxChildrenLevel,
    );
    return {};
  }
  const typeValue = getJsonType(inValue);

  if (typeValue === 'JSONArray') {
    const filteredValue: JSONArray = [];
    const originalIndex: number[] = [];

    (inValue as JSONArray).forEach((value, index) => {
      if (
        isFilteredObjectRecursive(
          value as JSONValue,
          searchText,
          keySearch,
          valueSearch,
          childrenLevel + 1,
          maxChildrenLevel,
        )
      ) {
        filteredValue.push(value);
        originalIndex.push(index);
      }
    });
    return {
      filteredValue,
      originalIndex,
    };
  } else if (typeValue === 'JSONObject') {
    const result: JSONObject = {};
    const originalIndex: JSONObject = {};
    Object.entries(inValue as JSONObject).forEach(([key, val]) => {
      if (keySearch) {
        if (key.toLowerCase().includes(searchText)) result[key] = val;
      }

      const typeVal = getJsonType(val);
      if (typeVal === 'JSONObject' || typeVal === 'JSONArray') {
        const newObject = filterObjectBySubstring(
          val as JSONObject | JSONArray,
          searchText,
          keySearch,
          valueSearch,
          childrenLevel + 1,
          maxChildrenLevel,
        );
        if (newObject?.filteredValue && Object.keys(newObject?.filteredValue).length > 0) {
          result[key] = newObject.filteredValue;
          originalIndex[key] = newObject.originalIndex || [];
        }
      }

      if (valueSearch) {
        if (typeVal === 'JSONString') {
          if ((val as string).toLowerCase().includes(searchText)) {
            result[key] = val;
          }
        } else if (typeVal === 'JSONNumber') {
          if (!isNaN(Number(searchText)) && (val as number).toString().includes(searchText)) {
            result[key] = val;
          }
        } else if (typeVal === 'JSONNull') {
          if (searchText.toLowerCase() === 'null') {
            result[key] = val;
          }
        }
      }
    });
    return {
      filteredValue: result,
      originalIndex,
    };
  }
  return {};
}
