# Refresh Token

This route queries the "refresh_tokens" table to check if the provided "refreshToken" exists, validates it, and returns a new accessToken.

**Rote:** PUT - /token/refresh

**Visibility:** Private (You need the access key)

**Body:** { 
    
    refreshToken: string
    
}
