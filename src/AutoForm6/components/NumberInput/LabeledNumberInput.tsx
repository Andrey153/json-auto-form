// MIT License
// Copyright (c) 2023 Andrey Vyalkov vyalkov.a@gmail.com
// https://github.com/Andrey153/json-auto-form

type LabeledNumberInputType = {
  label: string
  val: number
  onValueChange?: (val: number) => void
}

export function LabeledNumberInput({ label, val }: LabeledNumberInputType) {
  return (
    <div className="frame1059-auto-form6-card-item-number">
      <div className="frame1059-auto-form6-card-item-number-label">{label}</div>
      <div className="frame1059-auto-form6-card-item-number-value">{val?.toString()}&nbsp;</div>
    </div>
  )
}
