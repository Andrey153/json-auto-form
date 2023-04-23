// MIT License
// Copyright (c) 2023 Andrey Vyalkov vyalkov.a@gmail.com
// https://github.com/Andrey153/json-auto-form

import { useState } from 'react'

import { Path } from '../../types/autoFormPropsType'
import { JSONObject, JSONValue } from '../../types/JSONTypes'
import { getJsonType } from '../../utils/getJsonType'

type MenuRecursiveType = {
  inValue: JSONValue
  relativePath: Path
  level: number
  maxLevel: number
  setPath: (path: Path) => void
}

export function MenuRecursive({
  inValue,
  relativePath,
  level,
  maxLevel,
  setPath,
}: MenuRecursiveType) {
  if (level > maxLevel) return null
  const typeInValue = getJsonType(inValue)
  if (typeInValue !== 'JSONObject') return null

  return (
    <>
      {Object.entries(inValue as JSONObject).map(([key, val]) => {
        const typeVal = getJsonType(val)
        const path = [...relativePath, key]
        if (typeVal === 'JSONObject') {
          return (
            <div className="frame1059-auto-form6-menu-with-submenu-container" key={key}>
              <div
                className="frame1059-auto-form6-menu-item-object"
                key={key}
                onClick={() => setPath(path)}
              >
                {key}
              </div>
              <div className="frame1059-auto-form6-menu-submenu">
                <MenuRecursive
                  inValue={val}
                  relativePath={path}
                  level={level + 1}
                  maxLevel={maxLevel}
                  setPath={setPath}
                />
              </div>
            </div>
          )
        }

        if (typeVal === 'JSONArray') {
          return (
            <div className="frame1059-auto-form6-menu-with-submenu-container" key={key}>
              <div className="frame1059-auto-form6-menu-item-array" onClick={() => setPath(path)}>
                {key}...
              </div>
            </div>
          )
        }

        return null
      })}
    </>
  )
}

type MenuElementRecursiveType = {
  inKey: string
  inValue: JSONValue
  activePath: Path
  relativePath: Path
  level: number
  maxLevel: number
  setPath: (path: Path) => void
}

export function MenuElementRecursive({
  inKey,
  inValue,
  activePath,
  relativePath,
  level,
  maxLevel,
  setPath,
}: MenuElementRecursiveType) {
  const [unfoldSubMenu, setUnfoldSubMenu] = useState(false)

  if (level > maxLevel) return null
  const typeInValue = getJsonType(inValue)
  if (typeInValue !== 'JSONObject') return null

  const path = level ? [...relativePath, inKey] : []

  // make active menu base on path
  const isActiveItem = !path.find((element, index) => activePath[index] !== element)
  // const isActiveItem = activePath.toString().startsWith(path.toString());
  // const isActiveItem = false;

  // const unfoldSubMenuCheck = !level ? true : isActiveItem || unfoldSubMenu;
  const unfoldSubMenuCheck = unfoldSubMenu || !level

  const isSubItemsPresent = Object.entries(inValue as JSONObject).find(([, val]) => {
    const typeVal = getJsonType(val)
    return typeVal === 'JSONArray' || typeVal === 'JSONObject'
  })

  return (
    <div className="frame1059-auto-form6-menu-with-submenu-container">
      <div
        className={
          'frame1059-auto-form6-menu-item-object' +
          (isActiveItem ? ' frame1059-auto-form6-menu-item-object-active' : '') +
          ' ' +
          getLevelClass(level)
        }
        onClick={() => {
          // setUnfoldSubMenu(!unfoldSubMenu);
          setPath(path)
        }}
      >
        <div className="frame1059-auto-form6-menu-item-object-label">
          {/* {getLevelPrefix(level)} */}
          {inKey || '...'}
        </div>
        {isSubItemsPresent && !!level && (
          <div
            className="frame1059-auto-form6-menu-item-object-unfold-icon"
            onClick={(e) => {
              e.stopPropagation()
              setUnfoldSubMenu(!unfoldSubMenu)
            }}
          >
            {unfoldSubMenuCheck ? 'ᐯ' : 'ᐳ'}
          </div>
        )}
      </div>
      {isSubItemsPresent && unfoldSubMenuCheck && (
        <div className="frame1059-auto-form6-menu-submenu">
          {Object.entries(inValue as JSONObject).map(([key, val]) => {
            const typeVal = getJsonType(val)
            if (typeVal === 'JSONObject') {
              return (
                <MenuElementRecursive
                  key={key}
                  inKey={key}
                  inValue={val}
                  activePath={activePath}
                  relativePath={path}
                  level={level + 1}
                  maxLevel={maxLevel}
                  setPath={setPath}
                />
              )
            }
            if (typeVal === 'JSONArray') {
              const isActiveArrayItem = activePath.toString().startsWith([...path, key].toString())
              return (
                <div
                  className={
                    'frame1059-auto-form6-menu-item-array' +
                    (isActiveArrayItem ? ' frame1059-auto-form6-menu-item-array-active' : '') +
                    ' ' +
                    getLevelClass(level + 1)
                  }
                  key={key}
                  onClick={() => setPath([...path, key])}
                >
                  <div className="frame1059-auto-form6-menu-item-array-label">{key}</div>
                  <div className="frame1059-auto-form6-menu-item-array-icon">☰</div>
                </div>
              )
            }

            return null
          })}
        </div>
      )}
    </div>
  )
}

function getLevelClass(level: number): string {
  if (level === 0) return 'frame1059-auto-form6-menu-item-object-level-0'
  if (level === 1) return 'frame1059-auto-form6-menu-item-object-level-1'
  if (level === 2) return 'frame1059-auto-form6-menu-item-object-level-2'
  if (level === 3) return 'frame1059-auto-form6-menu-item-object-level-3'
  if (level === 4) return 'frame1059-auto-form6-menu-item-object-level-4'
  return 'frame1059-auto-form6-menu-item-object-level-5'
}
