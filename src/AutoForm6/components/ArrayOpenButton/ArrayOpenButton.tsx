// MIT License
// Copyright (c) 2023 Andrey Vyalkov vyalkov.a@gmail.com
// https://github.com/Andrey153/json-auto-form

// ArrayOpenButton

import { JSONArray } from '../../types/JSONTypes';

type ArrayOpenButtonType = {
  label: string;
  val?: JSONArray;
  onClick: (e: any) => void;
};

export function ArrayOpenButton({ label, onClick }: ArrayOpenButtonType) {
  return (
    <div className="frame1059-auto-form6-card-item-array" onClick={onClick}>
      <div className="frame1059-auto-form6-menu-item-array-label">{label}</div>
      <div className="frame1059-auto-form6-menu-item-array-icon">☰</div>
    </div>
  );
}
