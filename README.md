# Agoo.com.co

API version 2.0 

## Web services created with RESTful Architecture ##

This API is designed to provide a back-end robust, secure and flexible; below are described the main characteristics, manner of use, installation, verbs, http requests and responses, etc.

## Folder structure Agoo API ##



## General conventions ##

### Coding ###

The names of the folders and files are going lowercase

Variables: camelCase, varUser, CONSTANTAUTH

Classes:

Methods:

Functions:

### To test code ###

```shell
   $ make test
```

### Logging ###

### Documentation ###
Go to [API documentation](/assets/documentation)

## Allowed HTTP methods ##

| Methods       | Description                               |
| ------------- | ----------------------------------------- |
| `GET`         | Get a resource                            |
| `POST`        | Create a resource                         |
| `PUT`         | Update a resource                         |
| `PATCH`       | Partial update / disable resource         |
| `DELETE`      | Delete a resource                         |


## Status codes / Allowed HTTP response ##

| Methods       | Description                                                   |
| ------------- | ------------------------------------------------------------- |
| `200`         | Success - OK                                                  |
| `201`         | Success - Created new resource                                |
| `204`         | Success - There is no content to answer                       |
| `400`         | Bad request - your request can not be assessed                |
| `401`         | Unauthorized - user in this authenticated for this feature    |
| `404`         | Not found - Resource doesn't exists                           |
| `422`         | unprocessable entity - validation errors                      |
| `429`         | Exceeded usage limits, try later                              |
| `500`         | Server error                                                  |
| `503`         | Service not available                                         |