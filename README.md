# FECAP - Fundação de Comércio Álvares Penteado

<p align="center">
<a href= "https://www.fecap.br/"><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhZPrRa89Kma0ZZogxm0pi-tCn_TLKeHGVxywp-LXAFGR3B1DPouAJYHgKZGV0XTEf4AE&usqp=CAU" alt="FECAP - Fundação de Comércio Álvares Penteado" border="0"></a>
</p>

# Tecnologias Empáticas

## RivoTrio

## Integrantes: <a href="https://www.linkedin.com/in/gabriel-davan%C3%A7o-5543992b8/">Gabriel Debastiani Davanço</a>, <a href="https://www.linkedin.com/in/guilherme-costa-2854a421a/">Guilherme Melo da Costa</a>, <a href="https://www.linkedin.com/in/isadora-t-santoma-580441335/">Dante Teixeira Santoma</a>, <a href="https://www.linkedin.com/in/ricardo-tetsuya-1b25271b0/">Ricardo Liyudi Tetsuya</a>

## Professores Orientadores: <a href="https://www.linkedin.com/in/rodrigo-da-rosa-phd/">Rodrigo da Rosa</a>, <a href="https://www.linkedin.com/in/victorbarq/">Victor Bruno Alexander Rosetti de Quiroz</a>, <a href="https://www.linkedin.com/in/professorrodnil/">Rodnil da Silva Moreira Lisboa</a>, <a href="https://www.linkedin.com/in/rafael-diogo-rossetti/">Rafael Diogo Rossetti</a>, <a href="https://www.linkedin.com/in/marcosminorunakatsugawa/">Marcos Minoru Nakatsugawa</a>

## Descrição

<p align="center">
Projeto feito por <a>RivoTrio</a> <a rel="license" href="https://creativecommons.org/licenses/by/4.0/">CC BY 4.0</a> <a href="http://pix4free.org/">Pix4free</a>
</p>


O projeto Tecnologias Empáticas utiliza visão computacional para automatizar a contagem e pesagem de alimentos não perecíveis arrecadados pelo Lideranças Empáticas. No centro da solução está uma câmera que, em tempo real, identifica os produtos, conta as unidades e registra o peso de cada doação — tudo sem intervenção manual. Esses dados são enviados a um backend desenvolvido em FastAPI, que gerencia o cadastro e login dos voluntários, armazena as informações com segurança e alimenta os dashboards da plataforma.
A interface web, construída em React, centraliza tudo o que foi arrecadado em gráficos e indicadores acessíveis em tempo real. Além do controle operacional, o sistema conta com um ranking de equipes: ao fazer login, cada voluntário seleciona o número do seu grupo, e a plataforma acumula automaticamente os quilos registrados por cada time, exibindo uma classificação ao vivo. Isso transforma a ferramenta em um elemento de engajamento, incentivando as equipes a arrecadarem cada vez mais durante a campanha.

## 🛠 Instalação

</head>
<body>

  <h2>Backend</h2>
  <ul>
    <li><code>cd backend</code></li>
    <li><code>python -m venv venv</code></li>
    <li><code>.\venv\Scripts\activate</code> (no Windows)</li>
    <li><code>pip install -r requirements.txt</code></li>
    <li><code>uvicorn app.main:app --reload</code></li>
  </ul>

  <h2>Frontend</h2>
  <ul>
    <li><code>cd frontend/webpage</code></li>
    <li><code>npm install</code></li>
    <li><code>npm run dev</code></li>
  </ul>

  <h2>Visão Computacional</h2>
  <ul>
    <li><code>cd vision/CV</code></li>
    <li><code>pip install -r requirements.txt</code></li>
    <li><code>python identificador.py</code></li>
  </ul>

</body>

