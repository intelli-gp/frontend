import emptySearchImage from '../../assets/imgs/empty-search.svg';
import noDataImage from '../../assets/imgs/no-data.svg';
import {
    EmptyVectorButton,
    EmptyVectorContainer,
    EmptyVectorImage,
    EmptyVectorText,
} from './empty-placeholder.styles';

type EmptyVectorProps = {
    variant: 'empty-search' | 'no-data';
    text: string;
    /**
     * If passed, a button will be rendered.
     */
    button?: {
        text: string;
        path?: string;
        onClick?: () => void;
    };
};

const EmptyPagePlaceholder = ({ variant, text, button }: EmptyVectorProps) => {
    
    const getImage = () => {
        switch (variant) {
            case 'empty-search':
                return emptySearchImage;
            case 'no-data':
                return noDataImage;
            default:
                return emptySearchImage;
        }
    };

    return (
        <EmptyVectorContainer>
            <EmptyVectorImage
                src={getImage()}
                alt="illustration"
                transparentPlaceholder
            />
            <EmptyVectorText>{text}</EmptyVectorText>
            {button && (
                <EmptyVectorButton
                    to={button?.path ?? '#'}
                    onClick={button?.onClick}
                >
                    {button.text}
                </EmptyVectorButton>
            )}
        </EmptyVectorContainer>
    );
};

export default EmptyPagePlaceholder;
