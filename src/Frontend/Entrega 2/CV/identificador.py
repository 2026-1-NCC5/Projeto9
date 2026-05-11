import cv2
import math
import numpy as np
import requests
from datetime import datetime
from ultralytics import YOLO

# =========================
# CARREGAR MODELO
# =========================
modelo = YOLO("best.pt")

print("Classes do modelo:", modelo.names)

# =========================
# INICIAR CÂMERA
# =========================
camera = cv2.VideoCapture(0)

camera.set(cv2.CAP_PROP_FRAME_WIDTH, 1280)
camera.set(cv2.CAP_PROP_FRAME_HEIGHT, 720)

if not camera.isOpened():
    print("Erro: não foi possível abrir a câmera.")
    exit()

print("Iniciando câmera... Pressione 'q' para sair.")

# =========================
# CONFIG SERVIDOR
# =========================

URL_SERVIDOR = "http://localhost:3000/itens"

# =========================
# CALIBRAÇÃO DA PLATAFORMA
# =========================

# TROQUE PELOS PONTOS DO SEU CALIBRADOR
pontos_imagem_pixel = np.array([
    [203, 67],
    [554, 61],
    [583, 414],
    [164, 399]
], dtype="float32")

# Quadrado real de 30cm x 30cm
pontos_real_cm = np.array([
    [0, 0],
    [27, 0],
    [27, 27],
    [0, 27]
], dtype="float32")

# Matriz de conversão pixel -> cm
matriz_medidas, _ = cv2.findHomography(
    pontos_imagem_pixel,
    pontos_real_cm
)

# =========================
# VARIÁVEIS DE CONTROLE
# =========================

estado = "SEM_OBJETO"


frames_estaveis = 0
frames_sem_objeto = 0

item_atual = None

# Quantidade de frames necessários
FRAMES_ESTAVEIS = 10
FRAMES_SEM_OBJETO = 10

# Contagem total real
contagem_total = {}

# =========================
# CONTROLE DE CONFIRMAÇÃO
# =========================

item_pendente = None

historico_confirmados = []
mensagem_feedback = ""

# =========================
# FUNÇÃO DE ENVIO
# =========================

def enviar_para_servidor(item_completo):

    try:

        partes = item_completo.split()

        peso = partes[-1]

        nome_item = " ".join(partes[:-1])

        dados = {
            "item": nome_item,
            "peso": peso,
            "quantidade": 1,
            "timestamp": datetime.now().isoformat()
        }

        resposta = requests.post(
            URL_SERVIDOR,
            json=dados,
            timeout=3
        )

        print(f"ENVIADO -> {dados}")
        print(f"STATUS -> {resposta.status_code}")

        dados_resposta = resposta.json()

        print(dados_resposta)
        id_servidor = dados_resposta["id"]

        return id_servidor

    except Exception as erro:

        print(f"ERRO AO ENVIAR: {erro}")

def deletar_do_servidor(id_item):

    try:

        url_delete = f"http://localhost:3000/itens/{id_item}"

        resposta = requests.delete(url_delete)

        print(f"DELETE STATUS: {resposta.status_code}")

    except Exception as erro:

        print(f"ERRO DELETE: {erro}")

# =========================
# LOOP PRINCIPAL
# =========================
while True:

    sucesso, frame = camera.read()

    if not sucesso:
        print("Erro ao acessar câmera.")
        break

    resultados = modelo(frame, stream=True)

    itens_frame = []

    frame_anotado = frame.copy()

    # =========================
    # DETECÇÕES YOLO
    # =========================
    for resultado in resultados:

        frame_anotado = resultado.plot()
        frame_anotado = np.ascontiguousarray(frame_anotado).copy()

        if resultado.boxes is not None and len(resultado.boxes) > 0:

            nomes = resultado.names

            for box in resultado.boxes:

                cls_id = int(box.cls[0])

                nome_item = nomes[cls_id]

                itens_frame.append(nome_item)

                # =========================
                # COORDENADAS DA BOX
                # =========================
                x1, y1, x2, y2 = box.xyxy[0].tolist()

                # =========================
                # MEDIÇÃO REAL EM CM
                # =========================

                base_esq_pixel = np.array([[[x1, y2]]], dtype="float32")
                base_dir_pixel = np.array([[[x2, y2]]], dtype="float32")

                base_esq_cm = cv2.perspectiveTransform(
                    base_esq_pixel,
                    matriz_medidas
                )[0][0]

                base_dir_cm = cv2.perspectiveTransform(
                    base_dir_pixel,
                    matriz_medidas
                )[0][0]

                largura_cm = math.sqrt(
                    (base_dir_cm[0] - base_esq_cm[0])**2 +
                    (base_dir_cm[1] - base_esq_cm[1])**2
                )

                # =========================
                # CLASSIFICAÇÃO DE PESO
                # =========================

                peso = "desconhecido"

                # ARROZ
                if nome_item == "pacote de arroz":

                    if largura_cm < 22:
                        peso = "1kg"

                    elif largura_cm < 27:
                        peso = "2kg"

                    else:
                        peso = "5kg"

                # FEIJÃO
                elif nome_item == "pacote de feijão":

                    if largura_cm < 22:
                        peso = "1kg"

                    else:
                        peso = "2kg"

                # MACARRÃO
                elif nome_item == "pacote de macarrão":

                    peso = "500g"

                # AÇÚCAR
                elif nome_item == "pacote de acucar":

                    if largura_cm < 25:
                        peso = "1kg"

                    else:
                        peso = "5kg"

                # FUBÁ
                elif nome_item == "pacote de fuba":

                    if largura_cm < 22:
                        peso = "500g"

                    else:
                        peso = "1kg"

                # ÓLEO
                elif nome_item == "garrafa de oleo":

                    if largura_cm < 8:
                        peso = "900ml"

                    else:
                        peso = "1L"

                # Nome final
                nome_completo = f"{nome_item} {peso}"

                item_atual = nome_completo

                # Mostrar medida
                texto = f"{nome_completo} ({largura_cm:.1f}cm)"

                cv2.putText(
                    frame_anotado,
                    texto,
                    (int(x1), int(y1) - 10),
                    cv2.FONT_HERSHEY_SIMPLEX,
                    0.6,
                    (0, 255, 255),
                    2
                )

    # =========================
    # LÓGICA DE CONTAGEM
    # =========================

    if len(itens_frame) > 0:

        # Como passa 1 objeto por vez,
        # pegamos o primeiro detectado
        item_detectado = item_atual

        frames_sem_objeto = 0

        # =========================
        # SEM OBJETO -> DETECTOU
        # =========================
        if estado == "SEM_OBJETO":

            item_atual = item_detectado
            frames_estaveis = 1

            estado = "OBJETO_DETECTADO"

        # =========================
        # OBJETO SENDO VALIDADO
        # =========================
        elif estado == "OBJETO_DETECTADO":

            # Mesmo objeto continua
            if item_detectado == item_atual:

                frames_estaveis += 1

            else:
                # Troca de objeto
                item_atual = item_detectado
                frames_estaveis = 1

            # CONFIRMOU OBJETO
            if frames_estaveis >= FRAMES_ESTAVEIS:

                if item_atual not in contagem_total:
                    contagem_total[item_atual] = 0

                # ITEM AGORA FICA PENDENTE
                item_pendente = item_atual

                print(f"ITEM PENDENTE: {item_pendente}")

                estado = "OBJETO_CONTADO"

        # =========================
        # JÁ CONTADO
        # =========================
        elif estado == "OBJETO_CONTADO":
            pass

    # =========================
    # NENHUM OBJETO DETECTADO
    # =========================
    else:

        frames_sem_objeto += 1

        # Liberar nova contagem
        if frames_sem_objeto >= FRAMES_SEM_OBJETO:

            estado = "SEM_OBJETO"

            frames_estaveis = 0
            item_atual = None

    # =========================
    # PAINEL VISUAL
    # =========================

    altura_caixa = 250

    cv2.rectangle(frame_anotado,
                  (10, 10),
                  (500, altura_caixa),
                  (0, 0, 0),
                  -1)

    cv2.putText(frame_anotado,
                "CONTAGEM TOTAL",
                (20, 40),
                cv2.FONT_HERSHEY_COMPLEX,
                0.9,
                (0, 255, 255),
                2)

    y_pos = 80

    for item, quantidade in contagem_total.items():

        texto = f"{item}: {quantidade}"

        cv2.putText(frame_anotado,
                    texto,
                    (20, y_pos),
                    cv2.FONT_HERSHEY_COMPLEX,
                    0.7,
                    (255, 255, 255),
                    2)

        y_pos += 30

    # Estado atual
    cv2.putText(frame_anotado,
            "C=Confirmar | R=Rejeitar | U=Undo | Q=Sair",
            (20, y_pos + 60),
            cv2.FONT_HERSHEY_COMPLEX,
            0.6,
            (255, 255, 0),
            2)
    
    cv2.putText(frame_anotado,
                f"Estado: {estado}",
                (20, y_pos + 20),
                cv2.FONT_HERSHEY_COMPLEX,
                0.7,
                (0, 255, 0),
                2)

    # =========================
    # ITEM PENDENTE
    # =========================

    if item_pendente is not None:

        cv2.rectangle(
            frame_anotado,
            (600, 20),
            (1200, 140),
            (0, 0, 0),
            -1
        )

        cv2.putText(
            frame_anotado,
            "ITEM PENDENTE",
            (620, 60),
            cv2.FONT_HERSHEY_COMPLEX,
            0.9,
            (0, 255, 255),
            2
        )

        cv2.putText(
            frame_anotado,
            item_pendente,
            (620, 100),
            cv2.FONT_HERSHEY_COMPLEX,
            0.8,
            (255, 255, 255),
            2
        )

        cv2.putText(
            frame_anotado,
            "C = Confirmar | R = Rejeitar",
            (620, 130),
            cv2.FONT_HERSHEY_COMPLEX,
            0.7,
            (0, 255, 0),
            2
        )

    # =========================
    # FEEDBACK VISUAL
    # =========================

    if mensagem_feedback != "":

        cv2.rectangle(
            frame_anotado,
            (600, 160),
            (1200, 220),
            (0, 0, 0),
            -1
        )

        cv2.putText(
            frame_anotado,
            mensagem_feedback,
            (620, 200),
            cv2.FONT_HERSHEY_COMPLEX,
            0.8,
            (0, 0, 255),
            2
        )

    # =========================
    # EXIBIR TELA
    # =========================

    cv2.imshow("Contador Inteligente YOLO", frame_anotado)

    tecla = cv2.waitKey(1) & 0xFF

    # =========================
    # CONFIRMAR ITEM
    # =========================
    if tecla == ord('c'):

        if item_pendente is not None:

            # Soma contagem
            if item_pendente not in contagem_total:
                contagem_total[item_pendente] = 0

            contagem_total[item_pendente] += 1

           # Envia servidor
            id_servidor = enviar_para_servidor(item_pendente)

            # Guarda histórico completo
            historico_confirmados.append({
                "nome": item_pendente,
                "id": id_servidor
            })

            print(f"ITEM CONFIRMADO: {item_pendente}")

            item_pendente = None

    # =========================
    # REJEITAR ITEM
    # =========================
    elif tecla == ord('r'):

        if item_pendente is not None:

            print(f"ITEM REJEITADO: {item_pendente}")

            item_pendente = None

    # =========================
    # UNDO ÚLTIMO ITEM
    # =========================
    elif tecla == ord('u'):

        if len(historico_confirmados) > 0:

            ultimo = historico_confirmados.pop()

            if isinstance(ultimo, str):

                ultimo_item = ultimo
                id_item = None

            else:

                ultimo_item = ultimo["nome"]
                id_item = ultimo["id"]

                ultimo_item = ultimo["nome"]

                id_item = ultimo["id"]

            # Remove da contagem
            if ultimo_item in contagem_total:

                contagem_total[ultimo_item] -= 1

                # Remove item zerado
                if contagem_total[ultimo_item] <= 0:
                    del contagem_total[ultimo_item]

            # Remove do servidor
            if id_item is not None:
                deletar_do_servidor(id_item)

            mensagem_feedback = f"UNDO: {ultimo_item}"

            print(f"UNDO REALIZADO: {ultimo_item}")

        else:

            mensagem_feedback = "Nada para desfazer"

    # =========================
    # FECHAR
    # =========================
    elif tecla == ord('q'):
        break

# =========================
# FINALIZAÇÃO
# =========================
camera.release()
cv2.destroyAllWindows()