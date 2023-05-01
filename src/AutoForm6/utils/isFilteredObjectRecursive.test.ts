// MIT License
// Copyright (c) 2023 Andrey Vyalkov vyalkov.a@gmail.com
// https://github.com/Andrey153/json-auto-form

import { isFilteredObjectRecursive } from './isFilteredObjectRecursive';

describe('isFilteredObjectRecursive', () => {
  it('should return true when searchText matches a string value', () => {
    expect(isFilteredObjectRecursive('hello', 'he')).toBe(true);
  });

  it('should return true when searchText matches a number value', () => {
    expect(isFilteredObjectRecursive(123, '2')).toBe(true);
  });

  it('should return true when searchText matches a nested object value', () => {
    const obj = { a: { b: { c: 'hello' } } };
    expect(isFilteredObjectRecursive(obj, 'he')).toBe(true);
  });

  it('should return true when searchText matches a value in an array', () => {
    const arr = ['hello', 123];
    expect(isFilteredObjectRecursive(arr, '2')).toBe(true);
  });

  it('should return false when searchText does not match any value', () => {
    expect(isFilteredObjectRecursive({ a: 'hello' }, 'world')).toBe(false);
  });

  it('should return false when childrenLevel exceeds maxChildrenLevel', () => {
    const obj = { a: { b: { c: 'hello' } } };
    expect(isFilteredObjectRecursive(obj, 'he', false, true, 0, 2)).toBe(false);
  });

  it('should return false when childrenLevel exceeds maxChildrenLevel 1', () => {
    const obj = { a: { b: 'hello' } };
    expect(isFilteredObjectRecursive(obj, 'he', false, true, 0, 1)).toBe(false);
  });

  it('should return false when childrenLevel exceeds maxChildrenLevel 1', () => {
    const obj = { a: 'hello' };
    expect(isFilteredObjectRecursive(obj, 'he', false, true, 0, 1)).toBe(true);
  });

  it('should return true when searchText matches a null value', () => {
    expect(isFilteredObjectRecursive(null, 'null')).toBe(true);
  });

  it('should return false when searchText does not match a null value', () => {
    expect(isFilteredObjectRecursive(null, 'world')).toBe(false);
  });
});
