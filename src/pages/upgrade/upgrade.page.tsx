import { SetStateAction, useEffect, useState } from 'react';

import Button from '../../components/button/button.component';
import { BetweenPageAnimation } from '../../index.styles';
import {
    ButtonsHolder,
    CardHolder,
    CardsHolder,
    PageContainer,
    UpgradeButton,
    UpgradeTitle,
} from './upgrade.styles';

type Type = {
    type: string;
    price: number;
    middle: boolean;
    para: string;
    payment: string;
};

const Card = ({ el }: { el: Type }) => {
    return (
        <CardHolder>
            <div>
                <h2 className="font-bold">{el.type}</h2>
                <span>
                    <h1 className="font-extrabold text-[32px]">{el.price}$</h1>
                    <p>/{el.payment} </p>
                </span>
                <p className="text-sm">lorem ipsum lorem ipsum</p>
            </div>
            <UpgradeButton
                type="button"
                className={` ${
                    el.middle
                        ? 'bg-[#F9F8C1] hover:opacity-[0.9] border border-[1px] border-black'
                        : 'bg-[var(--gray-400)] hover:bg-gray-400/90'
                } `}
            >
                Get Started Now
            </UpgradeButton>
        </CardHolder>
    );
};

const UpgradePage = () => {
    const [selectedPlan, setSelectedPlan] = useState('Monthly');

    const handleButtonClick = (plan: SetStateAction<string>) => {
        setSelectedPlan(plan);
    };

    useEffect(() => {
        setSelectedPlan('Monthly');
    }, []);

    return (
        <PageContainer {...BetweenPageAnimation}>
            <UpgradeTitle>Find the plan that suit you the best</UpgradeTitle>
            <ButtonsHolder>
                <Button
                    type="button"
                    select="primary500"
                    className={`!w-[50%] !rounded-[15px] !py-[10px] ${
                        selectedPlan === 'Monthly'
                            ? ''
                            : '!text-[var(--indigo-950)]'
                    }`}
                    outline={selectedPlan !== 'Monthly'}
                    onClick={() => handleButtonClick('Monthly')}
                >
                    Monthly
                </Button>
                <Button
                    type="button"
                    select="primary500"
                    className={`!rounded-[15px] !py-[10px] !w-[50%] ${
                        selectedPlan === 'Yearly'
                            ? ''
                            : '!text-[var(--indigo-950)]'
                    }`}
                    outline={selectedPlan !== 'Yearly'}
                    onClick={() => handleButtonClick('Yearly')}
                >
                    Yearly
                </Button>
            </ButtonsHolder>
            <CardsHolder>
                <Card
                    el={{
                        type: 'Free',
                        price: 0,
                        middle: false,
                        para: '',
                        payment: selectedPlan,
                    }}
                />
                <div className="lg:pb-16 pt-8 flex flex-col justify-center items-center relative ">
                    <div className="absolute top-[2%] z-30 rounded-2xl bg-[#F9F8C1] py-2 px-[12px] text-xs border-[1px] border-black">
                        Most Popular
                    </div>
                    <Card
                        el={{
                            type: 'Premium',
                            price: 20,
                            middle: true,
                            para: '',
                            payment: selectedPlan,
                        }}
                    />
                </div>
                <Card
                    el={{
                        type: 'VIP',
                        price: 50,
                        middle: false,
                        para: '',
                        payment: selectedPlan,
                    }}
                />
            </CardsHolder>
        </PageContainer>
    );
};
export default UpgradePage;
