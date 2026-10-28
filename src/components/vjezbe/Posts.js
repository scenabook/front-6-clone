import React, { useState, useEffect } from 'react';

function Posts() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetch("https://front6.edukacija.online/backend/wp-json/wp/v2/posts")
            .then(res => res.json())
            .then(data => setPosts(data))
            .catch(err => console.error(err));
    }, []);

    return (
        <div className="container">
            <h1>Posts</h1>
            <div className="row">
                {
                    posts.map(clanak => {
                        return (
                            <div className="col-md-3 mb-3" key={clanak.id}>
                                <h2>{clanak.title.rendered}</h2>
                                <div dangerouslySetInnerHTML={{ __html: clanak.content.rendered }}></div>
                            </div>
                        );
                    })
                }
            </div>
        </div>
    );
}

export default Posts;