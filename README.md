## User and People Tagging
This repository aims to develop and improve people and tagging features in Talawa. This idea have been built on the currently existing features and development of Talawa-API respository. *This is just an prototypee development of the idea to test for real case scenarios. More debugging and changes need to be introduced*

Here we have developed GraphQL API Server using Node and GraphQL that helps in managing organization's people with tags

## Features and Requirements

A user model as alredy in Talawa  has a firstName, lastName email and a type (that can an USER or a ADMIN). A organization member can be tagged, for instance: Women Ministry, Child Ministry, and so on. (Tags will likely be used as filters later, so we have to keep that in mind)

### Features overview

- CREATE - READ - UPDATE - DELETE for Users (Already developed)
- CREATE - READ - UPDATE - DELETE for Admin User (Already developed)
- CREATE - READ - UPDATE - DELETE for Tags

### Other unique features of the application

- Only admin users can create, edit and delete tags.

- Users can fetch all tags and select from the tags during sign up or when editing user accounts

- Tags are hard-deleted - They are removed from the database permanently

#### Below things already build in talawa admin, just built the application also

- Users are soft-deleted - They are only marked with a deleted flag but not permanently removed from the database

- For authenticated queries/mutations, pass an extra hearder 'x-auth-token', with a value of the token gotten on on sign in

- Admin users can delete other users account

## Technologies

- NodeJS
- Express
- GraphQL
- MongoDB

## QUERIES

### tags -

- Gets all the tags in the database

_Payload_

```bash
{
  tags{
    _id
    name
    details
    organization_id
  }
}
```

_Response format_

```bash
{
  "data": {
    "tags": [
      {
        "_id": "6045c93db0f82343431e4332",
        "name": "Women Ministry",
        "details": "tag for development of women",
        organization_id: "63e14fafb25a241f2cb4ebed"
      }
    ]
  }
}
```
Saved in database as - <br>
<img src="https://user-images.githubusercontent.com/65107474/228870509-e762c9f9-c3ed-4569-bd30-2b9b91aca7e4.png" width="500" />

### tag -

- Get details of a single tag

_Payload_

```bash
{
  tag(tagId: "6045c93db0f82343431e4332"){
    _id
    name
    details,
    organization_id
  }
}
```

_Response format_

```bash
{
  "data": {
    "tag": {
      "_id": "6045c93db0f82343431e4332",
      "name": "Women Ministry",
      "details": "tag for development of women"
    }
  }
}
```

### user -

- Get details of a single user

_Payload_

```bash
{
  user{
    firstName
    lastName
    email
    duration
    userType
    tags{
      name
    }
  }
}
```

_Response format_

```bash
{
    "data": {
        "user": {
            "firstName": "Demo",
            "lastName": "Admin",
            "email": "a@a.com",
            "duration": null,
            "userType": "employee",
            "tags": [tagID]
        }
    }
}
```

## MUTATIONS

### adminSignUp -

- Creates a user with admin access

_Payload_

```bash
mutation{
  adminSignUp( firstName : "Demo" lastName : "Admin" email: "a@a.com" userType: "employee" password: "1234567"){
    firstName
    lastName
    email
    duration
    userType
    tags{
      name
    }
  }
}
```

_Response format_

```bash
{
  "data": {
    "adminSignUp": {
      "firstName": "Demo",
      "lastName": "Admin",
      "email": "a@a.com",
      "duration": null,
      "tags": []
    }
  }
}
```

### addTag -

- adds a tag to the db

_Payload_

```bash
mutation{
  addTag(name: "Women Ministry" details: "tag for development of women"){
    name
    details
  }
}
```

_Response format_

```bash
{
    "data": {
        "addTag": {
            "name": "Women Ministry",
            "details": "tag for development of women"
        }
    }
}
```

### editTag -

- Edit tag information

_Payload_

```bash
mutation{
  editTag(id: "6045c93db0f82343431e4332" name: "Women Ministry" details: "tag for development of women"){
    name
    details
  }
}
```

_Response format_

```bash
{
    "data": {
        "editTag": {
            "name": "Women Ministry",
            "details": "tag for development of women"
        }
    }
}
```

### deleteTag -

- Removes a tag from the database

_Payload_

```bash
mutation{
  deleteTag(tagId: "6045cb783212fb44caf3f21f"){
    code
    message
  }
}
```

_Response format_

```bash
{
    "data": {
        "deleteTag": {
            "code": 200,
            "message": "Resource Deleted Successfully"
        }
    }
}
```

## Requirements

- NodeJS (minimum v14.0.0)

## Installation

### Node.JS

Ensure you have node installed on your system, visit [node.org](https://nodejs.org/en/download/) to install. Once installed, open a terminal and run the command to confirm node is installed and see the current version

```bash
node -v
```

## Project Structure

The code base is structured in a modular way, following a Model - Controller - Service Architecture. An overview of the code base:

- CONFIG - containing configuration data for the application
- CONTROLLER - contains the files that receives data from the graphql and call the services
- CONSTANTS - contains data that are expected to br constant across the application.
- MIDDLEWARES - collection of middlewares written for the application.
- MODEL - contains the models for the database
- SCHEMA - containing the queries, types and mutations for graphql server
- SERVICES - containing services files that handles requests functionalities
- TESTS - containing test files
- UTILS - containing utility functions used in the application ( error handling, logging )
- VALIDATIONS - contains validation rules for the requests.

## Set - Up

Clone the project from the github repository [https://github.com/KrutikaBhatt/people_tagging_feature](https://github.com/KrutikaBhatt/people_tagging_feature)

### Install Dependencies

To install the dependencies of the project

Navigate to the root folder of the project, open a terminal and run the following command

```bash
npm install

```

### Serve the project

At this point, everything should be set and project ready to run.

Run the following command

```bash
npm run start
```

### Tests

Installing the dependences will install `jest` and `jest-extented`. Theses are the packages needed for the test. For this project, I have just added tests for Tag controllers and mutations

In the terminal of your root project, Run the following command

```bash
npm run test
```

## END-POINT

If everything runs fine, navigate to your browser and open http://localhost:5000. The project will be running on the endpoint.

_GraphQL Endpoint :_ ` http://localhost:5000/graphql`


## IMPROVEMENTS

For improvements to the to make the application better

- More test cases are needed to cover success and failure cases
- Custom error handler function for graphql for improved error handling
- additional response types to better structure graphql responses with status and message alongside the data
