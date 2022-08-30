import React from 'react'
import {Input} from 'antd'
import { UserOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { NavbarContainer, Right, Left, Header } from './styles'

const Navbar = () => {
  return (
    <NavbarContainer>
      <Right>
        <Header>LAMA</Header>
      </Right>
      <Left>
        <Input.Search placeholder='Search Item'/>
        <UserOutlined style={{fontSize:'20px'}}/>
        <ShoppingCartOutlined style={{fontSize:'20px'}}/>
      </Left>
    </NavbarContainer>
  )
}

export default Navbar