import React, { memo } from 'react'
import { Dropdown, DropdownButton } from 'react-bootstrap'

 function DropDownBootstrap({btnItem,children}) {
  return (
    <DropdownButton
    autoClose={false}
    drop={'up'}
    id="dropdown-basic-button"
    title={
        btnItem
    }
  >
    <Dropdown.Item href="#/action-1">
    {children}
      {/* {ShareAndGiftDropdown()} */}
    </Dropdown.Item>
  </DropdownButton>
  )
}

export default  memo(DropDownBootstrap)