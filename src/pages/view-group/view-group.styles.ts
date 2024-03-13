import styled from 'styled-components';

export const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    height: 100%;
`;

export const GroupCoverImageContainer = styled.div`
    height: 300px;
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

    @media (max-width: 768px) {
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
    grid-template-columns: 5fr 2fr;
    @media (max-width: 768px) {
        grid-template-columns: 1fr;
    }
`;

export const LeftPart = styled.div`
    padding: 30px 80px 20px 80px;
    display: grid;
    grid-template-rows: 2fr 2fr 1fr;
    gap: 2rem;
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
    padding: 18px 0px 10px 12px;

    img {
        height: 70px;
        width: 70px;
        border-radius: 50%;
        object-fit: cover;
    }
`;

export const Arrow = styled.div`
    /* By default, hide the element */
    //  display: none;
`;

export const PersonContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 6px 12px;
    gap: 8px;
    cursor: pointer;
    transition: background-color 0.3s ease-in-out;

    &:hover {
        background: var(--indigo-50);
        border-radius: 6px;
        ${Arrow} {
            display: inline;
        }
    }
`;

export const PersonName = styled.p`
    margin: 0 !important;
    font-size: 0.8rem;
    max-width: 9ch;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
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
    div {
        border-radius: 14px;
        display: flex;
        align-items: center;
        padding: 0.5rem 1rem;
        cursor: pointer;
        &:hover {
            background-color: rgb(199, 210, 254);
        }
    }
    h1 {
        color: var(--indigo-900);
        font-weight: bold;
    }
`;

export const EditButton = styled.div`
    color: var(--slate-600);
`;
