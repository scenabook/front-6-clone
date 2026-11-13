import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import BlogCard from "../components/BlogCard";
import "./BlogSingle.css";

const API = "https://front6.edukacija.online/backend/wp-json/wp/v2/";

function BlogSingle() {

    const { slug } = useParams();
    const navigate = useNavigate();
    const [post, setPost] = useState();
    const [povezani, setPovezani] = useState([]);

    // Članak po slugu
    useEffect(() => {
        window.scrollTo(0, 0);
        fetch(API + "posts?_embed&slug=" + slug)
            .then(res => res.json())
            .then(data => setPost(data[0]))
            .catch(err => console.error(err));
    }, [slug]);

    // 3 povezana članka (ista kategorija), dopunjena najnovijima ako ih je manje od 3
    useEffect(() => {
        if (!post) return;

        const kategorija = post.categories?.[0];
        let url = API + "posts?_embed&per_page=3&exclude=" + post.id;
        if (kategorija) url += "&categories=" + kategorija;

        fetch(url)
            .then(res => res.json())
            .then(data => {
                const lista = Array.isArray(data) ? data : [];

                if (lista.length >= 3) {
                    setPovezani(lista);
                    return;
                }

                // Dopuna najnovijima (bez trenutnog i već pronađenih)
                const izbaci = [post.id, ...lista.map(p => p.id)].join(",");
                return fetch(API + "posts?_embed&per_page=" + (3 - lista.length) + "&exclude=" + izbaci)
                    .then(res => res.json())
                    .then(najnoviji => setPovezani([...lista, ...(Array.isArray(najnoviji) ? najnoviji : [])]));
            })
            .catch(err => console.error(err));
    }, [post]);

    if (!post) return <p className="container py-5">Učitavanje...</p>

    const slika = post._embedded?.["wp:featuredmedia"]?.[0]?.source_url;
    const datum = new Date(post.date).toLocaleDateString("hr-HR");

    return (
        <div className="container">
            <article className="blog-single">
                <button onClick={() => navigate(-1)} className="blog-single__back">
                    <span className="blog-single__arrow">←</span> Natrag na blog
                </button>

                <p className="blog-single__date">{datum}</p>
                <h1 className="blog-single__title" dangerouslySetInnerHTML={{ __html: post.title.rendered }}></h1>

                {slika && <img src={slika} alt="" className="blog-single__image" />}

                <div className="blog-single__content" dangerouslySetInnerHTML={{ __html: post.content.rendered }}></div>

                <div className="blog-single__footer">
                    <button onClick={() => navigate(-1)} className="sb-button">Natrag na blog</button>
                </div>
            </article>

            {povezani.length > 0 && (
                <section className="my-5">
                    <h2 className="mb-4">Povezani članci</h2>
                    <div className="row g-4">
                        {povezani.map(p => (
                            <div className="col-12 col-md-6 col-lg-4" key={p.id}>
                                <BlogCard post={p} />
                            </div>
                        ))}
                    </div>
                </section>
            )}
        </div>
    );
}

export default BlogSingle;