import BlogBox from "../components/BlogBox";
import Work from "../components/Work";
import Heading3 from "../components/Heading3";
import ZadnjiClanci from "../components/ZadnjiClanci";

function Home() {
    return (
        <>
            <div className="hero">
                <div className="container">
                    <div className="row">
                        <div className="col-md-7">
                            <h1>Hi, I am John, Creative Technologist</h1>
                            <p>Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.</p>
                            <a href="/">Download Resume</a>
                        </div>
                        <div className="col-md-5">
                            <img alt="Opis slike" src="https://placehold.co/200x200" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="recent-post">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                            <Heading3 title="Recent posts" />
                        </div>
                        <div className="col-md-6 text-end">
                            <a href="/">View all</a>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <BlogBox />
                        </div>
                        <div className="col-md-6">
                            <BlogBox />
                        </div>
                    </div>
                </div>
            </div>

            <div className="featured-works">
                <div className="container">
                    <Heading3 title="Featured works" />
                    <Work title="Project 1" />
                    <Work title="Project 2" />
                    <Work title="Project 3" />
                </div>
            </div>

            <div className="container">
                <ZadnjiClanci naslov="Novosti" link="/blog" />
            </div>
        </>
    );
}

export default Home;

