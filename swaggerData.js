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

  host: "https://lifebookbackend.up.railway.app",
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
    "/api/get_current_user_followers": {
      get: {
        summary: "Get the profile of the currently authenticated user",
        description:
          "Retrieve the profile information of the authenticated user.",
        tags: ["User"],
        responses: {
          200: {
            description: "Successful response",
            schema: {
              type: "object",
              properties: {
                user_id: {
                  type: "integer",
                  description: "The user's ID",
                },
                username: {
                  type: "string",
                  description: "The username of the user",
                },
                email: {
                  type: "string",
                  description: "The email address of the user",
                },
                // Add other properties as needed
              },
            },
          },
          400: {
            description: "User does not exist",
            schema: {
              type: "object",
              properties: {
                message: {
                  type: "string",
                  description: "Error message",
                },
              },
            },
          },
        },
      },
    },
    "/api/get_user/{id}": {
      get: {
        summary: "Get user by ID",
        description: "Retrieve a user's information by their ID.",
        tags: ["User"],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            type: "integer",
            description: "The ID of the user to retrieve.",
          },
        ],
        responses: {
          200: {
            description: "Successful response",
            schema: {
              type: "object",
              properties: {
                user_id: {
                  type: "integer",
                  description: "The user's ID",
                },
                username: {
                  type: "string",
                  description: "The username of the user",
                },
                email: {
                  type: "string",
                  description: "The email address of the user",
                },
                // Add other properties as needed
              },
            },
          },
          404: {
            description: "User not found",
            schema: {
              type: "object",
              properties: {
                error: {
                  type: "string",
                  description: "Error message",
                },
              },
            },
          },
          500: {
            description: "Server error",
            schema: {
              type: "object",
              properties: {
                error: {
                  type: "string",
                  description: "Server error message",
                },
              },
            },
          },
        },
      },
    },
    "/api/create_post": {
      post: {
        summary: "Create a new post",
        description: "Create a new post with the provided content.",
        tags: ["Post"],
        parameters: [
          {
            name: "Authorization",
            in: "header",
            required: true,
            type: "string",
            description: "JWT token for authentication",
          },
        ],
        consumes: ["application/json"],
        produces: ["application/json"],
        parameters: [
          {
            name: "content",
            in: "body",
            required: true,
            schema: {
              type: "object",
              properties: {
                content: {
                  type: "string",
                  description: "The content of the post",
                },
              },
            },
          },
        ],
        responses: {
          200: {
            description: "Post created successfully",
            schema: {
              type: "object",
              properties: {
                message: {
                  type: "string",
                  description: "Success message",
                },
              },
            },
          },
          500: {
            description: "Server error",
            schema: {
              type: "object",
              properties: {
                error: {
                  type: "string",
                  description: "Server error message",
                },
              },
            },
          },
        },
      },
    },
    "/api/edit_post/{id}": {
      put: {
        summary: "Edit a post by ID",
        description:
          "Edit the content of a post by its ID if the user is the author.",
        tags: ["Post"],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            type: "integer",
            description: "The ID of the post to edit",
          },
        ],
        consumes: ["application/json"],
        produces: ["application/json"],
        parameters: [
          {
            name: "content",
            in: "body",
            required: true,
            schema: {
              type: "object",
              properties: {
                content: {
                  type: "string",
                  description: "The updated content of the post",
                },
              },
            },
          },
        ],
        responses: {
          200: {
            description: "Post edited successfully",
            schema: {
              type: "object",
              properties: {
                message: {
                  type: "string",
                  description: "Success message",
                },
              },
            },
          },
          400: {
            description: "You can not edit this post",
            schema: {
              type: "object",
              properties: {
                msg: {
                  type: "string",
                  description: "Error message",
                },
              },
            },
          },
          500: {
            description: "Server error",
            schema: {
              type: "object",
              properties: {
                error: {
                  type: "string",
                  description: "Server error message",
                },
              },
            },
          },
        },
      },
    },
    "/api/delete_post/{id}": {
      delete: {
        summary: "Delete a post by ID",
        description: "Delete a post by its ID if the user is the author.",
        tags: ["Post"],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            type: "integer",
            description: "The ID of the post to delete",
          },
        ],
        responses: {
          200: {
            description: "Post deleted successfully",
            schema: {
              type: "object",
              properties: {
                message: {
                  type: "string",
                  description: "Success message",
                },
              },
            },
          },
          400: {
            description: "You can not delete this post",
            schema: {
              type: "object",
              properties: {
                msg: {
                  type: "string",
                  description: "Error message",
                },
              },
            },
          },
          500: {
            description: "Server error",
            schema: {
              type: "object",
              properties: {
                error: {
                  type: "string",
                  description: "Server error message",
                },
              },
            },
          },
        },
      },
    },
    "/api/get_post/{id}": {
      get: {
        summary: "Get a post by Post ID",
        description: "Retrieve a post by its ID.",
        tags: ["Post"],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            type: "integer",
            description: "The ID of the post to retrieve.",
          },
        ],
        responses: {
          200: {
            description: "Successful response",
            schema: {
              type: "object",
              properties: {
                post_id: {
                  type: "integer",
                  description: "The ID of the post",
                },
                content: {
                  type: "string",
                  description: "The content of the post",
                },
                // Add other properties as needed
              },
            },
          },
          404: {
            description: "Post not found",
            schema: {
              type: "object",
              properties: {
                error: {
                  type: "string",
                  description: "Error message",
                },
              },
            },
          },
          500: {
            description: "Server error",
            schema: {
              type: "object",
              properties: {
                error: {
                  type: "string",
                  description: "Server error message",
                },
              },
            },
          },
        },
      },
    },
    "/api/create_comment/{id}": {
      post: {
        summary: "Create a comment on a post by Post ID",
        description: "Create a comment on a post with the provided content.",
        tags: ["Post Comment"],
        parameters: [
          {
            name: "Authorization",
            in: "header",
            required: true,
            type: "string",
            description: "JWT token for authentication",
          },
        ],
        consumes: ["application/json"],
        produces: ["application/json"],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            type: "integer",
            description: "The ID of the post to add the comment to.",
          },
          {
            name: "content",
            in: "body",
            required: true,
            schema: {
              type: "object",
              properties: {
                content: {
                  type: "string",
                  description: "The content of the comment",
                },
              },
            },
          },
        ],
        responses: {
          200: {
            description: "Comment created successfully",
            schema: {
              type: "object",
              properties: {
                message: {
                  type: "string",
                  description: "Success message",
                },
              },
            },
          },
          500: {
            description: "Server error",
            schema: {
              type: "object",
              properties: {
                error: {
                  type: "string",
                  description: "Server error message",
                },
              },
            },
          },
        },
      },
    },
    "/api/delete_comment/{id}": {
      delete: {
        summary: "Delete a comment by Comment ID",
        description: "Delete a comment by its ID if the user is the author.",
        tags: ["Post Comment"],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            type: "integer",
            description: "The ID of the comment to delete",
          },
        ],
        responses: {
          200: {
            description: "Comment deleted successfully",
            schema: {
              type: "object",
              properties: {
                message: {
                  type: "string",
                  description: "Success message",
                },
              },
            },
          },
          403: {
            description: "You can not delete this comment",
            schema: {
              type: "object",
              properties: {
                message: {
                  type: "string",
                  description: "Error message",
                },
              },
            },
          },
          500: {
            description: "Server error",
            schema: {
              type: "object",
              properties: {
                error: {
                  type: "string",
                  description: "Server error message",
                },
              },
            },
          },
        },
      },
    },
    "/api/edit_comment/{id}": {
      put: {
        summary: "Edit a comment by Comment ID",
        description: "Edit a comment by its ID if the user is the author.",
        tags: ["Post Comment"],

        consumes: ["application/json"],
        produces: ["application/json"],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            type: "integer",
            description: "The ID of the comment to edit",
          },
          {
            name: "content",
            in: "body",
            required: true,
            schema: {
              type: "object",
              properties: {
                content: {
                  type: "string",
                  description: "The updated content of the comment",
                },
              },
            },
          },
        ],
        responses: {
          200: {
            description: "Comment edited successfully",
            schema: {
              type: "object",
              properties: {
                message: {
                  type: "string",
                  description: "Success message",
                },
              },
            },
          },
          400: {
            description: "You can not edit this comment",
            schema: {
              type: "object",
              properties: {
                msg: {
                  type: "string",
                  description: "Error message",
                },
              },
            },
          },
          500: {
            description: "Server error",
            schema: {
              type: "object",
              properties: {
                error: {
                  type: "string",
                  description: "Server error message",
                },
              },
            },
          },
        },
      },
    },
    "/api/post_like/{id}/": {
      post: {
        summary: "Like a post by Post ID",
        description:
          "Like a post by its ID if the user has not already liked it.",
        tags: ["Post Like"],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            type: "integer",
            description: "The ID of the post to like",
          },
        ],
        responses: {
          200: {
            description: "Post liked successfully",
            schema: {
              type: "object",
              properties: {
                message: {
                  type: "string",
                  description: "Success message",
                },
              },
            },
          },
          403: {
            description: "You already liked this post",
            schema: {
              type: "object",
              properties: {
                message: {
                  type: "string",
                  description: "Error message",
                },
              },
            },
          },
          500: {
            description: "Server error",
            schema: {
              type: "object",
              properties: {
                error: {
                  type: "string",
                  description: "Server error message",
                },
              },
            },
          },
        },
      },
    },
    "/api/unlike_post/{id}": {
      delete: {
        summary: "Unlike a post by Post ID",
        description:
          "Unlike a post by its ID if the user has previously liked it.",
        tags: ["Post Like"],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            type: "integer",
            description: "The ID of the post to unlike",
          },
        ],
        responses: {
          200: {
            description: "Post unliked successfully",
            schema: {
              type: "object",
              properties: {
                message: {
                  type: "string",
                  description: "Success message",
                },
              },
            },
          },
          403: {
            description: "You did not like this post",
            schema: {
              type: "object",
              properties: {
                message: {
                  type: "string",
                  description: "Error message",
                },
              },
            },
          },
          500: {
            description: "Server error",
            schema: {
              type: "object",
              properties: {
                error: {
                  type: "string",
                  description: "Server error message",
                },
              },
            },
          },
        },
      },
    },
    "/api/follow_user_id": {
      post: {
        summary: "Follow another user by User ID",
        description: "Follow another user by their ID.",
        tags: ["Follow"],
        parameters: [],
        consumes: ["application/json"],
        produces: ["application/json"],
        parameters: [
          {
            name: "followee",
            in: "body",
            required: true,
            schema: {
              type: "object",
              properties: {
                followee: {
                  type: "integer",
                  description: "The ID of the user to follow",
                },
              },
            },
          },
        ],
        responses: {
          200: {
            description: "Follow request sent successfully",
            schema: {
              type: "string",
              description: "Success message",
            },
          },
          500: {
            description: "Server error",
            schema: {
              type: "string",
              description: "Server error message",
            },
          },
        },
      },
    },
    "/api/accept_reject_follow_request/:{requestID}": {
      put: {
        summary: "Accept or Reject Follow Request",
        description: "Accept or reject a follow request by request ID.",
        tags: ["Follow"],

        consumes: ["application/json"],
        produces: ["application/json"],
        parameters: [
          {
            name: "requestID",
            in: "path",
            required: true,
            type: "integer",
            description: "The ID of the follow request",
          },
          {
            name: "accepted",
            in: "body",
            required: true,
            schema: {
              type: "object",
              properties: {
                accepted: {
                  type: "integer",
                  description: "1 for accept, 0 for reject",
                },
              },

              description: "1 for accept, 0 for reject",
            },
          },
        ],
        responses: {
          200: {
            description: "Follow request accepted or rejected successfully",
            schema: {
              type: "object",
              properties: {
                message: {
                  type: "string",
                  description: "Success message ('accepted' or 'rejected')",
                },
              },
            },
          },
          500: {
            description: "Server error",
            schema: {
              type: "object",
              properties: {
                error: {
                  type: "string",
                  description: "Server error message",
                },
              },
            },
          },
        },
      },
    },
    "/api/get_current_user_followers": {
      get: {
        summary: "Get Current User's Followers",
        description:
          "Get the followers of the current user who have been accepted.",
        tags: ["Follow"],
        parameters: [],
        produces: ["application/json"],
        responses: {
          200: {
            description: "List of followers retrieved successfully",
            schema: {
              type: "object",
              properties: {
                result: {
                  type: "array",
                  items: {
                    type: "integer",
                    description: "User ID of a follower",
                  },
                  description: "List of follower user IDs",
                },
              },
            },
          },
          500: {
            description: "Server error",
            schema: {
              type: "object",
              properties: {
                error: {
                  type: "string",
                  description: "Server error message",
                },
              },
            },
          },
        },
      },
    },
    "/api/unfollow_user_id": {
      delete: {
        summary: "Unfollow another user by User ID",
        description: "Unfollow another user by their ID.",
        tags: ["Follow"],

        consumes: ["application/json"],
        produces: ["application/json"],
        parameters: [
          {
            name: "followee",
            in: "body",
            required: true,
            schema: {
              type: "object",
              properties: {
                followee: {
                  type: "integer",
                  description: "The ID of the user to unfollow",
                },
              },
              description: "The ID of the user to unfollow",
            },
          },
        ],
        responses: {
          200: {
            description: "User unfollowed successfully",
            schema: {
              type: "string",
              description: "Success message",
            },
          },
          404: {
            description: "User is not followed by the current user",
            schema: {
              type: "string",
              description: "Error message",
            },
          },
          500: {
            description: "Server error",
            schema: {
              type: "string",
              description: "Server error message",
            },
          },
        },
      },
    },
    "/api/get_feed_for_auth_user": {
      get: {
        summary: "Get Feed for Authenticated User",
        description: "Get the feed of posts for the authenticated user.",
        tags: ["News feed"],
        parameters: [],
        produces: ["application/json"],
        responses: {
          200: {
            description: "Feed retrieved successfully",
            schema: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  post_id: {
                    type: "integer",
                    description: "The ID of the post",
                  },
                  content: {
                    type: "string",
                    description: "The content of the post",
                  },
                  user_id: {
                    type: "integer",
                    description: "The ID of the user who posted the content",
                  },
                  created_at: {
                    type: "string",
                    description: "The timestamp when the post was created",
                  },
                },
              },
              description: "List of posts in the feed",
            },
          },
          404: {
            description: "No posts found",
            schema: {
              type: "string",
              description: "Error message",
            },
          },
          500: {
            description: "Server error",
            schema: {
              type: "string",
              description: "Server error message",
            },
          },
        },
      },
    },
  },
};

export default jsdonData;
