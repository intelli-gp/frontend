import { Link } from 'react-router-dom';
import styled from 'styled-components';

import Button from '../../../components/button/button.component';

export const PasswordRecoveryContainer = styled.main`
    display: flex;
    flex-direction: column;
    border: 1px solid #cbd5e1;
    border-radius: 0.375rem;
    padding: 2rem;
    gap: 0.5rem;
`;

export const RecoveryTitle = styled.h2`
    font-size: 1.5rem;
    font-weight: bold;
    color: var(--slate-600);
`;

export const RecoveryMessage = styled.p`
    font-size: 0.875rem;
    color: var(--slate-500);
`;
export const RecoveryHeading = styled.h1`
    font-size: 3rem;
    color: #475569;
    font-weight: 900;
    text-align: center;
    padding: 2rem 0;
    letter-spacing: -0.025em;

    @media (max-width: 767px) {
        font-size: 2.5rem;
    }
`;
export const FormContainer = styled.form`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 20rem;
    padding: 2rem 0;

    @media (min-width: 640px) {
        width: 25rem !important;
    }
`;

export const RecoveryButton = styled(Button)`
    height: 2.75rem;
    font-size: 1rem;
    text-align: center;
    font-weight: bold;
    width: 100%;
    gap: 0.5rem;
`;

export const BackToLoginLink = styled(Link)`
    display: flex;
    flex-direction: row;
    gap: 0.5rem;
    justify-content: center;
    align-items: center;
    font-size: 0.875rem;
    margin-top: 1rem;
`;
