import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 1.5rem;
  font-weight: bold;
`;

export const InfoSection = styled.div`
  width: 70%;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const Header = styled.div`
  display: flex;
  justify-content: start;
  gap: 1rem;
  align-items: center;
  margin-top: 1rem;
`;

export const Title = styled.p`
  font-weight: 800;
  font-size: 1.125rem;
`;

export const PriceWrapper = styled.p`
  margin-right: 1.5rem;
`;

export const Price = styled.span`
  font-size: 0.75rem;
  color: var(--slate-500);
  font-weight: 500;
`;

export const StatusWrapper = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
`;

export const Status = styled.span`
  display: flex;
  gap: 0.5rem;
  align-items: center;
  font-weight: 800;
`;

export const DateWrapper = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
`;

export const BoldText = styled.div`
  font-weight: 800;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 1.5rem;
  width: 25%;
`;