import axios, { type AxiosInstance } from "axios";

const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = import.meta.env.VITE_BASE_URL;

const api: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
    language: "pt-BR",
    include_adult: false,
  },
  timeout: 10_000,
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      const { status, data } = error.response;

      switch (status) {
        case 400:
          console.error("Requisição inválida", data?.message || data);
          break;
        case 401:
          console.error("Não autorizado. Talvez o token expirou.");
          break;
        case 403:
          console.error("Acesso proibido.");
          break;
        case 404:
          console.error("Recurso não encontrado.");
          break;
        case 500:
          console.error("Erro interno no servidor.");
          break;
        default:
          console.error(`Erro ${status}:`, data?.message || data);
      }
    } else if (error.request) {
      console.error("Erro de rede: Nenhuma resposta recebida do servidor.");
    } else {
      console.error("Erro:", error.message);
    }

    return Promise.reject(error);
  }
);
export default api;
