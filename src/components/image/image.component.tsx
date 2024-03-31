import { Image, ImageContainer, Placeholder } from './image.styles';

type EnhancedImageProps = {
    src: string;
    alt: string;
    /**
     * class for image container
     */
    className?: string;

    /**
     * class for image itself
     */
    imageClassName?: string;
    
};

/**
 * This component is a regular image but it has a placeholder that will be shown
 * until the image is loaded.
 */
const EnhancedImage = ({
    src,
    alt,
    className,
}: EnhancedImageProps) => {
    return (
        <ImageContainer className={className}>
            <Image src={src} alt={alt} />
            <Placeholder />
        </ImageContainer>
    );
};

export default EnhancedImage;
