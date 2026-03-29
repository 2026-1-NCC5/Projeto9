import cv2
import numpy as np
from ultralytics import YOLO
from collections import Counter

# CARREGAR MODELO TREINADO
modelo = YOLO("best.pt")

print("Classes do modelo:", modelo.names)

# INICIAR CÂMERA
camera = cv2.VideoCapture(0)
camera.set(cv2.CAP_PROP_FRAME_WIDTH, 1280)
camera.set(cv2.CAP_PROP_FRAME_HEIGHT, 720)

if not camera.isOpened():
    print("Erro: não foi possível abrir a câmera.")
    exit()

print("Iniciando a câmera... Pressione 'q' para sair.")

while True:
    sucesso, frame = camera.read()

    if not sucesso:
        print("Erro fatal: falha ao acessar a câmera.")
        break

    # Faz a detecção no frame
    resultados = modelo(frame, stream=True)

    itens_frame = []
    frame_anotado = frame.copy()

    for resultado in resultados:
        # Desenha caixas e nomes detectados
        frame_anotado = resultado.plot()

        # MUITO IMPORTANTE:
        # transforma em array gravável para o OpenCV conseguir desenhar
        frame_anotado = np.ascontiguousarray(frame_anotado).copy()

        # Verifica se existem detecções
        if resultado.boxes is not None and len(resultado.boxes) > 0:
            classes_ids = resultado.boxes.cls.tolist()
            nomes = resultado.names

            for cls_id in classes_ids:
                itens_frame.append(nomes[int(cls_id)])

    contagem = Counter(itens_frame)

    altura_caixa = max(120, 40 + len(contagem) * 30)
    cv2.rectangle(frame_anotado, (10, 10), (500, altura_caixa), (0, 0, 0), -1)

    cv2.putText(frame_anotado, "Contagem de Itens:", (20, 35),
                cv2.FONT_HERSHEY_COMPLEX, 0.8, (0, 255, 255), 2)

    y_pos = 70
    if len(contagem) == 0:
        cv2.putText(frame_anotado, "Nenhum item detectado", (20, y_pos),
                    cv2.FONT_HERSHEY_COMPLEX, 0.7, (255, 255, 255), 2)
    else:
        for item, quantidade in contagem.items():
            texto_contagem = f"{item}: {quantidade} unidade(s)"
            cv2.putText(frame_anotado, texto_contagem, (20, y_pos),
                        cv2.FONT_HERSHEY_COMPLEX, 0.7, (255, 255, 255), 2)
            y_pos += 30
    cv2.imshow("Contador de Itens com YOLO", frame_anotado)

    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

camera.release()
cv2.destroyAllWindows()