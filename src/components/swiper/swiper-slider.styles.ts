import styled from 'styled-components';
import { Swiper } from 'swiper/react';

export const SwiperSliderContainer = styled(Swiper)`
    width: 100%;
    padding: 1rem;

    .swiper-button-next,
    .swiper-button-prev {
        &:after {
            color: white;
            font-size: 1.35rem;
            font-weight: 900;
            display: flex;
            align-items: center;
            justify-content: center;
        }
    }

    .swiper-button-next,
    .swiper-button-prev {
        border-radius: 0.25rem;
        box-sizing: content-box;
        height: 3rem;
        width: calc(3rem / 1.681);
        background-color: rgba(49, 46, 129, 0.65); // indigo-900
        transition: all 0.2s ease-in-out;
        &:hover {
            background-color: rgba(49, 46, 129, 0.85); // indigo-900
        }
    }

    .swiper-button-next {
        right: 0;
    }

    .swiper-button-prev {
        left: 0;
    }

    .swiper-button-prev.swiper-button-disabled,
    .swiper-button-next.swiper-button-disabled {
        display: none !important;
    }
`;
