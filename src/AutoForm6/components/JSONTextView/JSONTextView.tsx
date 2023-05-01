// MIT License
// Copyright (c) 2023 Andrey Vyalkov vyalkov.a@gmail.com
// https://github.com/Andrey153/json-auto-form

import { JSONValue } from '../../types/JSONTypes';

type JSONTextViewType = {
  value?: JSONValue;
  onValueChange?: (val: string) => void;
};

export function JSONTextView({ value }: JSONTextViewType) {
  const txtVal = JSON.stringify(value, null, 2);

  return <div className="frame1059-auto-form6-content-json-text-view">{txtVal}</div>;
}
