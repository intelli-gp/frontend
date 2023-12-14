import BlogSection from './BlogSection';
import FeatureSection from './FeatureSection';
import Feedback from './FeedbackSection';
import Footer from './Footer';
import Hero from './HeroSection';
import Nav from './Nav';

function HomePage() {
    return (
        <div>
            <Nav />
            <div className=" flex flex-col  justify-center items-center bg-white   h-[calc(100vh - 53px)]">
                <Hero />
                <FeatureSection />
                <BlogSection />
                <Feedback />
            </div>
            <Footer />
        </div>
    );
}
export default HomePage;
