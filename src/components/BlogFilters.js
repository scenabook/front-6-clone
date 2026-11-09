function BlogFilters({ users, categories, selectedUser, selectedCategory, onChange }) {
    return (
        <div className="row mb-5">
            <div className="col-md-4 mb-3">
                <select className="form-select" value={selectedUser} onChange={e => onChange("autor", e.target.value)}>
                    <option value="svi">Svi autori</option>
                    {users.map(user => (
                        <option key={user.id} value={user.id}>{user.name}</option>
                    ))}
                </select>
            </div>
            <div className="col-md-4 mb-3">
                <select className="form-select" value={selectedCategory} onChange={e => onChange("kategorija", e.target.value)}>
                    <option value="">Sve kategorije</option>
                    {categories.map(category => (
                        <option key={category.id} value={category.id}>{category.name}</option>
                    ))}
                </select>
            </div>
        </div>
    );
}

export default BlogFilters;