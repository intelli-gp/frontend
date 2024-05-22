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
};

export const FeatureCard = ({
    image,
    title,
    description,
    className,
}: FeatureCardProps) => {
    return (
        <CardContainer className={className}>
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
