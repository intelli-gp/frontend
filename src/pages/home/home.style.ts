import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import image from '../../assets/imgs/Hero-illustration.svg';

type navType = {
    $navbarOpen: boolean;
};

export const PageContainer = styled(motion.div)`
    height: calc(100vh - 78px);
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

export const Sidebar = styled.div<navType>`
    position: fixed;
    right: 0;
    top: 0;
    width: 50%;
    height: 100vh;
    background-color: #e0e7ff;
    padding-top: 1.5rem;
    padding-bottom: 1.5rem;
    box-shadow: var(--tag-shadow);
    transition: all 0.3s ease-in;
    display: ${({ $navbarOpen }) => ($navbarOpen ? 'block' : 'none')};
    @media (min-width: 860px) {
    }
    @media (min-width: 1024px) {
        display: none;
    }
`;

export const MenuList = styled.ul`
    display: flex;
    flex-direction: column;
    width: 100%;
    font-weight: 500; /* Medium font weight */
    margin-top: 1rem; /* mt-4 */

    li {
        a {
            display: block;
            border-bottom: 1px solid var(--slate-300);
            padding: 0.5rem 2.5rem;
            color: var(--indigo-950);
            text-decoration: none;
            width: 100%;

            &:hover {
                background-color: var(--indigo-950);
                color: #ffffff;
            }
        }
        @media (min-width: 713px) {
            a {
                font-size: 1.2rem;
            }
        }
    }
`;

export const StyledLink = styled(Link)`
    border-bottom: 1px solid var(--slate-300);
    padding: 0.5rem 2.5rem;
    color: var(--indigo-950);
    text-decoration: none;

    &:hover {
        background-color: var(--indigo-950);
        color: #ffffff;
    }

    span {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 0.5rem;
    }
`;

export const FeaturesSection = styled.section`
    display: flex;
    justify-content: center;
    margin: auto;
    width: 100%;
    padding: 1.5rem;
    margin-top: 1rem;
    margin-bottom: 1rem;

    @media (min-width: 640px) {
        /* sm */
        padding-top: 0;
    }

    @media (min-width: 768px) {
        margin-top: 5rem;
        margin-bottom: 5rem;
        padding: 2.5rem;
    }
    & > div:first-child {
        display: grid;
        gap: 3rem;
        grid-template-columns: repeat(1, minmax(0, 1fr));
        width: 100%;
        align-content: center;

        @media (min-width: 768px) {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            padding: 1.5rem;
        }

        @media (min-width: 1280px) {
            width: 85%;
        }

        @media (min-width: 640px) {
            padding: 1.5rem;
        }
    }
`;

export const AISection = styled.section`
    padding-top: 3rem; /* py-12 */
    padding-bottom: 3rem; /* py-12 */
    width: 100%;
    display: flex;
    align-items: center;
    margin-top: 2rem;
    margin-bottom: 2rem;
    & > div:first-child {
        margin-left: auto;
        margin-right: auto;
        width: 83.333333%;
        padding-left: 2.5rem;
        padding-right: 2.5rem;
    }
`;

export const AIWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    justify-content: center;
    align-items: center;

    @media (min-width: 768px) {
        flex-direction: row;
        justify-content: center;
        align-items: center;
        gap: 4rem;
    }
`;

export const ImgContainer = styled.div`
    margin-top: 1.5rem;
    display: flex;
    justify-content: center;

    @media (min-width: 768px) {
        margin-top: 0;
        width: 41.666667%;
    }

    img {
        max-height: 500px;
        @media (min-width: 768px) {
            max-height: none;
        }
    }
`;

export const TextAIContainer = styled.div`
    width: 100%;
    padding-top: 3.5rem;
    padding-bottom: 3.5rem;
    text-align: center;

    @media (min-width: 768px) {
        width: 41.666667%;
        padding-left: 0;
        padding-right: 0;
    }

    @media (min-width: 1024px) {
        padding: 3rem;
    }

    @media (min-width: 640px) {
        text-align: left;
    }

    p {
        color: #718096;
        margin-bottom: 1.5rem;
        font-size: 0.975rem;
        max-width: 700px;
    }
`;

export const AItitle = styled.h1`
    font-weight: bold;
    color: var(--indigo-950);
    font-size: 1.8rem;
    margin-bottom: 0.5rem;

    @media (min-width: 640px) {
        margin-bottom: 2.5rem;
    }
`;

export const NavContainer = styled.nav`
    z-index: 50;
    width: 100%;
    background-color: var(--indigo-950);
    backdrop-filter: blur(10px);
    padding-top: 0.75rem;
    padding-bottom: 0.75rem;
`;

export const UpperContainer = styled.div`
    padding-left: 1.5rem;
    padding-right: 1.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100%;
    flex-wrap: wrap;

    @media (min-width: 1280px) {
        padding-left: 3rem;
        padding-right: 3rem;
    }
`;

export const Title = styled.h1`
    font-weight: 900;
    color: #ffffff;
    font-size: 2.25rem;
    position: sticky;
    top: 0;
    min-height: 0;
    display: flex;
    justify-content: center;
    font-family: Merriweather, serif;
    user-select: none;
`;

export const MenuTitles = styled.a`
    font-size: 0.875rem;
    font-weight: 500;
    color: #ffffff;
    margin-left: 2.5rem;

    @media (min-width: 1024px) {
        font-size: 1rem;
    }
`;

export const BlogsSection = styled.div`
    padding-top: 3rem;
    padding-bottom: 3rem;
    width: 100%;
    justify-content: center;
    align-items: center;
    background-color: #fafbff;
    min-height: calc(100vh - 64px);
    & > div:first-child {
        margin-left: 1rem;
        margin-right: 1rem;
        width: 100%;
        padding-left: 2rem;
        padding-right: 2rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        @media (min-width: 768px) {
            margin-left: auto;
            margin-right: auto;
        }
    }
`;

export const BlogsContainer = styled.div`
    display: grid;
    width: 92%;
    place-items: center;
    place-content: center;
    @media (min-width: 640px) {
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 1.5rem;
    }

    @media (min-width: 1024px) {
        grid-template-columns: repeat(3, minmax(0, 1fr));
        gap: 1.5rem;
    }

    @media (min-width: 1280px) {
        width: 80%;
    }
`;

export const BlogsTitle = styled.div`
    margin-bottom: 1.25rem;
    display: flex;
    flex-direction: column;
    align-items: center;

    h1 {
        font-size: 2rem;
        font-weight: bold;
        color: var(--indigo-950);
    }

    @media (min-width: 640px) {
        margin-bottom: 3rem;
        margin-top: 1.25rem;

        h1 {
            font-size: 1.875rem;
        }
    }
`;

export const HeroSection = styled.section`
    min-height: calc(100vh - 64px);
    width: 100%;
    display: flex;
    position: relative;
    justify-content: center;
    background: var(--indigo-50);
    height: calc(100vh - 64px);
    @media (min-width: 640px) {
        background-image: url(${image});
        background-repeat: no-repeat;
        background-position: center;
        height: auto;
        width: 100%;
        background-size: contain;
    }
`;

export const HeroContainer = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    padding-top: 1.25rem; /* py-5 */
    padding-bottom: 1.25rem; /* py-5 */
    justify-content: center;
    align-items: center;

    @media (min-width: 640px) {
        /* sm */
        justify-content: flex-start;
        align-items: flex-start;
    }
`;

export const HeroContent = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 83.333333%;
    padding-bottom: 1rem;
    padding-top: 4rem;

    @media (min-width: 640px) {
        /* sm */
        align-items: flex-start;
        width: 50%; /* sm:w-3/6 */
        padding-left: 4rem; /* sm:pl-[4rem] */
        position: absolute;
    }

    @media (min-width: 1024px) {
        /* lg */
        top: 18%; /* lg:top-[18%] */
    }

    @media (min-width: 1280px) {
        /* xl */
        left: 10%;
    }

    h1 {
        font-weight: bold;
        font-size: 1.875rem;
        color: var(--indigo-950);
        text-align: center;
        max-width: 520px;

        @media (min-width: 640px) {
            text-align: left;
        }

        @media (min-width: 1024px) {
            font-size: 3.125rem;
        }
    }

    p {
        color: #718096;
        margin-bottom: 2rem;
        font-size: 0.75rem;
        text-align: center;
        max-width: 500px;

        @media (min-width: 640px) {
            font-size: 0.75rem;
            text-align: left;
        }

        @media (min-width: 480px) {
            font-size: 1rem;
        }

        @media (min-width: 1024px) {
            font-size: 1.125rem;
        }
    }
`;
export const FeedbackSection = styled.section`
    padding-top: 3rem;
    padding-bottom: 3rem;
    width: 100%;
    padding-left: 1rem;
    padding-right: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: calc(100vh - 64px);

    @media (min-width: 640px) {
        width: 90%;
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

export const Body = styled(motion.div)`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: white;
`;

export const CarouselItem = styled.div<{ isActive: boolean }>`
    transition-duration: 700ms;
    transition-timing-function: ease-in-out;
    width: 100%;
    margin-top: 4rem;
    margin-bottom: 4rem;
    display: ${({ isActive }) => (isActive ? 'block' : 'none')};
`;

export const FeedbackCard = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: var(--indigo-900);
    color: white;
    border-radius: 1.5rem;
    box-shadow:
        0 10px 15px -3px rgba(0, 0, 0, 0.1),
        0 4px 6px -2px rgba(0, 0, 0, 0.05);
    min-height: 300px;
    width: 100%;
`;

export const ProfilePic = styled.img`
    width: 50px;
    height: 50px;
    border-radius: 9999px;

    @media (min-width: 768px) {
        width: 80px;
        height: 80px;
    }
`;

export const SlideIndicator = styled.button<{ isActive: boolean }>`
    width: 0.75rem;
    height: 0.75rem;
    border-radius: 50%;
    margin-top: 1.5rem;
    background-color: ${({ isActive }) => (isActive ? '#5a67d8' : '#e2e8f0')};
`;

export const ButtonRight = styled.button`
    display: flex;
    position: absolute;
    top: 0;
    right: 0;
    z-index: 30;
    justify-content: center;
    align-items: center;
    padding: 0 1rem;
    height: 100%;
    cursor: pointer;
    &:focus {
        outline: none;
    }
`;

export const BodySpan = styled.span`
    display: inline-flex;
    justify-content: center;
    align-items: center;
    width: 2rem;
    height: 2rem;
    border-radius: 9999px;
    background-color: rgba(75, 85, 99, 0.3);

    &:hover {
        background-color: rgba(75, 85, 99, 0.5);
    }

    @media (min-width: 640px) {
        width: 2.5rem;
        height: 2.5rem;
    }
`;

export const ButtonLeft = styled.button`
    display: flex;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 30;
    justify-content: center;
    align-items: center;
    padding: 0 1rem;
    height: 100%;
    cursor: pointer;
    &:focus {
        outline: none;
    }
`;
