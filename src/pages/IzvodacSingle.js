import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";

const API = "https://front6.edukacija.online/backend/wp-json/wp/v2/";

function IzvodacSingle() {

    const { slug } = useParams();
    const [izvodac, setIzvodac] = useState();
    const [sviPojmovi, setSviPojmovi] = useState([]);

    // Dohvat jednog izvođača po slugu
    useEffect(() => {
        fetch(API + "sb_izvodjac?slug=" + slug)
            .then(res => res.json())
            .then(data => setIzvodac(data[0]))
            .catch(err => console.error(err));
    }, [slug]);

    // Dohvat naziva vrsta, država i žanrova
    useEffect(() => {
        Promise.all([
            fetch(API + "sb_vrsta?_fields=id,name&per_page=100").then(res => res.json()),
            fetch(API + "sb_drzava?_fields=id,name&per_page=100").then(res => res.json()),
            fetch(API + "sb_zanr?_fields=id,name&per_page=100").then(res => res.json())
        ])
            .then(rezultati => setSviPojmovi(rezultati.flat()))
            .catch(err => console.error(err));
    }, []);

    if (!izvodac) return <p className="container py-5">Učitavanje...</p>

    const acf = izvodac.acf;

    // Oznake ovog izvođača
    const idjevi = [...izvodac.sb_vrsta, ...izvodac.sb_drzava, ...izvodac.sb_zanr];
    const pojmovi = sviPojmovi.filter(pojam => idjevi.includes(pojam.id));

    // Cijena
    let cijena = "";
    if (acf.sb_prikaz_cijene === "na_upit") {
        cijena = "Cijena na upit";
    } else if (acf.sb_cijena_od && acf.sb_cijena_do) {
        cijena = acf.sb_cijena_od + " – " + acf.sb_cijena_do + " €";
    } else if (acf.sb_cijena_od) {
        cijena = "od " + acf.sb_cijena_od + " €";
    }

    // Videi koji nisu prazni
    const videi = [acf.sb_video_1, acf.sb_video_2, acf.sb_video_3, acf.sb_video_4, acf.sb_video_5]
        .filter(video => video);

    // WhatsApp link
    const whatsapp = acf.sb_whatsapp ? "https://wa.me/" + acf.sb_whatsapp.replace(/\D/g, "") : "";

    return (
        <div className="container py-5">
            <Link to="/izvodaci">← Natrag na izvođače</Link>

            <h1 className="display-4 mt-4" dangerouslySetInnerHTML={{ __html: izvodac.title.rendered }}></h1>

            {acf.sb_plan && (
                <span className="badge bg-warning text-dark text-uppercase mb-3">{acf.sb_plan}</span>
            )}

            <div className="mb-3">
                {pojmovi.map(pojam => (
                    <span className="badge bg-primary me-1" key={pojam.id}>{pojam.name}</span>
                ))}
            </div>

            <div className="row">
                <div className="col-md-8">
                    {acf.sb_opis && <p className="lead">{acf.sb_opis}</p>}

                    {videi.length > 0 && (
                        <>
                            <h2 className="h4 mt-4">Video</h2>
                            {videi.map((video, i) => (
                                <p key={i}><a href={video} target="_blank" rel="noreferrer">Pogledaj video {i + 1}</a></p>
                            ))}
                        </>
                    )}

                    {acf.sb_linkovi && (
                        <>
                            <h2 className="h4 mt-4">Linkovi</h2>
                            <p>{acf.sb_linkovi}</p>
                        </>
                    )}
                </div>

                <div className="col-md-4">
                    <div className="card p-3">
                        {acf.sb_grad && <p><strong>Grad:</strong> {acf.sb_grad}</p>}
                        {acf.sb_broj_clanova && <p><strong>Broj članova:</strong> {acf.sb_broj_clanova}</p>}
                        {cijena && <p><strong>Cijena:</strong> {cijena}</p>}
                        {whatsapp && (
                            <a href={whatsapp} target="_blank" rel="noreferrer" className="btn btn-success">
                                Javi se na WhatsApp
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default IzvodacSingle;