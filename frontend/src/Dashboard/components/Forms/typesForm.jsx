import React from "react";
import { useParams } from "react-router-dom";
import Form from "./common/Form";

const TypesForm = () => {
    const { id } = useParams();
    const fields = [
        {field: 'nom', label: 'Nom', type: 'text'},
        {field: 'description', label: 'Description', type: 'text'}
    ]   


    return (
        <Form 
        fields={fields}
         endpoint="types"
         title="un type"
         id={id}
         />
    )

}

export default TypesForm;
