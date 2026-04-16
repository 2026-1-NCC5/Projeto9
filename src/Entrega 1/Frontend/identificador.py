import cv2
import numpy as np
from ultralytics import YOLO
import requests # Biblioteca para enviar dados ao backend
import time

ultimo_envio = {}

# --- CONFIGURAÇÕES ---
BACKEND_URL = "http://127.0.0.1:8000/registrar-contagem/"
EQUIPE_ATIVA = 1  # ID da equipe que está a operar no momento
PESO_PADRAO = {   # Estimativa de peso por categoria (exigência do projeto)
    "Arroz": 1.0,
    "Feijao": 1.0,
    "Outros": 0.5
}

# CARREGAR MODELO
modelo = YOLO("best.pt")

# Variável para evitar duplicidade (guarda os IDs já contados nesta sessão)
ids_enviados = set()

def enviar_ao_backend(classe_nome, confianca):
    """Envia a contagem de um item individual para o FastAPI."""
    payload = {
        "equipa_id": EQUIPE_ATIVA,
        "tipo_produto": classe_nome,
        "peso": PESO_PADRAO.get(classe_nome, 0.2),
        "contagem": 1,
        "confianca": float(confianca)
    }
    try:
        response = requests.post(BACKEND_URL, json=payload)
        if response.status_code == 200:
            print(f"✅ {classe_nome} registrado com sucesso!")
        else:
            print(f"❌ Erro ao registrar: {response.text}")
    except Exception as e:
        print(f"⚠️ Servidor offline: {e}")

# INICIAR CÂMERA
camera = cv2.VideoCapture(0)
camera.set(cv2.CAP_PROP_FRAME_WIDTH, 1280)
camera.set(cv2.CAP_PROP_FRAME_HEIGHT, 720)

print("Iniciando Integração... Pressione 'q' para sair.")

while True:
    sucesso, frame = camera.read()
    if not sucesso: break

    # .track mantém o ID do objeto entre os frames (persist=True)
    resultados = modelo.track(frame, persist=True, conf=0.5)

    print(f"Quantidade de resultados: {len(resultados)}")  # ← aqui

    frame_anotado = frame.copy()

    for resultado in resultados:
        frame_anotado = resultado.plot()
        frame_anotado = np.ascontiguousarray(frame_anotado)

        print(f"resultado.boxes: {resultado.boxes}") 
    
        if resultado.boxes is not None:
            print(f"Boxes detectadas: {len(resultado.boxes)}")
            print(f"IDs: {resultado.boxes.id}")
    
            classes_ids = resultado.boxes.cls.int().tolist()
            confiancas = resultado.boxes.conf.tolist()
            nomes = resultado.names

            print(f"Classes: {classes_ids}, Confianças: {confiancas}")
    
            for cls_id, conf in zip(classes_ids, confiancas):  # ← indentado aqui dentro
                nome_classe = nomes[cls_id]
                agora = time.time()
    
                if nome_classe not in ultimo_envio or (agora - ultimo_envio[nome_classe]) > 3:
                    enviar_ao_backend(nome_classe, conf)
                    ultimo_envio[nome_classe] = agora
    
    # Exibe informações na tela (opcional)
    cv2.putText(frame_anotado, f"Equipe: {EQUIPE_ATIVA} | Itens: {len(ids_enviados)}", 
                (20, 50), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 0), 2)

    cv2.imshow("LE - Contagem Inteligente (Integrado)", frame_anotado)

    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

camera.release()
cv2.destroyAllWindows()