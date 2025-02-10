import React, { useEffect }  from "react";
import { useParams } from "react-router-dom";
import { apiServices } from "../../../api";

const PaimentForm = () => {

    const [contrat, setContrat] = useState(null);
    const { id } = useParams();
    useEffect (() => {
        const fetchContrat = async () => {
            const response = await apiServices.contrats.list();
            setContrat(response.data);
        }
        fetchContrat();

    });


    const fields = [
        {
            field:id_contrat,
            label: 'Contrat',
            type: 'text'

        },
        {field: 'montant', label: 'Montant', type: 'text'},
        {field: 'date', label: 'Date', type: 'date'},
        {field: 'type', label: 'Type', type: 'text'},
        {field: 'description', label: 'Description', type: 'text'}
    ]


    
}