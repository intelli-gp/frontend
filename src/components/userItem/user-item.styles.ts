import styled from 'styled-components';

export const UserItemContainer = styled.li`
    display: flex;
    align-items: center;
    gap: 1rem;
    /* background-color: #fff; */
    border-radius: 10px;
`;

export const UserItemImage = styled.img`
    width: 36px;
    height: 36px;
    border-radius: 50%;
`;

export const UserItemUsername = styled.p`
    font-size: 0.8rem;
    opacity: 0.8;
`;