import styled from 'styled-components';

export const PageContainer = styled.div`
    width: 100%;
    max-width: 1920px;
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
    margin: 0 auto;
`;

export const PageHeader = styled.header`
    width: 100%;
    background-color: var(--indigo-50);
    position: relative;
`;

export const CoverImageContainer = styled.div`
    position: relative;
    width: 100%;
`;

export const CoverImage = styled.img`
    width: 100%;
    max-height: 200px;
    object-fit: cover;
    border: none;
`;

export const ProfilePictureContainer = styled.div`
    position: relative;
    width: 150px;
    height: 150px;
    @media (max-width: 768px) {
        width: 120px;
        height: 120px;
    }
`;

export const ProfilePicture = styled.img`
    object-fit: cover;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    box-shadow: var(--black-shadow);
`;

export const PictureOverlay = styled(ProfilePicture)`
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    position: absolute;
    transition: opacity 0.3s ease-in-out;
    &:hover {
        opacity: 0.2;
        cursor: pointer;
    }
`;

export const UserDataContainer = styled.div`
    display: flex;
    align-items: center;
    max-height: 75px;
    padding: 0 4rem;
    gap: 1.5rem;
    background: var(--gradient-50);
    @media (max-width: 768px) {
        padding: 0 2rem;
        gap: 1rem;
    }
    @media (max-width: 500px) {
        padding: 0 1rem;
        gap: 0.5rem;
    }
`;

export const MainContainer = styled.main`
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 3fr 1fr;
    grid-auto-rows: auto;
    align-items: start;
    gap: 1.25rem;
    padding: 0 1.25rem;
    @media (max-width: 1700px) {
        align-items: stretch;
        grid-template-columns: 1fr 1fr;
    }
    @media (max-width: 768px) {
        grid-template-columns: 1fr;
        padding: 0 0.5rem;
    }
`;

export const AboutSection = styled.section`
    color: var(--slate-700);
    background: var(--gradient-50);
    width: 100%;
    grid-column: 1;
    background-color: var(--indigo-50);
    border-radius: 10px;
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    @media (max-width: 1700px) {
        grid-column: 1;
        padding: 2rem;
    }
    @media (max-width: 768px) {
        grid-column: 1;
        grid-row: 1;
    }
`;

export const AboutList = styled.ul`
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
`;

export const AboutListItem = styled.li`
    list-style: none;
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    gap: 1rem;
`;

export const MainSection = styled.section`
    background: var(--gradient-50);
    grid-column: 2;
    width: 100%;
    background-color: var(--indigo-50);
    border-radius: 10px;
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    @media (max-width: 1700px) {
        grid-column: 1/3;
        grid-row: 2;
    }
    @media (max-width: 768px) {
        grid-column: 1;
        grid-row: 3;
        padding: 1.5rem 0.5rem;
    }
`;

export const MainSectionHeader = styled.header`
    display: flex;
    align-items: center;
    gap: 2rem;
    margin-bottom: 1rem;
`;

export const MainSectionHeaderTab = styled.button<{ isActive: boolean }>`
    padding: 0.1rem 0.5rem;
    border-bottom: ${(props) =>
        props.isActive ? '3px solid var(--indigo-700)' : 'none'};
    font-weight: ${(props) => (props.isActive ? 'bold' : 'normal')};
    color: var(--indigo-700);
    opacity: ${(props) => (props.isActive ? '1' : '0.75')};
`;

export const MainSectionContent = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    flex: 1;
`;

export const EmptyContent = styled.div`
    font-size: 1.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 1;
    opacity: 0.5;
`;

export const YouMayNowSection = styled.section`
    background: var(--gradient-50);
    grid-column: 3;
    width: 100%;
    background-color: var(--indigo-50);
    border-radius: 10px;
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    @media (max-width: 1700px) {
        grid-column: 2;
    }
    @media (max-width: 768px) {
        grid-column: 1;
        grid-row: 2;
    }
`;
