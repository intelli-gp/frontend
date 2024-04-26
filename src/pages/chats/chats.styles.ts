import { motion } from 'framer-motion';
import styled from 'styled-components';

import { NotificationsContainer } from '../notifications/notifications.styles';

export const PageContainer = styled(motion.div)`
    margin: 0 auto;
    padding: 2rem;
    max-width: 800px;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    align-items: start;
    height: 100%;
`;

export const ChatsContainer = NotificationsContainer;
