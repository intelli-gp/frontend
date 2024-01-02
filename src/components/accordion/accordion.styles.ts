import styled from 'styled-components';

export const AccordionContainer = styled.div`
    width: 100%;
    border-radius: 10px;
    border: 1px solid rgba(0, 0, 0, 0.1);
`;

export const AccordionHeader = styled.header<{ isOpen?: boolean }>`
    cursor: pointer;
    background-color: #a5b4fc;
    padding: 1rem;
    border-radius: ${(props) => (props.isOpen ? '10px 10px 0 0' : '10px')};
    font-size: 1.5rem;
    font-weight: bold;
    color: #312e81;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

export const AccordionContent = styled.main`
    padding: 2rem;
    font-size: 1.2rem;
    line-height: 1.5;
    color: #4b5563;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    position: relative;
    @media(max-width: 768px){
        padding: 1rem;
        font-size: 1rem;
    }
`;
