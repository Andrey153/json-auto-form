// MIT License
// Copyright (c) 2023 Andrey Vyalkov vyalkov.a@gmail.com
// https://github.com/Andrey153/json-auto-form

import { JSONArray, JSONObject, JSONValue } from './JSONTypes';

export type Path = (string | number)[];

export type AutoForm6StateType = {
  readFromStorage: boolean;
  errorReadFromStorage: boolean;

  fullScreen: boolean;
  showMenu: boolean;
  darkTheme: boolean;
  showJsonText: boolean;
  tableWrap: boolean;

  currentPath: Path;
  searchText: string;
  keySearch: true;
  valueSearch: true;
  childrenNodeLevel: number;
  maxTableChildrenLevel: number;
};

export type AutoFormState = {
  pathObject?: JSONValue;
  currentMenu: CurrentMenu;
  cards: Card[];
  tables: Table[];
};

export type Card = {
  relativePath: Path;
  value: JSONObject | null;
};

export type Table = {
  relativePath: Path;
  value: JSONArray;
  originalIndex: number[] | undefined;
};

export type CurrentMenu = Menu;

export type Menu = {
  objKeys: string[];
  arrayKeys: string[];
};
