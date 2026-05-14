import { useState, useRef } from 'react';
import styled from 'styled-components';
import Header from '../../ComponentesGerais/Header.jsx';
import SideNav from '../../ComponentesGerais/SideNav.jsx';

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100%;
`;

const ContentArea = styled.div`
  display: flex;
  flex: 1; 
`;

const MainContent = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 50px;
  overflow-y: auto; 
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 400px;
  gap: 15px;
  margin-top: 20px;
`;

const Label = styled.label`
  display: flex;
  flex-direction: column;
  font-weight: bold;
  font-size: 14px;
  color: #333;
`;

const Input = styled.input`
  padding: 10px;
  margin-top: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
`;

const SubmitButton = styled.button`
  padding: 12px;
  background-color: #396c35;
  color: #fff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  margin-top: 10px;
  &:hover {
    background-color: #2d5429;
  }
`;

const styles = {
  imageWrapper: {
    width: '150px',
    height: '150px',
    borderRadius: '50%',
    overflow: 'hidden',
    border: '4px solid #396c35',
    marginBottom: '15px',
  },
  profileImg: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  changeBtn: {
    padding: '8px 16px',
    cursor: 'pointer',
    borderRadius: '8px',
    border: 'none',
    backgroundColor: '#396c35',
    color: 'white',
    fontWeight: 'bold',
  },
};

const Perfil = () => {
  // Define missing refs and state
  const fileInputRef = useRef(null);
  const [image, setImage] = useState('https://via.placeholder.com/150');

  const [formData, setFormData] = useState({
    primeiroNome: localStorage.getItem('user_name') || '',
    ultimoNome: localStorage.getItem('user_lastname') || '',
    email: localStorage.getItem('user_email') || '',
  });

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setImage(URL.createObjectURL(file));
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Perfil atualizado!');
  };

  return (
    <PageWrapper>
      <Header />
      <ContentArea>
        <SideNav />
        <MainContent>
          <div style={styles.imageWrapper}>
            <img src={image} alt="Profile" style={styles.profileImg} />
          </div>
          <input
            type="file"
            style={{ display: 'none' }}
            ref={fileInputRef}
            onChange={handleImageChange}
            accept="image/*"
          />
          <button
            type="button"
            onClick={() => fileInputRef.current.click()}
            style={styles.changeBtn}
          >
            Mudar sua foto
          </button>

          <Form onSubmit={handleSubmit}>
            <Label>
              Primeiro Nome
              <Input
                name="primeiroNome"
                type="text"
                value={formData.primeiroNome}
                onChange={handleInputChange}
                required
              />
            </Label>
            <Label>
              Ultimo Nome
              <Input
                name="ultimoNome"
                type="text"
                value={formData.ultimoNome}
                onChange={handleInputChange}
                required
              />
            </Label>
            <Label>
              Email
              <Input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </Label>
            <SubmitButton type="submit">Enviar</SubmitButton>
          </Form>
        </MainContent>
      </ContentArea>
    </PageWrapper>
  );
};

export default Perfil;
