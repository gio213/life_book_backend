const jsdonData = {
  swagger: "2.0",
  info: {
    version: "1.0.0",
    title: "Lifebook API",
    description: "Lifebook API Documentation",
    contact: {
      name: "Giorgi Patsia",
      email: "gio.patsia@gmail.com",
      url: "https://www.linkedin.com/in/giorgi-patsia/",
    },
  },

  host: "localhost:3000" || "https://lifebookbackend.up.railway.app",
  basePath: "/",
  schemes: ["http", "https"],

  securityDefinitions: {
    bearerAuth: {
      type: "apiKey",
      name: "Authorization",
      scheme: "bearer",
      in: "header",
      bearerFormat: "JWT",
    },
  },
  security: [
    {
      bearerAuth: [],
    },
  ],
  paths: {
    "/api/user_register": {
      post: {
        summary: "Register a new user",
        description: "Register a new user with the provided information.",
        tags: ["User"],
        parameters: [
          {
            name: "username",
            in: "formData",
            type: "string",
            description: "The username of the user to register.",
          },
          {
            name: "email",
            in: "formData",
            type: "string",
            format: "email",
            description: "The email address of the user to register.",
          },
          {
            name: "password",
            in: "formData",
            type: "string",
            description: "The password of the user to register.",
          },
          {
            name: "gender",
            in: "formData",
            type: "string",
            description: "The gender of the user to register.",
          },
          {
            name: "birth_date",
            in: "formData",
            type: "string",
            description: "The date of birth of the user to register.",
          },
          {
            name: "profile_picture",
            in: "formData",
            type: "file",
            description: "The profile picture of the user to register.",
          },
        ],
        responses: {
          200: {
            description: "Successfully registered user.",
            schema: {
              type: "object",
              properties: {
                message: {
                  type: "string",
                },
              },
            },
          },
          400: {
            description: "Bad request.",
            schema: {
              type: "object",
              properties: {
                message: {
                  type: "string",
                },
              },
            },
          },
          500: {
            description: "Internal server error.",
            schema: {
              type: "object",
              properties: {
                message: {
                  type: "string",
                },
              },
            },
          },
        },
      },
    },
    "/api/user_login": {
      post: {
        summary: "Login a user",
        description: "Login a user with the provided information.",
        tags: ["User"],
        parameters: [
          {
            name: "username",
            in: "formData",
            type: "string",
            format: "string",
            description: "The username address of the user to login.",
          },
          {
            name: "email",
            in: "formData",
            type: "string",
            format: "email",
            description: "The email address of the user to login.",
          },
          {
            name: "password",
            in: "formData",
            type: "string",
            description: "The password of the user to login.",
          },
        ],
        responses: {
          200: {
            description: "Successfully logged in user.",
            schema: {
              type: "object",
              properties: {
                token: {
                  type: "string",
                },
              },
            },
          },
          400: {
            description: "Bad request.",
            schema: {
              type: "object",
              properties: {
                message: {
                  type: "string",
                },
              },
            },
          },
          500: {
            description: "Internal server error.",
            schema: {
              type: "object",
              properties: {
                message: {
                  type: "string",
                },
              },
            },
          },
        },
      },
    },
    "/api/password_reset": {
      put: {
        summary: "Reset User Password",
        description: "Reset a user's password with the provided information.",
        tags: ["User"],
        parameters: [
          {
            name: "username",
            in: "formData",
            type: "string",
            description:
              "The username of the user whose password is being reset.",
          },
          {
            name: "email",
            in: "formData",
            type: "string",
            format: "email",
            description:
              "The email address of the user whose password is being reset.",
          },
          {
            name: "newPassword",
            in: "formData",
            type: "string",
            description: "The new password for the user.",
          },
          {
            name: "oldPassword",
            in: "formData",
            type: "string",
            description: "The old password for the user.",
          },
        ],
        responses: {
          200: {
            description: "Password updated successfully.",
            schema: {
              type: "object",
              properties: {
                message: {
                  type: "string",
                },
              },
            },
          },
          400: {
            description: "Bad request.",
            schema: {
              type: "object",
              properties: {
                message: {
                  type: "string",
                },
              },
            },
          },
          500: {
            description: "Internal server error.",
            schema: {
              type: "object",
              properties: {
                message: {
                  type: "string",
                },
              },
            },
          },
        },
      },
    },
    "/api/user_search": {
      post: {
        summary: "Search for users by username",
        description: "Search for users by username.",
        tags: ["User"],
        parameters: [
          {
            name: "username",
            in: "formData",
            type: "string",
            description: "The username to search for.",
          },
        ],
        responses: {
          200: {
            description: "Successfully retrieved users.",
            schema: {
              type: "object",
              properties: {
                message: {
                  type: "string",
                },
                result: {
                  type: "array",
                  items: {
                    type: "object",
                    // Define properties for the user object here
                  },
                },
              },
            },
          },
          400: {
            description: "Bad request.",
            schema: {
              type: "object",
              properties: {
                message: {
                  type: "string",
                },
              },
            },
          },
          500: {
            description: "Internal server error.",
            schema: {
              type: "object",
              properties: {
                message: {
                  type: "string",
                },
              },
            },
          },
        },
      },
    },
  },
};

export default jsdonData;
