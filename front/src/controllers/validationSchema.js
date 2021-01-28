
import * as Yup from "yup";

const errormsg = "Obligatoire !"; //mettre dans state contexte
const phoneRegex = /^(?:(?:\+|00)33[\s.-]{0,3}(?:\(0\)[\s.-]{0,3})?|0)[1-9](?:(?:[\s.-]?\d{2}){4}|\d{2}(?:[\s.-]?\d{3}){2})$/

// ValidationSchema for SignIn form
export const validationSchemaSignIn = Yup.object({
    email: Yup.string()
      .email("Le format de l'email est incorrect !")
      .required(errormsg),
    password: Yup.string().required(errormsg),
  });


// ValidationSchema for register form
export const validationSchemaRegister = Yup.object({
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