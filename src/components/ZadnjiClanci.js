import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import BlogCard from "./BlogCard";

const API = "https://front6.edukacija.online/backend/wp-json/wp/v2/";

function ZadnjiClanci({ naslov = "Najnoviji članci", broj = 3, kategorija, izbaci, link }) {
    const [clanci, setClanci] = useState([]);

    useEffect(() => {
        let url = API + "posts?_embed&per_page=" + broj;
        if (kategorija) url += "&categories=" + kategorija;
        if (izbaci) url += "&exclude=" + izbaci;

        fetch(url)
            .then(res => res.json())
            .then(data => setClanci(Array.isArray(data) ? data : []))
            .catch(err => console.error(err));
    }, [broj, kategorija, izbaci]);

    if (clanci.length === 0) return null;

    return (
        <section className="my-5">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="mb-0">{naslov}</h2>
                {link && <Link to={link}>Svi članci →</Link>}
            </div>
            <div className="row g-4">
                {clanci.map(p => (
                    <div className="col-12 col-md-6 col-lg-4" key={p.id}>
                        <BlogCard post={p} />
                    </div>
                ))}
            </div>
        </section>
    );
}

export default ZadnjiClanci;