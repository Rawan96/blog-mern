import React, { useState } from "react";
import { Form, Input, Button, message, Alert } from "antd";
import { withRouter } from "react-router-dom";
import GoogleAuthentication from "../GoogleLogin";
import Axios from "axios";

const Login = withRouter((props) => {
  const [error, setError] = useState();

  const onFinish = (values) => {
    Axios.post("/api/posts/login", values)
      .then(({ data: { msg } }) => {
        message.success(msg);
        props.history.push("/");
      })
      .catch((res) => {
        console.log(res);
        setError(
          "Your password is incorrect or the email you are trying to login with is not exist"
        );
      });
  };

  return (
    <div>
      <h1>Login</h1>
      <Form
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        className="form-con"
      >
        <Form.Item
          label="email"
          name="email"
          rules={[
            {
              type: "email",
              required: true,
              message: "Please enter your email",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please enter your password" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" className="btn">
            Submit
          </Button>
          <GoogleAuthentication />
        </Form.Item>
        {error && <Alert type="error" message={error} />}
      </Form>
    </div>
  );
});

export default Login;
