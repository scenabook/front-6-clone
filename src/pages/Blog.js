import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import BlogCard from "../components/BlogCard";
import "./Blog.css";
import BlogFilters from "../components/BlogFilters";

const API = "https://front6.edukacija.online/backend/wp-json/wp/v2/";

function Blog() {

    const [posts, setPosts] = useState([]);
    const [users, setUsers] = useState([]);
    const [categories, setCategories] = useState([]);


    const [searchParams, setSearchParams] = useSearchParams();
    const selectedUser = searchParams.get("autor") ?? "6";
    const selectedCategory = searchParams.get("kategorija") || "";

    function promijeniFilter(ime, vrijednost) {
        const novi = new URLSearchParams(searchParams);
        if (vrijednost) {
            novi.set(ime, vrijednost);
        } else {
            novi.delete(ime);
        }
        setSearchParams(novi);
    }

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
        let url = API + "posts?_embed";

        if (selectedUser && selectedUser !== "svi") url += "&author=" + selectedUser;
        if (selectedCategory) url += "&categories=" + selectedCategory;

        fetch(url)
            .then(res => res.json())
            .then(data => setPosts(Array.isArray(data) ? data : []))
            .catch(err => console.error(err));
    }, [selectedUser, selectedCategory]);

        return (
        <div className="container">
            <h1 className="display-4 text-center py-5">Blog</h1>

            <BlogFilters
                users={users}
                categories={categories}
                selectedUser={selectedUser}
                selectedCategory={selectedCategory}
                onChange={promijeniFilter}
            />

            <div className="row g-4 mb-5">
                {posts.map(post => (
                    <div className="col-12 col-md-6 col-lg-4" key={post.id}>
                        <BlogCard post={post} />
                    </div>
                ))}
            </div>
        </div>
    );
    
}

export default Blog;