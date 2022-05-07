export const API_URL =
    process.env.NODE_ENV === "development"
        ? "http://localhost:8000"
        : process.env.NODE_ENV === "production"
        ? "https://fyp-cti-network-backend.vercel.app"
        : null;
