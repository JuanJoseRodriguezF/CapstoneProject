// prisma/seed.ts
import Database from "better-sqlite3";
import path from "path";

const db = new Database(path.resolve(__dirname, "dev.db"));

const existe = db.prepare("SELECT id_usuario FROM Usuario WHERE correo = ?").get("demo@ecolink.com");

if (!existe) {
  db.prepare(
    "INSERT INTO Usuario (nombre, correo, password, rol, telefono, ciudad) VALUES (?, ?, ?, ?, ?, ?)"
  ).run("Demo User", "demo@ecolink.com", "demo123", "ciudadano", "+1 555 000 0000", "Ciudad Demo");
  console.log("Usuario demo creado: demo@ecolink.com / demo123");
} else {
  console.log("Usuario demo ya existe.");
}

db.close();
