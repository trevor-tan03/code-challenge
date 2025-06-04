import { createInterface } from "node:readline/promises";

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

export interface Company {
  ceo: string;
  name: string;
  description: string;
}

export async function queryCompanyDetails() {
  try {
    const ceoName = await rl.question("CEO's name: ");
    const companyName = await rl.question("Company's name: ");
    const companyDescription = await rl.question("Description: ");

    const company: Company = {
      ceo: ceoName,
      name: companyName,
      description: companyDescription,
    };

    return company;
  } finally {
    rl.close();
  }
}
