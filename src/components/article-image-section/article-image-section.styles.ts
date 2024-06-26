import styled from 'styled-components';
import EnhancedImage from '../image/image.component';

export const ImageSection = styled(EnhancedImage)`
    object-fit: contain;
    min-height: 250px;
    max-height: 400px;
    background-color: var(--indigo-50);
    cursor: pointer;
`;
