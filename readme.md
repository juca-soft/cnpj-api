
# CNPJ API

API simples para consulta de informações de empresas brasileiras a partir do **CNPJ**.
O serviço retorna dados em formato JSON e pode ser consumido em qualquer aplicação web, mobile ou backend.

---

## Deploy

A API está preparada para rodar no **[Vercel](https://vercel.com/)**.
Após configurar o projeto, basta realizar o deploy com:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/juca-soft/cnpj-api)


---

## Endpoints

### **Raiz**

```http
GET /
```

**Resposta:**

```json
{
  "message": "Bem-vindo à API CNPJ. Use o endpoint /api/v1/{cnpj} para obter informações sobre um CNPJ específico."
}
```

---

### **Consulta por CNPJ**

```http
GET /api/v1/{cnpj}
```

* `{cnpj}` deve ser informado com **14 dígitos numéricos** (pode passar com pontos e barras, será normalizado).
* Retorna um JSON com os dados da empresa.

---

## Exemplos de Resposta

### Exemplo 1

```json
{
  "source": "minhareceita",
  "data": {
    "uf": "SP",
    "cep": "04538133",
    "qsa": [
      {
        "pais": "ESTADOS UNIDOS",
        "nome_socio": "GOOGLE INTERNATIONAL LLC",
        "codigo_pais": 249,
        "faixa_etaria": "Não se aplica",
        "cnpj_cpf_do_socio": "06947283000160",
        "qualificacao_socio": "Sócio Pessoa Jurídica Domiciliado no Exterior",
        "codigo_faixa_etaria": 0,
        "data_entrada_sociedade": "2004-09-01",
        "identificador_de_socio": 1,
        "cpf_representante_legal": "***746608**",
        "nome_representante_legal": "YUN KI LEE",
        "codigo_qualificacao_socio": 37,
        "qualificacao_representante_legal": "Procurador",
        "codigo_qualificacao_representante_legal": 17
      },
      {
        "pais": "ESTADOS UNIDOS",
        "nome_socio": "GOOGLE LLC",
        "codigo_pais": 249,
        "faixa_etaria": "Não se aplica",
        "cnpj_cpf_do_socio": "06947284000104",
        "qualificacao_socio": "Sócio Pessoa Jurídica Domiciliado no Exterior",
        "codigo_faixa_etaria": 0,
        "data_entrada_sociedade": "2004-09-01",
        "identificador_de_socio": 1,
        "cpf_representante_legal": "***746608**",
        "nome_representante_legal": "YUN KI LEE",
        "codigo_qualificacao_socio": 37,
        "qualificacao_representante_legal": "Procurador",
        "codigo_qualificacao_representante_legal": 17
      },
      {
        "pais": null,
        "nome_socio": "FABIO JOSE SILVA COELHO",
        "codigo_pais": null,
        "faixa_etaria": "Entre 61 a 70 anos",
        "cnpj_cpf_do_socio": "***133807**",
        "qualificacao_socio": "Administrador",
        "codigo_faixa_etaria": 7,
        "data_entrada_sociedade": "2014-08-26",
        "identificador_de_socio": 2,
        "cpf_representante_legal": "***000000**",
        "nome_representante_legal": "",
        "codigo_qualificacao_socio": 5,
        "qualificacao_representante_legal": "Não informada",
        "codigo_qualificacao_representante_legal": 0
      }
    ],
    "cnpj": "06990590000123",
    "pais": null,
    "email": null,
    "porte": "DEMAIS",
    "bairro": "ITAIM BIBI",
    "numero": "3477",
    "ddd_fax": "1137971128",
    "municipio": "SAO PAULO",
    "logradouro": "BRIG FARIA LIMA",
    "cnae_fiscal": 6319400,
    "codigo_pais": null,
    "complemento": "ANDAR 17A20 TSUL 2 17A20",
    "codigo_porte": 5,
    "razao_social": "GOOGLE BRASIL INTERNET LTDA.",
    "nome_fantasia": "",
    "capital_social": 200000000,
    "ddd_telefone_1": "1123958400",
    "ddd_telefone_2": "",
    "opcao_pelo_mei": null,
    "codigo_municipio": 7107,
    "cnaes_secundarios": [
      {
        "codigo": 4751201,
        "descricao": "Comércio varejista especializado de equipamentos e suprimentos de informática"
      },
      {
        "codigo": 6201501,
        "descricao": "Desenvolvimento de programas de computador sob encomenda"
      },
      {
        "codigo": 6202300,
        "descricao": "Desenvolvimento e licenciamento de programas de computador customizáveis"
      },
      {
        "codigo": 6311900,
        "descricao": "Tratamento de dados, provedores de serviços de aplicação e serviços de hospedagem na internet"
      },
      {
        "codigo": 6462000,
        "descricao": "Holdings de instituições não-financeiras"
      },
      {
        "codigo": 7319004,
        "descricao": "Consultoria em publicidade"
      },
      {
        "codigo": 8299799,
        "descricao": "Outras atividades de serviços prestados principalmente às empresas não especificadas anteriormente"
      }
    ],
    "natureza_juridica": "Sociedade Empresária Limitada",
    "regime_tributario": [
      {
        "ano": 2015,
        "cnpj_da_scp": null,
        "forma_de_tributacao": "LUCRO REAL",
        "quantidade_de_escrituracoes": 1
      },
      {
        "ano": 2016,
        "cnpj_da_scp": null,
        "forma_de_tributacao": "LUCRO REAL",
        "quantidade_de_escrituracoes": 1
      },
      {
        "ano": 2017,
        "cnpj_da_scp": null,
        "forma_de_tributacao": "LUCRO REAL",
        "quantidade_de_escrituracoes": 1
      },
      {
        "ano": 2018,
        "cnpj_da_scp": null,
        "forma_de_tributacao": "LUCRO REAL",
        "quantidade_de_escrituracoes": 1
      },
      {
        "ano": 2019,
        "cnpj_da_scp": null,
        "forma_de_tributacao": "LUCRO REAL",
        "quantidade_de_escrituracoes": 1
      },
      {
        "ano": 2020,
        "cnpj_da_scp": null,
        "forma_de_tributacao": "LUCRO REAL",
        "quantidade_de_escrituracoes": 1
      },
      {
        "ano": 2021,
        "cnpj_da_scp": null,
        "forma_de_tributacao": "LUCRO REAL",
        "quantidade_de_escrituracoes": 1
      },
      {
        "ano": 2022,
        "cnpj_da_scp": null,
        "forma_de_tributacao": "LUCRO REAL",
        "quantidade_de_escrituracoes": 1
      },
      {
        "ano": 2023,
        "cnpj_da_scp": null,
        "forma_de_tributacao": "LUCRO REAL",
        "quantidade_de_escrituracoes": 1
      }
    ],
    "situacao_especial": "",
    "opcao_pelo_simples": null,
    "situacao_cadastral": 2,
    "data_opcao_pelo_mei": null,
    "data_exclusao_do_mei": null,
    "cnae_fiscal_descricao": "Portais, provedores de conteúdo e outros serviços de informação na internet",
    "codigo_municipio_ibge": 3550308,
    "data_inicio_atividade": "2004-09-01",
    "data_situacao_especial": null,
    "data_opcao_pelo_simples": null,
    "data_situacao_cadastral": null,
    "nome_cidade_no_exterior": "",
    "codigo_natureza_juridica": 2062,
    "data_exclusao_do_simples": null,
    "motivo_situacao_cadastral": 0,
    "ente_federativo_responsavel": "",
    "identificador_matriz_filial": 1,
    "qualificacao_do_responsavel": 5,
    "descricao_situacao_cadastral": "ATIVA",
    "descricao_tipo_de_logradouro": "AVENIDA",
    "descricao_motivo_situacao_cadastral": "SEM MOTIVO",
    "descricao_identificador_matriz_filial": "MATRIZ"
  }
}
```

---

### Exemplo 2

```json
{
  "source": "receitaws",
  "data": {
    "abertura": "01/09/2004",
    "situacao": "ATIVA",
    "tipo": "MATRIZ",
    "nome": "GOOGLE BRASIL INTERNET LTDA.",
    "porte": "DEMAIS",
    "natureza_juridica": "206-2 - Sociedade Empresária Limitada",
    "atividade_principal": [
      {
        "code": "63.19-4-00",
        "text": "Portais, provedores de conteúdo e outros serviços de informação na internet"
      }
    ],
    "atividades_secundarias": [
      {
        "code": "47.51-2-01",
        "text": "Comércio varejista especializado de equipamentos e suprimentos de informática"
      },
      {
        "code": "62.01-5-01",
        "text": "Desenvolvimento de programas de computador sob encomenda"
      },
      {
        "code": "62.02-3-00",
        "text": "Desenvolvimento e licenciamento de programas de computador customizáveis"
      },
      {
        "code": "63.11-9-00",
        "text": "Tratamento de dados, provedores de serviços de aplicação e serviços de hospedagem na internet"
      },
      {
        "code": "64.62-0-00",
        "text": "Holdings de instituições não-financeiras"
      },
      {
        "code": "73.19-0-04",
        "text": "Consultoria em publicidade"
      },
      {
        "code": "82.99-7-99",
        "text": "Outras atividades de serviços prestados principalmente às empresas não especificadas anteriormente"
      }
    ],
    "qsa": [
      {
        "nome": "GOOGLE LLC",
        "qual": "37-Sócio Pessoa Jurídica Domiciliado no Exterior",
        "pais_origem": "ESTADOS UNIDOS",
        "nome_rep_legal": "YUN KI LEE",
        "qual_rep_legal": "17-Procurador"
      },
      {
        "nome": "GOOGLE INTERNATIONAL LLC",
        "qual": "37-Sócio Pessoa Jurídica Domiciliado no Exterior",
        "pais_origem": "ESTADOS UNIDOS",
        "nome_rep_legal": "YUN KI LEE",
        "qual_rep_legal": "17-Procurador"
      },
      {
        "nome": "FABIO JOSE SILVA COELHO",
        "qual": "05-Administrador"
      }
    ],
    "logradouro": "AV BRIG FARIA LIMA",
    "numero": "3477",
    "complemento": "ANDAR 17A20 TSUL 2 17A20",
    "municipio": "SAO PAULO",
    "bairro": "ITAIM BIBI",
    "uf": "SP",
    "cep": "04.538-133",
    "email": "googlebrasil@google.com",
    "telefone": "(11) 2395-8400",
    "data_situacao": "01/09/2004",
    "cnpj": "06.990.590/0001-23",
    "ultima_atualizacao": "2025-09-09T21:18:39.169Z",
    "status": "OK",
    "fantasia": "",
    "efr": "",
    "motivo_situacao": "",
    "situacao_especial": "",
    "data_situacao_especial": "",
    "capital_social": "200000000.00",
    "simples": {
      "optante": false,
      "data_opcao": null,
      "data_exclusao": null,
      "ultima_atualizacao": "2025-07-13T23:59:59.000Z"
    },
    "simei": {
      "optante": false,
      "data_opcao": null,
      "data_exclusao": null,
      "ultima_atualizacao": "2025-07-13T23:59:59.000Z"
    },
    "extra": {},
    "billing": {
      "free": true,
      "database": true
    }
  }
}
```

---

## Tecnologias

* [FastAPI](https://fastapi.tiangolo.com/)
* [Requests](https://docs.python-requests.org/)
* [Vercel](https://vercel.com/) (deploy serverless)

---

## Instalação Local

Se quiser rodar em ambiente local:

```bash
git clone https://github.com/juca-soft/cnpj-api.git
cd cnpj-api

# cria o ambiente
python -m venv venv
source venv/bin/activate  # Linux/Mac
venv\Scripts\activate     # Windows

# instala dependências
pip install -r requirements.txt

# roda localmente
uvicorn api:app --reload
```

