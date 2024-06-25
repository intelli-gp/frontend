import articleFallback from '../../assets/imgs/article-fallback.svg';
import groupFallback from '../../assets/imgs/fallback-group-2.png';
import userFallback from '../../assets/imgs/user.jpg';
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

    /**
     * @default 'cover'
     */
    objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';

    /**
     * Fallback type for the image
     */
    fallbackType?: 'user' | 'article' | 'group';
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
    objectFit = 'cover',
    fallbackType,
}: EnhancedImageProps) => {
    return (
        <ImageContainer className={className}>
            <Image
                src={src ?? 'invalid image'}
                alt={alt ?? ''}
                objectFit={objectFit}
                onError={(e: ImageErrorEvent) => {
                    switch (fallbackType) {
                        case 'user':
                            e.currentTarget.src = userFallback;
                            break;
                        case 'article':
                            e.currentTarget.src = articleFallback;
                            break;
                        case 'group':
                            e.currentTarget.src = groupFallback;
                            break;
                        default:
                            e.currentTarget.src =
                                'https://via.placeholder.com/150';
                    }
                }}
            />
            <Placeholder transparent={transparentPlaceholder} />
        </ImageContainer>
    );
};

export default EnhancedImage;
