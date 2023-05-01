// MIT License
// Copyright (c) 2023 Andrey Vyalkov vyalkov.a@gmail.com
// https://github.com/Andrey153/json-auto-form

type LabeledStringInputType = {
  label: string;
  val: string;
  onValueChange?: (val: string) => void;
};

const maxStringLength = 200;

export function LabeledStringInput({ label, val }: LabeledStringInputType) {
  return (
    <div className="frame1059-auto-form6-card-item">
      <div className="frame1059-auto-form6-card-item-string-label">{label}</div>
      <div className="frame1059-auto-form6-card-item-string-value">
        {val.length > maxStringLength ? val.substring(0, maxStringLength) + '...' : val}
        &nbsp;
      </div>
    </div>
  );
}
