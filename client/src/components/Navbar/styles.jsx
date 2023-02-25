import Styled from "styled-components";

export const NavbarContainer = Styled.div`
    display:flex;
    justify-content: space-between;
    padding: 15px 30px;
    border-bottom: 0.5px solid lightgrey;
    @media screen and (max-width: 800px) {
    padding: 0px 2px;
  }
`;

export const Header = Styled.span`
    text-transform: uppercase;
    font-size: 24px;
    cursor: pointer;
    margin-right: 10px;
    @media screen and (max-width: 800px) {
    font-size: 1rem;

  }
`;

export const Right = Styled.div`
    display:flex;
    align-items:center;
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
