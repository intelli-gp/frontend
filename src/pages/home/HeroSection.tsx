export default function Hero() {
    return (
        <section className="bg-bgColor min-h-[calc(100vh-64px)] w-full  flex  justify-center">
            <div className="flex w-full h-full py-5 justify-center items-center sm:justify-start sm:items-start background">
                <div className=" flex flex-col  justify-center items-center sm:items-start sm:w-3/6 w-5/6 sm:pl-[4rem] pb-4 pt-[4rem] sm:absolute  lg:top-[18%] xl:left-[10%]">
                    <h1 className="font-bold  lg:text-4xl sm:text-2xl text-2xl xs:text-3xl text-txt sm:text-left text-center  max-w-[520px] ">
                        Turn Your Ambition Into
                        <br />
                        Success Story.
                    </h1>
                    <br />
                    <p className="text-slate-500 mb-8 max-w-[500px]  lg:text-lg  sm:text-[12px] xs:text-[16px]  sm:text-left text-center">
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
