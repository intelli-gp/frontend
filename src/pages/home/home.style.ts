import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import image from '../../assets/imgs/Hero-illustration.svg';
import { FaCircleCheck } from 'react-icons/fa6';

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
    top: 0;
    width: 300px;
    height: 100vh;
    background-color: #e0e7ff;
    padding-top: 1.5rem;
    padding-bottom: 1.5rem;
    transition: all 0.3s ease-in-out;
    right: ${({ $navbarOpen }) => ($navbarOpen ? '0' : '-100%')};

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
            transition: all 0.1s ease-in-out;

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
    transition: all 0.2s ease-in-out;

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
    position: relative;
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

  
        font-size: 2rem;
        font-weight: bold;
        color: var(--indigo-950);
    

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
export const PricingSection = styled.section`
    padding: 2.5rem;
    width: 100%;
    display: flex;
    flex-direction:column;
    align-items: center;
    justify-content: center;
    min-height: calc(100vh - 64px);
   gap:2.4rem;
`;
export const PricesHolder = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 17px;
    gap: 2.5rem;
    @media (max-width: 868px) {
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

export const Body = styled(motion.div)`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: white;
`;


export const PricingTitle = styled.div`
    margin-bottom: 1.25rem;
    align-items: center;
    font-size: 2rem;
    font-weight: bold;
    color: var(--indigo-950);`
    export const CardsHolder = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 17px;
    gap: 2.75rem;
    @media (max-width: 868px) {
        flex-direction: column;
    }
`;

export const CardHolder = styled.div<{ Pro?: boolean }>`
    display: flex;
    padding: 20px;
    position: relative;
    justify-content: space-between;
    box-sizing: border-box;
    width: 500px;
    height: 325px;
    background:${({ Pro }) => (Pro ? 'var(--indigo-300)' : 'var(--indigo-50)')};
    border: 2px solid rgba(82, 82, 82, 0.27);
    box-shadow: var(--gray-shadow);
    color:var(--indigo-950);
    border-radius: 12px;   
    transition: all 0.2s ease-in-out;
 
    &:hover {
        transform: scale(0.95);
    }
`;
export const PricingList = styled.ul`
    font-size: 1rem;
    border-left: 3px solid var(--indigo-950);
    padding: 1rem 1.25rem;
    flex: 1;
`;
export const Check = styled(FaCircleCheck)`
    position: absolute;
    left: 0;
    top: 10%;
    color:var(--indigo-950);
`;