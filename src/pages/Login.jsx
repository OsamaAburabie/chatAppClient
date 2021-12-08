import React, { useContext } from "react";
import axios from "axios";
import styled from "styled-components";
import AuthContext from "../context/AuthContext";

const Login = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");
  const { checkLoggedIn } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();

    const user = {
      email,
      password,
    };

    axios
      .post("/api/users/login", user)
      .then((res) => {
        console.log(res.data);
        if (res.data.token) {
          localStorage.setItem("auth-token", res.data.token);
          checkLoggedIn();
        }
        setError("");
      })
      .catch((err) => {
        console.log(err.response.data.message);
        setError(err.response.data.message);
      });
  };
  return (
    <Container>
      <RegisterForm onSubmit={handleSubmit}>
        <CenteringWrapper>
          <HeadingText>Login</HeadingText>
          {error && <ErrorText>{error}</ErrorText>}
          <InputsContainer>
            <Label>Email</Label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <Label>Password</Label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <Button>Login</Button>
          </InputsContainer>
        </CenteringWrapper>
      </RegisterForm>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  background-color: #1e1f22;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const HeadingText = styled.h2`
  font-size: 1.9rem;
  font-weight: 600;
  color: #fff;
`;

const RegisterForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 35rem;
  background-color: #36393f;
  padding: 2rem;
  color: #b9bbbe;
  border-radius: 1rem;
  margin: 1rem;
`;

const CenteringWrapper = styled.div`
  width: 100%;
  text-align: center;
`;

const InputsContainer = styled.div`
  width: 100%;
  text-align: left;
  margin-top: 1.5rem;
`;

const Input = styled.input`
  width: 100%;
  height: 3rem;
  margin-bottom: 1rem;
  margin-top: 0.5rem;
  font-size: 1.5rem;
  padding: 0.7rem;
  background-color: #313339;
  color: #b9bbbe;
  border-radius: 3px;
  border: 1px solid #111;
  outline: none;
`;

const Label = styled.label`
  font-size: 1.5rem;
`;

const Button = styled.button`
  width: 100%;
  height: 3rem;
  margin-top: 1rem;
  font-size: 1.5rem;
  padding: 0.7rem;
  background-color: #229fd9;
  color: #b9bbbe;
  border-radius: 3px;
  border: none;
  outline: none;
  cursor: pointer;
`;

const ErrorText = styled.p`
  color: red;
  font-size: 1.5rem;
  margin-top: 1rem;
`;
export default Login;
