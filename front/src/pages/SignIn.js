import React from "react";
import { Link, useHistory, Redirect } from "react-router-dom";
import { Formik, Form} from "formik";
import * as Yup from "yup";
import axios from "axios";

//components
import FormikControl from "../components/formik/FormikControl";
import Button from "../components/Button";

const SignIn = () => {
  let history = useHistory();
  let msgForFailingLogIn;
  const errormsg = "Obligatoire !"; //mettre dans state contexte

  // initial values of the form
  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Le format de l'email est incorrect !")
      .required(errormsg),
    password: Yup.string().required(errormsg),
  });

  // function that redirect user when successful login
  const goToUserPage = (userType, userID) => {
    switch (userType) {
      case "admin":
        history.push(`/admin/${userID}`);
        break;
      case "user":
        history.push(`/user/${userID}`);
        break;
      case "compagny":
        history.push(`/compagny/${userID}`);
        break;
      default:
        return <Redirect to={"/"} />;
    }
  };

  const onSubmit = async (values) => {
    const url = "http://localhost:4040/signin/signin";
    await axios
      .post(url, values)
      .then((response) => {
        if (response.status === 200) {
          localStorage.setItem("token", response.headers["x-access-token"]);
          const userType = response.data.userType;
          const userID = response.data.userID;
          goToUserPage(userType, userID);
        }
      })
      .catch(() => {
        msgForFailingLogIn = "Vos informations sont incorrectes";
        return msgForFailingLogIn;
      });
  };

  return (
    <div className="container--connexion">
      <div className="box">
        <div className="container-signIn">
          <div className="signIn">
            <div className="inner-box">
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
                validateOnMount
              >
                {(formik) => {
                  //console.log("formik:", formik);
                  return (
                    <Form className="signIn__form">
                      <h1 className="heading-primary--main">Se connecter</h1>
                      <p className="errorMessage">{msgForFailingLogIn}</p>
                      <FormikControl
                        control="input"
                        type="email"
                        name="email"
                        placeholder="email"
                      />
                      <FormikControl
                        control="input"
                        type="password"
                        name="password"
                        placeholder="password"
                      />

                      <Button
                        type="submit"
                        disabled={!formik.isValid}
                        className={"btn btn--round"}
                        value={"Sign In"}
                      />
                    </Form>
                  );
                }}
              </Formik>
            </div>
          </div>
          <div className="hello-friend">
            <div className="inner-box inner-box--blue">
              <h1 className="heading-primary--main">Hello Friend!</h1>
              <p>Enter your personal details and start journey with us</p>
              <Link
                to={"/register"}
                className="btn btn--round btn--transparent"
              >
                sign up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
