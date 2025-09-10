# api.py
from fastapi import FastAPI, HTTPException
from fastapi.responses import JSONResponse
import requests
import re

app = FastAPI(title="CNPJ API")

PRIMARY_URL = "https://minhareceita.org/{cnpj}"
FALLBACK_URL = "https://receitaws.com.br/v1/cnpj/{cnpj}"  # limite ~3 req/min

def _clean_cnpj(cnpj: str) -> str:
    return re.sub(r"\D", "", (cnpj or "").strip())

def _fetch_json(url: str, timeout: int = 12) -> dict:
    resp = requests.get(url, timeout=timeout, headers={"Accept": "application/json"})
    resp.raise_for_status()
    return resp.json()

@app.get("/api/v1/{cnpj}", tags=["CNPJ"])
def cnpj_get(cnpj: str):
    cnpj_num = _clean_cnpj(cnpj)
    if len(cnpj_num) != 14:
        raise HTTPException(status_code=400, detail="CNPJ inválido: deve conter 14 dígitos.")

    # 1) Tenta Minha Receita (primário)
    try:
        data = _fetch_json(PRIMARY_URL.format(cnpj=cnpj_num))
        return JSONResponse({"source": "minhareceita", "data": data})
    except requests.RequestException as e_primary:
        primary_err = str(e_primary)

    # 2) Fallback: Receitaws (use com moderação – limite 3 req/min)
    try:
        data = _fetch_json(FALLBACK_URL.format(cnpj=cnpj_num))
        return JSONResponse({"source": "receitaws", "data": data})
    except requests.RequestException as e_fallback:
        # Se ambos falharem, retorna 502 com detalhes dos erros
        raise HTTPException(
            status_code=502,
            detail={
                "message": "Falha ao consultar CNPJ em ambas as fontes.",
                "minhareceita_error": primary_err,
                "receitaws_error": str(e_fallback),
            },
        )

@app.get('/', tags=["Root"])
def root():
    return {"message": "Bem-vindo à API CNPJ. Use o endpoint /api/v1/{cnpj} para obter informações sobre um CNPJ específico."}
