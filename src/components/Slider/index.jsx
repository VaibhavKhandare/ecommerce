import React from 'react';
import { RightOutlined, LeftOutlined } from '@ant-design/icons';
import {Container, Arrow, Wrapper, Image, ImageContainer, InfoContainer, Slide} from './styles'



const Slider = () => {
  return (
    <Container>
        <Arrow direction="left">
            <RightOutlined />
        </Arrow>
        <Wrapper>
            <Slide>
            <ImageContainer>
                <Image src="https://images.unsplash.com/photo-1568252542512-9fe8fe9c87bb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8" />
            </ImageContainer>
            <InfoContainer></InfoContainer>
            </Slide>
        </Wrapper>
        <Arrow direction="right">
            <LeftOutlined />
        </Arrow>
    </Container>
  )
}

export default Slider