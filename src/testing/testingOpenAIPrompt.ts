// To run the below test, make sure you have dependencies installed.

// Make sure you are in the root directory and hit "npx tsx src/testing/testingOpenAIPrompt.ts"


import { processInstruction } from '../services/openaiService.ts';
import type { InstructionInput } from '../services/openaiService.ts';

async function runTest() {
    try {
        console.log('🚀 Starting instruction processor test...\n');

        // Test case 1: Mathematical operation
        const mathTest: InstructionInput = {
            instruction: "sum the inputs together and give a result",
            inputs: ["1", "10", "11", "12"]
        };

        console.log('📊 Test 1: Mathematical Sum');
        console.log('Instruction:', mathTest.instruction);
        console.log('Inputs:', mathTest.inputs);
        console.log('Processing...\n');

        const mathResult = await processInstruction(mathTest);
        console.log('✅ Result:', mathResult.result);
        console.log('-----------------------------------\n');

        // Test case 2: Text interpretation
        const textTest: InstructionInput = {
            instruction: "sum the inputs together and give a result",
            inputs: ["triangle", "square", "pentagon"]
        };

        console.log('📝 Test 2: Text Interpretation');
        console.log('Instruction:', textTest.instruction);
        console.log('Inputs:', textTest.inputs);
        console.log('Processing...\n');

        const textResult = await processInstruction(textTest);
        console.log('✅ Result:', textResult.result);
        console.log('-----------------------------------\n');

        // Test case 3: Mixed operation
        const mixedTest: InstructionInput = {
            instruction: "multiply the first two inputs and add the third",
            inputs: ["5", "3", "7"]
        };

        console.log('🔢 Test 3: Mixed Mathematical Operation');
        console.log('Instruction:', mixedTest.instruction);
        console.log('Inputs:', mixedTest.inputs);
        console.log('Processing...\n');

        const mixedResult = await processInstruction(mixedTest);
        console.log('✅ Result:', mixedResult.result);
        console.log('-----------------------------------\n');

        console.log('🎉 All tests completed successfully!');

    } catch (error) {
        console.error('❌ Error during testing:');
        if (error instanceof Error) {
            console.error('Message:', error.message);
            console.error('Stack:', error.stack);
        } else {
            console.error('Unknown error:', error);
        }
        
        // Common troubleshooting tips
        console.log('\n🔧 Troubleshooting tips:');
        console.log('1. Make sure your .env file contains VITE_OPENAI_API_KEY');
        console.log('2. Verify your OpenAI API key is valid and has credits');
        console.log('3. Check your internet connection');
        console.log('4. Ensure the instruction-processor.ts file path is correct');
    }
}

// Run the test
runTest();