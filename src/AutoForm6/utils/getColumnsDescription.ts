// MIT License
// Copyright (c) 2023 Andrey Vyalkov vyalkov.a@gmail.com
// https://github.com/Andrey153/json-auto-form

import { Path } from '../types/autoFormPropsType'
import { JSONArray, JSONObject, JSONValue, TypeJSONDescription } from '../types/JSONTypes'
import { getJsonType } from './getJsonType'

const maxStringFieldLength = 30

export type ColumnDescription = {
  id: string
  path: Path
  label: string
  maxLength: number
  type: TypeJSONDescription | 'undefined'
}

export function getColumnsDescription(
  inValue: JSONArray,
  maxTableChildrenLevel: number,
): ColumnDescription[] {
  const columns: ColumnDescription[] = []

  inValue.forEach((row) => {
    addColumnRecursive(row, columns, [], 0, maxTableChildrenLevel)
  })

  return columns
}

function addColumnRecursive(
  inValue: JSONValue,
  columns: ColumnDescription[],
  relativePath: Path,
  level: number,
  maxChildrenLevel: number,
) {
  if (level > maxChildrenLevel) return

  const typeValue = getJsonType(inValue)
  const relativePathKey = relativePath.join('.')

  if (level === maxChildrenLevel) {
    if (typeValue === 'JSONArray') {
      const id = 'autoTable_array' + relativePathKey
      !columns.find((col) => col.id === id) &&
        columns.push({
          id,
          path: relativePath,
          label: relativePathKey || typeValue,
          maxLength: 10,
          type: typeValue,
        })
    } else if (typeValue === 'JSONObject') {
      const id = 'autoTable_object' + relativePathKey
      !columns.find((col) => col.id === id) &&
        columns.push({
          id,
          path: relativePath,
          label: relativePathKey || typeValue,
          maxLength: 10,
          type: typeValue,
        })
    }
  }

  if (typeValue === 'JSONNull') {
    const id = 'autoTable_null' + relativePathKey
    !columns.find((col) => col.id === id) &&
      columns.push({
        id,
        path: relativePath,
        label: relativePathKey || typeValue,
        maxLength: 10,
        type: typeValue,
      })
  } else if (typeValue === 'JSONNumber') {
    const valueLength = inValue?.toString().length
    const id = 'autoTable_number' + relativePathKey
    const foundColumnIndex = columns.findIndex((col) => col.id === id)
    if (foundColumnIndex < 0) {
      columns.push({
        id,
        path: relativePath,
        label: relativePathKey || typeValue,
        maxLength: valueLength || 0,
        type: typeValue,
      })
    } else {
      const maxLength = columns[foundColumnIndex].maxLength
      if (valueLength && maxLength < valueLength) {
        columns[foundColumnIndex] = {
          ...columns[foundColumnIndex],
          maxLength: valueLength,
        }
      }
    }
  } else if (typeValue === 'JSONBoolean') {
    const id = 'autoTable_boolean' + relativePathKey
    !columns.find((col) => col.id === id) &&
      columns.push({
        id,
        path: relativePath,
        label: relativePathKey || typeValue,
        maxLength: 2,
        type: typeValue,
      })
  } else if (typeValue === 'JSONString') {
    let valueLength = inValue?.toString().length
    valueLength =
      (valueLength || 0) > maxStringFieldLength ? maxStringFieldLength : valueLength || 0
    const id = 'autoTable_string' + relativePathKey
    const foundColumnIndex = columns.findIndex((col) => col.id === id)
    if (foundColumnIndex < 0) {
      columns.push({
        id,
        path: relativePath,
        label: relativePathKey || typeValue,
        maxLength: valueLength,
        type: typeValue,
      })
    } else {
      const maxLength = columns[foundColumnIndex].maxLength
      if (valueLength && maxLength < valueLength) {
        columns[foundColumnIndex] = {
          ...columns[foundColumnIndex],
          maxLength: valueLength,
        }
      }
    }
  } else if (typeValue === 'JSONArray') {
    const inArray = inValue as JSONArray
    inArray.forEach((value, index) =>
      addColumnRecursive(value, columns, [...relativePath, index], level + 1, maxChildrenLevel),
    )
  } else if (typeValue === 'JSONObject') {
    const inObject = inValue as JSONObject
    Object.entries(inObject).forEach(([key, value]) =>
      addColumnRecursive(value, columns, [...relativePath, key], level + 1, maxChildrenLevel),
    )
  } else {
    const id = 'autoTable_undefined' + relativePathKey
    !columns.find((col) => col.id === id) &&
      columns.push({
        id,
        path: relativePath,
        label: relativePathKey || 'undefined',
        maxLength: 20,
        type: 'undefined',
      })
  }
}
