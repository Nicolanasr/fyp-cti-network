import defaultAxios from "axios";

import { API_URL } from "./constants"

export const axios = defaultAxios.create({
    baseURL: `${API_URL}`,
});

export default axios;
