# Sign In

This route will check if a user with the provided email exists in the "users" table; if found, it will compare the provided password with the one in the database. If the password is correct, it will return a refresh token and an access token.

**Rote:** POST - /signin

**Visibility:** Public

**Body:** { 
    
    email: string,
    password: string
    
}
