const m2s = require("mongoose-to-swagger");
const User = require("./models/user.model");
const Product = require("./models/product.model");



exports.options = {
    "components" : {
        "schemas" : {
            User : m2s(User),
            Product : m2s(Product)
        }
    },
    "openapi" : "3.1.0",
    "info" : {
        "version" :"1.0.0",
        "title" : "products crud api",
        "description" : "product project app",
        "contact" : {
            "name" : "api support",
            "url" : "http://www.example.com"
        }
    },
    "servers" : [
        {
            url : 'http://localhost:3000',
            description : 'local server'
        },
        {
            url : "http://www.example.com",
            description : 'testing server'
        }
    ],
    "tags" : [
        {
            "name" : "Users",
            "description" : "api endpoints for users"
        },
        {
            "name" : "Products",
            "description" : "api endpoints for products"
        },
        {
            "name" : "Users and Products" ,
            "description" : "api endpoint for users and products"
        }
    ],
    "paths" : {
        "/api/users" : {
            "get" : {
                "tags" :["Users"],
                "description" : " return all users",
                "responses" : {
                    "200" : {
                        "description" : "a list of users",
                        "content" : {
                            "application/json" : {
                                "schema" : {
                                    "type" : "array",
                                    "items" : {
                                        "$ref" : "#/components/schemas/User"
                                    }
                                }
                            }
                        }
                    }
                }
            },
            "post" : {
                "tags": ["Users"],
                "description" : "Create new user",
                "requestBody" : {
                    "description" : "user schema to insert",
                    "content":{
                        "applicatiom/json": {
                            "schema" : {
                                "type" : "object",
                                "properties" : {
                                    "username" : {"type" : "string"},
                                    "password" : {"type" : "string"},
                                    "name" : {"type" : "string"},
                                    "surname" : {"type" : "string"},
                                    "email" : {"type" : "string"},
                                    "address" : {
                                        "type" : "object",
                                        "properties" : {
                                            "area" : {"type" : "string"},
                                            "road" : {"type" : "string"},
                                        }
                                    },
                                    "phone" : {
                                        "type" : "array",
                                        "items" : {
                                            "type" : "object",
                                            "properties" : {
                                                "type" : {"type" : "string"},
                                                "number" : {"type" : "string"}
                                            }
                                        }
                                    }
                                },
                                "required" : ["username", "password", "email"]
                            }
                           
                        }
                    }
                },
                "responses" : {
                    "200" : {
                        "description" : " new user inserted"
                    }
                }
            }
        },
        "/api/users/{username}" : {
            "get" : {
                "tags" :["Users"],
                "parameters" : [
                    {
                        "name" : "username" ,
                        "in" : "path",
                        "require" : true,
                        "description" : "Username of user that we want to find" ,
                        "type" :  "string"
                    }
                ],
                "description" : "Get user with specific username",
                "responses" : {
                    "200" : {
                        "description" : " User to find",
                        "schema" : {
                            "$ref" : "#/components/schemas/User"
                        }
                    }
                }
            },
            "patch" :{
                "tags" : ["Users"],
                "description" : "update user",
                "parameters" : [
                    {
                        "name" : "username",
                        "in" : "path",
                        "required" : true,
                        "description" : "username of user to update",
                        "type" : "string"
                    }
                ],
                "requestBody" :{
                    "description" : "user to update" ,
                    "content" : {
                        "application/json" : {
                            "type" : "object",
                            "properties" : {
                                "username" : {"type" : "string"},
                                "name" : {"type" : "string"},
                                "surname" : { "type" : "string"},
                                "email" : {"type"  : "string"},
                                "address" : {
                                    "type" : "object",
                                    "properties" : {
                                        "area" : {"type"  : "string"},
                                        "road" : {"type"  : "string"}
                                    }
                                },
                                "phone" : {
                                    "type" : "array" ,
                                    "items" :{
                                        "type" : "object",
                                        "properties" : {
                                            "type" : {"type"  : "string"},
                                            "number" : {"type"  : "string"}
                                        }
                                    }
                                }
                            },
                            "required" :["email"]
                        }
                    }
                },
                "responses" : {
                    "200" : {
                        "descrition" : "update user",
                        "schema" : {
                            "$ref" : "#/components/schemas/User"
                        }
                    }
                }  
            },
            "delete" :{
                "tags" :["Users"],
                "description" : "delete a user",
                "parameters" : [{
                    "name" : "username",
                    "in" : "path",
                    "description" : "user to delete",
                    "type" : "string"
                }],
                "responses" : {
                    "200" : {
                        "description" : "delete a user"
                    }
                }
            }
            
        },
        "/api/user-products" :{}   
    }
}