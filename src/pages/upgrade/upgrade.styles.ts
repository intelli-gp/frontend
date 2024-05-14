import { motion } from 'framer-motion';
import { FaCircleCheck } from 'react-icons/fa6';
import styled from 'styled-components';



export const Check = styled(FaCircleCheck)`
    position: absolute;
    left: -2%;
    top: 6%;
    color:var(--indigo-950);
    height: 20px;
    width: 20px;
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

export const CardsHolder = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 17px;
    gap: 2.75rem;
    @media (max-width: 868px) {
        flex-direction: column;
    }
`;

export const CardHolder = styled.div<{ Pro?: boolean }>`
    display: flex;
    flex-direction: column;
    padding: 30px;
    align-items: left;
    position: relative;
    justify-content: space-between;
    box-sizing: border-box;
    width: 400px;
    height: 500px;
    background:${({ Pro }) => (Pro ? 'var(--indigo-300)' : 'var(--indigo-50)')};
    border: 2px solid rgba(82, 82, 82, 0.27);
    box-shadow: var(--gray-shadow);
    color:var(--indigo-950);
    border-radius: 12px;  

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
    
`;
export const UpperCardPart =styled.div`
display: flex;
flex-direction: row;
align-items: center;
justify-content: space-between;
padding: 0.5rem;
border-bottom: 2px solid var(--indigo-950);

`
export const UpgradeButton = styled.button`
    width: 95%;
    outline: none;
    font-weight: 700;
    padding: 0.5rem 1.5rem;
    text-align: center;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    border-radius: 6px;
    color: var(--indigo-50);
    background: var(--indigo-950);
    transition: all 0.2s ease-in-out;
    &:hover {
        opacity:0.8;
    }
`;
