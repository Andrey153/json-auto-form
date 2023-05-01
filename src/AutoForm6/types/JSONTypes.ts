// MIT License
// Copyright (c) 2023 Andrey Vyalkov vyalkov.a@gmail.com
// https://github.com/Andrey153/json-auto-form

export type JSONString = string;
export type JSONNumber = number;
export type JSONBoolean = boolean;
export type JSONNull = null;
export type JSONPrimitives = JSONString | JSONNumber | JSONBoolean;
export type JSONValue = JSONPrimitives | JSONNull | JSONObject | JSONArray;
export interface JSONObject {
  [x: string]: JSONValue;
}
export type JSONArray = Array<JSONValue>;

export type TypeJSONDescription =
  | 'JSONString'
  | 'JSONNumber'
  | 'JSONBoolean'
  | 'JSONNull'
  | 'JSONObject'
  | 'JSONArray';
