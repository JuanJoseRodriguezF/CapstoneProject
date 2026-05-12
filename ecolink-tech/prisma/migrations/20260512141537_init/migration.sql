-- CreateTable
CREATE TABLE "Usuario" (
    "id_usuario" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombre" TEXT NOT NULL,
    "correo" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "rol" TEXT NOT NULL DEFAULT 'ciudadano',
    "telefono" TEXT,
    "ciudad" TEXT
);

-- CreateTable
CREATE TABLE "Residuo" (
    "id_residuo" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "tipo" TEXT NOT NULL,
    "descripcion" TEXT,
    "estado" TEXT NOT NULL DEFAULT 'pendiente',
    "fecha_registro" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "id_usuario" INTEGER NOT NULL,
    "id_punto" INTEGER,
    CONSTRAINT "Residuo_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "Usuario" ("id_usuario") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Residuo_id_punto_fkey" FOREIGN KEY ("id_punto") REFERENCES "PuntoRecoleccion" ("id_punto") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Recoleccion" (
    "id_recoleccion" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "id_residuo" INTEGER NOT NULL,
    "id_gestor" INTEGER NOT NULL,
    "fecha_asignacion" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fecha_recoleccion" DATETIME,
    "estado" TEXT NOT NULL DEFAULT 'en proceso',
    CONSTRAINT "Recoleccion_id_residuo_fkey" FOREIGN KEY ("id_residuo") REFERENCES "Residuo" ("id_residuo") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Recoleccion_id_gestor_fkey" FOREIGN KEY ("id_gestor") REFERENCES "Usuario" ("id_usuario") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "PuntoRecoleccion" (
    "id_punto" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombre" TEXT NOT NULL,
    "direccion" TEXT NOT NULL,
    "ciudad" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Ciudad" (
    "id_entidad" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombre" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "contacto" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "HistorialEstado" (
    "id_historial" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "id_recoleccion" INTEGER NOT NULL,
    "estado" TEXT NOT NULL,
    "fecha" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "responsable" TEXT NOT NULL,
    CONSTRAINT "HistorialEstado_id_recoleccion_fkey" FOREIGN KEY ("id_recoleccion") REFERENCES "Recoleccion" ("id_recoleccion") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_correo_key" ON "Usuario"("correo");

-- CreateIndex
CREATE UNIQUE INDEX "Recoleccion_id_residuo_key" ON "Recoleccion"("id_residuo");
