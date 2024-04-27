import { Image, ImageContainer, Placeholder } from './image.styles';

type EnhancedImageProps = {
    src?: string;
    alt?: string;
    /**
     * class for image container
     */
    className?: string;

    /**
     * class for image itself
     */
    imageClassName?: string;

    transparentPlaceholder?: boolean;
};

type ImageErrorEvent = React.SyntheticEvent<HTMLImageElement, Event>;

/**
 * This component is a regular image but it has a placeholder that will be shown
 * until the image is loaded.
 */
const EnhancedImage = ({
    src,
    alt,
    className,
    transparentPlaceholder = false,
}: EnhancedImageProps) => {
    return (
        <ImageContainer className={className}>
            <Image
                src={src}
                alt={alt ?? ''}
                onError={(e: ImageErrorEvent) => {
                    // TODO: may want to change placeholder to a default image
                    e.currentTarget.src = 'https://via.placeholder.com/150';
                }}
            />
            <Placeholder transparent={transparentPlaceholder} />
        </ImageContainer>
    );
};

export default EnhancedImage;
