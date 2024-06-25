import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
`;

export const InfoSection = styled.div<{ isPremium?: boolean }>`
    display: grid;
    gap: 0.5rem;
    border-radius: 1.5rem;
    padding: 1.5rem;
    grid-template-columns: 1fr 3fr;
    background-color: rgba(0, 0, 0, 0.05);
    ${({ isPremium }) =>
        isPremium &&
        `
        background: hsla(233, 100%, 90%, 1);
        background: linear-gradient(90deg, hsla(233, 100%, 90%, 1) 0%, hsla(0, 0%, 89%, 1) 100%);
        background: -moz-linear-gradient(90deg, hsla(233, 100%, 90%, 1) 0%, hsla(0, 0%, 89%, 1) 100%);
        background: -webkit-linear-gradient(90deg, hsla(233, 100%, 90%, 1) 0%, hsla(0, 0%, 89%, 1) 100%);
        filter: progid: DXImageTransform.Microsoft.gradient( startColorstr="#CAD0FF", endColorstr="#E3E3E3", GradientType=1 ); 
  
    `}
`;

export const PlanNameWrapper = styled.div`
    display: flex;
    gap: 0.5rem;
    align-items: center;
`;

export const PlanName = styled.span`
    font-weight: 900;
    font-size: 1.25rem;
`;

export const PlanStatus = styled.span`
    text-transform: capitalize;
`;

export const PlanInterval = styled.span`
    background-color: rgba(0, 0, 0, 0.1);
    padding: 0.25rem 0.5rem;
    font-size: 0.65rem;
    border-radius: 2rem;
    text-transform: capitalize;
`;
