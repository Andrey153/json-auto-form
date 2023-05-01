// MIT License
// Copyright (c) 2023 Andrey Vyalkov vyalkov.a@gmail.com
// https://github.com/Andrey153/json-auto-form

import { JSONValue } from '../../types/JSONTypes';
import { ColumnDescription } from '../../utils/getColumnsDescription';
import { getJsonType } from '../../utils/getJsonType';
import { getChildrenObjectByPath } from '../../utils/utils';
import { coefficientSymbolWidth, paddingInnerElements } from './constants';

const maxStringLength = 200;

export function AutoTableCell({
  showLabelInRow,
  row,
  column,
}: {
  showLabelInRow: boolean;
  row: JSONValue;
  column: ColumnDescription;
}) {
  const value = getChildrenObjectByPath({
    value: row,
    path: column.path,
  });

  const typeValue = getJsonType(value);

  if (column.type === 'JSONNull') {
    return (
      <div className="frame1059-auto-form6-auto-table-cell-null">
        {showLabelInRow && (
          <div className="frame1059-auto-form6-auto-table-cell-label-boolean">{column.label}</div>
        )}
        <div className="frame1059-auto-form6-auto-table-cell-value-boolean">
          {(typeValue === 'JSONNull' && 'null') || '\u00A0'}
        </div>
      </div>
    );
  }

  if (column.type === 'JSONString') {
    const str = value?.toString() || '';
    return (
      <div
        style={{
          minWidth: column.maxLength * coefficientSymbolWidth + paddingInnerElements + 'px',
        }}
        className="frame1059-auto-form6-auto-table-cell"
      >
        {showLabelInRow && (
          <div className="frame1059-auto-form6-auto-table-cell-label">{column.label}</div>
        )}
        <div className="frame1059-auto-form6-auto-table-cell-value-string">
          {(typeValue === 'JSONString' &&
            (str.length > maxStringLength
              ? str.substring(0, maxStringLength).trim() + '...'
              : str.trim())) ||
            '\u00A0'}
        </div>
      </div>
    );
  }

  if (column.type === 'JSONNumber') {
    return (
      <div
        style={{
          width: column.maxLength * coefficientSymbolWidth + paddingInnerElements + 'px',
        }}
        className="frame1059-auto-form6-auto-table-cell-number"
      >
        {showLabelInRow && (
          <div className="frame1059-auto-form6-auto-table-cell-label-number">{column.label}</div>
        )}
        <div className="frame1059-auto-form6-auto-table-cell-value-number">
          {(typeValue === 'JSONNumber' && value?.toString()) || '\u00A0'}
        </div>
      </div>
    );
  }

  if (column.type === 'JSONBoolean') {
    return (
      <div className="frame1059-auto-form6-auto-table-cell-boolean">
        {showLabelInRow && (
          <div className="frame1059-auto-form6-auto-table-cell-label-boolean">{column.label}</div>
        )}
        <div
          className={
            'frame1059-auto-form6-auto-table-cell-value-boolean' +
            (value
              ? ' frame1059-auto-form6-card-item-boolean-value-true'
              : ' frame1059-auto-form6-card-item-boolean-value-false')
          }
        >
          {typeValue === 'JSONBoolean' ? (value ? '✓' : '✗') : '\u00A0'}
        </div>
      </div>
    );
  }

  if (column.type === 'JSONArray') {
    return (
      <div className="frame1059-auto-form6-auto-table-cell">
        {showLabelInRow && (
          <div className="frame1059-auto-form6-auto-table-cell-label">{column.label}</div>
        )}
        <div className="frame1059-auto-form6-auto-table-cell-value">
          {(typeValue === 'JSONArray' && !!value ? '...' : '') || '\u00A0'}
        </div>
      </div>
    );
  }

  if (column.type === 'JSONObject') {
    return (
      <div className="frame1059-auto-form6-auto-table-cell">
        {showLabelInRow && (
          <div className="frame1059-auto-form6-auto-table-cell-label">{column.label}</div>
        )}
        <div className="frame1059-auto-form6-auto-table-cell-value">
          {(typeValue === 'JSONObject' && !!value ? '...' : '') || '\u00A0'}
        </div>
      </div>
    );
  }

  return (
    <div className="frame1059-auto-form6-auto-table-cell">
      <div className="frame1059-auto-form6-auto-table-cell-label">Cell type detection error</div>
      <div className="frame1059-auto-form6-auto-table-cell-value-string">
        Cell type detection error
      </div>
    </div>
  );
}
