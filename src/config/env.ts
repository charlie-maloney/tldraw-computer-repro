interface EnvConfig {
  OPENAI_API_KEY: string;
}

const getEnvVar = (key: string): string => {
  const value = import.meta.env[key];
  if (!value) {
    throw new Error(`Environment variable ${key} is not defined`);
  }
  return value;
};

export const env: EnvConfig = {
  OPENAI_API_KEY: getEnvVar("VITE_OPENAI_API_KEY"),
};
