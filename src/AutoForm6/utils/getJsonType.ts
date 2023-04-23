// MIT License
// Copyright (c) 2023 Andrey Vyalkov vyalkov.a@gmail.com
// https://github.com/Andrey153/json-auto-form

export function getJsonType(inValue: any) {
  if (inValue === null) return 'JSONNull'
  if (Array.isArray(inValue)) return 'JSONArray'

  const typeValue = typeof inValue
  if (typeValue === 'string') return 'JSONString'
  if (typeValue === 'number') return 'JSONNumber'
  if (typeValue === 'object') return 'JSONObject'
  if (typeValue === 'boolean') return 'JSONBoolean'
  return undefined // or function don't convert to JSON
}
