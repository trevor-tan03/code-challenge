import dedent from "dedent";
import dotenv from "dotenv";
import OpenAI from "openai";
import type { Company } from "./queryCompanyDetails";

dotenv.config();

const client = new OpenAI({
  apiKey: process.env["OPENAI_API_KEY"],
});

export async function createEmail(company: Company) {
  const openAIResponse = await client.responses.create({
    model: "gpt-4",
    input: [
      {
        role: "developer",
        content: dedent`
        Everyday Capital is a fictional investment firm writing cold outreach emails to companies they may want to acquire.

        Write the body of an email that:
          - Includes the company's CEO and company name
          - Explains why the company's industry (inferred from description) is attractive
          - Suggests a meeting

        Adjust tone and content based on description:
          - If the company is a software business, use technical language and explicitly include the sentence: 
            "We have a long history of investing in software businesses in Australia and New Zealand."
          - If the company is in a highly regulated industry, mention Everyday Capital's experience helping such businesses.
          - Note: it is possible that a company is both a software business and in a regulated industry, so consider this case.

        Important:
          - Avoid the following LLM giveaways at all costs:
            - The "Subject:" line as this is the body of the email
            - Double hyphens “—”
            - Words like “Furthermore”, “Additionally” at sentence starts
            - The word “fantastic” when talking about the opportunity
            - Placeholders like "[Your Name]" as this is not a template, but an actual email
          - Ensure that under no circumstances does an email include the above items

        The tone should be short, friendly, and professional. Think of how a real investor might write a cold email: clear, respectful, no fluff.`,
      },
      {
        role: "user",
        content: dedent`
        Write an email for the following company
          - CEO: ${company.ceo}
          - Company Name: ${company.name}
          - Description: ${company.description}`,
      },
    ],
  });

  return openAIResponse.output_text;
}
