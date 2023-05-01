// MIT License
// Copyright (c) 2023 Andrey Vyalkov vyalkov.a@gmail.com
// https://github.com/Andrey153/json-auto-form

import { JSONObject } from '../../types/JSONTypes';

type ObjectOpenButtonType = {
  label: string;
  val?: JSONObject;
  onClick: (e: any) => void;
};

export function ObjectOpenButton({ label, onClick }: ObjectOpenButtonType) {
  return (
    <div className="frame1059-auto-form6-card-item-object" onClick={onClick}>
      {label}
    </div>
  );
}
