import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';

import image from '../../assets/imgs/Hero-illustration.svg';
import Button from '../../components/button/button.component';
import EnhancedImage from '../../components/image/image.component';

const SECTION_HEIGHT = 'calc(100vh - 70px)';

const commonSectionStyles = css`
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

    .swiper-button-next,
    .swiper-button-prev {
        &:after {
            background-color: var(--gray-800);
            aspect-ratio: 1/1;
            width: 32px;
            height: 52px;
            color: var(--gray-100);
            padding: 0.25rem;
            font-size: 1.5rem;
            font-weight: 900;
            border-radius: 0.5rem;
            box-sizing: content-box;
            display: flex;
            align-items: center;
            justify-content: center;
        }
    }

    .swiper-button-next {
        right: 2.5px !important;
    }

    .swiper-button-prev {
        left: 2.5px !important;
    }
`;

export const PageBody = styled(motion.div)`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 2rem;
`;

export const NavContainer = styled.nav`
    position: sticky;
    top: 0;
    z-index: 50;
    width: 100%;
    background-color: var(--indigo-950);
    padding: 0.5rem 2rem;
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
    background-color: var(--indigo-950);
    color: white;
    padding-top: 1.5rem;
    padding-bottom: 1.5rem;
    transition: all 0.2s ease-in-out;
    right: ${({ isOpen }) => (isOpen ? '0' : '-100%')};
    @media (min-width: 1024px) {
        display: none;
    }
`;

export const HomeSideNavLink = styled.a`
    font-size: 0.875rem;
    font-weight: 500;
    color: #ffffff;
    margin-left: 2.5rem;

    @media (min-width: 1024px) {
        font-size: 1rem;
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

export const StyledLink = styled(Link)`
    border-bottom: 1px solid rgba(255, 255, 255, 0.25);
    padding: 1rem 2rem;
    color: white;
    text-decoration: none;
    transition: all 0.2s ease-in-out;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    &:hover {
        background-color: var(--indigo-950);
        color: #ffffff;
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
    padding: 2.5rem;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 3rem;
    height: calc(100vh - 64px);
`;

export const PricesHolder = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 3rem;
    @media (max-width: 768px) {
        flex-direction: column;
    }
`;

export const StyledFooter = styled.footer`
    background-color: #0d062d;
`;

export const FooterContainer = styled.div`
    position: relative;

    max-width: max-screen-xl;
    padding: 4rem 7rem;
    display: grid;
    grid-template-columns: repeat(1, minmax(0, 1fr));
    gap: 1rem;
    align-content: space-between;

    @media (max-width: 640px) {
        padding-left: 1.5rem;
    }

    @media (min-width: 1024px) {
        padding-top: 6rem;
    }
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
    margin-top: 5rem;
    text-align: center;
    font-size: 1rem;
    color: #e5e7eb;

    @media (min-width: 1024px) {
        text-align: right;
    }
`;

export const IconContainer = styled.div`
    margin-top: 5rem;
    display: flex;
    justify-content: right;
    height: 2rem;
`;

export const PricingList = styled.ul`
    font-size: 1rem;
    border-left: 3px solid var(--indigo-950);
    padding: 1rem 1.25rem;
    flex: 1;
`;
