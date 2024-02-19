import styled from 'styled-components';

export const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
`;
export const GroupCoverImageContainer = styled.div`
    position: relative;

    div {
        position: absolute;
        display: flex;
        flex-direction: column;
        gap: 20px;
        left: 57px;
        top: 135px;
    }
    @media (max-width: 768px) {
        div {
            position: absolute;
            display: flex;
            flex-direction: column;
            gap: 15px;
            left: 47px;
            top: 155px;
        }
    }
`;
export const PictureOverlay = styled.img`
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    object-fit: cover;
    position: absolute;
    transition: opacity 0.3s ease-in-out;
    &:hover {
        opacity: 0.9;
        cursor: pointer;
    }
`;
export const GroupCoverImage = styled.img`
    object-fit: cover;
    object-position: center;
    max-height: 310px;
    width: 100%;
    height: 100%;
    filter: brightness(60%);

    @media (max-width: 768px) {
        max-height: 300px;
    }
`;
export const GroupInfoContainer = styled.div`
    display: grid;
    grid-template-columns: 5fr 2fr;
    @media (max-width: 768px) {
        grid-template-columns: 1fr;
    }
`;
export const LeftPart = styled.div`
    padding: 30px 80px 20px 80px;
    display: grid;
    grid-template-rows: 2fr 2fr 1fr;
    width: 100%;
    p {
        font-size: 24px;
        color: var(--gray-700);
        font-weight: 700;
    }
    @media (max-width: 768px) {
        padding: 30px 50px 20px 50px;
    }
`;
export const RightPart = styled.div`
    padding: 20px 20px 0px 20px;
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
    grid-template-columns: 1fr 1fr 1fr 1fr;
    gap: 16px;
    padding: 18px 0px 18px 12px;

    img {
        max-height: 72px;
        max-width: 72px;
        border-radius: 50%;
        box-shadow: var(--gray-shadow);
    }
    h1 {
        font-size: 0.8rem;

        color: var(--gray-900);
    }
`;
export const EditButton = styled.div`
    color: var(--slate-600);
`;
