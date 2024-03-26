import styled, { css } from 'styled-components';


export const SideNavContainer = styled.aside<{sideNavOpen: boolean}>`
  background-color: var(--indigo-950);
  width: 300px;
  height: 100vh;
  max-height: 100vh;
  display: flex;
  flex-direction: column;
  top: 0;
  padding: 1.5rem 0.5rem;
  justify-content: space-between;
  gap: 1rem;
  overflow-y: hidden;
  z-index: 20;
  position: sticky;
  transition: all 0.5s linear;
  @media (max-width: 1024px) {

    position: fixed;}

  ${(props) => props.sideNavOpen ? css`left: 0;` : css`left: -100%;`}
`;

export const Logo = styled.h1`
  font-weight: 900;
  color: #FFFFFF;
  font-size: 2.25rem;
  position: sticky;
  top: 0;
  padding-bottom: 0.85rem;
  min-height: 0;
  display: flex;
  justify-content: center;
  font-family: Merriweather, serif;
  user-select: none;
`;

export const UserContainer = styled.div`
  border-radius: 30px;
  background-color: rgba(199, 210, 254, 0.2);
  display: flex;
  gap: 0.5rem;

  justify-content: space-between;
  align-items: center;
  color: white;
  font-size: 0.875rem;
  font-weight: bold;
  padding: 0.5rem 1.5rem 0.5rem 0.5rem;
  width: 75%;
  cursor: pointer;

  &:hover {
    background-color: rgba(199, 210, 254, 0.3);
  }
`;
export const ChatsLink = styled.div <{active: boolean}>`
border-radius: 50%;
display: flex;
justify-content: center;
align-items: center;
width:45px;
height:45px;
&:hover {
    background-color: rgba(199, 210, 254, 0.1);
  }
  ${(props) => props.active ? css` background-color: rgba(199, 210, 254, 0.1);` : css`background-color: var(--indigo-950);`}
`