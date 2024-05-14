import { useNavigate } from 'react-router-dom';
import { BetweenPageAnimation } from '../../index.styles';
import {
    CardHolder,
    CardsHolder,
    Check,
    PageContainer,
    UpgradeButton,
    UpgradeTitle,
    UpperCardPart,
} from './upgrade.styles';

type Type = {
    id: number;
    type: string;
    price: number;
    para: string[];
    payment: string;
    myPlan?: boolean;
};

const Card = ({ el }: { el: Type }) => {
    const navigate = useNavigate();


    return (
        <CardHolder Pro={el.type === 'Pro'}>
            <div>
                <UpperCardPart>
                    <h2 className=" text-[42px]">
                        {el.type}
                    </h2>
                    <span>
                        <h1 className="font-extrabold text-[38px]">
                            {el.price}$
                        </h1>
                        <p>/{el.payment} </p>
                    </span>
                </UpperCardPart>
                <ul className="text-lg p-4 ">
                    {el.para.map((sentence) => (
                        <div className=" pb-2  pl-6 relative w-[100%] ">
                            <Check />
                            <li>{sentence}</li>
                        </div>
                    ))}
                </ul>
            </div>
            {el.type == 'Free' ? (
                <></>
            ) :
                <span className='flex w-[100%] justify-center'>

                    <UpgradeButton onClick={() => navigate(`/app/checkout`)}>
                        Get Started Now
                    </UpgradeButton>
                </span>
            }
        </CardHolder>
    );
};

const UpgradePage = () => {

    const subscriptionPlans: Type[] = [
        {
            id: 1,
            type: 'Free',
            price: 0,
            para: [
                'Tailor and design personalized study plans.',
                'Find and collaborate with study groups.',
                'Receive personalized course recommendations based on your progress and interests.',
                'Get assistance from chatbot helper for up to 3 questions per month.',
            ],
            payment: "Monthly",
        },
        {
            id: 2,
            type: 'Pro',
            price: 12,
            para: [
                'Enjoy all the features included in the Free Plan.',
                'Enjoy unlimited access to the chatbot helper feature.',
                'Enjoy all the features included in the Free Plan.',
                'Enjoy unlimited access to the chatbot helper feature.',
            ],
            payment: 'Monthly',
            myPlan: true,
        },

    ];
    return (
        <PageContainer {...BetweenPageAnimation}>
            <UpgradeTitle>
                Find the plan that suits you the best
            </UpgradeTitle>
            <CardsHolder>
                {subscriptionPlans.map((plan) => {
                    return <Card el={plan} />;

                })}
            </CardsHolder>
        </PageContainer>
    );
};
export default UpgradePage;
