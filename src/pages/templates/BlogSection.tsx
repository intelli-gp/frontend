import SingleBlog from '../../components/SingleBlog';

export default function BlogSection() {
    return (
        <section className="py-16 w-full bg-bgColor">
            <div className="mx-auto w-5/6 px-8 md:px-6">
                <div className="mb-5 sm:mb-10">
                    <h1 className="text-2xl font-bold text-txt md:text-3xl">
                        From Our Latest Blogs
                    </h1>
                </div>
                <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:gap-10">
                    <SingleBlog />
                    <SingleBlog />
                    <SingleBlog />
                </div>
            </div>
        </section>
    );
}
