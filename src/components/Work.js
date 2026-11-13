function Work({ title }) {
    return (
        <div className="work">
            <div className="row align-items-center">
                <div className="col-md-4">
                    <img alt="Opis slike" src="https://placehold.co/246x180" />
                </div>
                <div className="col-md-8">
                    <h2>
                        <a href="/">{title}</a>
                    </h2>

                    <p className="meta">
                        <span className="year">2020</span>
                        <span className="tags">Dashboard</span>
                    </p>

                    <p>Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.</p>
                </div>
            </div>
        </div>
    );
}

export default Work;