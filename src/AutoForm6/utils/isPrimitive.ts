// MIT License
// Copyright (c) 2023 Andrey Vyalkov vyalkov.a@gmail.com
// https://github.com/Andrey153/json-auto-form

// todo check may be replace to isPrimitiveValue
export function isPrimitive(typeOfValue: string) {
  return (
    typeOfValue === 'string' ||
    typeOfValue === 'number' ||
    typeOfValue === 'boolean' ||
    typeOfValue === 'null'
  )
}

// todo why do use two similar function?
export function isJsonPrimitive(typeOfValue: string) {
  return typeOfValue === 'string' || typeOfValue === 'number' || typeOfValue === 'boolean'
}

export function isJsonPrimitiveValue(value: any) {
  const typeOfValue = typeof value
  return typeOfValue === 'string' || typeOfValue === 'number' || typeOfValue === 'boolean'
}
