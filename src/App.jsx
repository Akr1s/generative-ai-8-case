import { useDispatch, useSelector } from "react-redux";
import styles from "./App.module.css";
import { isEmail, hasMinLength, required } from "./validator";
import { useState } from "react";
import { updateFormState } from "./store/form.slice";
import TextField from "./TextField";

const validators = {
  firstName: (value) => required(value),
  lastName: (value) => required(value),
  email: (value) => required(value) || isEmail(value),
  message: (value) => required(value) || hasMinLength(value),
};

function App() {
  const formState = useSelector((state) => state.form);
  const dispatch = useDispatch();

  const [values, setValues] = useState(formState);
  const [touched, setTouched] = useState({});
  const [errors, setErrors] = useState(() => validateValues(values));

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateFormState(values));
    alert("values saved successfully");
    const newValues = {
      firstName: "",
      lastName: "",
      email: "",
      message: "",
    };
    setValues(newValues);
    setTouched({});
    setErrors(validateValues(newValues));
  };

  const validateField = (e) => {
    const { value, name } = e.target;
    setErrors((prev) => ({ ...prev, [name]: validators[name](value) }));
  };

  const handleChange = (e) => {
    setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    validateField(e);
  };

  const handleTouched = (e) => {
    if (!touched[e.target.name]) {
      setTouched((prev) => ({ ...prev, [e.target.name]: true }));
      validateField(e);
    }
  };

  function validateValues(values) {
    return Object.entries(values).reduce(
      (acc, [key, value]) => ({ ...acc, [key]: validators[key](value) }),
      {}
    );
  }

  const isSaveDisabled = Object.values(errors).some(Boolean);
  const showSavedValues = Object.values(formState).every(Boolean);

  return (
    <div className={styles.root}>
      <h1 className={styles.title}>Form</h1>
      <form className={styles.flexColumnCenter}>
        <TextField
          labelId="firstName-label"
          name="firstName"
          value={values.firstName}
          onChange={handleChange}
          handleTouched={handleTouched}
          label="First Name"
          error={touched.firstName && errors.firstName}
          required
        />
        <TextField
          labelId="lastName-label"
          name="lastName"
          value={values.lastName}
          onChange={handleChange}
          handleTouched={handleTouched}
          label="Last Name"
          error={touched.lastName && errors.lastName}
          required
        />
        <TextField
          labelId="email-label"
          name="email"
          value={values.email}
          onChange={handleChange}
          handleTouched={handleTouched}
          label="Email"
          error={touched.email && errors.email}
          required
        />
        <TextField
          labelId="message-label"
          name="message"
          value={values.message}
          onChange={handleChange}
          handleTouched={handleTouched}
          label="Message"
          error={touched.message && errors.message}
          required
          multiline
        />
        <button onClick={handleSubmit} disabled={isSaveDisabled} type="submit">
          Submit
        </button>
      </form>
      {showSavedValues && (
        <div className={styles.flexColumnCenter}>
          <h2>Saved values</h2>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Field</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(formState).map(([key, value]) => (
                <tr key={key}>
                  <td>{key}</td>
                  <td>{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default App;
