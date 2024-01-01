import styled from 'styled-components';

const bgColor = '#eef2ff';

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
    height: 300px;
    background-color: ${bgColor};
    position: relative;
`;

export const CoverImageContainer = styled.div`
    position: relative;
    width: 100%;
    height: 75%;
`;

export const CoverImage = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    border: none;
`;

export const ProfilePictureContainer = styled.div`
    position: relative;
    width: 150px;
    height: 150px;
`;

export const ProfilePicture = styled.img`
    object-fit: cover;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.5);
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
    position: absolute;
    align-items: center;
    gap: 1.5rem;
    bottom: -37.5px;
    left: 5rem;
    @media (max-width: 768px) {
        left: 0;
        width: 100%;
        gap: 1rem;
        justify-content: center;
    }
`;

export const MainContainer = styled.main`
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
    }
`;

export const AboutSection = styled.section`
    width: 100%;
    grid-column: 1;
    background-color: ${bgColor};
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
    gap: 0.5rem;
`;

export const AboutListItem = styled.li`
    list-style: none;
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    gap: 0.5em;
`;

export const MainSection = styled.section`
    grid-column: 2;
    width: 100%;
    background-color: ${bgColor};
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
    }
`;

export const MainSectionHeader = styled.header`
    display: flex;
    align-items: center;
    gap: 2rem;
`;

export const MainSectionHeaderTab = styled.button<{ isActive: boolean }>`
    padding: 0.1rem 0.5rem;
    border-bottom: ${(props) =>
        props.isActive ? '3px solid #4338ca' : 'none'};
    font-weight: ${(props) => (props.isActive ? 'bold' : 'normal')};
    color: ${(props) =>
        props.isActive ? '#4338ca' : 'rgb(67, 56, 202, 0.5);'};
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
    grid-column: 3;
    width: 100%;
    background-color: ${bgColor};
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
