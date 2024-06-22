import styled from 'styled-components';

import { QRCodeModalButtons } from '../../pages/settings/settings.styles';

export const FormContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;

export const CardInfoContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;

export const ButtonsContainer = QRCodeModalButtons;
