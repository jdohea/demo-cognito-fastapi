resource "aws_cognito_user_pool" "jarvio_pool" {
    name = "jarvio-user-pool"
    username_attributes = ["email"]
    mfa_configuration = "OFF"
    auto_verified_attributes = ["email"]
    lifecycle {
        prevent_destroy = true
    }
    #todo email configuration to not use cognito's default
}

resource "aws_cognito_user_pool_domain" "main" {
  domain       = "jarvio-auth"
  user_pool_id = aws_cognito_user_pool.jarvio_pool.id
  
}

resource "aws_cognito_user_pool_client" "frontend" {
    name = "jarvio-user-pool-client-frontend"
    user_pool_id = aws_cognito_user_pool.jarvio_pool.id
    generate_secret = false
    allowed_oauth_flows = ["code"]
    allowed_oauth_scopes = ["email", "openid", "profile"]
    allowed_oauth_flows_user_pool_client = true
    callback_urls = ["http://localhost:3000"]
    logout_urls = ["http://localhost:3000" ]
    supported_identity_providers = ["COGNITO"]
    explicit_auth_flows = ["ALLOW_USER_PASSWORD_AUTH", "ALLOW_REFRESH_TOKEN_AUTH", "ALLOW_USER_SRP_AUTH"]

}

# resource "aws_cognito_user_pool_client" "backend" {
#     name = "jarvio-user-pool-client-frontend"
#     user_pool_id = aws_cognito_user_pool.jarvio_pool.id
#     generate_secret = true
#     refresh_token_validity = 600
#     explicit_auth_flows = ["ALLOW_USER_PASSWORD_AUTH", "ALLOW_REFRESH_TOKEN_AUTH", "ALLOW_USER_SRP_AUTH"]
#     allowed_oauth_flows = ["code"]
#     allowed_oauth_scopes = ["email", "openid", "profile"]
# }