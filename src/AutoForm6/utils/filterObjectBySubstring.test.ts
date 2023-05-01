// MIT License
// Copyright (c) 2023 Andrey Vyalkov vyalkov.a@gmail.com
// https://github.com/Andrey153/json-auto-form

import { JSONArray } from '../types/JSONTypes';
import { filterObjectBySubstring } from './filterObjectBySubstring';

describe('filterObjectBySubstring', () => {
  test('should return an empty object if the input value is not an object or an array', () => {
    // expect(filterObjectBySubstring(null, "test")).toEqual({});
    // expect(filterObjectBySubstring(undefined, "test")).toEqual({});
    // expect(filterObjectBySubstring("test", "test")).toEqual({});
    // expect(filterObjectBySubstring(123, "test")).toEqual({});
  });

  test('should return an empty object if the input object or array does not contain the substring', () => {
    const input = {
      name: 'John',
      age: 30,
      address: {
        city: 'New York',
        state: 'NY',
        country: 'USA',
      },
      hobbies: ['reading', 'swimming', 'running'],
    };

    expect(filterObjectBySubstring(input, 'test')).toEqual({
      filteredValue: {},
      originalIndex: {},
    });
  });

  test('should filter object by value substring search', () => {
    const input = {
      name: 'John',
      age: 30,
      address: {
        city: 'New York',
        state: 'NY',
        country: 'USA',
      },
      hobbies: ['reading', 'swim', 'running'],
    };

    const expectedOutput = {
      filteredValue: {
        name: 'John',
        address: {
          city: 'New York',
          state: 'NY',
        },
        hobbies: ['reading', 'running'],
      },
      originalIndex: {
        address: {},
        hobbies: [0, 2],
      },
    };
    const result = filterObjectBySubstring(input, 'n', false, true);
    expect(result).toEqual(expectedOutput);
  });

  test('should filter object by key substring search', () => {
    const input = {
      name: 'John',
      age: 30,
      address: {
        city: 'New York',
        state: 'NY',
        country: 'USA',
      },
      hobbies: ['reading', 'swimming', 'running'],
    };

    const expectedOutput = {
      filteredValue: {
        name: 'John',
      },
      originalIndex: {},
    };

    expect(filterObjectBySubstring(input, 'name', true, false)).toEqual(expectedOutput);
  });

  test('should filter nested objects and arrays recursively', () => {
    const input = {
      name: 'John',
      age: 30,
      address: {
        city: 'New York',
        state: 'NY',
        country: 'USA',
        zip: '10001',
        phones: ['123-456-7890', '198-765-4321'],
      },
      hobbies: ['reading', 'swimming', 'running'],
    };

    const expectedOutput = {
      filteredValue: {
        age: 30,
        address: {
          zip: '10001',
          phones: ['123-456-7890'],
        },
      },
      originalIndex: {
        address: {
          phones: [0],
        },
      },
    };

    expect(filterObjectBySubstring(input, '0')).toEqual(expectedOutput);
  });

  test('should filter array by value with sub children substring search', () => {
    const input: JSONArray = [{ a: { b: { c: 'b' } } }, { z: 'y' }, 'abc'];
    const expectedOutput = {
      filteredValue: [{ a: { b: { c: 'b' } } }, 'abc'],
      originalIndex: [0, 2],
    };
    const result = filterObjectBySubstring(input, 'b');
    expect(result).toEqual(expectedOutput);
  });
});
