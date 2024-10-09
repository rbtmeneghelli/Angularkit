export const environment = {
  API: window["env" as any]?.["API" as any] || "https://localhost:58448/api",
  version: window["env" as any]?.["version" as any] || "versão 7.0",
};
