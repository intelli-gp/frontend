import { ButtonContainer, ButtonToggler } from './toggle-button.styles';

type ToggleButtonProps = {
    isOn: boolean;
    toggle: () => void;
    size?: 'sm' | 'md' | 'lg';
};
export const ToggleButton = ({ isOn, toggle, size }: ToggleButtonProps) => {
    return (
        <ButtonContainer
            title={isOn ? 'Turn off' : 'Turn on'}
            isOn={isOn}
            data-is-on={isOn}
            onClick={toggle}
            size={size}
        >
            <ButtonToggler
                layout
                transition={{
                    type: 'spring',
                    stiffness: 900,
                    damping: 50,
                }}
            />
        </ButtonContainer>
    );
};

export default ToggleButton;
