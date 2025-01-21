import { openai } from "@ai-sdk/openai";
import { generateText } from "ai";

const model = openai("gpt-4o-mini");

export const answerMyQuestion = async () => {
    const { text } = await generateText({
        model,
        prompt: "Generate 5 words",
        system: "You are generateing random words",
        output: "array",
    });

  return text;
};

const answer = await answerMyQuestion();

console.log(answer);
