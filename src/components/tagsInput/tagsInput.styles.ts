import styled from 'styled-components';

export const TypingSection = styled.div`
    position: relative;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;

export const Dropdown = styled.div`
    border-radius: 5px;
    width: 300px;
    display: flex;
    background-color: rgb(238, 242, 255);
    flex-direction: column;
    position: absolute;
    top: 60%;
    left: 0;
    box-shadow: rgba(0, 0, 0, 0.2) 0px 2px 8px 0px;
    padding: 0.5rem;
`;

export const TagListItem = styled.li`
    color: rgb(49, 46, 129);
    font-weight: bold;
    border-radius: 5px;
    display: flex;
    align-items: center;
    padding: 0.5rem 1rem;
    cursor: pointer;
    &:last-child {
        border-bottom: none;
    }
    &:hover {
        background-color: rgb(199, 210, 254);
    }
`;

export const SelectedTagsContainer = styled.div`
    background-color: rgb(250 250 250);
    width: 100%;
    display: flex;
    align-items: start;
    flex-wrap: wrap;
    gap: 1rem;
    border-radius: 10px;
    padding: 2rem 0;
    min-height: 100px;
    max-height: 250px;
    overflow-y: scroll;
    border: 1px solid rgba(0, 0, 0, 0.1);
    padding: 1rem;

    &::-webkit-scrollbar {
        width: 5px;
    }
    &::-webkit-scrollbar-track {
        background: transparent;
    }
    &::-webkit-scrollbar-thumb {
        background: rgb(165, 180, 252);
    }
`;

export const FooterButtons = styled.footer`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    position: absolute;
    bottom: 20px;
    right: 40px;
    @media (max-width: 426px) {
        bottom: 20px;
        right: 20px;
    }
`;
