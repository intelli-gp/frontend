import { motion } from 'framer-motion';
import { FaCircleCheck } from 'react-icons/fa6';
import styled from 'styled-components';

export const Check = styled(FaCircleCheck)`
    position: absolute;
    left: -5%;
    top: 4.5%;
    height: 18px;
    width: 18px;

    color: var(--indigo-950);
`;

export const PageContainer = styled(motion.div)`
    display: flex;
    flex-direction: column;
    height: 100vh;
    align-items: center;
    justify-content: space-between;
    padding: 20px;
    gap: 1.7rem;
`;
export const UpgradeTitle = styled.h1`
    font-style: normal;
    font-weight: 600;
    font-size: 48px;
    line-height: 100%;
    width: 80%;
    display: flex;
    width: 28rem;
    align-items: center;
    justify-content: center;
    text-align: center;
    letter-spacing: -0.04em;
    color: #343a40;
    @media (max-width: 768px) {
        font-size: 36px;
        line-height: 1;
    }
`;
export const ButtonsHolder = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 10px;
    gap: 11px;
    width: 234px;
    height: 66px;
    background: #ffffff;
    box-shadow: var(--gray-shadow);
    border-radius: 25px;
`;
export const CircleHolder = styled.div`
    position: absolute;
    top: 3%;
    right: 33%;
    z-index: 30;
    border-radius: 60px;
    background-color: #f9f8c1;
    padding: 7px 12px;
    font-weight: 700;
    font-size: 0.8rem;
    border: 2px solid var(--indigo-950);
    color: var(--indigo-950);
`;
export const CardsHolder = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 17px;
    gap: 25px;
    @media (max-width: 868px) {
        flex-direction: column;
    }
`;

export const CardHolder = styled.div<{ Border?: boolean }>`
    display: flex;
    flex-direction: column;
    padding: 20px 25px;
    align-items: left;
    position: relative;
    justify-content: space-between;
    box-sizing: border-box;
    width: 280px;
    height: 382px;
    background: #ffffff;
    border: 2px solid
        ${({ Border }) =>
            Border ? 'var(--indigo-950)' : ' rgba(82, 82, 82, 0.27)'};
    box-shadow: var(--gray-shadow);
    border-radius: 5px;
    & > div:first-child {
        gap: 6px;
        display: flex;
        flex-direction: column;
    }
    span {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 6px;
    }
    p {
        color: var(--slate-500);
    }

    @media (min-height: 700px) {
        height: 430px;
        width: 300px;
    }
`;
export const UpgradeButton = styled.button`
    width: 100%;
    color: var(--indigo-950);
    outline: none;
    font-weight: 600;
    padding: 0.5rem 1.5rem;
    text-align: center;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    border: 2px solid var(--indigo-950);
    background: #f9f8c1;
    transition: all 0.2s ease-in-out;
    &:hover {
        color: #f9f8c1;
        background: var(--indigo-950);
    }
`;
