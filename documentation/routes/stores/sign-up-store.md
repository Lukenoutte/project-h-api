# Sign Up Store

This route will create a new store in the "stores" table and then associate it with the Master user.

**Rote:** POST - /store/signup

**Visibility:** Private (You need the access key)

**Body:** { 
    
    name: string,
    category: string,
    subdomain: string
    
}

**Return:** { 
    
    name: string,
    category: string,
    subdomain: string,
    masterId: number
    
}