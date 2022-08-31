import React from 'react';
import { RightOutlined, LeftOutlined } from '@ant-design/icons';
import {Container, Arrow, Wrapper, Image, ImageContainer, InfoContainer, Slide, Title, Desc, ShopButton} from './styles'



const Slider = () => {
  return (
    <Container>
        <Arrow direction="left">
            <RightOutlined />
        </Arrow>
        <Wrapper>
            <Slide>
            <ImageContainer>
                <Image src="https://images.unsplash.com/photo-1589465885857-44edb59bbff2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80" />
            </ImageContainer>
            <InfoContainer>
                <Title>Summer Sale</Title>
                <Desc> Don't Compromise on Style! Get Flat 30% OFF NEW ARRIVAL</Desc>
                <ShopButton>SHOP NOW</ShopButton>
            </InfoContainer>
            </Slide>
        </Wrapper>
        <Arrow direction="right">
            <LeftOutlined />
        </Arrow>
    </Container>
  )
}

export default Slider