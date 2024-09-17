import React from 'react'
import './TabButton.scss'

const TabButton = ({children, onSelect}) => {

  return (
    <>
    
          <li className="nav-item" role="presentation" style={{paddingLeft : 0}}>
            <button
            onClick={onSelect}
              data-mdb-tab-init
              className="nav-link"
              data-mdb-target="#home0"
              type="button"
              role="tab"
              aria-controls="home"
              aria-selected="true"
            >
              {children}
            </button>
          </li>

    </>
  )
}

export default TabButton