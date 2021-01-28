import React from "react";
import { Link } from "react-router-dom";
import { Formik, Form } from "formik";
import axios from "axios";

//components
import FormikControl from "../components/formik/FormikControl";
import Button from "../components/Button";
import { goToUserProfilePage } from "../services/services";
import { validationSchemaSignIn } from "../controllers/validationSchema";

const SignIn = () => {
  let msgWhenFailingLogIn;

  // initial values of the form
  const initialValues = {
    email: "",
    password: "",
  };

  // handling submission
  const onSubmit = async (values) => {
    const url = "http://localhost:4040/signin/signin";
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
      .catch((err) => {
        const errorMessage = err.response.data.msg;
        if (errorMessage) {
          msgWhenFailingLogIn = errorMessage;
        } else {
          msgWhenFailingLogIn = "il est impossible de vous connecter";
          return msgWhenFailingLogIn;
        }
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
                validationSchema={validationSchemaSignIn}
                onSubmit={onSubmit}
                validateOnMount
              >
                {(formik) => {
                  return (
                    <Form className="signIn__form">
                      <h1 className="heading-primary--main">Se connecter</h1>
                      <p className="errorMessage">{msgWhenFailingLogIn}</p>
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
                        value={"Se connecter"}
                      />
                    </Form>
                  );
                }}
              </Formik>
            </div>
          </div>
          <div className="hello-friend">
            <div className="inner-box inner-box--blue">
              <h1 className="heading-primary--main">Hello l'ami !</h1>
              <p>
                Saisissez vos informations personnelle et trouvez le job de vos
                rêves
              </p>
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
