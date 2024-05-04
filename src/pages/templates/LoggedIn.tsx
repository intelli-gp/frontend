import { Outlet } from 'react-router-dom';
import styled from 'styled-components';

import SideNav from '../../components/side-nav/side-nav.component';

export default function LoggedInTemplatePage() {
    return (
        <LoggedInTemplateContainer>
            <SideNav />
            <MainContentContainer id="mujedd-root">
                <Outlet />
            </MainContentContainer>
        </LoggedInTemplateContainer>
    );
}

const LoggedInTemplateContainer = styled.div`
    display: flex;
    height: 100vh;
    width: 100%;
    position: relative;
    overflow-y: hidden;

    @media (max-width: 1024px) {
        flex-direction: column;
    }
`;

const MainContentContainer = styled.main`
    width: 100%;
    height: 100%;
    overflow-y: auto;
    flex: 1;
`;
