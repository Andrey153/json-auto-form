// MIT License
// Copyright (c) 2023 Andrey Vyalkov vyalkov.a@gmail.com
// https://github.com/Andrey153/json-auto-form

import './autoForm6.css';
import './autoForm6-defaultDarkF1059AF6.css';

import React, { CSSProperties, useEffect, useState } from 'react';

import { AutoTable } from './components/AutoTable/AutoTable';
import { AutoTypeInput } from './components/AutoTypeInput/AutoTypeInput';
import { BooleanInput } from './components/BooleanInput/BooleanInput';
import { JSONTextView } from './components/JSONTextView/JSONTextView';
import { MenuElementRecursive } from './components/ObjectMenu/MenuRecursive';
import { SetLevel } from './components/SetLevel/SetLevel';
import { AutoForm6StateType, AutoFormState, Path } from './types/autoFormPropsType';
import { JSONObject, JSONValue } from './types/JSONTypes';
import { useIndexedDBStore } from './useIndexedDBStore';
import { isPrimitive } from './utils/isPrimitive';
import { getAutoFormState } from './utils/utils';

export interface AutoForm6Interface {
  inValue: JSONValue;
  path?: Path;
  style?: CSSProperties;
  themeId?: string; // if not defined used default with dark/light switcher,
  //if provided then switcher hided and dark/light mode switch must be implemented in parent application
  //id "" and "defaultDarkF1059AF6" used for default theme
}

export function AutoForm6({ inValue, path, style, themeId }: AutoForm6Interface) {
  let value = inValue as JSONObject;
  if (isPrimitive(typeof value)) {
    value = { value: inValue };
  }

  const [formState, changeFormState] = useIndexedDBStore<AutoForm6StateType>({
    dbName: 'json-auto-form',
    storeName: 'form-state',
    key: 'currentState',
    initialState: {
      readFromStorage: false,
      errorReadFromStorage: false,

      fullScreen: false,
      showMenu: true,
      darkTheme: true,
      showJsonText: false,
      tableWrap: false,

      currentPath: path || [],
      searchText: '',
      keySearch: true,
      valueSearch: true,
      childrenNodeLevel: 2,
      maxTableChildrenLevel: 2,
    },
  });

  const [autoFormState, setAutoFormState] = useState<AutoFormState>({
    currentMenu: {
      objKeys: [],
      arrayKeys: [],
    },
    cards: [],
    tables: [],
  });

  useEffect(() => {
    const newState = getAutoFormState(
      value as JSONObject,
      formState.currentPath,
      formState.searchText,
      formState.keySearch,
      formState.valueSearch,
      formState.childrenNodeLevel,
      formState.maxTableChildrenLevel,
    );
    setAutoFormState(newState);
  }, [value, formState]);

  // const searchFilter = createSearchFilter(inValue, searchText);

  function setCurrentInputParams(params: {
    currentPath?: Path;
    searchText?: string;
    keySearch?: boolean;
    valueSearch?: boolean;
    childrenNodeLevel?: number;
    maxTableChildrenLevel?: number;
  }) {
    changeFormState(params as AutoForm6StateType); // todo
  }

  if (!formState.readFromStorage && !formState.errorReadFromStorage) return null;

  return (
    <div
      style={style}
      className={
        (themeId ? themeId + ' ' : formState.darkTheme ? 'defaultDarkF1059AF6 ' : '') +
        'frame1059-auto-form6-root' +
        (formState.fullScreen ? ' frame1059-auto-form6-root-full-screen' : '')
      }
    >
      {/* = */}
      {/* ==========================================  header ========================================== */}
      {/* = */}

      <div className="frame1059-auto-form6-header">
        <div className="frame1059-auto-form6-header-path">
          <div
            className="frame1059-auto-form6-header-menu-item"
            onClick={() => changeFormState({ showMenu: !formState.showMenu })}
          >
            ☰ Menu
          </div>

          <div
            className="frame1059-auto-form6-header-path-item"
            key={'root'}
            onClick={() => setCurrentInputParams({ currentPath: [] })}
          >
            ...
          </div>
          {formState?.currentPath.map((key, index) => (
            <div
              className="frame1059-auto-form6-header-path-item"
              key={index}
              onClick={() =>
                setCurrentInputParams({
                  currentPath: formState.currentPath.slice(0, index + 1),
                })
              }
            >
              {typeof key === 'number' ? key + 1 : key}
            </div>
          ))}
        </div>
        <div className="frame1059-auto-form6-header-right-menu">
          <input
            className="frame1059-auto-form6-search-input"
            value={formState.searchText}
            onChange={(e) => {
              setCurrentInputParams({ searchText: e.target.value });
            }}
          />
          <BooleanInput
            value={formState.keySearch}
            labelTrue="key"
            labelFalse="key"
            onValueChange={(value) => setCurrentInputParams({ keySearch: value })}
          />
          <BooleanInput
            value={formState.valueSearch}
            labelTrue="val"
            labelFalse="val"
            onValueChange={(value) => setCurrentInputParams({ valueSearch: value })}
          />

          <SetLevel
            value={formState.childrenNodeLevel}
            changeValue={(value) => setCurrentInputParams({ childrenNodeLevel: value })}
          />
          <SetLevel
            value={formState.maxTableChildrenLevel}
            changeValue={(value) => setCurrentInputParams({ maxTableChildrenLevel: value })}
          />
          <BooleanInput
            value={formState.tableWrap}
            labelTrue="⮨"
            // ↩ ⮨
            labelFalse="➨"
            // → ↦ ➨
            onValueChange={(tableWrap) => changeFormState({ tableWrap })}
          />
          <BooleanInput
            value={formState.showJsonText}
            labelTrue="txt"
            labelFalse="obj"
            onValueChange={(showJsonText) => changeFormState({ showJsonText })}
          />
          {typeof themeId === 'undefined' && (
            <BooleanInput
              value={formState.darkTheme}
              labelTrue="light"
              labelFalse="dark"
              onValueChange={(darkTheme) => changeFormState({ darkTheme })}
            />
          )}
          <BooleanInput
            value={formState.fullScreen}
            labelTrue="⇲"
            labelFalse="⇱"
            onValueChange={(fullScreen) => changeFormState({ fullScreen })}
          />
        </div>
      </div>

      <div className="frame1059-auto-form6-content-menu">
        {/* = */}
        {/* ==========================================  menu ========================================== */}
        {/* = */}

        <div
          className={
            'frame1059-auto-form6-menu' +
            (formState.showMenu ? '' : ' frame1059-auto-form6-menu-hide')
          }
        >
          <MenuElementRecursive
            inKey=""
            inValue={inValue}
            activePath={formState.currentPath}
            relativePath={[]}
            level={0}
            // maxLevel={autoFormState.childrenNodeLevel}
            maxLevel={99}
            setPath={(currentPath) =>
              setCurrentInputParams({
                currentPath,
              })
            }
          />
        </div>

        {/* = */}
        {/* ==========================================  content ========================================== */}
        {/* = */}

        <div
          className={
            'frame1059-auto-form6-content' +
            (formState.showMenu ? '' : ' frame1059-auto-form6-content-hide-menu')
          }
        >
          {formState.showJsonText && <JSONTextView value={autoFormState.pathObject} />}

          {!formState.showJsonText && (
            <>
              {!!autoFormState.cards.length && (
                <div className={'frame1059-auto-form6-content-cards'}>
                  {autoFormState.cards.map((card, index) => (
                    <div key={index} className="frame1059-auto-form6-card">
                      {!!card.relativePath.length && (
                        <div className="frame1059-auto-form6-card-header">
                          {card.relativePath.map((key, index) => (
                            <div
                              className="frame1059-auto-form6-header-path-item"
                              key={index}
                              onClick={() =>
                                setCurrentInputParams({
                                  currentPath: [
                                    ...formState.currentPath,
                                    ...card.relativePath.slice(0, index + 1),
                                  ],
                                })
                              }
                            >
                              {key}
                            </div>
                          ))}
                        </div>
                      )}
                      {!!card.value &&
                        Object.entries(card.value)
                          // .filter(([_key, val]) => isPrimitive(typeof val))
                          .map(([key, val]) => (
                            <AutoTypeInput
                              key={key}
                              label={key}
                              value={val}
                              onChangePath={() =>
                                setCurrentInputParams({
                                  currentPath: [
                                    ...formState.currentPath,
                                    ...card.relativePath,
                                    key,
                                  ],
                                })
                              }
                              onChangeValue={() => {}}
                            />
                          ))}
                    </div>
                  ))}
                </div>
              )}

              {!!autoFormState.tables.length && (
                <div className={'frame1059-auto-form6-content-tables'}>
                  {autoFormState.tables.map(
                    (table, index) =>
                      !!table.value.length && (
                        <div key={index} className="frame1059-auto-form6-table">
                          {!!table.relativePath.length && (
                            <div className="frame1059-auto-form6-card-header">
                              {table.relativePath.map((key, index) => (
                                <div
                                  className="frame1059-auto-form6-header-path-item"
                                  key={index}
                                  onClick={() =>
                                    setCurrentInputParams({
                                      currentPath: [
                                        ...formState.currentPath,
                                        ...table.relativePath.slice(0, index + 1),
                                      ],
                                    })
                                  }
                                >
                                  {key}
                                </div>
                              ))}
                            </div>
                          )}
                          <AutoTable
                            inValue={table.value}
                            originalIndex={table.originalIndex}
                            maxTableChildrenLevel={formState.maxTableChildrenLevel}
                            tableWrap={formState.tableWrap}
                            onChangePath={(path: Path) =>
                              setCurrentInputParams({
                                currentPath: [
                                  ...formState.currentPath,
                                  ...table.relativePath,
                                  ...path,
                                ],
                              })
                            }
                          />
                        </div>
                      ),
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
