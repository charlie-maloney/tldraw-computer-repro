interface EnvConfig {
    OPENAI_API_KEY: string;
    OPENAI_BASE_URL: string;
    OPENAI_MODEL: string;
    API_TIMEOUT: number;
}


const getEnvVar = (key: string): string => {
    const value = process.env[`VITE_${key}`];
    if (!value) {
        throw new Error(`Environment variable VITE_${key} is not defined`);
    }
    return value;
};


export const env: EnvConfig = {
    OPENAI_API_KEY: getEnvVar('OPENAI_API_KEY'),
    OPENAI_BASE_URL: process.env.VITE_OPENAI_BASE_URL || 'https://api.openai.com/v1',
    OPENAI_MODEL: process.env.VITE_OPENAI_MODEL || 'gpt-4o-mini',
    API_TIMEOUT: parseInt(process.env.VITE_API_TIMEOUT || '30000'),
};

