import styled from 'styled-components';
import { Swiper } from 'swiper/react';

export const SwiperSliderContainer = styled(Swiper)`
    width: 100%;
    /* overflow: visible; */
    padding: 0 4rem 0 0;
    /* padding: 2rem 2rem; */
    .swiper-wrapper {
        /* overflow: hidden; */
    }
    .swiper-button-next {
        right: 10px;
    }
    .swiper-button-prev {
        left: 10px;
    }
    .swiper-button-next,
    .swiper-button-prev {
        border-radius: 50%;
        background-color: #000;
        width: 3rem;
        height: 3rem;
        background-color: rgba(252, 213, 63, 0.3);
        font-size: 1rem;
        display: flex;
        justify-content: center;
        align-items: center;
        transition: all 0.3s;
        &:hover {
            background-color: rgba(252, 213, 63, 0.7);
        }
    }

    .swiper-button-next::after,
    .swiper-button-prev::after {
        font-size: 1.5rem;
        color: var(--gray-800);
    }

    .swiper-button-prev.swiper-button-disabled {
        display: none !important;
        /* border: 1px solid red; */
    }
`;
