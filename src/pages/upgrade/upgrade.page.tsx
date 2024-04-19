import { SetStateAction, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from '../../components/button/button.component';
import { BetweenPageAnimation } from '../../index.styles';
import {
    ButtonsHolder,
    CardHolder,
    CardsHolder,
    Check,
    PageContainer,
    UpgradeButton,
    UpgradeTitle,
} from './upgrade.styles';


type Type = {
    type: string;
    price: number;
    middle: boolean;
    para: string[];
    payment: string;
};

const Card = ({ el }: { el: Type }) => {
    const navigate = useNavigate();

    return (
        <CardHolder>
            <div>
                <h2 className="font-bold text-[var(--indigo-950)]">{el.type}</h2>
                <span>
                    <h1 className="font-extrabold text-[32px]  text-[var(--indigo-950)]">{el.price}$</h1>
                    <p>/{el.payment} </p>
                </span>
                <ul className="text-sm text-[var(--slate-800)] p-4 ">
                    {el.para.map((sentence) =>
                    <span className='relative pl-4 mb-2'>
                        <Check/>
                        <li>{sentence}</li>
                    </span>     
                    )}
                </ul>
            </div>
           {el.type!=='Free'? <UpgradeButton
                onClick={() => navigate(`/app/checkout`)}
            >
                Get Started Now
            </UpgradeButton>:<></>}
        </CardHolder>
    );
};

const UpgradePage = () => {
    const [selectedPlan, setSelectedPlan] = useState('Monthly');

    const handleButtonClick = (plan: SetStateAction<string>) => {
        setSelectedPlan(plan);
    };

    const subscriptionPlans: Type[] = [
        {
            type: "Free",
            price: 0,
            middle: false,
            para: [
                "Tailor and design personalized study plans.",
                "Find and collaborate with study groups.",
                "Receive personalized course recommendations based on your progress and interests.",
                "Get assistance from chatbot helper for up to 3 questions per month."
            ],
            payment: selectedPlan
        },
        {
            type: "Premium",
            price: selectedPlan === 'Yearly' ? (10 * 12 ): 10,
            middle: true,
            para: [
                "Enjoy all the features included in the Free Plan.",
                "Utilize chatbot helper for up to 10 questions per month.",
                "Receive 2 personalized study plans per month, carefully crafted by our AI."
            ],
            payment: selectedPlan
        },
        {
            type: "VIP",
            price: selectedPlan === 'Yearly' ? (15 * 12 ): 15,
            middle: false,
            para: [
                "Enjoy all the features included in the Premium Plan.",
                "Unlock unlimited personalized study plans, carefully crafted by our AI.",
                "Enjoy unlimited access to the chatbot helper feature.",
            ],
            payment: selectedPlan
        }
    ];
    return (
        <PageContainer {...BetweenPageAnimation}>
            <UpgradeTitle>Find the plan that suits you </UpgradeTitle>
            <ButtonsHolder>
                <Button
                    select="primary500"
                    className={`!w-[50%] !rounded-[15px] !py-[10px] ${selectedPlan === 'Monthly'
                        ? ''
                        : '!text-[var(--indigo-950)]'
                        }`}
                    outline={selectedPlan !== 'Monthly'}
                    onClick={() => handleButtonClick('Monthly')}
                >
                    Monthly
                </Button>
                <Button
                    select="primary500"
                    className={`!rounded-[15px] !py-[10px] !w-[50%] ${selectedPlan === 'Yearly'
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
                {subscriptionPlans.map((plan) => {
                    if (plan.middle) {
                        return (
                            <div className="lg:pb-16 pt-8 flex flex-col justify-center items-center relative ">
                                <div className="absolute top-[2%] z-30 rounded-2xl bg-[#F9F8C1] py-2 font-bold px-[12px] text-xs border-[2px] border-[var(--indigo-950)]  text-[var(--indigo-950)]">
                                    Most Popular
                                </div>
                                <Card el={plan} />
                            </div>
                        );
                    } else {
                        return <Card el={plan} />;
                    }
                })}
            </CardsHolder>
        </PageContainer>
    );
};
export default UpgradePage;
