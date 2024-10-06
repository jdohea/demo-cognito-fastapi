import os

import requests
from fastapi import Depends, HTTPException
from starlette.status import HTTP_403_FORBIDDEN

from app.JWTBearer import JWKS, JWTBearer, JWTAuthorizationCredentials

jwks = JWKS.parse_obj(
    requests.get(
        "https://cognito-idp.eu-west-1.amazonaws.com/eu-west-1_MvfH7gb9W/.well-known/jwks.json"
    ).json()
)

auth = JWTBearer(jwks)


async def get_current_user(
    credentials: JWTAuthorizationCredentials = Depends(auth)
) -> str:
    try:
        return credentials.claims["username"]
    except KeyError:
        HTTPException(status_code=HTTP_403_FORBIDDEN, detail="Username missing")
