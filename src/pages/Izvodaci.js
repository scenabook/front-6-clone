import { useState, useEffect } from "react";
import IzvodacCard from "../components/IzvodacCard";
import IzvodacFilters from "../components/IzvodacFilters";

const API = "https://front6.edukacija.online/backend/wp-json/wp/v2/";

function Izvodaci() {
    const [izvodaci, setIzvodaci] = useState([]);

    const [vrste, setVrste] = useState([]);
    const [drzave, setDrzave] = useState([]);
    const [zanrovi, setZanrovi] = useState([]);

    const [selectedVrsta, setSelectedVrsta] = useState("");
    const [selectedDrzava, setSelectedDrzava] = useState("");
    const [selectedZanr, setSelectedZanr] = useState("");

    // Popisi za izbornike (samo jednom)
    useEffect(() => {
        fetch(API + "sb_vrsta?_fields=id,name&per_page=100")
            .then(res => res.json())
            .then(data => setVrste(data))
            .catch(err => console.error(err));

        fetch(API + "sb_drzava?_fields=id,name&per_page=100")
            .then(res => res.json())
            .then(data => setDrzave(data))
            .catch(err => console.error(err));

        fetch(API + "sb_zanr?_fields=id,name&per_page=100")
            .then(res => res.json())
            .then(data => setZanrovi(data))
            .catch(err => console.error(err));
    }, []);


    useEffect(() => {
        let url = API + "sb_izvodjac?per_page=20";

        if (selectedVrsta) url += "&sb_vrsta=" + selectedVrsta;
        if (selectedDrzava) url += "&sb_drzava=" + selectedDrzava;
        if (selectedZanr) url += "&sb_zanr=" + selectedZanr;

        fetch(url)
            .then(res => res.json())
            .then(data => setIzvodaci(Array.isArray(data) ? data : []))
            .catch(err => console.error(err));
    }, [selectedVrsta, selectedDrzava, selectedZanr]);

    return (
        <div className="container">
            <h1 className="display-4 text-center py-5">Izvođači</h1>

            <IzvodacFilters
                vrste={vrste}
                drzave={drzave}
                zanrovi={zanrovi}
                selectedVrsta={selectedVrsta}
                selectedDrzava={selectedDrzava}
                selectedZanr={selectedZanr}
                onVrsta={setSelectedVrsta}
                onDrzava={setSelectedDrzava}
                onZanr={setSelectedZanr}
            />

            <div className="row g-4 mb-5">
    {izvodaci.map(izvodac => (
        <div className="col-12 col-md-6 col-lg-4" key={izvodac.id}>
            <IzvodacCard izvodac={izvodac} pojmovi={[...vrste, ...drzave, ...zanrovi]} />
        </div>
    ))}
</div>
        </div>
    );
}

export default Izvodaci;