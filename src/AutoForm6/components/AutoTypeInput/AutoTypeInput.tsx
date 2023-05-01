// MIT License
// Copyright (c) 2023 Andrey Vyalkov vyalkov.a@gmail.com
// https://github.com/Andrey153/json-auto-form

import { JSONObject, JSONValue } from '../../types/JSONTypes';
import { getJsonType } from '../../utils/getJsonType';
import { ArrayOpenButton } from '../ArrayOpenButton/ArrayOpenButton';
import { LabeledBooleanInput } from '../BooleanInput/LabeledBooleanInput';
import { LabeledNullInput } from '../NullInput/LabeledNullInput';
import { LabeledNumberInput } from '../NumberInput/LabeledNumberInput';
import { ObjectOpenButton } from '../ObjectOpenButton/ObjectOpenButton';
import { LabeledStringInput } from '../StringInput/LabeledStringInput';

export function AutoTypeInput({
  label,
  value,
  onChangePath,
}: // onChangeValue,
{
  label: string;
  value: JSONValue;
  onChangePath: () => void;
  onChangeValue: (value: JSONObject) => void;
}) {
  const typeValue = getJsonType(value);

  if (typeValue === 'JSONNull') {
    return <LabeledNullInput label={label} />;
  }
  if (typeValue === 'JSONString') {
    return <LabeledStringInput label={label} val={value as string} />;
  }
  if (typeValue === 'JSONNumber') {
    return <LabeledNumberInput label={label} val={value as number} />;
  }

  if (typeValue === 'JSONBoolean') {
    return <LabeledBooleanInput label={label} val={value as boolean} />;
  }

  if (typeValue === 'JSONArray') {
    return <ArrayOpenButton label={label} onClick={onChangePath} />;
  }

  if (typeValue === 'JSONObject') {
    return <ObjectOpenButton label={label} onClick={onChangePath} />;
  }

  return (
    <LabeledStringInput
      label={label + ': ' + typeof value}
      val={value?.toString().substring(0, 30) || ''}
    />
  );
}
