import "dotenv/config";

const { EXCEL_USERNAME, EXCEL_PASSWORD } = process.env;
if (!EXCEL_USERNAME || !EXCEL_PASSWORD) {
  throw new Error("Credentails are missing, please check your env variables");
}

export const credentials = {
  username: EXCEL_USERNAME,
  password: EXCEL_PASSWORD,
};
