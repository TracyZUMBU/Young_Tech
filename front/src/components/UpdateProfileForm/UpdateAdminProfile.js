import React, { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import axios from "axios";
//components
import FormikControl from "../formik/FormikControl";
import Button from "../Button";

import decode from "jwt-decode";

const UpdateAdminProfile = (props) => {
  //get the user's id form localstorage
  const token = localStorage.getItem("token");
  const { userID } = decode(token);

  const [response, setResponse] = useState();

  // get user's details from userProfile component
  const userDetails = props.userDetails;
  //set the values of the form with userDetails content
  const values = {
    first_name: userDetails.first_name,
    last_name: userDetails.last_name,
    email: userDetails.email,
    phone: userDetails.phone,
    logo: userDetails.logo,
    password: "",
    repeat_password: "",
  };
  //set rules for validating of the field's form
  const validationSchema = Yup.object({
    first_name: Yup.string(),
    last_name: Yup.string(),
    type: Yup.string(),
    email: Yup.string().email("Le format de l'email est incorrect"),
    password: Yup.string(),
    repeat_password: Yup.string().oneOf(
      [Yup.ref("password"), ""],
      "Les mots de passe doivent être indentiques"
    ),
    phone: Yup.string(),
  });

  const onSubmit = async (values) => {
    delete values["repeat_password"];
    //remove empty string from the objects "values" in order to add into the BDD only values' fields provided
    Object.keys(values).forEach(
      (key) => values[key] === "" && delete values[key]
      );
      
      console.log('values:', values)
    const url = `http://localhost:4040/allpeople/updateProfile/${userID}`;
    await axios({
      method: "PUT",
      url: url,
      data: values,
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    })
      .then((res) => {
        setResponse(res)
        if(res.status === 200){
          alert('Vos données ont été modifiées')
      }})
      .catch(() => {
        alert("Vos données n'ont pas été modifiées")
      });
    //window.location.reload()
  };

  
  return (
    <div>
      {!userDetails.logo ? null : (
        <Formik
          initialValues={values}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
          enableReinitialize
        >
          {(formik) => {
            console.log("formik:", formik);
            return (
              <Form className="signIn__form">
                <FormikControl
                  control="input"
                  type="text"
                  name="first_name"
                  label="Prénom"
                />
                <FormikControl
                  control="input"
                  type="text"
                  name="last_name"
                  label="Nom"
                />
                <FormikControl
                  control="input"
                  type="email"
                  name="email"
                  label="E-mail"
                />
                <FormikControl
                  control="input"
                  type="password"
                  name="password"
                  label="mot de passe"
                  placeholder="********"
                />
                <FormikControl
                  control="input"
                  type="password"
                  name="repeat_password"
                  label="répétez votre mot de passe"
                  placeholder="********"
                />
                <FormikControl
                  control="input"
                  type="tel"
                  name="phone"
                  label="Téléphone"
                />
                <FormikControl
                  control="input"
                  type="text"
                  name="logo"
                  label="Photo"
                />

                <Button
                  type="submit"
                  disabled={!(formik.dirty && formik.isValid)}
                  className={"btn btn--round"}
                  value={"Modifier mon profil"}
                />
              </Form>
            );
          }}
        </Formik>
      )}
    </div>
  );
};

export default UpdateAdminProfile;
