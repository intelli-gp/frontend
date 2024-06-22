import styled from 'styled-components';

export const AccordionContainer = styled.div`
    width: 100%;
    border-radius: 10px;
    border: 1px solid rgba(0, 0, 0, 0.1);
    box-shadow:
        rgba(0, 0, 0, 0.1) 0px 4px 6px -1px,
        rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;
`;

export const AccordionHeader = styled.header<{ isOpen?: boolean }>`
    cursor: pointer;
    background-color: var(--indigo-200);
    padding: 1rem;
    border-radius: ${(props) => (props.isOpen ? '10px 10px 0 0' : '10px')};
    font-size: 1.5rem;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: space-between;
    user-select: none;
`;

export const AccordionContent = styled.main`
    padding: 2.5rem;
    font-size: 1rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    position: relative;
    @media (max-width: 768px) {
        padding: 2rem 1.5rem;
        font-size: 1rem;
    }
`;
