import { MdNotifications } from 'react-icons/md';
import { TbMessage2 } from 'react-icons/tb';
import styled, { css } from 'styled-components';

import { CSSTextLengthLimit } from '../../index.styles';
import Button from '../button/button.component';
import EnhancedImage from '../image/image.component';

export const SideNavContainer = styled.aside<{ sideNavOpen: boolean }>`
    background-color: var(--indigo-950);
    width: 250px;
    height: 100vh;
    justify-content: center;
    max-height: 100vh;
    display: flex;
    flex-direction: column;
    top: 0;
    padding: 0.5rem;
    gap: 1rem;
    overflow-y: hidden;
    z-index: 20;
    position: sticky;
    transition: all 0.3s ease-in-out;
    @media (max-width: 1024px) {
        position: fixed;
    }

    left: ${(props) => (props.sideNavOpen ? '0' : '-100%')};
`;

export const BrandContainer = styled.div``;

export const Brand = styled.h1`
    text-align: center;
    color: #ffffff;
    font-weight: 900;
    font-size: 2.5rem;
    position: sticky;
    top: 0;
    min-height: 0;
    padding: 0.5rem 0;
    line-height: 1.2;
    font-family: 'Merriweather', serif;
    user-select: none;
`;

export const LinksContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    padding: 0 0.25rem;
    overflow-y: auto;
    &::-webkit-scrollbar {
        width: 0.25rem;
    }
    &::-webkit-scrollbar-thumb {
        background: rgb(255, 255, 255, 0.1);
    }
    &::-webkit-scrollbar-thumb:hover {
        background: rgb(255, 255, 255, 0.2);
    }
`;

export const SideNavFooter = styled.footer`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    margin-top: auto;
`;

const commonFooterIconStyles = css<{ counter?: number }>`
    position: relative;
    ${({ counter }) => {
        if (counter ?? 0 > 0) {
            return css`
                &::after {
                    content: '${counter}';
                    position: absolute;
                    padding: 0.3rem;
                    line-height: 0.5rem;
                    top: -0.35rem;
                    right: -0.35rem;
                    background-color: var(--yellow-500);
                    color: black;
                    font-size: 0.8rem;
                    border-radius: 5rem;
                }
            `;
        }
    }}
`;

export const IconContainer = styled.div<{ counter?: number }>`
    ${commonFooterIconStyles}
`;

export const MessagesIcon = styled(TbMessage2)``;

export const NotificationsIcon = styled(MdNotifications)``;

export const IconsContainer = styled.div`
    display: flex;
    gap: 0.5rem;
    justify-content: center;
    align-items: center;
    color: white;

    svg {
        cursor: pointer;
        padding: 0.5rem;
        box-sizing: content-box;
        border-radius: 50%;
        transition: 0.2s ease-out;
        background-color: rgba(255, 255, 255, 0.075);
        border: 2px solid transparent;
        &:hover {
            background-color: rgba(255, 255, 255, 0.1);
            border-color: rgba(255, 255, 255, 0.11);
        }
    }
`;

export const Separator = styled.hr`
    border-top: 1px solid rgba(255, 255, 255, 0.15);
    padding: 0;
    width: 80%;
    margin: 0 auto;
`;

export const UserContainer = styled.div`
    border-radius: 1rem;
    display: flex;
    gap: 0.75rem;
    justify-content: center;
    align-items: center;
    color: white;
    font-size: 0.875rem;
    font-weight: bold;
    padding: 0.5rem;
    padding-right: 1rem;
    width: min(90%, fit-content);
    cursor: pointer;
    transition: all 0.2s ease-out;

    &:hover {
        background-color: rgba(255, 255, 255, 0.1);
    }
`;

export const UserImage = styled(EnhancedImage)`
    width: 50px;
    height: 50px;
    aspect-ratio: 1/1;
    border-radius: 50%;
`;

export const UserFullName = styled.p<{ width?: string }>`
    user-select: none;
    ${CSSTextLengthLimit}
`;

export const UserUsername = styled.p<{ width?: string }>`
    font-size: 0.75rem;
    color: white;
    opacity: 0.75;
    margin-top: -0.2rem;
`;

export const MobileNav = styled.nav`
    background-color: var(--indigo-950);
    padding-right: 2.5rem;
    display: none;

    @media (max-width: 1024px) {
        display: flex;
        justify-content: space-between;
        height: 60px;
    }

    & h1 {
        /* Brand */
        font-size: 2rem;
    }
`;

export const MobileNavHamburger = styled(Button)`
    color: white;
    z-index: 10;
    border: none;
    background-color: transparent;
    border-radius: 0.5rem;
    padding: 0.5rem;
    margin: 0.5rem;
    &:hover {
        background-color: rgba(255, 255, 255, 0.1);
    }
`;
