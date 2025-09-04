import { env } from '../config/env';
import OpenAI from "openai";

// Interface for function inputs
interface InstructionInput {
  instruction: string;
  inputs: string[];
}

// Interface for function output
interface InstructionOutput {
  result: string;
}

// Initialize OpenAI client
const client = new OpenAI({
  apiKey: env.OPENAI_API_KEY
});

// Function to combine the inputs with commas
function combineWithCommas(strings: string[]): string {
  return strings.reduce((acc, curr, idx) => (idx === 0 ? curr : `${acc}, ${curr}`), "");
}

// Main function to process instructions
async function processInstruction(input: InstructionInput): Promise<InstructionOutput> {
  const { instruction, inputs } = input;

  // Combine the inputs with commas
  const promptInputs = combineWithCommas(inputs);

  // Create the prompt
  const promptInstruction = `Here is your instruction: ${instruction}. 
Execute your prompt based of this instruction and the inputs you have been given.
Additional requirements:
- If you have been given a mathematical operation, return the result only
- If you have been given text and asked to sum the inputs together, try and interprest the word as a number. As an example, triangle is 3.

`;

  // Create the response
  const response = await client.responses.create({
    model: 'gpt-4o',
    instructions: promptInstruction,
    input: promptInputs,
  });

  // Return the result wrapped in the output interface
  return {
    result: response.output_text
  };
}

export { processInstruction };
export type { InstructionInput, InstructionOutput };