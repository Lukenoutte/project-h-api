# Find Store

This route retrieves the store associated with the user, using the user ID from the token.

**Rote:** GET - /store

**Visibility:** Private (You need the access key)

**Return:** { 
    
    id: number,
    name: string,
    category: string,
    subdomain: string,
    masterId: number
    
}