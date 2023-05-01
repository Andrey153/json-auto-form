// MIT License
// Copyright (c) 2023 Andrey Vyalkov vyalkov.a@gmail.com
// https://github.com/Andrey153/json-auto-form

type LabeledNullInputType = {
  label: string;
  val?: null;
  onValueChange?: (val: number) => void;
};

export function LabeledNullInput({ label }: LabeledNullInputType) {
  return (
    <div className="frame1059-auto-form6-card-item-number">
      <div className="frame1059-auto-form6-card-item-number-label">{label}</div>
      <div className="frame1059-auto-form6-card-item-number-value">null</div>
    </div>
  );
}
