// const swaggerJsdoc = require("swagger-jsdoc");

// const options = {
//   definition: {
//     openapi: "3.0.0",
//     info: {
//       title: "MeraBazar API",
//       version: "1.0.0",
//       description: "API Documentation for MeraBazar Backend",
//     },
//     servers: [
//       {
//         url: "http://localhost:3000",
//       },
//     ],

//     components: {
//       securitySchemes: {
//         BearerAuth: {
//           type: "http",
//           scheme: "bearer",
//           bearerFormat: "JWT",
//         },
//       },
//     },

//     security: [
//       {
//         BearerAuth: [],
//       },
//     ],
//   },

//    apis: ["./routes/**/*.js"], 
// };

// const swaggerSpec = swaggerJsdoc(options);

// module.exports = swaggerSpec;


const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "MeraBazar Backend API",
      version: "1.0.0",
      description: "Complete API Documentation for MeraBazar E-commerce Platform",
    },
    servers: [
      {
        url: "/api",
        description: "Local Server",
      },
    ],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        BearerAuth: [], // Global security requirement, can be overridden at route level
        
      },
    ],
  },
  apis: ["./routes/**/*.js"],
};

const swaggerSpec = swaggerJsdoc(options);


// --- Swagger UI Options for better Testing & Copying ---
const swaggerUIOptions = {
  explorer: true,
  swaggerOptions: {
    docExpansion: "list",
    filter: true,
    showRequestDuration: true,
    persistAuthorization: true, // Refresh pe token gayab nahi hoga
    displayRequestDuration: true,
    // Yeh plugin different languages ke code snippets enable karta hai
    requestSnippetsEnabled: true, 
  },
  customSiteTitle: "MeraBazar API Docs",
  // Response ko copy-friendly banane ke liye custom styling
  customCss: `
    .swagger-ui .opblock .opblock-summary .view-line-link { display: none }
    .swagger-ui .responses-table { background: #f9f9f9; border-radius: 8px; }
    .swagger-ui .copy-to-clipboard { 
      background: #2ecc71 !important; 
      border-radius: 4px !important;
      padding: 5px !important;
    }
  `
};

module.exports = swaggerSpec;