import { env } from "../config/env";
import OpenAI from "openai";
import { zodTextFormat } from "openai/helpers/zod";
import { z } from "zod/v3";

const InstructionInputSchema = z.object({
  type: z.enum(["text"]),
  instruction: z.string(),
  inputs: z.array(z.string()),
});

const InstructionOutputSchema = z.object({
  type: z.enum(["text"]),
  result: z.string(),
});

export type InstructionInput = z.infer<typeof InstructionInputSchema>;
export type InstructionOutput = z.infer<typeof InstructionOutputSchema>;

// Initialize OpenAI client
const client = new OpenAI({
  apiKey: env.OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

// Function to combine the inputs with commas
function combineWithCommas(strings: string[]): string {
  return strings.reduce(
    (acc, curr, idx) => (idx === 0 ? curr : `${acc}, ${curr}`),
    ""
  );
}

// Main function to process instructions
async function processInstruction(
  input: InstructionInput
): Promise<InstructionOutput> {
  // Validate input
  const parsedInput = InstructionInputSchema.parse(input);

  const { instruction, inputs } = parsedInput;

  // Combine the inputs with commas
  const promptInputs = combineWithCommas(inputs);
  console.log(zodTextFormat(InstructionOutputSchema, "InstructionOutput"));

  // Create the response
  const response = await client.responses.parse({
    model: "gpt-5-mini",

    input: [
      {
        role: "system",
        content: `You are an assistant that follows instructions. You will be given an instruction and some inputs. Your job is to create an output based on the instruction and inputs.
                  Additional requirements:
                    - If you have been given a mathematical operation, return the result only
                    - If you have been given text and asked to sum the inputs together, try and interpret the word as a number. As an example, triangle is 3`,
      },
      {
        role: "developer",
        content: `Here is your instruction: ${instruction}.`,
      },
      {
        role: "user",
        content: `Here are your inputs: ${promptInputs}`,
      },
    ],
    text: {
      format: zodTextFormat(InstructionOutputSchema, "InstructionOutput"),
    },
  });

  // Return the result wrapped in the output interface
  const output = response.output_parsed;

  if (!output) {
    throw new Error("Failed to parse response");
  }

  return output;
}

export { processInstruction };
