import SingleBlog from '../../components/SingleBlog';

export default function BlogSection() {
    return (
        <section className="py-12 md:py-8  w-full bg-bgColor  flex justify-center items-center min-h-[calc(100vh-64px)]">
            <div className="md:mx-auto mx-[1rem] w-full px-8 md:px-3 flex flex-col justify-center items-center">
                <div className="mb-5 sm:mb-12 sm:mt-5">
                    <h1 className="text-2xl font-bold text-txt md:text-3xl">
                        From Our Latest Blogs
                    </h1>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3  lg:gap-x-6  w-[92%] xl:w-[80%] sm:gap-x-6  place-items-center place-content-center">
                    <SingleBlog />
                    <SingleBlog />
                    <SingleBlog />
                </div>
            </div>
        </section>
    );
}
