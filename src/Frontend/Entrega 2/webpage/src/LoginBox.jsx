import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledBoxContent = styled.div`
max-width: 55%;
margin-left: auto; 
margin-right: auto;
margin-top : 25px;
margin-bottom : 40px;
padding: 20px;
`;

const Form = styled.form`
    flex-direction: column;
`;

const Input = styled.input`
    padding: 10px;
    border-bottom: 4px solid #244421;
    border-left: 3px solid #244421;
    border-radius: 2px;
    background-color: #bbbbbb;
    margin-top: 10px;
    width: 100%;
    margin-bottom: 50px;

    &:focus {
      border-color: #396c35;
      outline: none;
  }

  &:hover{
      border-color: #4b8e46;
      transition: 0.2s ease-in-out;
  }
`;

const Label = styled.label`
    color: black;
    font-weight: bold;
    font-size: 20px;
`;

const Button = styled.button`
    margin: 25px auto 15px auto;
    background-color: #396c35;
    color: #fff;
    font-weight: bold;
    font-size: 20px;
    width: 215px;
    height: 75px;
    border: 1px black solid;
    border-radius: 5px;
    cursor: pointer;
`;

const SignupText = styled.p`
    margin: 10px 0;
`;

function LoginBox() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Email:', email);
    console.log('Senha:', password);
    navigate('/Home');
  };

  return (
    <StyledBoxContent>
      <Form onSubmit={handleSubmit}>
        <Label>
          Email:
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Digite seu email"
            required
          />
        </Label>

        <Label>
          Senha:
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Digite sua senha"
            required
          />
        </Label>

        <SignupText>
          Não tem uma conta? <Link to="/Cadastro">Cadastre-se aqui!</Link>
        </SignupText>

        <Button type="submit">Entrar</Button>
      </Form>
    </StyledBoxContent>
  );
}

export default LoginBox;
