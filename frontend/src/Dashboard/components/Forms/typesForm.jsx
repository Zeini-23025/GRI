import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Form from "./common/Form";
import { apiServices } from "../../../api";

const TypesForm = () => {
  const { id } = useParams();

  const fields = [
    { field: "nom", label: "Nom", type: "text" },
    { field: "description", label: "Description", type: "text" },
  ];

  return (
    <Form
      fields={fields}
      endpoint="types"
      id={id}
      title="un type"
    />
  );
};

export default TypesForm;
