import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Blog() {

    const [posts, setPosts] = useState([]);
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState("");
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");

    useEffect(() => {
        fetch("https://front6.edukacija.online/backend/wp-json/wp/v2/users")
            .then(res => res.json())
            .then(data => setUsers(data))
            .catch(err => console.error(err));
    }, []);

    useEffect(() => {
        fetch("https://front6.edukacija.online/backend/wp-json/wp/v2/categories?_fields=id,name")
            .then(res => res.json())
            .then(data => setCategories(data))
            .catch(err => console.error(err));
    }, []);

    useEffect(() => {
        let url = "https://front6.edukacija.online/backend/wp-json/wp/v2/posts?";

        if (selectedUser) {
            url += "author=" + selectedUser + "&";
        }
        if (selectedCategory) {
            url += "categories=" + selectedCategory;
        }

        fetch(url)
            .then(res => res.json())
            .then(data => setPosts(data))
            .catch(err => console.error(err));
    }, [selectedUser, selectedCategory]);

    return (
        <div className="container">
            <h1 className="display-4 text-center py-5">Blog</h1>

            <div className="row mb-4">
                <div className="col-md-4">
                    <select
                        className="form-select"
                        value={selectedUser}
                        onChange={e => setSelectedUser(e.target.value)}
                    >
                        <option value="">Svi autori</option>
                        {users.map(user => (
                            <option key={user.id} value={user.id}>{user.name}</option>
                        ))}
                    </select>
                </div>
                <div className="col-md-4">
                    <select
                        className="form-select"
                        value={selectedCategory}
                        onChange={e => setSelectedCategory(e.target.value)}
                    >
                        <option value="">Sve kategorije</option>
                        {categories.map(category => (
                            <option key={category.id} value={category.id}>{category.name}</option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="row">
                {posts.map(post => (
                    <div className="col-md-4" key={post.id}>
                        <h2>{post.title.rendered}</h2>
                        <div dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}></div>
                        <Link to={'/blog/' + post.slug}>Pročitaj više</Link>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Blog;