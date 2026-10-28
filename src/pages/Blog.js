import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Blog() {

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetch("https://front6.edukacija.online/backend/wp-json/wp/v2/posts")
            .then(res => res.json())
            .then(data => setPosts(data))
            .catch(err => console.error(err));
    }, []);

    return (
        <div className="container">
            <h1 className="display-4 text-center py-5">Blog</h1>
            <div className="row">
                {
                    posts.map(post => {
                        return (
                            <div className="col-md-4" key={post.id}>
                                <h2>{post.title.rendered}</h2>
                                <div dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}></div>
                                <Link to={'/blog/' + post.slug}>Pročitaj više</Link>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Blog;