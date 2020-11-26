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
  const initialValues = {
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

  function keepOnlyChangedValues(object1, object2) {
    const keys1 = Object.keys(object1);

    for (let key of keys1) {
      if (object1[key] === object2[key]) {
        delete object2[key];
      }
    }
  }

  const onSubmit = async (values, onSubmitProps) => {
    keepOnlyChangedValues(initialValues, values);

    delete values["repeat_password"];

    const confirmChoice = window.confirm(
      "Etes-vous sûr de vouloir modifier vos données ? "
    );

    try {
      if (confirmChoice) {
        const url = `http://localhost:4040/allpeople/updateProfile/${userID}`;
        await axios({
          method: "PUT",
          url: url,
          data: values,
          headers: {
            "Content-Type": "application/json",
            "x-access-token": token,
          },
        }).then((res) => {
          if (res.status === 200) {
            alert("Vos données ont été modifiées");
            window.location.reload();
          }
        });
      } else {
        onSubmitProps.resetForm();
      }
    } catch {
      alert("Vos données n'ont pas pu être modifiées");
    }
  };

  return (
    <div>
      {!userDetails.logo ? null : (
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
          enableReinitialize
        >
          {(formik) => {

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
                  messageError={Object.values(formik.errors).join(", ")}
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
