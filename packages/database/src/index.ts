export const databaseClient = () => {
  console.log("Database client initialized");
};

export type DatabaseConfig = {
  url: string;
  key: string;
};
