import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';

import image from '../../assets/imgs/Hero-illustration.svg';
import Button from '../../components/button/button.component';
import EnhancedImage from '../../components/image/image.component';

export const NAV_HEIGHT = 54; // px
const SECTION_HEIGHT = `calc(100vh - ${NAV_HEIGHT}px)`;

const commonSectionStyles = css`
    padding: 2rem 1rem;
    min-height: ${SECTION_HEIGHT};
`;

export const PageContainer = styled(motion.div)`
    overflow-y: auto;
    &::-webkit-scrollbar-track {
        background: rgba(0, 0, 0, 0.05);
    }
    &::-webkit-scrollbar-thumb {
        border-radius: 0;
        background: var(--indigo-950);
    }
    &::-webkit-scrollbar-thumb:hover {
        background: var(--indigo-950);
    }
`;

export const PageBody = styled(motion.div)`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 2rem;
`;

export const NavOuterContainer = styled.nav`
    width: 100%;
    position: sticky;
    top: 0;
    z-index: 50;
    padding: 0.25rem 2.5rem;
    background-color: rgba(30, 27, 75, 0.9);
    backdrop-filter: blur(10px);
`;

export const HorizontalNavLinksContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 1rem;

    @media (max-width: 1024px) {
        display: none;
    }
`;

export const NavInnerContainer = styled.div`
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

export const HomeSideNav = styled.div<{ isOpen?: boolean }>`
    position: fixed;
    top: 0;
    width: 300px;
    height: 100vh;
    z-index: 100;
    background-color: rgba(30, 27, 75, 0.9);
    backdrop-filter: blur(10px);
    color: white;
    padding-top: 1.5rem;
    padding-bottom: 1.5rem;
    transition: all 0.2s ease-in-out;
    right: ${({ isOpen }) => (isOpen ? '0' : '-100%')};
    @media (min-width: 1024px) {
        display: none;
    }
`;

export const NavLink = styled(Link)<{ active?: boolean }>`
    font-weight: 500;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    opacity: ${({ active }) => (active ? 1 : 0.75)};
    padding: 0.25rem 1rem;
    border-radius: 0.5rem;

    background-color: ${({ active }) =>
        active ? 'rgba(255, 255, 255, 0.2)' : 'transparent'};

    transition: all 0.2s ease-in-out;
    &:hover {
        opacity: 1;
    }
`;

export const HomeSideNavItemsContainer = styled.ul`
    display: flex;
    flex-direction: column;
    width: 100%;
    font-weight: 500;
    margin-top: 1rem;
`;

export const BrandName = styled.h1`
    font-weight: 900;
    color: white;
    font-size: 2.25rem;
    position: sticky;
    top: 0;
    min-height: 0;
    display: flex;
    justify-content: center;
    font-family: Merriweather, serif;
    user-select: none;
`;

export const StyledLink = styled(Link)<{ active?: boolean }>`
    border-bottom: 1px solid rgba(255, 255, 255, 0.25);
    background-color: ${({ active }) =>
        active ? 'rgba(255, 255, 255, 0.15)' : 'transparent'};
    padding: 1rem 2rem;
    color: white;
    text-decoration: none;
    transition: all 0.2s ease-in-out;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    &:hover {
        background-color: rgba(255, 255, 255, 0.15);
    }
`;

export const HeroSection = styled.section`
    width: 100%;
    display: flex;
    align-items: center;
    background: var(--indigo-50);
    background-image: url(${image});
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
    @media (max-width: 1024px) {
        justify-content: center;
    }
    ${commonSectionStyles}
`;

export const HeroContent = styled.div`
    display: flex;
    flex-direction: column;
    padding: 1rem;
    justify-content: center;
    width: min(600px, 90%);

    @media (min-width: 1024px) {
        transform: translateX(25%);
    }
`;

export const SectionTitle = styled.h1`
    font-size: 2.5rem;
    line-height: 0.9;
    margin-bottom: 0.75rem;
    letter-spacing: -2px;
    font-weight: 700;

    @media (min-width: 768px) {
        font-size: 3.5rem;
    }
`;

export const SectionRegularText = styled.p`
    font-size: 1.125rem;
    color: var(--gray-700);
`;

export const AISection = styled.section`
    background-color: var(--indigo-50);
    padding: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    ${commonSectionStyles}
`;

export const AISectionWrapper = styled.div`
    width: min(1440px, 100%);
    gap: 4rem;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
    @media (max-width: 768px) {
        flex-direction: column;
        padding: 3rem;
        gap: 2rem;
    }
    @media (max-width: 425px) {
        padding: 1.5rem;
    }
`;

export const AiImage = styled(EnhancedImage)`
    width: 50%;
    aspect-ratio: 4/3;
    flex-shrink: 0;
    @media (max-width: 768px) {
        width: 100%;
    }
`;

export const JoinButton = styled(Button)`
    box-shadow: 0px 0px 15px 10px rgba(72, 187, 120, 0.2);
    margin-top: 1.5rem;
    width: min(300px, 100%);
    font-size: 1.125rem;
    font-weight: 700;
    align-self: center;
`;

export const FeaturesSection = styled.section`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    ${commonSectionStyles}
`;

export const FeaturesWrapper = styled.div`
    width: min(1440px, 100%);
    margin: 0 auto;
    padding: 2rem;
    display: grid;
    gap: 2rem;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    @media (max-width: 1024px) {
        grid-template-columns: repeat(1, minmax(0, 1fr));
    }
`;

export const BlogsSection = styled.div`
    width: min(1440px, 100%);
    justify-content: center;
    align-items: center;
    display: flex;
    flex-direction: column;
    gap: 3rem;
    ${commonSectionStyles}
`;

export const PricingSection = styled.section`
    background-color: var(--indigo-50);
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 3rem;
    ${commonSectionStyles}
`;

export const PricesHolder = styled.div`
    display: flex;
    justify-content: center;
    gap: 3rem;
    @media (max-width: 768px) {
        flex-direction: column;
    }
`;

export const HomePageFooter = styled.footer`
    background-color: rgba(30, 27, 75);
    backdrop-filter: blur(10px);
    display: flex;
    flex-direction: column;
    gap: 1rem;
    align-items: center;
    justify-content: center;
    padding: 4rem;
`;

export const FooterNav = styled.ul`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 1.5rem;

    @media (min-width: 768px) {
        gap: 2rem;
    }

    @media (min-width: 1024px) {
        margin-top: 0;
        justify-content: flex-end;
        gap: 3rem;
    }
`;

export const FooterLink = styled.a`
    color: #e5e7eb;
    transition: color 0.3s;
    font-size: 1.2rem;
    transition: all 0.1s ease-in-out;

    &:hover {
        color: rgba(229, 231, 235, 0.75);
    }
`;

export const CopyRightText = styled.p`
    text-align: center;
    font-size: 0.875rem;
    color: #e5e7eb;

    @media (min-width: 1024px) {
        text-align: right;
    }
`;
