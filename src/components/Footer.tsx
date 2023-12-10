export default function Footer() {
    return (
        <footer className="bg-txt">
            <div className="relative mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8 lg:pt-24">
                <div className="lg:flex lg:items-end lg:justify-between">
                    <div>
                        <div className="flex justify-center text-white lg:justify-start"></div>

                        <p className="mx-auto mt-6 max-w-md text-center leading-relaxed text-gray-200 lg:text-left">
                            Lorem ipsum dolor, sit amet consectetur adipisicing
                            elit. Incidunt consequuntur amet culpa cum itaque
                            neque.
                        </p>
                    </div>

                    <ul className="mt-12 flex flex-wrap justify-center gap-6 md:gap-8 lg:mt-0 lg:justify-end lg:gap-12">
                        <li>
                            <a
                                className="text-gray-200 transition hover:text-gray-200/75"
                                href="/"
                            >
                                {' '}
                                About{' '}
                            </a>
                        </li>

                        <li>
                            <a
                                className="text-gray-200 transition hover:text-gray-200/75"
                                href="/"
                            >
                                {' '}
                                Services{' '}
                            </a>
                        </li>

                        <li>
                            <a
                                className="text-gray-200 transition hover:text-gray-200/75"
                                href="/"
                            >
                                {' '}
                                Projects{' '}
                            </a>
                        </li>

                        <li>
                            <a
                                className="text-gray-200 transition hover:text-gray-200/75"
                                href="/"
                            >
                                {' '}
                                Blog{' '}
                            </a>
                        </li>
                    </ul>
                </div>

                <p className="mt-12 text-center text-sm text-gray-200 lg:text-right">
                    Copyright &copy; 2022. All rights reserved.
                </p>
                <div className="mt-4 flex items-center space-x-4 sm:mt-0"></div>
            </div>
        </footer>
    );
}
