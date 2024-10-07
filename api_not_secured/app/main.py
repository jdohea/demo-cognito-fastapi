from typing import Union
from fastapi import FastAPI, Header, HTTPException
from mangum import Mangum
from fastapi.responses import JSONResponse
import uvicorn
from typing import Union

app = FastAPI()
handler = Mangum(app)

@app.get("/")
def read_root(authorization: str = Header(None)):
   return {"message": "Authorization header, ", "token": authorization}

@app.get("/{text}")
def read_item(text: str):
   return JSONResponse({"result": text})

@app.get("/items/{item_id}")
def read_item(item_id: int, q: Union[str, None] = None):
   return JSONResponse({"item_id": item_id, "q": q})



if __name__ == "__main__":
   uvicorn.run(app, host="0.0.0.0", port=8080)
