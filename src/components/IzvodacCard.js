import { Link } from "react-router-dom";
import "./IzvodacCard.css";

function IzvodacCard({ izvodac, pojmovi }) {

    const acf = izvodac.acf || {};
    const ime = izvodac.title.rendered;

    // Inicijali: prva slova prve dvije riječi (npr. "Diaspora Beat" → "DB")
    const inicijali = ime
        .split(" ")
        .slice(0, 2)
        .map(rijec => rijec[0])
        .join("")
        .toUpperCase();

    // Nazivi oznaka koje izvođač ima
    const nadi = (idjevi = []) => pojmovi.filter(p => idjevi.includes(p.id)).map(p => p.name);
    const vrste = nadi(izvodac.sb_vrsta);
    const drzave = nadi(izvodac.sb_drzava);
    const zanrovi = nadi(izvodac.sb_zanr);

    // Mjesto: grad i država
    const mjesto = [acf.sb_grad, drzave.join(", ")].filter(Boolean).join(", ");

    // Cijena
    let cijena = "";
    if (acf.sb_prikaz_cijene === "na_upit") {
        cijena = "Cijena na upit";
    } else if (acf.sb_cijena_od && acf.sb_cijena_do) {
        cijena = acf.sb_cijena_od + " – " + acf.sb_cijena_do + " €";
    } else if (acf.sb_cijena_od) {
        cijena = "od " + acf.sb_cijena_od + " €";
    }

    return (
        <article className="izvodac-card">
            <div className="izvodac-card__top">
                <span className="izvodac-card__initials">{inicijali}</span>
                {acf.sb_plan && (
                    <span className="sb-badge sb-badge--zlatna izvodac-card__plan">{acf.sb_plan}</span>
                )}
            </div>

            <div className="izvodac-card__content">
                <h2 className="izvodac-card__name">
                    <Link to={'/izvodac/' + izvodac.slug} dangerouslySetInnerHTML={{ __html: ime }} />
                </h2>

                {mjesto && <p className="izvodac-card__place">{mjesto}</p>}

                <div className="izvodac-card__tags">
                    {[...vrste, ...zanrovi].map(naziv => (
                        <span className="sb-badge" key={naziv}>{naziv}</span>
                    ))}
                </div>

                {cijena && <p className="izvodac-card__price">{cijena}</p>}

                <Link to={'/izvodac/' + izvodac.slug} className="izvodac-card__link">Pogledaj profil →</Link>
            </div>
        </article>
    );
}

export default IzvodacCard;