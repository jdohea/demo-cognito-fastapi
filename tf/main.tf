terraform {


  backend "s3" {
    bucket         = "637423208349-management-terraform"
    key            = "demo-cognito-fastapi/terraform.tfstate"
    region         = "eu-west-1"
    dynamodb_table = "terraform"
  }
}

variable "AWS_ACCOUNT_ID" {
  type = string
}

provider "aws" {
  region  = "eu-west-1"
  assume_role {
    role_arn     = "arn:aws:iam::${AWS_ACCOUNT_ID}:role/terraform-administrator"
  }
}