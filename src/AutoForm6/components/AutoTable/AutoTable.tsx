// MIT License
// Copyright (c) 2023 Andrey Vyalkov vyalkov.a@gmail.com
// https://github.com/Andrey153/json-auto-form

// AutoTable
import React, { useState } from 'react'

import { Path } from '../../types/autoFormPropsType'
import { JSONArray, JSONValue } from '../../types/JSONTypes'
import { ColumnDescription, getColumnsDescription } from '../../utils/getColumnsDescription'
import { BooleanInput } from '../BooleanInput/BooleanInput'
import { SetLevel } from '../SetLevel/SetLevel'
import { AutoTableCell } from './AutoTableCell'
import { coefficientSymbolWidth, paddingInnerElements, pageSizeCoefficient } from './constants'

interface AutoTableInterface {
  inValue: JSONArray
  originalIndex?: number[]
  maxTableChildrenLevel: number
  tableWrap: boolean
  onChangePath: (path: Path) => void
}

export function AutoTable({
  inValue,
  originalIndex,
  maxTableChildrenLevel,
  tableWrap,
  onChangePath,
}: AutoTableInterface) {
  // combine all available columns with types for first level

  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [showLabelInRow, setShowLabelInRow] = useState(false)

  const columns = getColumnsDescription(inValue, maxTableChildrenLevel)

  const startRow = (page - 1) * pageSize
  const endRow = startRow + pageSize
  const numberRows = inValue.length
  const maxPage = Math.ceil(numberRows / pageSize)

  const valuesPage = inValue.slice(startRow, endRow)

  return (
    <div className="frame1059-auto-form6-auto-table">
      <div className="frame1059-auto-form6-auto-table-header">
        <div
          className="frame1059-auto-form6-auto-table-header-label"
          onClick={() => setPageSize(numberRows)}
        >
          rows:
          <div className="frame1059-auto-form6-auto-table-header-value">{numberRows}</div>
          pages:
          <div className="frame1059-auto-form6-auto-table-header-value">{maxPage}</div>
        </div>
        <SetLevel
          value={page}
          changeValue={(val) => {
            let newVal = val
            if (val > maxPage) newVal = maxPage
            if (val < 1) newVal = 1
            setPage(newVal)
          }}
        />
        <SetLevel
          value={pageSize}
          changeValue={(val) => {
            let newPageSize = (val - pageSize) * pageSizeCoefficient + pageSize
            if (newPageSize < 1) newPageSize = 1
            setPageSize(newPageSize)

            const maxPage = Math.ceil(numberRows / newPageSize)
            let newVal = page
            if (newVal > maxPage) newVal = maxPage - 1
            if (newVal < 1) newVal = 1
            setPage(newVal)
          }}
        />
        <BooleanInput
          value={showLabelInRow}
          labelTrue="on"
          labelFalse="off"
          onValueChange={setShowLabelInRow}
        />
      </div>

      <div className="frame1059-auto-form6-auto-table-content">
        {!showLabelInRow && (
          <AutoTableHeader
            tableWrap={tableWrap}
            columns={columns}
            // onChangePath={onChangePath}
          />
        )}

        {valuesPage.map((row, index) => (
          <AutoTableRow
            key={originalIndex ? originalIndex[startRow + index] : startRow + index}
            index={originalIndex ? originalIndex[startRow + index] : startRow + index}
            tableWrap={tableWrap}
            showLabelInRow={showLabelInRow}
            row={row}
            columns={columns}
            onChangePath={onChangePath}
          />
        ))}
      </div>
    </div>
  )
}

function AutoTableRow({
  index,
  row,
  columns,
  tableWrap,
  showLabelInRow,
  onChangePath,
}: {
  index: number
  row: JSONValue
  columns: ColumnDescription[]
  tableWrap: boolean
  showLabelInRow: boolean
  onChangePath: (path: Path) => void
}) {
  return (
    <div
      className={
        'frame1059-auto-form6-auto-table-row' +
        (tableWrap ? '' : ' frame1059-auto-form6-auto-table-row-no-wrap') +
        (showLabelInRow ? '' : ' frame1059-auto-form6-auto-table-row-without-label')
      }
      // onClick={() => onChangePath([index])}
      onDoubleClick={() => onChangePath([index])}
    >
      <div className="frame1059-auto-form6-auto-table-cell" style={{ width: '45px' }}>
        {showLabelInRow && <div className="frame1059-auto-form6-auto-table-cell-label">&nbsp;</div>}
        <div className="frame1059-auto-form6-auto-table-cell-value-index">{index + 1}</div>
      </div>
      {columns.map((column) => (
        <AutoTableCell key={column.id} showLabelInRow={showLabelInRow} row={row} column={column} />
      ))}
    </div>
  )
}

function AutoTableHeader({
  columns,
  tableWrap,
}: // onChangePath,
{
  tableWrap: boolean
  columns: ColumnDescription[]
  // onChangePath: (path: Path) => void;
}) {
  return (
    <div
      className={
        'frame1059-auto-form6-auto-table-row-header' +
        (tableWrap ? '' : ' frame1059-auto-form6-auto-table-row-no-wrap')
      }
      // onClick={() => onChangePath([index])}
      // onDoubleClick={() => onChangePath([index - 1])}
    >
      <div className="frame1059-auto-form6-auto-table-cell" style={{ width: '45px' }}>
        <div className="frame1059-auto-form6-auto-table-cell-label">&nbsp;</div>
      </div>
      {columns.map((column) => (
        <AutoTableCellHeader key={column.id} column={column} />
      ))}
    </div>
  )
}

export function AutoTableCellHeader({ column }: { column: ColumnDescription }) {
  if (column.type === 'JSONNull') {
    return (
      <div className="frame1059-auto-form6-auto-table-cell-null">
        <div className="frame1059-auto-form6-auto-table-cell-label-boolean">{column.label}</div>
      </div>
    )
  }

  if (column.type === 'JSONString') {
    return (
      <div
        style={{
          minWidth: column.maxLength * coefficientSymbolWidth + paddingInnerElements + 'px',
        }}
        className="frame1059-auto-form6-auto-table-cell"
      >
        <div className="frame1059-auto-form6-auto-table-cell-label">{column.label}</div>
      </div>
    )
  }

  if (column.type === 'JSONNumber') {
    return (
      <div
        style={{
          width: column.maxLength * coefficientSymbolWidth + paddingInnerElements + 'px',
        }}
        className="frame1059-auto-form6-auto-table-cell-number"
      >
        <div className="frame1059-auto-form6-auto-table-cell-label-number">{column.label}</div>
      </div>
    )
  }

  if (column.type === 'JSONBoolean') {
    return (
      <div className="frame1059-auto-form6-auto-table-cell-boolean">
        <div className="frame1059-auto-form6-auto-table-cell-label-boolean">{column.label}</div>
      </div>
    )
  }

  if (column.type === 'JSONArray') {
    return (
      <div className="frame1059-auto-form6-auto-table-cell">
        <div className="frame1059-auto-form6-auto-table-cell-label">{column.label}</div>
      </div>
    )
  }

  if (column.type === 'JSONObject') {
    return (
      <div className="frame1059-auto-form6-auto-table-cell">
        <div className="frame1059-auto-form6-auto-table-cell-label">{column.label}</div>
      </div>
    )
  }

  return (
    <div className="frame1059-auto-form6-auto-table-cell">
      <div className="frame1059-auto-form6-auto-table-cell-label">Cell type detection error</div>
    </div>
  )
}
