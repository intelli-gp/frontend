import { AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

import {
    ArrowBack,
    ArrowDown,
    ItemContainer,
    MainItemContent,
    SubItemLink,
    SubItemsContainer,
} from './sidenav-item.styles';

export type SideNavItemProps = {
    id: number;
    /**
     * The text to display
     */
    text: string;
    /**
     * Icon to display on the left of the text
     */
    icon?: JSX.Element;
    /**
     * The route to go to when clicking the item
     */
    path: string;
    /**
     * Is item is active
     */
    active?: boolean;
} & (Extendable | Partial<Extendable>);

type Extendable = {
    extendable: boolean;
    extended: boolean;
    subItems: SubItemProps[];
    toggleExtend: (event: React.MouseEvent) => void;
};

export type SubItemProps = Pick<
    SideNavItemProps,
    'text' | 'id' | 'active' | 'path' | 'icon'
>;

export default function SideNavItem({
    icon,
    path,
    text,
    active,
    extendable,
    extended,
    subItems,
    toggleExtend,
}: Omit<SideNavItemProps, 'id'>) {
    const navigate = useNavigate();

    const handleClickExtendableItem = (event: React.MouseEvent) => {
        if (subItems && subItems[0]) {
            event.preventDefault();
            navigate(subItems[0].path);
        }
    };

    return (
        <ItemContainer to={path} active={active}>
            <MainItemContent onClick={handleClickExtendableItem}>
                {icon}
                {text}
                {extendable && extended ? (
                    <ArrowDown onClickCapture={toggleExtend} size={20} />
                ) : (
                    extendable && (
                        <ArrowBack onClickCapture={toggleExtend} size={20} />
                    )
                )}
            </MainItemContent>

            <AnimatePresence>
                {extended && (
                    <SubItemsContainer>
                        {subItems?.map((item) => {
                            return (
                                <SubItemLink
                                    key={item.path}
                                    to={item.path}
                                    active={item.active}
                                >
                                    {item.icon} {item.text}
                                </SubItemLink>
                            );
                        })}
                    </SubItemsContainer>
                )}
            </AnimatePresence>
        </ItemContainer>
    );
}
