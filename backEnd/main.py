from types import new_class
from fastapi import (
    FastAPI,
    Response,
    Request,
    Query,
    Header
)
from fastapi.responses import (
    HTMLResponse,
    FileResponse,
    StreamingResponse
)
from fastapi.middleware.cors import CORSMiddleware
from fastapi.templating import Jinja2Templates
from fastapi.staticfiles import StaticFiles
from fastapi.responses import HTMLResponse
from fastapi.templating import Jinja2Templates

from tortoise.contrib.fastapi import register_tortoise
import io
import pandas as pd
from typing import Optional

import argparse
from pathlib import Path
import time
import random as ran
from pydantic import (
    BaseModel,
    Field,
    conint
)
import datetime
import calendar
import copy
import json
import uuid
from faker import Faker

fake = Faker('zh_TW')

#region 設定 Fastapi

#建立 app 實例
app = FastAPI(
    title="EMS-fastapi 模組",
    # docs_url="/documentation", #重新導向 /docs 的url
    # redoc_url=None, #關閉 /redoc 功能
)
#解決 CORS 問題
app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# #設定前端文件:靜態文件與HTML檔
# app.mount("/static", StaticFiles(directory="static"), name="static")
# templates = Jinja2Templates(directory="templates")

# 確保 UUID4 亂數產生器每次產生都是同一批
uuid_ran = ran.Random()
uuid_ran.seed(0)
uuid4 = uuid.uuid4
uuid.uuid4 = lambda: uuid.UUID(int=uuid_ran.getrandbits(128))

#region 登入 login
class StockLogin(BaseModel):
    User: str
    Password: str

class StockDashboardLogin(BaseModel):
    data: StockLogin

@app.post("/stock/login")
async def stock_login(stockDashboardLogin: StockDashboardLogin):
    if (stockDashboardLogin.data.User == "1") and (stockDashboardLogin.data.Password == "1"):
        mode = "view"
    else:
        mode = "manager"
    return {
        "status": True,
        "message": '',
        "data": {
            "mode": mode,  # view/manager
            "token":str(uuid.uuid4()),
        }
    }
#endregion 登入 login


#region 帳號管理
@app.get("/stock/getData/accountManagement")
async def getData_accountManagement():
    return {
        "status":True,
        "data":[{
            "ID": i + 1,
            "User": fake.name_male(),
            "Password": fake.word(),
            "Authority": ran.randint(1,2),
            "Enable": ran.randint(0,1)
        }
        for i in range(30)
        ]
    }
#endregion 帳號管理


#region 客戶清單 
@app.get("/stock/getData/customerList")
async def getData_customerList():
    return {
        "status":True,
        "data":[{
            "CustomerID": i + 1,
            "Company": fake.company(),
            "Name": fake.name_male(),
            "Phone": "2",
            "GUINumber":fake.word(),
            'FAX': ran.randint(1,10000),
            "Address":fake.address()
        }
        for i in range(50)
        ]
    }

#endregion 客戶清單 

#region 庫存清單 品名/顏色
@app.post("/stock/getItemData/inventoryList")
async def getItemData_inventoryList():
    return {
        "status":True,
        "data":{
            "ProductName":[
                fake.word() 
                for i in range(5)
            ],
            "ColorName":[
                fake.color_name() 
                for i in range(5)
            ],
            "ShipStatus":["庫存","已出貨"]
        }
    }
#endregion 庫存清單 品名/顏色

#region 庫存清單
@app.post("/stock/getData/inventoryList")
async def getData_inventoryList():
    return {
        "status":True,
        "data":[
            {
                "WeightID": i + 1,
                "ProductName": fake.name(),
                "ColorName": fake.color_name(),
                "BatchName": "778",
                "SerialID": "2",
                "Count":"ghg",
                "NetWeight":ran.randint(0,10),
                "ShipStatus":ran.randint(0,1)
            }
            for i in range(50)
        ]
    }

#endregion 庫存清單

#region 出貨管理
@app.post("/stock/getData/shipmentManagement")
async def getData_shipmentManagement():
    return {
        "status":True,
        "data":{
            "company":[{
                "CustomerID": i + 1,
                "Company": fake.company(),
                "Name": fake.name(),
                "Phone": "2",
                "GUINumber":"3453453",
                'FAX': ran.randint(1,10000),
                "Address":fake.address(),
            }
            for i in range(50)
            ],
            "stock":[{
                "WeightID": i + 1,
                "ProductName": "Cynthia01",
                "ColorName": fake.color_name(),
                "BatchName": "1",
                "SerialID": "2",
                "Count":"ghg",
                "NetWeight":"juh",
                "ShipStatus":ran.randint(0,1)
            }
            for i in range(50)
            ]
        }
    }

#endregion 出貨管理


#region 出貨管理 確認
@app.post("/stock/setData/shipmentManagement")
async def getData_set_shipmentManagement():
      return {
        "status":True,
      }
#endregion 出貨管理 確認

#region 出貨歷史查詢
@app.post("/stock/getData/shipmentHistorySearchList")
async def getData_shipmentHistorySearch():
    return {
        "status":True,
        "data":[
        {
            "ShipID": i+ 1,
            "ShipNumber": "Cynthia",
            "SerialID": "454",
            "ProductName": fake.words(),
            "ColorName":fake.color_name(),
            "Company":fake.company(),
            "ShipDate":fake.unix_time()
        }
        for i in range(50)
        ]
    }
#endregion 出貨歷史查詢

#endregion stock data
# -------------------

#定義啟動方式
if __name__=='__main__':
    import uvicorn
    import os
    
    #獲取本檔案檔名並運行伺服器 (fastapi)
    thisFileName_str=os.path.basename(__file__).replace('.py','')
    
    #獲取服務設定
    config_dict=None
    with open(Path(__file__).parent / 'config.json') as f:
        config_dict = json.load(f)
    
    print('[INFO] docs url:',f"http://{config_dict['host']}:{config_dict['port']}/docs")
    
    #執行服務
    uvicorn.run(
        f'{thisFileName_str}:app',
        host=config_dict['host'],
        port=config_dict['port'],
        # reload=True,
        debug=True,
    )