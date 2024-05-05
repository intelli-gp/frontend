import { isArray } from 'lodash';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { SwiperSlide } from 'swiper/react';

import { SwiperSliderContainer } from './swiper-slider.styles';

export type SwiperSliderProps = {
    children: React.ReactNode | React.ReactNode[];
};

export const SwiperSlider = ({ children }: SwiperSliderProps) => {
    return (
        <SwiperSliderContainer
            navigation={true}
            modules={[Navigation]}
            spaceBetween={15}
            slidesPerView={'auto'}
        >
            {isArray(children) ? (
                (children as React.ReactNode[])?.map((child, index) => (
                    <SwiperSlide
                        style={{ width: 'auto' }}
                        key={`carousel-child-${index}`}
                    >
                        {child}
                    </SwiperSlide>
                ))
            ) : (
                <SwiperSlide style={{ width: 'auto' }}>{children}</SwiperSlide>
            )}
        </SwiperSliderContainer>
    );
};
