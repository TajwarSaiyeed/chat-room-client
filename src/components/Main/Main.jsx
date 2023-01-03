import React, { useState } from "react";
import styles from "../../styles/Main.module.css";
import { Link } from "react-router-dom";

const FIELDS = {
  NAME: "name",
  ROOM: "room",
};

const Main = () => {
  const { NAME, ROOM } = FIELDS;
  const [values, setValues] = useState({
    [NAME]: "",
    [ROOM]: "",
  });

  const handleChange = ({ target: { value, name } }) => {
    setValues({ ...values, [name]: value });
  };

  console.log(values);

  const handleClick = (e) => {
    const isDisabled = Object.values(values).some((v) => !v);

    if (isDisabled) e.preventDefault();
  };

  return (
    <div className={styles.wrap}>
      <div className={styles.container}>
        <h1 className={styles.heading}>Join</h1>
        <form className={styles.form}>
          <div className={styles.group}>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              autoComplete="off"
              value={values[NAME]}
              className={styles.input}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.group}>
            <input
              type="text"
              name="room"
              placeholder="Room"
              autoComplete="off"
              value={values[ROOM]}
              className={styles.input}
              onChange={handleChange}
              required
            />
          </div>

          <Link
            className={styles.group}
            onClick={handleClick}
            to={`/chat?name=${values[NAME]}&room=${values[ROOM]}`}
          >
            <button className={styles.button} type="submit">
              Sign in
            </button>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Main;
