import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const API = "https://front6.edukacija.online/backend/wp-json/wp/v2/";

function Izvodaci() {
    const [izvodaci, setIzvodaci] = useState([]);

    const [vrste, setVrste] = useState([]);
    const [drzave, setDrzave] = useState([]);
    const [zanrovi, setZanrovi] = useState([]);

    const [selectedVrsta, setSelectedVrsta] = useState("");
    const [selectedDrzava, setSelectedDrzava] = useState("");
    const [selectedZanr, setSelectedZanr] = useState("");

    useEffect(() => {
        fetch(API + "sb_vrsta?_fields=id,name")
            .then(res => res.json())
            .then(data => setVrste(data))
            .catch(err => console.error(err));

        fetch(API + "sb_drzava?_fields=id,name")
            .then(res => res.json())
            .then(data => setDrzave(data))
            .catch(err => console.error(err));

        fetch(API + "sb_zanr?_fields=id,name")
            .then(res => res.json())
            .then(data => setZanrovi(data))
            .catch(err => console.error(err));
    }, []);

    useEffect(() => {
        let url = API + "sb_izvodjac?";

        if (selectedVrsta) url += "sb_vrsta=" + selectedVrsta + "&";
        if (selectedDrzava) url += "sb_drzava=" + selectedDrzava + "&";
        if (selectedZanr) url += "sb_zanr=" + selectedZanr;

        fetch(url)
            .then(res => res.json())
            .then(data => setIzvodaci(data))
            .catch(err => console.error(err));
    }, [selectedVrsta, selectedDrzava, selectedZanr]);

    console.log(izvodaci);

    return (
        <div className="container">
            <h1 className="display-4 text-center py-5">Izvođači</h1>

            <div className="row mb-4">
                <div className="col-md-4">
                    <select className="form-select" value={selectedVrsta} onChange={e => setSelectedVrsta(e.target.value)}>
                        <option value="">Sve vrste</option>
                        {vrste.map(v => (
                            <option key={v.id} value={v.id}>{v.name}</option>
                        ))}
                    </select>
                </div>
                <div className="col-md-4">
                    <select className="form-select" value={selectedDrzava} onChange={e => setSelectedDrzava(e.target.value)}>
                        <option value="">Sve države</option>
                        {drzave.map(d => (
                            <option key={d.id} value={d.id}>{d.name}</option>
                        ))}
                    </select>
                </div>
                <div className="col-md-4">
                    <select className="form-select" value={selectedZanr} onChange={e => setSelectedZanr(e.target.value)}>
                        <option value="">Svi žanrovi</option>
                        {zanrovi.map(z => (
                            <option key={z.id} value={z.id}>{z.name}</option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="row">
                {izvodaci.map(izvodac => (
                    <div className="col-md-4 mb-4" key={izvodac.id}>
                        <h2 dangerouslySetInnerHTML={{ __html: izvodac.title.rendered }}></h2>
                        <Link to={'/izvodac/' + izvodac.slug}>Pogledaj profil</Link>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Izvodaci;