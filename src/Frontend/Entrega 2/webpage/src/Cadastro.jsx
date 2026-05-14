import { useState } from 'react';
import styled from 'styled-components';

const StyledBoxContent = styled.div`
    border: 2px solid black;
    max-width: 800px;
    width: 90%; 
    margin: 40px auto; 
    padding: 40px;
    display: flex;
    flex-direction: column;
    align-items: center; 
`;

const TopicContainer = styled.div`
    display: flex;
    justify-content: center; 
    align-items: center;
    width: 100%;
    margin-top: 20px;
    margin-bottom: 40px;
`;

const TopicText = styled.h2`
    text-align: center;
    margin: 0;
    font-size: 42px;
    width: 100%; 
`;
const Form = styled.form`
    display: flex;
    flex-direction: column;  
`;

const Input = styled.input`
    padding: 10px;
    border-bottom: 4px solid #000;
    border-left: 3px solid #000;
    border-radius: 2px;
    background-color: #bbbbbb;
    color: #000;
    margin-top: 10px;
    width: 50%;
    display: flex;
    margin-bottom: 50px;

    &:focus {
        border-color: #1a946f;
        outline: none;
    }

    &:hover{
        border-color: #125c46;
        transition: 0.2s ease-in-out;
    }
`;

const Label = styled.label`
    color: black;
    font-weight: bold;
    font-size: 20px;
`;

const Button = styled.button`
margin: auto;
margin-top: 25px;
margin-bottom:15px;
background-color: #396c35;
color: #fff;
font-weight: bold;
font-size: 20px;
width: 215px;
height: 75px;
border: 1px black solid;
border-radius: 5px;

&:hover{
    color: #ffff;
    background-color:#6c9f68;
    transition: 0.2s ease-in-out;
    cursor: pointer;
}
`;
function Cadastro() {
  const navigate = useNavigate();

  const [PrimeiroNome, setPrimeiroNome] = useState('');
  const [UltimoNome, setUltimoNome] = useState('');
  const [Email, setEmail] = useState('');
  const [Senha, setSenha] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('user_name', PrimeiroNome);
    localStorage.setItem('user_lastname', UltimoNome);
    localStorage.setItem('user_email', Email);
    navigate('/perfil');
  };

  return (
    <StyledBoxContent>
      <TopicContainer>
        <TopicText>Sobre Você</TopicText>
      </TopicContainer>
      <Form onSubmit={handleSubmit}>
        <Label>
          Primeiro Nome
          <Input
            type="text"
            value={PrimeiroNome}
            onChange={(e) => setPrimeiroNome(e.target.value)}
            required
          />
        </Label>
        <Label>
          Ultimo Nome
          <Input
            type="text"
            value={UltimoNome}
            onChange={(e) => setUltimoNome(e.target.value)}
            required
          />
        </Label>
        <Label>
          Email
          <Input
            type="email"
            value={Email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Label>
        <Button type="submit">Enviar</Button>
      </Form>
    </StyledBoxContent>
  );
}
export default Cadastro;
