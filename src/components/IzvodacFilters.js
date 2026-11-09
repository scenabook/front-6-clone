function IzvodacFilters({
    vrste, drzave, zanrovi,
    selectedVrsta, selectedDrzava, selectedZanr,
    onVrsta, onDrzava, onZanr
}) {
    return (
        <div className="row mb-4">
            <div className="col-md-4 mb-3">
                <select className="form-select" value={selectedVrsta} onChange={e => onVrsta(e.target.value)}>
                    <option value="">Sve vrste</option>
                    {vrste.map(v => (
                        <option key={v.id} value={v.id}>{v.name}</option>
                    ))}
                </select>
            </div>
            <div className="col-md-4 mb-3">
                <select className="form-select" value={selectedDrzava} onChange={e => onDrzava(e.target.value)}>
                    <option value="">Sve države</option>
                    {drzave.map(d => (
                        <option key={d.id} value={d.id}>{d.name}</option>
                    ))}
                </select>
            </div>
            <div className="col-md-4 mb-3">
                <select className="form-select" value={selectedZanr} onChange={e => onZanr(e.target.value)}>
                    <option value="">Svi žanrovi</option>
                    {zanrovi.map(z => (
                        <option key={z.id} value={z.id}>{z.name}</option>
                    ))}
                </select>
            </div>
        </div>
    );
}

export default IzvodacFilters;