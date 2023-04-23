// MIT License
// Copyright (c) 2023 Andrey Vyalkov vyalkov.a@gmail.com
// https://github.com/Andrey153/json-auto-form

export function SetLevel({
  value,
  changeValue,
}: {
  value: number
  changeValue: (v: number) => void
}) {
  return (
    <div
      className="frame1059-set-level"
      onWheel={(e) => {
        const element = e.currentTarget as HTMLDivElement
        element.onwheel = () => false
        e.stopPropagation()
        changeValue(value + (e.deltaY < 0 ? 1 : -1))
      }}
    >
      <div
        className="frame1059-set-level-button"
        onClick={() => changeValue(value - 1)}
        onWheel={() => false}
      >
        ⟨
      </div>
      <div
        className="frame1059-set-level-value"
        onClick={() => changeValue(value + 1)}
        onWheel={() => false}
      >
        {value}
      </div>
      <div
        className="frame1059-set-level-button"
        onClick={() => changeValue(value + 1)}
        onWheel={() => false}
      >
        ⟩
      </div>
    </div>
  )
}
