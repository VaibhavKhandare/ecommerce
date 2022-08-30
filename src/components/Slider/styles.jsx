import styled from 'styled-components';

export const Container = styled.div`
    width: 100%;
    background-color:wheat;
    height: 100vh;
`;

export const Arrow = styled.span`
    padding: 6px 10px;
    background-color: coral;
    border-radius: 50%;
    color:white;
    position:absolute;
    top:50%;
    cursor:pointer;
    right:${props=>props.direction === 'left' && '10px'};
    left: ${props=>props.direction === 'right' && '10px'};
    opacity: 0.5;
`;

export const Wrapper = styled.div`
    height:100%;
`;
export const Image = styled.img`
    width:100%;
    height:100%;
`;
export const ImageContainer = styled.div`
    height:100%;
    flex:1;
`;

export const InfoContainer = styled.div`
    flex:1;
`;

export const Slide = styled.div`
    width: 100vw;
    height: 100vh;
    display:flex;
    align-items: center;
`;