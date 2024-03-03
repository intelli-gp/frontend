import styled from 'styled-components';

export const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    height: 100vh;
    align-items: center;
    justify-content: space-between;
    padding: 30px 0px;
    & > h1:first-child {
        font-style: normal;
        font-weight: 600;
        font-size: 48px;
        line-height: 100%;
        display: flex;
        align-items: center;
        text-align: center;
        letter-spacing: -0.04em;
        color: #343a40;
    }
`;

export const ButtonsHolder = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 10px;
    gap: 11px;

    width: 238px;
    height: 64px;

    background: #ffffff;
    box-shadow: var(--gray-shadow);
    border-radius: 25px;
`;
export const CardsHolder = styled.div`
    display: flex;
    flex-direction: row;
    position: relative;
    justify-content: center;
    align-items: center;
    padding: 17px;
    gap: 25px;
`;

export const CardHolder = styled.div`
    display: flex;
    flex-direction: column;
    padding: 20px 25px;
    align-items: left;
    justify-content: space-between;
    box-sizing: border-box;
    width: 280px;
    height: 380px;
    background: #ffffff;
    border: 1.5px solid rgba(82, 82, 82, 0.27);
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
