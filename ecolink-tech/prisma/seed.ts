// prisma/seed.ts
import { Client } from "pg";

const CONNECTION_STRING = "postgresql://neondb_owner:npg_Hcko6SO1Mmnb@ep-steep-dust-aq95i29y.c-8.us-east-1.aws.neon.tech/neondb?sslmode=require";

async function main() {
  const client = new Client({ connectionString: CONNECTION_STRING });
  await client.connect();

  const { rows } = await client.query(
    'SELECT id_usuario FROM "Usuario" WHERE correo = $1',
    ["demo@ecolink.com"]
  );

  if (rows.length === 0) {
    await client.query(
      'INSERT INTO "Usuario" (nombre, correo, password, rol, telefono, ciudad) VALUES ($1, $2, $3, $4, $5, $6)',
      ["Demo User", "demo@ecolink.com", "demo123", "ciudadano", "+1 555 000 0000", "Ciudad Demo"]
    );
    console.log("Usuario demo creado: demo@ecolink.com / demo123");
  } else {
    console.log("Usuario demo ya existe.");
  }

  await client.end();
}

main().catch((e) => { console.error(e); process.exit(1); });
