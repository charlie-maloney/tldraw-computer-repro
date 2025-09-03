

import { openaiService } from './src/services/openaiService';
import 'dotenv/config';

async function testOpenAI() {
    console.log('Testing OpenAI Service...');

    try {
        const testPrompt = "Write a short joke about programming.";

        console.log('Sending prompt:', testPrompt);
        console.log('Waiting for response...');

        const startTime = Date.now();

        const result = await openaiService.sendPrompt({
            prompt: testPrompt,
            maxTokens: 100,
            temperature: 0.7,
            model: "gpt-4o-mini"
        });

        const endTime = Date.now();
        const duration = endTime - startTime;

        console.log('SUCCESS!');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log('RESPONSE:');
        console.log(result.response);
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log(`Duration: ${duration}ms`);

        if (result.usage) {
            console.log('Token Usage:');
            console.log(`Prompt tokens: ${result.usage.promptTokens}`);
            console.log(`Completion tokens: ${result.usage.completionTokens}`);
            console.log(`Total tokens: ${result.usage.totalTokens}`);
        }

    } catch (error) {
        console.error('ERROR occurred:');
        console.error(error);

        if (error instanceof Error) {
            console.error('Error message:', error.message);
        }
    }
}

// Run the test
testOpenAI().then(() => {
    console.log('Test completed');
}).catch((e) => {
    console.error('Test failed:', e);
});