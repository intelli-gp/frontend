import styled from "styled-components";


export const PersonName = styled.p`
    margin: 0 !important;
    font-size: 0.8rem;
    max-width: 10ch;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;

`;

export const PersonContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding:12px;
    gap: 8px;
    cursor: pointer;
    transition: background-color 0.3s ease-in-out;
    min-width:7.4rem;
    &:hover {
        background: var(--indigo-50);
        border-radius: 6px;

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