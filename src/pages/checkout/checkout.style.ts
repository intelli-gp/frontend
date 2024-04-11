import styled from 'styled-components';
import { BsArrowLeft } from "react-icons/bs";
export const Return = styled(BsArrowLeft)`
color:white;
font-size: 3rem;
transition: all 0.25s ease-in-out;

&:hover {
   background-color:white;
   opacity:0.6;
   color:var(--indigo-950);
   border-radius:100%;
}
`

export const FlexContainer = styled.div`
  display: flex;
  min-height: 100vh;
  width: 100%;
  flex-direction: row;

  @media (max-width: 1023px) {
    flex-direction: column;

    max-width: 36rem;
    justify-content: center;
  }
`;

export const SidePanel = styled.div`
  display: none;
  background-color: var(--indigo-950);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 1rem;
  padding: 2rem 3.5rem;
  width: 100%;
  @media (min-width: 1024px) {
    width: 40%;
    height: 100vh;
    height: 100%;
  }
`;

export const ContentWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  width:100%;
  flex-direction: column;
  gap: 1.75rem;
`;

export const Title = styled.h1`
  font-size: 2rem;
  font-weight: 650;
  color: #ffffff;
  
  @media (min-width: 1536px) {
    font-size: 3rem;
  }
  
  @media (min-width: 1024px) {
    font-size: 2.5rem;
  }
`;


export const Image = styled.img`
  width: 18rem;
  display:none;
  @media (min-width: 1024px) {
    display:flex;

    width: 24rem;
  }
`;

export const CardType =styled.svg`
position: absolute;
right: 10px;
bottom: 30%;
`