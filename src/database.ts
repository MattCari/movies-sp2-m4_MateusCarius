import { Client } from "pg";

const client = new Client({
  user: "T-Gamer",
  password: "Fc2jzf5u",
  host: "localhost",
  database: "T-Gamer",
  port: 5432,
});

const connectDatabase = async () => {
  await client.connect();
  console.log("Conexão feita.");
};

export { client, connectDatabase };
