import styled from 'styled-components';

export const PersonName = styled.p`
    margin: 0 !important;
    font-size: 0.8rem;
    max-width: 10ch;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
`;

export const PersonContainer = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 12px;
    gap: 8px;
    cursor: pointer;
    transition: background-color 0.3s ease-in-out;
    min-width: 7.4rem;
    &:hover {
        background: var(--indigo-50);
        border-radius: 6px;
    }
`;

export const PersonImage = styled.img`
    height: 70px;
    width: 70px;
    border-radius: 50%;
    object-fit: cover;
`;

export const CrownHolder = styled.div`
    position: absolute;
    top: 0;
    right: 10%;
`;
