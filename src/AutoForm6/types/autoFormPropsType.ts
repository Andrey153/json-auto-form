// MIT License
// Copyright (c) 2023 Andrey Vyalkov vyalkov.a@gmail.com
// https://github.com/Andrey153/json-auto-form

import { JSONArray, JSONObject, JSONValue } from './JSONTypes'

export type Path = (string | number)[]

export type AutoFormState = {
  currentPath: Path
  pathObject?: JSONValue
  currentMenu: CurrentMenu
  searchText: string
  keySearch: boolean
  valueSearch: boolean
  childrenNodeLevel: number
  maxTableChildrenLevel: number
  cards: Card[]
  tables: Table[]
}

export type Card = {
  relativePath: Path
  value: JSONObject | null
}

export type Table = {
  relativePath: Path
  value: JSONArray
  originalIndex: number[] | undefined
}

export type CurrentMenu = Menu

export type Menu = {
  objKeys: string[]
  arrayKeys: string[]
}
