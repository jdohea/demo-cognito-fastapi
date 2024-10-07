aws ecr get-login-password --region eu-west-1 --profile jdohea-dev | docker login --username AWS --password-stdin 471112851635.dkr.ecr.eu-west-1.amazonaws.com/demo/fastapi 

docker build -t 471112851635.dkr.ecr.eu-west-1.amazonaws.com/demo/fastapi . 

docker push 471112851635.dkr.ecr.eu-west-1.amazonaws.com/demo/fastapi:latest