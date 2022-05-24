import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/authSlice";

import { Formik, Form } from "formik";
import { Button, Input, message, Card } from "antd";
import login from "../../api/login";

import styles from "./login.module.scss";

const Login = () => {
  const nav = useNavigate();
  const dispatch = useDispatch();

  return (
    <div className={styles.container}>
      <Formik
        initialValues={{ login: "", password: "" }}
        onSubmit={(values) =>
          login
            .signIn(values.login, values.password)
            .then((data) => dispatch(setUser(data.data)))
            .then(() => nav("/"))
            .catch((error) =>
              message.error(error?.response?.data || error.message)
            )
        }
      >
        {({ values, handleChange, handleBlur }) => (
          <Form>
            <Card title="Авторизація">
              <div className={styles.form}>
                <Input
                  name="login"
                  placeholder="Login"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.login}
                />
                <Input
                  name="password"
                  placeholder="Password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                />
                <Button type="primary" htmlType="submit">
                  Увійти
                </Button>
              </div>
            </Card>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Login;
