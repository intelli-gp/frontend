import { Variants } from 'framer-motion';
import {
    CardContainer,
    CardDescription,
    CardImage,
    CardTextContainer,
    CardTitle,
} from './feature-card.styles';

type FeatureCardProps = {
    image: string;
    title: string;
    description: string;
    className?: string;
    xenter: number;

};

export const FeatureCard = ({
    image,
    title,
    description,
    className,
    xenter
}: FeatureCardProps) => {
    const cardVariants: Variants = {
        offscreen: {
            x: xenter,             
        },
        onscreen: {
            x: 0,
            transition: {
                type: "spring",
                delay: 0.1,
                stiffness:100,
                ease:'easeOut',
                duration:0.8
            }
        }
    };
    return (
        <CardContainer
            initial="offscreen"
            whileInView="onscreen"
            variants={cardVariants}
            className={className}>
            <CardTextContainer>
                <CardTitle>{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
            </CardTextContainer>
            <CardImage
                src={image}
                alt="feature icon"
                transparentPlaceholder
                objectFit="contain"
            />
        </CardContainer>
    );
};
