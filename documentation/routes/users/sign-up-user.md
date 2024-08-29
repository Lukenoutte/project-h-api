# Sign Up User

This route creates a new user in the "users" table.

**Rote:** POST - /user/signup

**Visibility:** Public

**Body:** { 
    
    name: string,
    email: string,
    password: string
    
}

**Return:** { 
    
    id: number,
    name: string,
    email: string
    
}