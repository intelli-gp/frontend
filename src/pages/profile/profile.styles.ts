import { motion } from 'framer-motion';
import { FaUserCheck } from 'react-icons/fa';
import styled from 'styled-components';

import { FollowButton as FollowButtonComponent } from '../../components/follow-button/follow-button.component';
import EnhancedImage from '../../components/image/image.component';
import { CSSTextLengthLimit, CSSTextLinesCountLimit } from '../../index.styles';
import { GroupsGrid } from '../explore-groups/explore-groups.style';
import { QRCodeModalButtons } from '../settings/settings.styles';

const SECTION_SHADOW = '';
const SECTION_BACKGROUND = 'var(--indigo-50)';
const BORDER_RADIUS = '1rem';

export const PageContainer = styled(motion.div)`
    width: 100%;
    max-width: 1920px;
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
    margin: 0 auto;
    margin-bottom: 1.25rem;
`;

export const PageHeader = styled.header`
    max-width: 1366px;
    margin: 0 auto;
    width: 100%;
    background-color: ${SECTION_BACKGROUND};
    position: relative;
    border-radius: ${BORDER_RADIUS};
    box-shadow: ${SECTION_SHADOW};
`;

export const CoverImageContainer = styled.div`
    position: relative;
    width: 100%;
`;

export const CoverImage = styled(EnhancedImage)`
    width: 100%;
    height: auto;
    min-height: 200px;
    aspect-ratio: 5/1;
    object-fit: cover;
    border: none;
    z-index: 0;
`;

export const ProfilePictureContainer = styled.div`
    position: absolute;
    bottom: 72.5%;
    width: 175px;
    height: 175px;
    @media (max-width: 768px) {
        width: 150px;
        height: 150px;
    }
`;

export const ProfilePicture = styled.img`
    aspect-ratio: 1/1;
    object-fit: cover;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    outline: 0.35rem solid var(--indigo-50);
    outline-offset: -1px;
`;

export const PictureOverlay = styled(ProfilePicture)`
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    position: absolute;
    transition: opacity 0.3s ease-in-out;
    z-index: 1;
    &:hover {
        opacity: 0.1;
        cursor: pointer;
    }
`;

export const UserDataContainer = styled.div`
    display: flex;
    align-items: center;
    position: relative;
    padding: 2.5rem 4rem 1rem 4rem;
    gap: 1.5rem;
    background-color: ${SECTION_BACKGROUND};
    border-radius: ${BORDER_RADIUS};
    box-shadow: ${SECTION_SHADOW};

    @media (max-width: 768px) {
        padding: 2.5rem 2rem 1rem 2rem;
        gap: 1rem;
    }
    @media (max-width: 500px) {
        padding: 2.5rem 1rem 1rem 1rem;
        gap: 0.5rem;
    }
`;

export const UserFullName = styled.h2<{ width?: string }>`
    line-height: 1.25;
    font-weight: 900;
    font-size: 2rem;
    ${CSSTextLengthLimit}
`;

export const UserHeadline = styled.h3<{ width?: string; lines?: number }>`
    font-weight: 500;
    font-size: 1.25rem;
    line-height: 1.25;
    ${CSSTextLinesCountLimit}
    max-width: 90vw;
`;

export const UserUserName = styled.p`
    margin-top: -0.25rem;
    opacity: 0.75;
    font-size: 1rem;
`;

export const ContactInfoLink = styled.a`
    cursor: pointer;
    color: var(--indigo-700);
    border-bottom: 1px solid transparent;
    align-self: flex-start;
    transition: all 0.2s ease-in-out;
    line-height: 1.1;

    &:hover {
        color: var(--indigo-900);
        border-bottom-color: var(--indigo-900);
    }
`;

export const MainContainer = styled.main`
    width: 100%;
    max-width: 1366px;
    display: grid;
    grid-template-columns: minmax(0, 3fr) minmax(0, 1fr);
    grid-auto-rows: auto;
    align-items: start;
    gap: 1.25rem;
    padding: 0 1.25rem;
    margin: 0 auto;

    @media (max-width: 768px) {
        grid-template-columns: minmax(0, 1fr);
    }
`;

export const AboutSection = styled.section`
    box-shadow: ${SECTION_SHADOW};
    width: 100%;
    grid-column: 1;
    background-color: ${SECTION_BACKGROUND};
    border-radius: ${BORDER_RADIUS};
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    @media (max-width: 768px) {
        grid-row: 1;
    }
`;

export const UserBio = styled.pre<{ width?: string; lines?: number }>`
    white-space: break-spaces;
    font-size: 0.9rem;
    font-family: inherit;
    ${CSSTextLinesCountLimit}
    max-width: 750px;
`;

export const AboutList = styled.ul`
    display: flex;
    flex-direction: column;
`;

export const AboutListItem = styled.li`
    list-style: none;
    margin-bottom: 0.75rem;
    display: flex;
    align-items: center;
    gap: 0.75rem;

    &:not(last-child) {
        border-bottom: 1px solid var(--indigo-100);
    }
`;

export const AboutListItemText = styled.p<{ width?: string }>`
    ${CSSTextLengthLimit}
`;

export const MainSection = styled.section`
    grid-column: 1;
    width: 100%;
    background-color: ${SECTION_BACKGROUND};
    box-shadow: ${SECTION_SHADOW};
    border-radius: ${BORDER_RADIUS};
    padding: 1.5rem;
    padding-top: 0.5rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    @media (max-width: 768px) {
        grid-row: 3;
    }
`;

export const MainSectionHeader = styled.header`
    display: flex;
    align-items: center;
    overflow-x: auto;
    gap: 1rem;
    margin-bottom: 1rem;
`;

export const MainSectionHeaderTab = styled.button<{ isActive: boolean }>`
    padding: 0.5rem 1rem;
    transition: all 0.2s ease-in-out;
    border-bottom: ${(props) =>
        props.isActive
            ? '3px solid var(--indigo-700)'
            : '3px solid transparent'};
    color: ${(props) =>
        props.isActive ? 'var(--indigo-700)' : 'var(--gray-800)'};
    font-weight: 700;
    &:hover {
        cursor: pointer;
        opacity: 1;
        backdrop-filter: brightness(0.95);
    }
`;

export const MainSectionContent = styled.div`
    width: min(800px, 100%);
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    flex: 1;
`;

export const GroupsContainer = styled(GroupsGrid)``;

export const EmptyContent = styled.div`
    font-size: 1.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 300px;
    opacity: 0.5;
`;

export const YouMayNowSection = styled.section`
    box-shadow: ${SECTION_SHADOW};
    background-color: ${SECTION_BACKGROUND};
    grid-column: 2;
    grid-row: 1/3;
    width: 100%;
    border-radius: ${BORDER_RADIUS};
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    @media (max-width: 768px) {
        grid-column: 1;
        grid-row: 2;
    }
`;

export const FollowButton = styled(FollowButtonComponent)<{
    small?: boolean;
}>`
    margin-left: auto;
    align-self: flex-start;
    height: ${({ small }) => (small ? '30px' : '35px')};
    font-size: ${({ small }) => (small ? '0.85rem' : '1rem')};
    width: ${({ small }) => (small ? '85px' : '110px')};
    border-width: ${({ small }) => (small ? '1px' : '2px')};
    font-weight: ${({ small }) => (small ? '400' : '500')};
`;

export const UsersListContainer = styled.ul`
    width: min(500px, 100%);
    margin: 0 auto;
    border-radius: 1rem;
    background-color: white;
    box-shadow: 0px 0px 10px 5px rgba(99, 102, 241, 0.1);
`;

export const UsersListContent = styled.div`
    height: 50vh;
    overflow-y: auto;
    padding: 1rem;
`;

export const UsersListHeader = styled.header`
    padding: 1rem;
`;

export const FollowIcon = styled(FaUserCheck)`
    color: var(--gray-700);
    &:hover {
        cursor: help;
    }
`;

export const ModalButtonsContainer = styled(QRCodeModalButtons)`
    align-self: end;
`;
