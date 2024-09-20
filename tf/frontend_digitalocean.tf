terraform {
  required_providers {
    digitalocean = {
      source  = "digitalocean/digitalocean"
      version = "~> 2.0"
    }
  }
}

locals {
  digital_ocean_environment = "demo"
}

resource "digitalocean_project" "web_app_project" {
  name        = "${terraform.workspace}-environment"
  description = "A project to demonstrate refactors"
  environment = local.digital_ocean_environment
  is_default = false
}


data "aws_secretsmanager_secret" "digital_ocean_token" {
  name = "digital_ocean_token"
}

variable "BACKEND_DOMAIN" {
  type = string 
}

provider "digitalocean" {
  token = data.aws_secretsmanager_secret.digital_ocean_token.secret_string
}

resource "digitalocean_app" "frontend_static_app" {
  spec {
    name   = "${terraform.workspace}-frontend-static-site"
    region = "lon"
    
    static_site {
      source_dir = "/frontend"
      name          = "frontend"
      build_command = "npm run build"
      github {
        repo = "jdohea/demo-cognito-fastapi"
        branch         = "${terraform.workspace}"
        deploy_on_push = true
      }
    }
    env {
        key   = "BACKEND_DOMAIN"
        value = var.BACKEND_DOMAIN
      }
  }
  
  project_id = digitalocean_project.web_app_project.id
}