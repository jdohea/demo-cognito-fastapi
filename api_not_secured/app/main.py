from typing import Union
from fastapi import FastAPI, Header, HTTPException, Depends
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials

from mangum import Mangum
from fastapi.responses import JSONResponse
import uvicorn
from typing import Union

app = FastAPI()
handler = Mangum(app)

# Instance of HTTPBearer so that the methods are dependent on the token
# this
bearer_scheme = HTTPBearer()

@app.get("/")
def read_root(credentials: HTTPAuthorizationCredentials = Depends(bearer_scheme)):
    # Access the token from the credentials
    token = credentials.credentials
    return {"message": "Authorization header", "token": token}

@app.get("/{text}")
def read_item(text: str):
   return JSONResponse({"result": text})

@app.get("/items/{item_id}")
def read_item(item_id: int, q: Union[str, None] = None):
   return JSONResponse({"item_id": item_id, "q": q})


if __name__ == "__main__":
   uvicorn.run(app, host="0.0.0.0", port=8080)
