import "dotenv/config";
import { createEmail } from "./util/createEmail.js";
import { queryCompanyDetails } from "./util/queryCompanyDetails.js";

const company = await queryCompanyDetails();
const email = await createEmail(company);
console.log("\n\n" + email);
