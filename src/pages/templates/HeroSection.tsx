import Hero from '../../assets/imgs/Hero-illustration.svg';
export default function HeroSection() {
    return (
        <section className="bg-bgColor w-full  flex  justify-center py-16 lg:pt-[80px]">
            <div className="flex w-5/6  py-4">
                <img className="w-full" src={Hero} />
                <div className="absolute top-15 left-13 py-10">
                    <p className="font-bold 3xl:text-6xl xl:text-5xl text-4xl xs:text-2xl text-txt">
                        Turn Your Ambition Into
                        <br />
                        Success Story.
                    </p>
                    <br />
                    <br />
                    <p className="text-slate-500 mb-8 max-w-[500px] text-base">
                        In our student platform, we designed features to support
                        and enhance your educational journey, enabling you to
                        thrive academically. Join us today and unlock your
                        academic potential.
                    </p>
                </div>
            </div>
        </section>
    );
}
