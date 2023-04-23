// MIT License
// Copyright (c) 2023 Andrey Vyalkov vyalkov.a@gmail.com
// https://github.com/Andrey153/json-auto-form

import { JSONArray, JSONObject, JSONValue } from '../types/JSONTypes'
import { getJsonType } from './getJsonType'

export function isFilteredObjectRecursive(
  inValue: JSONValue,
  searchText: string,
  keySearch = true,
  valueSearch = true,
  childrenLevel = 0,
  maxChildrenLevel = 100,
): boolean {
  if (childrenLevel > maxChildrenLevel) {
    console.log(
      'In function isFilteredObjectRecursive achieved maxChildrenLevel = ' + maxChildrenLevel,
    )
    return false
  }

  const typeValue = getJsonType(inValue)

  if (typeValue === 'JSONString') {
    return (inValue as string).toLowerCase().includes(searchText)
  }
  if (typeValue === 'JSONNumber') {
    return !isNaN(Number(searchText)) && (inValue as number).toString().includes(searchText)
  }
  if (typeValue === 'JSONObject') {
    return !!Object.entries(inValue as JSONObject).find(([key, value]) => {
      if (keySearch) {
        if (key.toLowerCase().includes(searchText)) return true
      }
      if (valueSearch)
        return isFilteredObjectRecursive(
          value,
          searchText,
          keySearch,
          valueSearch,
          childrenLevel + 1,
          maxChildrenLevel,
        )
      return false
    })
  }
  if (typeValue === 'JSONArray') {
    return !!(inValue as JSONArray).find((value) =>
      isFilteredObjectRecursive(
        value,
        searchText,
        keySearch,
        valueSearch,
        childrenLevel + 1,
        maxChildrenLevel,
      ),
    )
  }
  if (typeValue === 'JSONNull') {
    return searchText.toLowerCase() === 'null'
  }

  return false
}
