// MIT License
// Copyright (c) 2023 Andrey Vyalkov vyalkov.a@gmail.com
// https://github.com/Andrey153/json-auto-form

import { AutoFormState, Card, Menu, Path, Table } from '../types/autoFormPropsType';
import { JSONArray, JSONObject, JSONValue } from '../types/JSONTypes';
import { FilteredObjectType, filterObjectBySubstring } from './filterObjectBySubstring';
import { isPrimitive } from './isPrimitive';

export function getChildrenObjectByPath({
  value,
  path,
}: {
  value: JSONValue;
  path: Path;
}): JSONValue | undefined {
  if (path.length === 0) return value;
  if (typeof value !== 'object') return undefined;

  let result = value as any;
  for (const key of path) {
    result = result?.[key];
  }
  return result;
}

export function getMenuElementsByObject(value: JSONValue | undefined): Menu {
  const result: Menu = { objKeys: [], arrayKeys: [] };
  if (!value) return result;

  Object.entries(value).forEach(([key, val]) => {
    const typeV = typeof val;
    if (Array.isArray(val)) {
      result.arrayKeys.push(key);
    } else if (typeV === 'object' && val !== null) {
      result.objKeys.push(key);
    }
  });
  return result;
}

export function getAutoFormState(
  value: JSONObject,
  currentPath: Path,
  searchText: string,
  keySearch: boolean,
  valueSearch: boolean,
  childrenNodeLevel: number,
  maxTableChildrenLevel: number,
): AutoFormState {
  let pathObject = getChildrenObjectByPath({ value, path: currentPath });

  let filteredObject: FilteredObjectType = { filteredValue: pathObject };

  if (typeof pathObject === 'object' && pathObject !== null && searchText.trim()) {
    filteredObject = filterObjectBySubstring(
      pathObject,
      searchText.toLowerCase().trim(),
      keySearch,
      valueSearch,
    );
    pathObject = filteredObject.filteredValue;
  }

  const currentMenu = getMenuElementsByObject(pathObject);
  let cards: Card[] = [];
  let tables: Table[] = [];

  if (typeof pathObject === 'object' && pathObject !== null) {
    if (Array.isArray(pathObject)) {
      tables = [
        {
          relativePath: [],
          value: pathObject,
          originalIndex: filteredObject.originalIndex as number[],
        },
      ];
    } else {
      cards = [
        {
          relativePath: [],
          value: pathObject,
        },
      ];
      updateCardsAndTablesByChildrenRecursive(
        pathObject,
        filteredObject.originalIndex as JSONObject,
        cards,
        tables,
        [],
        0,
        childrenNodeLevel,
      );
    }
  }

  const newState: AutoFormState = {
    currentPath,
    pathObject,
    searchText,
    keySearch,
    valueSearch,
    childrenNodeLevel,
    maxTableChildrenLevel,
    currentMenu,
    cards,
    tables,
  };

  return newState;
}
function updateCardsAndTablesByChildrenRecursive(
  value: JSONObject | undefined | null,
  originalIndex: JSONObject | undefined,
  cards: Card[],
  tables: Table[],
  relativePath: Path,
  level: number,
  childrenNodeLevel: number,
) {
  if (level >= childrenNodeLevel) return;
  if (!value) return;

  Object.entries(value).forEach(([key, value]) => {
    const typeV = typeof value;
    if (Array.isArray(value)) {
      tables.push({
        relativePath: [...relativePath, key],
        value: value as JSONArray,
        originalIndex: originalIndex?.[key] as number[],
      });
    } else if (typeV === 'object' && value !== null) {
      // show cards only with primitive
      if (isPrimitivePresent(value as JSONObject)) {
        cards.push({
          relativePath: [...relativePath, key],
          value: value as JSONObject,
        });
      }
      updateCardsAndTablesByChildrenRecursive(
        value as JSONObject,
        originalIndex?.[key] as JSONObject,
        cards,
        tables,
        [...relativePath, key],
        level + 1,
        childrenNodeLevel,
      );
    }
  });
}

function isPrimitivePresent(value: JSONObject): boolean {
  return !!Object.values(value).find((childrenValue) => isPrimitive(typeof childrenValue));
}
