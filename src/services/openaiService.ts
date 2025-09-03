import { env } from '../config/env';

export interface OpenAIRequest {
  prompt: string;
  model: string;
  temperature: number;

  //   Optional, don't think we'll need this
  maxTokens?: number; //Optional
}

export interface OpenAIResponse {
  response: string;

  //   Optional, don't think we'll need this
  usage?: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  };
}

// Structuring the error response that comes from OpenAI
export interface OpenAIError {
  error: string;
  code?: string;
  type?: string;
}


class OpenAIService {
  private baseURL: string;
  private apiKey: string;
  private timeout: number;

  constructor() {
    this.baseURL = env.OPENAI_BASE_URL;
    this.apiKey = env.OPENAI_API_KEY;
    this.timeout = env.API_TIMEOUT;
  }
  async sendPrompt({
    prompt,
    model = env.OPENAI_MODEL,
    maxTokens = 1000,
    temperature = 0.7
  }: OpenAIRequest): Promise<OpenAIResponse> {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), this.timeout);

      const response = await fetch(`${this.baseURL}/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify({
          model,
          messages: [
            {
              role: 'user',
              content: prompt
            }
          ],
          max_tokens: maxTokens,
          temperature,
        }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(`OpenAI API Error: ${response.status} - ${errorData.error?.message || 'Unknown error'}`);
      }

      const data = await response.json();

      return {
        response: data.choices[0]?.message?.content || '',
        usage: {
          promptTokens: data.usage?.prompt_tokens || 0,
          completionTokens: data.usage?.completion_tokens || 0,
          totalTokens: data.usage?.total_tokens || 0,
        }
      };

    } catch (error) {
      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          throw new Error('Request timeout - please try again');
        }
        throw new Error(`OpenAI Service Error: ${error.message}`);
      }
      throw new Error('Unknown error occurred');
    }
  }
}

export const openaiService = new OpenAIService();

