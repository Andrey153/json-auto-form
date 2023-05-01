// MIT License
// Copyright (c) 2023 Andrey Vyalkov vyalkov.a@gmail.com
// https://github.com/Andrey153/json-auto-form

type LabeledBooleanInputType = {
  label: string;
  val: boolean;
  onValueChange?: (val: boolean) => void;
};

export function LabeledBooleanInput({ label, val }: LabeledBooleanInputType) {
  return (
    <div className="frame1059-auto-form6-card-item-boolean">
      <div className="frame1059-auto-form6-card-item-boolean-label">{label}</div>
      <div
        className={
          'frame1059-auto-form6-card-item-boolean-value' +
          (val
            ? ' frame1059-auto-form6-card-item-boolean-value-true'
            : ' frame1059-auto-form6-card-item-boolean-value-false')
        }
      >
        {val ? '✓' : '✗'}
      </div>
    </div>
  );
}
