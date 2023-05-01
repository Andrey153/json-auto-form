// MIT License
// Copyright (c) 2023 Andrey Vyalkov vyalkov.a@gmail.com
// https://github.com/Andrey153/json-auto-form

// BooleanInput

type BooleanInputType = {
  value: boolean;
  labelTrue?: string;
  labelFalse?: string;
  onValueChange?: (value: boolean) => void;
};

export function BooleanInput({ value, labelTrue, labelFalse, onValueChange }: BooleanInputType) {
  return (
    <div
      className={
        'frame1059-auto-form6-none-selectable frame1059-auto-form6-card-item-boolean-value frame1059-auto-form6-card-item-boolean-value-small' +
        (value
          ? ' frame1059-auto-form6-card-item-boolean-value-true'
          : ' frame1059-auto-form6-card-item-boolean-value-false')
      }
      onClick={() => onValueChange?.(!value)}
    >
      {/* ✔ ✓ ✕ ✖ ✗ ✘ */}
      {value ? labelTrue || '✓' : labelFalse || '✗'}
    </div>
  );
}
