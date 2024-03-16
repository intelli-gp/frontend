import styled from "styled-components";

export const Arrow = styled.div`
  display: none;
`;

export const PersonName = styled.p`
    margin: 0 !important;
    font-size: 0.8rem;
    max-width: 12ch;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;

`;

export const PersonContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 6px 12px;
    gap: 8px;
    cursor: pointer;
    transition: background-color 0.3s ease-in-out;

    &:hover {
        background: var(--indigo-50);
        border-radius: 6px;
        ${Arrow} {
            display: inline;
        }
        ${PersonName}{
            max-width: 10ch;

        }
    }
`;


export const Menu = styled.div`
    position: absolute;
    top: 100%;
    left: 80%;
    border-radius: 10px;
    display: flex;
    background-color: var(--indigo-100);
    box-shadow: var(--gray-shadow);
    flex-direction: column;
    padding: 12px;
    width: 160px;
    h1 {
        color: var(--indigo-900);
        font-weight: bold;
    }
`;

export const MenuContent = styled.div`

    border-radius: 14px;
    display: flex;
    align-items: center;
    padding: 0.5rem 1rem;
    cursor: pointer;
    &:hover {
        background-color: rgb(199, 210, 254);
   }

`