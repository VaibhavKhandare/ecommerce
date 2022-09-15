import Styled from "styled-components";

export const NavbarContainer = Styled.div`
    display:flex;
    justify-content: space-between;
    padding: 15px 30px;
    border-bottom: 0.5px solid lightgrey;
`;

export const Header = Styled.div`
    text-transform: uppercase;
    font-size: 24px;
    cursor: pointer;
`;

export const Right = Styled.div`
`;

export const UserName = Styled.div`
text-transform: capitalize;
white-space: nowrap;
`;
export const Left = Styled.div`
    display:flex;
    justify-content:center;
    align-items: center;
    *{
        margin-inline: 4px;
        cursor:pointer;
    }
`;
