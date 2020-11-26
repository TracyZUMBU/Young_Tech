import React from "react";
import { Link } from "react-router-dom";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import axios from "axios";

//components
import FormikControl from "../components/formik/FormikControl";
import Button from "../components/Button";

import { goToUserProfilePage } from "../services/services";

const Register = () => {
  const errormsg = "Obligatoire !"; //mettre dans state contexte
  const phoneRegex = /^(?:(?:\+|00)33[\s.-]{0,3}(?:\(0\)[\s.-]{0,3})?|0)[1-9](?:(?:[\s.-]?\d{2}){4}|\d{2}(?:[\s.-]?\d{3}){2})$/

  const radioOptions = [
    {
      key: "Un candidat",
      value: "user",
    },
    { key: "Une entreprise", value: "compagny" },
  ];

  const initialValues = {
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    repeat_password: "",
    phone: "",
    logo:
      "https://upload.wikimedia.org/wikipedia/commons/f/f4/User_Avatar_2.png",
    compagny_name: "",
    description_compagny: "",
  };

  const validationSchema = Yup.object({
    first_name: Yup.string().required(errormsg),
    last_name: Yup.string().required(errormsg),
    userType: Yup.string().required(errormsg),
    email: Yup.string()
      .email("Le format de l'email est incorrect")
      .required(errormsg),
    password: Yup.string().required(errormsg),
    repeat_password: Yup.string()
      .oneOf(
        [Yup.ref("password"), ""],
        "Les mots de passe doivent être indentiques"
      )
      .required(errormsg),
    phone: Yup.string().matches(phoneRegex, 'Le format du numéro de téléphone est incorrect')
      .required(errormsg),
    compagny_name: Yup.string().when("userType", {
      is: "compagny",
      then: Yup.string().required(errormsg),
    }),
    description_compagny: Yup.string().when("userType", {
      is: "compagny",
      then: Yup.string().required(errormsg),
    }),
  });

  const onSubmit = async (values) => {
    //remove empty string from the objects "values" in order to add into the BDD only values' fields provided
    Object.keys(values).forEach(
      (key) => values[key] === "" && delete values[key]
    );

    const url = "http://localhost:4040/signin/register";
    await axios
      .post(url, values)
      .then((response) => {
        if (response.status === 200) {
          localStorage.setItem("token", response.headers["x-access-token"]);
          const userType = response.data.userType;
          const userID = response.data.userID;
          goToUserProfilePage(userType, userID);
        }
      })
      .catch((error) => {
        alert("Votre compte n'a pas pu être crée");
      });
  };

  return (
    <div className="container-signUp">
      <div className="welcome-back">
        <div className="inner-box inner-box--blue">
          <h1 className="heading-primary--main">Welcome Back!</h1>
          <p>To keep connected with us please login with your personal info</p>
          <Link
            to={"/signin"}
            id="signIn"
            className="btn btn--round btn--transparent"
          >
            Sign In
          </Link>
        </div>
      </div>
      <div className="create-account">
        <div className="inner-box">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
            validateOnMount
          >
            {(formik) => {
              console.log('formik:', formik)              
              return (
                <Form className="signIn__form">
                  <h1 className="heading-primary--main">Créer un compte</h1>
                  <FormikControl
                    options={radioOptions}
                    control="radio"
                    label="Je suis"
                    name="userType"
                  />
                  <FormikControl
                    control="input"
                    type="text"
                    name="first_name"
                    label="Prénom"
                    placeholder="Anne"
                  />
                  <FormikControl
                    control="input"
                    type="text"
                    name="last_name"
                    label="Nom"
                    placeholder="Dupont"
                  />

                  <FormikControl
                    control="input"
                    type="email"
                    name="email"
                    label="E-mail"
                    placeholder="annedupont@gmail.com"
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
                    placeholder="06 00 00 00 00"
                  />
                  <FormikControl
                    control="input"
                    type="text"
                    name="logo"
                    label="Photo"
                    placeholder="Insérer l'url de votre logo"
                  />

                  {formik.values.userType === "compagny" ? (
                    <>
                      <FormikControl
                        control="input"
                        type="text"
                        name="compagny_name"
                        label="Nom de l'entreprise"
                        placeholder="Microsoft"
                      />
                      <FormikControl
                        control="textarea"
                        name="description_compagny"
                        label="Description de votre entreprise"
                        placeholder="Courte description de votre entreprise"
                      />
                    </>
                  ) : null}

                  <Button
                    type="submit"
                    disabled={!formik.isValid}
                    className={"btn btn--round"}
                    value={"Sign up"}
                  />
                </Form>
              );
            }}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Register;
