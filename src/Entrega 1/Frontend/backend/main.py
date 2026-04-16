from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from datetime import datetime
from typing import List, Dict

app = FastAPI(title="LE - Contagem Inteligente de Alimentos")

class ContagemItem(BaseModel):
    equipa_id: int
    tipo_produto: str
    peso: float
    contagem: int
    confianca: float

db_eventos =[] #Por enquanto vai ficar na memória, mas uma hora vai ter que subir para o postgre

#Endpoints

@app.post("/registrar-contagem/")
async def registrar_contagem(item: ContagemItem):

    novo_evento = item.dict()
    novo_evento["timestamp"] = datetime.now()

    db_eventos.append(novo_evento)

    print(f"Recebido: {item.tipo_produto} (Confiança: {item.confianca}) da Equipe {item.equipa_id}")

    return {
        "status": "sucesso", 
        "mensagem": "Contagem registrada", 
        "data": novo_evento["timestamp"]
     }

@app.get("/relatorio/equipe/{equipa_id}")
async def obter_relatorio_equipe(equipa_id: int):
    eventos_da_equipe = [e for e in db_eventos if e["equipa_id"] == equipa_id]

    if not eventos_da_equipe:
        return {"mensagem": f"Nenhum dado encontrado da equipe {equipa_id}", "totais": {}}
    
    resumo = {}

    for ev in eventos_da_equipe:
        tipo = ev["tipo_produto"]
        resumo[tipo] = resumo.get(tipo, 0) + ev["contagem"]

    return {
        "equipa_id": equipa_id,
        "total_itens_geral": sum(resumo.values()),
        "resumo_por_produto": resumo,
        "historico_detalhado": eventos_da_equipe
    }

@app.get("/eventos/todos/")
async def ver_eventos():
    return {
        "total_registgros": len(db_eventos),
        "dados": db_eventos
    }