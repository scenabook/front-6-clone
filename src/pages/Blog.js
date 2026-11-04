import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Blog.css";

const API = "https://front6.edukacija.online/backend/wp-json/wp/v2/";
const ZAMJENSKA_SLIKA = "https://placehold.co/600x400/3b1838/d4a24c?text=ScenaBook";

function Blog() {

    const [posts, setPosts] = useState([]);
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState("");
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("6");

    useEffect(() => {
        fetch(API + "users")
            .then(res => res.json())
            .then(data => setUsers(data))
            .catch(err => console.error(err));
    }, []);

    useEffect(() => {
        fetch(API + "categories?_fields=id,name")
            .then(res => res.json())
            .then(data => setCategories(data))
            .catch(err => console.error(err));
    }, []);

    useEffect(() => {
        let url = API + "posts?_embed&";

        if (selectedUser) url += "author=" + selectedUser + "&";
        if (selectedCategory) url += "categories=" + selectedCategory;

        fetch(url)
            .then(res => res.json())
            .then(data => setPosts(data))
            .catch(err => console.error(err));
    }, [selectedUser, selectedCategory]);

    return (
        <div className="container">
            <h1 className="display-4 text-center py-5">Blog</h1>

            <div className="row mb-5">
                <div className="col-md-4 mb-3">
                    <select className="form-select" value={selectedUser} onChange={e => setSelectedUser(e.target.value)}>
                        <option value="">Svi autori</option>
                        {users.map(user => (
                            <option key={user.id} value={user.id}>{user.name}</option>
                        ))}
                    </select>
                </div>
                <div className="col-md-4 mb-3">
                    <select className="form-select" value={selectedCategory} onChange={e => setSelectedCategory(e.target.value)}>
                        <option value="">Sve kategorije</option>
                        {categories.map(category => (
                            <option key={category.id} value={category.id}>{category.name}</option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="row g-4 mb-5">
                {posts.map(post => {
                    const slika = post._embedded?.["wp:featuredmedia"]?.[0]?.source_url || ZAMJENSKA_SLIKA;
                    const datum = new Date(post.date).toLocaleDateString("hr-HR");

                    return (
                        <div className="col-12 col-md-6 col-lg-4" key={post.id}>
                            <article className="blog-card">
                                <img src={slika} alt="" className="blog-card__image" />
                                <div className="blog-card__content">
                                    <p className="blog-card__date">{datum}</p>
                                    <h2 className="blog-card__title">
                                        <Link to={'/blog/' + post.slug} dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
                                    </h2>
                                    <div className="blog-card__excerpt" dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}></div>
                                    <Link to={'/blog/' + post.slug} className="blog-card__read-more">Pročitaj više →</Link>
                                </div>
                            </article>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default Blog;