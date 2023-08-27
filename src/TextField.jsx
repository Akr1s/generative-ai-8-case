import React from "react";

import styles from "./TextField.module.css";

export default function TextField({
  labelId,
  name,
  value,
  onChange,
  handleTouched,
  label,
  error,
  multiline,
  required,
}) {
  return (
    <div className={styles.root}>
      <label htmlFor={labelId}>
        {label}
        {required ? "*" : ""}
      </label>
      {multiline ? (
        <textarea
          id={labelId}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={handleTouched}
          cols="30"
          rows="10"
          className={styles.input}
        />
      ) : (
        <input
          id={labelId}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={handleTouched}
          className={styles.input}
        />
      )}
      {error && <div style={{ color: "red" }}>{error}</div>}
    </div>
  );
}
