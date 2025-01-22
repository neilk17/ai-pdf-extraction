import { anthropic } from "@ai-sdk/anthropic";
import { z } from "zod"
import path from "path";
import { readFileSync } from "fs";
import dotenv from "dotenv";
import { generateObject } from "ai";

dotenv.config();

const model = anthropic("claude-3-5-sonnet-latest");

const schema = z.object({
  invNum: z.string().describe("Pro. Inv. No."),
  consignee: z.string().describe("Name of the consignee"),
  terms: z.string().describe("Payment terms and delivery"),
  descriptionOfGoods: z.string().describe("Description of goods")
})


async function extractTextFromPdf(invoicePath) {
  const { object } = await generateObject({
    model,
    system: `You will receive an invoice. ` +
    `Please extract the data from the invoice.`, 
    schema,
    messages: [
      {
        role: "user",
        content: [
          {
            type: "file",
            data: readFileSync(invoicePath),
            mimeType: "application/pdf",
          },
        ],
      },
    ],
  })

  return object;
}

const result = await extractTextFromPdf(
  path.join(import.meta.dirname, './invoice.pdf')
);

console.dir(result, {depth: null});