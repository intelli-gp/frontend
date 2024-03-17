import styled from 'styled-components';

export const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    height: 100%;
`;

export const GroupCoverImageContainer = styled.div`
    height: 30vh;
    position: relative;
    width: 100%;

    div {
        position: absolute;
        display: flex;
        flex-direction: column;
        gap: 20px;
        left: 4rem;
        top: 50%;
        transform: translateY(-50%);
    }

    @media (max-width: 1024px) {
        height: 20vh;
        div {
            position: absolute;
            display: flex;
            flex-direction: column;
            gap: 15px;
            left: 3rem;
        }
    }
`;

export const GroupCoverImage = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    border: none;
    filter: brightness(50%);

    @media (max-width: 768px) {
        max-height: 300px;
    }
`;

export const PictureOverlay = styled.img`
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    position: absolute;
    transition: opacity 0.3s ease-in-out;
    object-fit: cover;

    box-shadow: var(--black-shadow);
    &:hover {
        opacity: 0.1;
        cursor: pointer;
    }
`;

export const GroupInfoContainer = styled.div`
    flex: 1;
    display: grid;
    grid-template-columns: 6fr 3fr;
    @media (max-width: 768px) {
        grid-template-columns: 1fr;
    }
`;

export const LeftPart = styled.div`
    padding: 2rem 4rem;
    display: flex;
    flex-direction: column;
    gap: 4rem;
    width: 100%;
    @media (max-width: 768px) {
        padding: 2rem;
    }
`;

export const EditableSection = styled.section`
    display: flex;
    flex-direction: column;
    gap: 2rem;
    width: 100%;
`;

export const EditableSectionHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    h2 {
        font-size: 1.5rem;
        color: var(--gray-700);
        font-weight: 700;
    }
`;

export const EditableSectionBody = styled.div`
    width: 80%;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.75rem;
    @media (max-width: 768px) {
        width: 100%;
    }
`;

export const RightPart = styled.div`
    padding: 15px ;
    box-shadow: 0px 0px 60px 5px rgba(39, 31, 75, 0.07);
    background: white;
    height: 100%;

    p {
        margin: 0px 15px 0px 5px;
        font-size: 14px;
        font-weight: 600;
        color: var(--gray-700);
    }
    @media (max-width: 768px) {
        box-shadow: 0px;

        background: transparent;
    }
`;

export const PeopleContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    padding:12px;
    gap: 1rem;
    width:100%; 


`;



export const EditButton = styled.button`
    cursor: pointer;
    opacity: 0.8;
    color: var(--gray-700);
    padding: 0.75rem;
    border-radius: 5rem;
    transition: all 0.25s ease-in-out;
    &:hover {
        opacity: 1;
        background-color: var(--indigo-50);
    }
`;
