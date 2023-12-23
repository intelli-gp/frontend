import styled from 'styled-components';

export const TagContainer = styled.div<{ size?: string; deletable?: boolean }>`
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bold;
    gap: 0.5rem;
    padding: ${({ deletable }) =>
        deletable ? '0.2rem 0.2rem 0.2rem 1rem' : '0.3rem 1rem'};
    border-radius: 10000px;
    font-size: ${({ size }) => {
        switch (size) {
            case 'small':
                return '0.8rem';
            case 'medium':
                return '1rem';
            case 'large':
                return '1.2rem';
            default:
                return '1rem';
        }
    }};
    background-color: #c7d2fe;
    cursor: pointer;
`;

export const DeleteTagButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 10000px;
    padding: 0.2rem 0.5rem;
    color: #312e81;
    background-color: #eef2ff;
    font-weight: bolder;

    &:hover {
        background-color: #e0e7ff;
    }
`;

export const Page = styled.div`
    width: 100%;
    min-height: 100vh;
    padding: 4rem;
    position: relative;
    display: flex;
    gap: 3rem;
    flex-direction: column;

    @media (max-width: 768px) {
        padding: 4rem 2rem;
    }
    @media (max-width: 426px) {
        padding: 4rem 1rem;
    }
`;
