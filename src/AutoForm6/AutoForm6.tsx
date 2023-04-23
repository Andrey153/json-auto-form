// MIT License
// Copyright (c) 2023 Andrey Vyalkov vyalkov.a@gmail.com
// https://github.com/Andrey153/json-auto-form

import './autoForm6.css'
import './autoForm6-defaultDarkF1059AF6.css'

import React, { CSSProperties, useEffect, useState } from 'react'

import { AutoTable } from './components/AutoTable/AutoTable'
import { AutoTypeInput } from './components/AutoTypeInput/AutoTypeInput'
import { BooleanInput } from './components/BooleanInput/BooleanInput'
import { JSONTextView } from './components/JSONTextView/JSONTextView'
import { MenuElementRecursive } from './components/ObjectMenu/MenuRecursive'
import { SetLevel } from './components/SetLevel/SetLevel'
import { AutoFormState, Path } from './types/autoFormPropsType'
import { JSONObject, JSONValue } from './types/JSONTypes'
import { isPrimitive } from './utils/isPrimitive'
import { getAutoFormState } from './utils/utils'

export interface AutoForm6Interface {
  inValue: JSONValue
  path?: Path
  style?: CSSProperties
  themeId?: string // if not defined used default with dark/light switcher,
  //if provided then switcher hided and dark/light mode switch must be implemented in parent application
  //id "" and "defaultDarkF1059AF6" used for default theme
}

export function AutoForm6({ inValue, path, style, themeId }: AutoForm6Interface) {
  let value = inValue as JSONObject
  if (isPrimitive(typeof value)) {
    value = { value: inValue }
  }

  const [fullScreen, setFullScreen] = useState(false)
  const [showMenu, setShowMenu] = useState(true)
  const [tableWrap, setTableWrap] = useState(false)

  const [darkTheme, setDarkTheme] = useState(true)

  const [showJsonText, setShowJsonText] = useState(false)

  const [autoFormState, setAutoFormState] = useState<AutoFormState>({
    currentPath: path || [],
    searchText: '',
    keySearch: true,
    valueSearch: true,
    childrenNodeLevel: 2,
    maxTableChildrenLevel: 2,
    currentMenu: {
      objKeys: [],
      arrayKeys: [],
    },
    cards: [],
    tables: [],
  })

  useEffect(() => {
    const newState = getAutoFormState(
      value as JSONObject,
      [],
      autoFormState.searchText,
      autoFormState.keySearch,
      autoFormState.valueSearch,
      autoFormState.childrenNodeLevel,
      autoFormState.maxTableChildrenLevel,
    )
    setAutoFormState(newState)
  }, [value])

  // const searchFilter = createSearchFilter(inValue, searchText);

  function setCurrentInputParams({
    path,
    searchText,
    keySearch,
    valueSearch,
    childrenNodeLevel,
    maxTableChildrenLevel,
  }: {
    path?: Path
    searchText?: string
    keySearch?: boolean
    valueSearch?: boolean
    childrenNodeLevel?: number
    maxTableChildrenLevel?: number
  }) {
    const newState = getAutoFormState(
      value as JSONObject,
      path === undefined ? autoFormState.currentPath : path,
      searchText === undefined ? autoFormState.searchText : searchText,
      keySearch === undefined ? autoFormState.keySearch : keySearch,
      valueSearch === undefined ? autoFormState.valueSearch : valueSearch,
      childrenNodeLevel === undefined ? autoFormState.childrenNodeLevel : childrenNodeLevel,
      maxTableChildrenLevel === undefined
        ? autoFormState.maxTableChildrenLevel
        : maxTableChildrenLevel,
    )
    setAutoFormState(newState)
  }

  return (
    <div
      style={style}
      className={
        (themeId ? themeId + ' ' : darkTheme ? 'defaultDarkF1059AF6 ' : '') +
        'frame1059-auto-form6-root' +
        (fullScreen ? ' frame1059-auto-form6-root-full-screen' : '')
      }
    >
      {/* = */}
      {/* ==========================================  header ========================================== */}
      {/* = */}

      <div className="frame1059-auto-form6-header">
        <div className="frame1059-auto-form6-header-path">
          <div
            className="frame1059-auto-form6-header-menu-item"
            onClick={() => setShowMenu(!showMenu)}
          >
            ☰ Menu
          </div>

          <div
            className="frame1059-auto-form6-header-path-item"
            key={'root'}
            onClick={() => setCurrentInputParams({ path: [] })}
          >
            ...
          </div>
          {autoFormState?.currentPath.map((key, index) => (
            <div
              className="frame1059-auto-form6-header-path-item"
              key={index}
              onClick={() =>
                setCurrentInputParams({
                  path: autoFormState.currentPath.slice(0, index + 1),
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
            value={autoFormState.searchText}
            onChange={(e) => {
              setCurrentInputParams({ searchText: e.target.value })
            }}
          />
          <BooleanInput
            value={autoFormState.keySearch}
            labelTrue="key"
            labelFalse="key"
            onValueChange={(value) => setCurrentInputParams({ keySearch: value })}
          />
          <BooleanInput
            value={autoFormState.valueSearch}
            labelTrue="val"
            labelFalse="val"
            onValueChange={(value) => setCurrentInputParams({ valueSearch: value })}
          />

          <SetLevel
            value={autoFormState.childrenNodeLevel}
            changeValue={(value) => setCurrentInputParams({ childrenNodeLevel: value })}
          />
          <SetLevel
            value={autoFormState.maxTableChildrenLevel}
            changeValue={(value) => setCurrentInputParams({ maxTableChildrenLevel: value })}
          />
          <BooleanInput
            value={tableWrap}
            labelTrue="⮨"
            // ↩ ⮨
            labelFalse="➨"
            // → ↦ ➨
            onValueChange={setTableWrap}
          />
          <BooleanInput
            value={showJsonText}
            labelTrue="txt"
            labelFalse="obj"
            onValueChange={setShowJsonText}
          />
          {typeof themeId === 'undefined' && (
            <BooleanInput
              value={darkTheme}
              labelTrue="light"
              labelFalse="dark"
              onValueChange={setDarkTheme}
            />
          )}
          <BooleanInput
            value={fullScreen}
            labelTrue="⇲"
            labelFalse="⇱"
            onValueChange={setFullScreen}
          />
        </div>
      </div>

      <div className="frame1059-auto-form6-content-menu">
        {/* = */}
        {/* ==========================================  menu ========================================== */}
        {/* = */}

        <div
          className={
            'frame1059-auto-form6-menu' + (showMenu ? '' : ' frame1059-auto-form6-menu-hide')
          }
        >
          <MenuElementRecursive
            inKey=""
            inValue={inValue}
            activePath={autoFormState.currentPath}
            relativePath={[]}
            level={0}
            // maxLevel={autoFormState.childrenNodeLevel}
            maxLevel={6}
            setPath={(path) =>
              setCurrentInputParams({
                path,
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
            (showMenu ? '' : ' frame1059-auto-form6-content-hide-menu')
          }
        >
          {showJsonText && <JSONTextView value={autoFormState.pathObject} />}

          {!showJsonText && (
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
                                  path: [
                                    ...autoFormState.currentPath,
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
                                  path: [...autoFormState.currentPath, ...card.relativePath, key],
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
                                      path: [
                                        ...autoFormState.currentPath,
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
                            maxTableChildrenLevel={autoFormState.maxTableChildrenLevel}
                            tableWrap={tableWrap}
                            onChangePath={(path: Path) =>
                              setCurrentInputParams({
                                path: [
                                  ...autoFormState.currentPath,
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
  )
}
