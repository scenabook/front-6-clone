import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./BlogSingle.css";

function BlogSingle() {

    const { slug } = useParams();
    const navigate = useNavigate();
    const [post, setPost] = useState();

    useEffect(() => {
        fetch("https://front6.edukacija.online/backend/wp-json/wp/v2/posts?_embed&slug=" + slug)
            .then(res => res.json())
            .then(data => setPost(data[0]))
            .catch(err => console.error(err));
    }, [slug]);

    if (!post) return <p className="container py-5">Učitavanje...</p>

    const slika = post._embedded?.["wp:featuredmedia"]?.[0]?.source_url;
    const datum = new Date(post.date).toLocaleDateString("hr-HR");

    return (
        <div className="container">
            <article className="blog-single">
                <button onClick={() => navigate(-1)} className="blog-single__back">← Natrag na blog</button>

                <p className="blog-single__date">{datum}</p>
                <h1 className="blog-single__title" dangerouslySetInnerHTML={{ __html: post.title.rendered }}></h1>

                {slika && <img src={slika} alt="" className="blog-single__image" />}

                <div className="blog-single__content" dangerouslySetInnerHTML={{ __html: post.content.rendered }}></div>

                <div className="blog-single__footer">
                    <button onClick={() => navigate(-1)} className="blog-single__button">Natrag na blog</button>
                </div>
            </article>
        </div>
    );
}

export default BlogSingle;