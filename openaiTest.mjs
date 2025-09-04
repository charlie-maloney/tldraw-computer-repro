// This is just some test code to test out the prmpting of OpenAI's LLM.

// To use this file, make sure you have your openAI key added to the .env file.

// Then make sure you populate the nodeInstruction variable, and the nodeInputs variable.

// type "node example.mjs" in your terminal and the result from OpenAI will be added to your terminal.

import 'dotenv/config';
import OpenAI from "openai";


const client = new OpenAI({
    apiKey: process.env['VITE_OPENAI_API_KEY'],
});


// Inputs coming from the nodes
const nodeInstruction = "sum the inputs together and give a result";
const nodeInputs = ["1", "10", "11", "12"]; // This must be an array of inputs. Each input will be a string separated by a comma.

// Function to combine the inputs with commas
function combineWithCommas(strings) {
    return strings.reduce((acc, curr, idx) => (idx === 0 ? curr : `${acc}, ${curr}`), "");
};

// Combine the inputs with commas
const promptInputs = combineWithCommas(nodeInputs);

// Create the prompt
const promptInstruction = `Here is your instruction:  ${nodeInstruction}. 
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

// LLM response to be used in the text node
const instructionOutput = response.output_text;
console.log(instructionOutput);








