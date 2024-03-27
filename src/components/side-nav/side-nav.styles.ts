import styled from 'styled-components';

import { CSSTextLengthLimit } from '../../index.styles';

export const SideNavContainer = styled.aside<{ sideNavOpen: boolean }>`
    background-color: var(--indigo-950);
    width: 250px;
    height: 100vh;
    max-height: 100vh;
    display: flex;
    flex-direction: column;
    top: 0;
    padding: 0.5rem;
    gap: 0.5rem;
    overflow-y: hidden;
    z-index: 20;
    position: sticky;
    transition: all 0.5s linear;
    @media (max-width: 1024px) {
        position: fixed;
    }

    left: ${(props) => (props.sideNavOpen ? '0' : '-100%')};
`;

export const Brand = styled.h1`
    text-align: center;
    color: #ffffff;
    font-weight: 900;
    font-size: 2.25rem;
    position: sticky;
    top: 0;
    min-height: 0;
    padding: 0.5rem 0;
    font-family: Merriweather, serif;
    user-select: none;
`;

export const LinksContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    overflow-y: auto;
`;

export const SideNavFooter = styled.footer`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    margin-top: auto;
`;

export const IconsContainer = styled.div`
    display: flex;
    gap: 0.5rem;
    justify-content: center;
    align-items: center;
    color: white;

    svg {
        cursor: pointer;
        background-color: rgba(255, 255, 255, 0.1);
        padding: 0.5rem;
        box-sizing: content-box;
        border-radius: 50%;
        transition: all 0.2s ease-out;
        &:hover {
            background-color: rgba(255, 255, 255, 0.2);
        }
    }
`;

export const UserContainer = styled.div`
    background-color: rgba(255, 255, 255, 0.1);
    border-radius: 1rem;
    display: flex;
    gap: 0.75rem;
    align-items: center;
    color: white;
    font-size: 0.875rem;
    font-weight: bold;
    padding: 0.5rem;
    width: 100%;
    cursor: pointer;
    transition: all 0.2s ease-out;

    &:hover {
        background-color: rgba(255, 255, 255, 0.2);
    }
`;

export const UserImage = styled.img`
    width: 50px;
    height: 50px;
    aspect-ratio: 1/1;
    border-radius: 50%;
    object-fit: cover;
`;

export const UserFullName = styled.p<{ width?: string }>`
    user-select: none;
    ${CSSTextLengthLimit}
`;
