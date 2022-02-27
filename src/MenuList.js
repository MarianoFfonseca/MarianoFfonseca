import React from 'react'
import { Link } from 'react-router-dom'
import './MenuList.css'
import menuList from './menuList.json'

function MenuList() {
  return (
    <div className='menuList'>
      <div className='menuList__container'>
        <h4>For investing</h4>
        <div className='menuList__items'>
          {menuList.map((menuListCategory) =>
            menuListCategory.drinks.map((menuListItem) => (
              <Link to={menuListItem.path}>{menuListItem.type}</Link>
            ))
          )}
        </div>
      </div>
      <div className='menuList__container'>
        <h4>Info for investing</h4>
        <div className='menuList__items'>
          {menuList.map((menuListCategory) =>
            menuListCategory.food.map((menuListItem) => (
              <Link to={menuListItem.path}>{menuListItem.type}</Link>
            ))
          )}
        </div>
      </div>
      <div className='menuList__container'>
        <h4>About</h4>
        <div className='menuList__items'>
          {menuList.map((menuListCategory) =>
            menuListCategory.atHomeCoffee.map((menuListItem) => (
              <Link to={menuListItem.path}>{menuListItem.type}</Link>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default MenuList
