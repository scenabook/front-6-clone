import { Link } from "react-router-dom";

function IzvodacCard({ izvodac }) {
    return (
        <article className="izvodac-card">
            <h2 dangerouslySetInnerHTML={{ __html: izvodac.title.rendered }}></h2>
            <Link to={'/izvodac/' + izvodac.slug}>Pogledaj profil</Link>
        </article>
    );
}

export default IzvodacCard;