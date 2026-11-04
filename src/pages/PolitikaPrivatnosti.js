import { useState, useEffect } from "react";

function PolitikaPrivatnosti() {

    const [page, setPage] = useState(null);

    useEffect(() => {
        fetch("https://front6.edukacija.online/backend/wp-json/wp/v2/pages/285")
            .then(res => res.json())
            .then(data => setPage(data))
            .catch(err => console.error(err));
    }, []);

    if (!page) return <h3 className="container py-5">Učitavanje...</h3>

    return (
        <div className="container">
            <h1 className="display-4 text-center py-5" dangerouslySetInnerHTML={{ __html: page.title.rendered }}></h1>
            <div className="row">
                <div className="col-md-8 m-auto" dangerouslySetInnerHTML={{ __html: page.content.rendered }}></div>
            </div>
        </div>
    );
}

export default PolitikaPrivatnosti;