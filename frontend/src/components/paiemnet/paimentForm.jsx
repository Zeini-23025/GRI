// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { apiServices } from "../../api";
// import Form from "../../Dashboard/components/Forms/common/Form";

// const PaimentForm = () => {
//     const [contrats, setContrats] = useState([]);
//     const { id } = useParams();

//     useEffect(() => {
//         const fetchContrats = async () => {
//             try {
//                 const response = await apiServices.contrats.list();
//                 setContrats(response.data);
//             } catch (error) {
//                 console.error("Erreur lors de la récupération des contrats :", error);
//             }
//         };
//         fetchContrats();
//     }, []); // Ajout du tableau de dépendances pour éviter les boucles infinies

//     const fields = [
//         {
//             field: 'id_contrat',
//             label: 'Contrat',
//             type: 'select',
//             options: contrats.map(contrat => ({
//                 value: contrat.id,
//                 label: `Contrat ${contrat.id}`
//             }))
//         },
//         { field: 'montant', label: 'Montant', type: 'number' },
//         { field: 'date_paiement', label: 'Date de paiement', type: 'date' },
//         { field: 'methode_paiement', label: 'Méthode de paiement', type: 'text' },
//         { field: 'statut', label: 'Statut', type: 'text' },
//         { field: 'image', label: 'Justificatif', type: 'file' }
//     ];

//     return (
//         <Form 
//             fields={fields}
//             endpoint="paiements"
//             id={id}
//             title="un paiement"
//         />
//     );
// };

// export default PaimentForm;




// import React, { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { apiServices } from "../../api";
// import "./paimentForm.css";

// const PaimentForm = () => {
//     const [contrats, setContrats] = useState([]);
//     const [formData, setFormData] = useState({});
//     const [error, setError] = useState(null);
//     const [loading, setLoading] = useState(false);
//     const { id } = useParams();
//     const navigate = useNavigate();

//     useEffect(() => {
//         const fetchContrats = async () => {
//             try {
//                 const response = await apiServices.contrats.list();
//                 setContrats(response.data);
//             } catch (error) {
//                 console.error("Erreur lors de la récupération des contrats :", error);
//             }
//         };
//         fetchContrats();

//         useEffect(() => {
//             const filtered = contrats.filter(contrat => contrat.id_locataire == localStorage.getItem('id'));
//             setFiltredContrats(filtered);
//             console.log("Contrats filtrés :", filtered); // Afficher les contrats filtrés après la mise à jour
//           }, [contrats]);

//         if (id) {
//             const fetchData = async () => {
//                 try {
//                     const response = await apiServices.paiements.get(id);
//                     setFormData(response.data);
//                 } catch (err) {
//                     setError("Erreur lors du chargement des données");
//                 }
//             };
//             fetchData();
//         }
//     }, [id]);

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setLoading(true);
//         try {
//             if (id) {
//                 await apiServices.paiements.update(id, formData);
//             } else {
//                 await apiServices.paiements.create(formData);
//             }
//             navigate("/dashboard/gestion-des-tables/paiements");
//         } catch (err) {
//             setError("Erreur lors de l'enregistrement");
//         }
//         setLoading(false);
//     };

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData(prev => ({ ...prev, [name]: value }));
//     };

//     return (
//         <div className="form-container">
//             <h2>{id ? "Modifier" : "Créer"} un paiement</h2>
//             {error && <div className="error-message">{error}</div>}
            
//             <form onSubmit={handleSubmit} className="form">
//                 <div className="form-group">
//                     <label htmlFor="id_contrat">Contrat</label>
//                     <select
//                         id="id_contrat"
//                         name="id_contrat"
//                         value={formData.id_contrat || ''}
//                         onChange={handleChange}
//                         required
//                     >
//                         <option value="">Sélectionner un contrat</option>
//                         {contrats.map(contrat => (
//                             <option key={contrat.id} value={contrat.id}>
//                                 Contrat {contrat.id}
//                             </option>
//                         ))}
//                     </select>
//                 </div>
//                 <div className="form-group">
//                     <label htmlFor="montant">Montant</label>
//                     <input type="number" id="montant" name="montant" value={formData.montant || ''} onChange={handleChange} required />
//                 </div>
//                 <div className="form-group">
//                     <label htmlFor="date_paiement">Date de paiement</label>
//                     <input type="date" id="date_paiement" name="date_paiement" value={formData.date_paiement || ''} onChange={handleChange} required />
//                 </div>
//                 <div className="form-group">
//                     <label htmlFor="methode_paiement">Méthode de paiement</label>
//                     <input type="text" id="methode_paiement" name="methode_paiement" value={formData.methode_paiement || ''} onChange={handleChange} required />
//                 </div>
//                 <div className="form-group">
//                     <label htmlFor="statut">Statut</label>
//                     <input type="text" id="statut" name="statut" value={formData.statut || ''} onChange={handleChange} required />
//                 </div>
//                 <div className="form-group">
//                     <label htmlFor="image">Justificatif</label>
//                     <input type="file" id="image" name="image" onChange={handleChange} />
//                 </div>
//                 <div className="form-actions">
//                     <button type="button" onClick={() => navigate("/dashboard/gestion-des-tables/paiements")} className="button-secondary">Annuler</button>
//                     <button type="submit" className="button-primary" disabled={loading}>{loading ? "Enregistrement..." : (id ? "Modifier" : "Créer")}</button>
//                 </div>
//             </form>
//         </div>
//     );
// };

// export default PaimentForm;



import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { apiServices } from "../../api";
import "./paimentForm.css";

const PaimentForm = () => {
    const [contrats, setContrats] = useState([]);
    const [filtredContrats, setFiltredContrats] = useState([]);
    const [formData, setFormData] = useState({});
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const { id } = useParams();
    const navigate = useNavigate();

    // Fetch contrats when component mounts
    useEffect(() => {
        const fetchContrats = async () => {
            try {
                const response = await apiServices.contrats.list();
                setContrats(response.data);
            } catch (error) {
                console.error("Erreur lors de la récupération des contrats :", error);
            }
        };
        fetchContrats();
    }, []);

    // Filter contrats based on the locataire's id
    useEffect(() => {
        const filtered = contrats.filter(contrat => contrat.id_locataire == 13);
        console.log("Contrats avant filtrage :", contrats); // Afficher les contrats avant le filtrage
        console.log("Contrats filtrés :", filtered); // Afficher les contrats filtrés avant la mise à jour
        setFiltredContrats(filtered);
        console.log("Contrats filtrés :", filtered); // Afficher les contrats filtrés après la mise à jour
    }, [contrats]); // Re-filter when contrats changes

    // Fetch data when an id is provided
    useEffect(() => {
        if (id) {
            const fetchData = async () => {
                try {
                    const response = await apiServices.paiements.get(id);
                    setFormData(response.data);
                } catch (err) {
                    setError("Erreur lors du chargement des données");
                }
            };
            fetchData();
        }
    }, [id]);

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            if (id) {
                await apiServices.paiements.update(id, formData);
            } else {
                await apiServices.paiements.create(formData);
            }
            navigate("/dashboard/gestion-des-tables/paiements");
        } catch (err) {
            setError("Erreur lors de l'enregistrement");
        }
        setLoading(false);
    };

    // Handle form field changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    return (
        // <div className="form-container">
        //     <h2>{id ? "Modifier" : "Créer"} un paiement</h2>
        //     {error && <div className="error-message">{error}</div>}
            
        //     <form onSubmit={handleSubmit} className="form">
        //         <div className="form-group">
        //             <label htmlFor="id_contrat">Contrat</label>
        //             <select
        //                 id="id_contrat"
        //                 name="id_contrat"
        //                 value={formData.id_contrat || ''}
        //                 onChange={handleChange}
        //                 required
        //             >
        //                 <option value="">Sélectionner un contrat</option>
        //                 {filtredContrats.map(contrat => (
        //                     <option key={contrat.id} value={contrat.id}>
        //                         Contrat {contrat.id}
        //                     </option>
        //                 ))}
        //             </select>
        //         </div>
        //         <div className="form-group">
        //             <label htmlFor="montant">Montant (MRU)</label>
        //             <input type="number" id="montant" name="montant" value={formData.montant || ''} onChange={handleChange} required />
        //         </div>
        //         <div className="form-group">
        //             <label htmlFor="date_paiement">Date de paiement</label>
        //             <input type="date" id="date_paiement" name="date_paiement" value={formData.date_paiement || ''} onChange={handleChange} required />
        //         </div>
        //         <div className="form-group">
        //             <label htmlFor="methode_paiement">Méthode de paiement</label>
        //             <input type="text" id="methode_paiement" name="methode_paiement" value={formData.methode_paiement || ''} onChange={handleChange} required />
        //         </div>
        //         <div className="form-group" hidden >
        //             <label htmlFor="statut">Statut</label>
        //             <input type="text" id="statut" name="statut" value="En attente" onChange={handleChange} required />
        //         </div>
        //         <div className="form-group">
        //             <label htmlFor="image">Capture d'écran du paiment</label>
        //             <input type="file" id="image" name="image" onChange={handleChange} />
        //         </div>
        //         <div className="form-actions">
        //             <button type="button" onClick={() => navigate("/dashboard/gestion-des-tables/paiements")} className="button-secondary">Annuler</button>
        //             <button type="submit" className="button-primary" disabled={loading}>{loading ? "Enregistrement..." : (id ? "Modifier" : "Créer")}</button>
        //         </div>
        //     </form>
        // </div>

        <div className="form-container">
    <h2>Faire un paiement</h2>
    {error && <div className="error-message">{error}</div>}
    
    <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
            <label htmlFor="id_contrat">Contrat</label>
            <select
                id="id_contrat"
                name="id_contrat"
                value={formData.id_contrat || ''}
                onChange={handleChange}
                required
            >
                <option value="">Sélectionner un contrat</option>
                {filtredContrats.map(contrat => (
                    <option key={contrat.id} value={contrat.id}>
                        Contrat {contrat.id}: {contrat.type} - {contrat.immobilier} - {contrat.nom}
                    </option>
                ))}
            </select>
        </div>
        <div className="form-group">
            <label htmlFor="montant">Montant (MRU)</label>
            <input 
                type="number" 
                id="montant" 
                name="montant" 
                value={formData.montant || ''} 
                onChange={handleChange} 
                required 
            />
        </div>
        <div className="form-group">
            <label htmlFor="date_paiement">Date de paiement</label>
            <input 
                type="date" 
                id="date_paiement" 
                name="date_paiement" 
                value={formData.date_paiement || ''} 
                onChange={handleChange} 
                required 
            />
        </div>
        <div className="form-group">
            <label htmlFor="methode_paiement">Méthode de paiement</label>
            <select
                id="methode_paiement"
                name="methode_paiement"
                value={formData.methode_paiement || ''}
                onChange={handleChange}
                required
            >
                <option value="">Sélectionner une méthode</option>
                <option value="bankily">bankily</option>
                <option value="masrivi">masrivi</option>
                <option value="sedad">sedad</option>
                {/* Ajoutez d'autres options si nécessaire */}
            </select>
        </div>
        <div className="form-group" hidden>
            <label htmlFor="statut">Statut</label>
            <input type="text" id="statut" name="statut" value="En attente" onChange={handleChange} />
        </div>
        <div className="form-group">
            <label htmlFor="image">Capture d'écran du paiement</label>
            <input type="file" id="image" name="image" onChange={handleChange} />
        </div>
        <div className="form-group">
            <label htmlFor="mois">Mois</label>
            <input 
                type="month" 
                id="mois" 
                name="mois" 
                value={formData.mois || ''} 
                onChange={handleChange} 
                required 
            />
        </div>
        <div className="form-actions">
            <button 
                type="button" 
                onClick={() => navigate("/dashboard/gestion-des-tables/paiements")} 
                className="button-secondary"
            >
                Annuler
            </button>
            <button 
                type="submit" 
                className="button-primary" 
                disabled={loading}
            >
                {loading ? "Enregistrement..." : (id ? "Modifier" : "Créer")}
            </button>
        </div>
    </form>
</div>

    );
};

export default PaimentForm;
