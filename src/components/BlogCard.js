import { Link } from "react-router-dom";

function BlogCard({ post }) {

    const slika = post._embedded?.["wp:featuredmedia"]?.[0]?.source_url;
    const datum = new Date(post.date).toLocaleDateString("hr-HR");

    return (
        <article className="blog-card">
            {slika && <img src={slika} alt="" className="blog-card__image" />}
            <div className="blog-card__content">
                <p className="blog-card__date">{datum}</p>
                <h2 className="blog-card__title">
                    <Link to={'/blog/' + post.slug} dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
                </h2>
                <div className="blog-card__excerpt" dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}></div>
                <Link to={'/blog/' + post.slug} className="blog-card__read-more">Pročitaj više →</Link>
            </div>
        </article>
    );
}

export default BlogCard;