-- CreateTable
CREATE TABLE "Usuario" (
    "id_usuario" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "correo" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "rol" TEXT NOT NULL DEFAULT 'ciudadano',
    "telefono" TEXT,
    "ciudad" TEXT,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id_usuario")
);

-- CreateTable
CREATE TABLE "Residuo" (
    "id_residuo" SERIAL NOT NULL,
    "tipo" TEXT NOT NULL,
    "descripcion" TEXT,
    "estado" TEXT NOT NULL DEFAULT 'pendiente',
    "fecha_registro" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "id_usuario" INTEGER NOT NULL,
    "id_punto" INTEGER,

    CONSTRAINT "Residuo_pkey" PRIMARY KEY ("id_residuo")
);

-- CreateTable
CREATE TABLE "Recoleccion" (
    "id_recoleccion" SERIAL NOT NULL,
    "id_residuo" INTEGER NOT NULL,
    "id_gestor" INTEGER NOT NULL,
    "fecha_asignacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fecha_recoleccion" TIMESTAMP(3),
    "estado" TEXT NOT NULL DEFAULT 'en proceso',

    CONSTRAINT "Recoleccion_pkey" PRIMARY KEY ("id_recoleccion")
);

-- CreateTable
CREATE TABLE "PuntoRecoleccion" (
    "id_punto" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "direccion" TEXT NOT NULL,
    "ciudad" TEXT NOT NULL,

    CONSTRAINT "PuntoRecoleccion_pkey" PRIMARY KEY ("id_punto")
);

-- CreateTable
CREATE TABLE "Ciudad" (
    "id_entidad" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "contacto" TEXT NOT NULL,

    CONSTRAINT "Ciudad_pkey" PRIMARY KEY ("id_entidad")
);

-- CreateTable
CREATE TABLE "HistorialEstado" (
    "id_historial" SERIAL NOT NULL,
    "id_recoleccion" INTEGER NOT NULL,
    "estado" TEXT NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "responsable" TEXT NOT NULL,

    CONSTRAINT "HistorialEstado_pkey" PRIMARY KEY ("id_historial")
);

-- CreateTable
CREATE TABLE "Cita" (
    "id" SERIAL NOT NULL,
    "centroId" INTEGER NOT NULL,
    "centroNombre" TEXT NOT NULL,
    "fecha" TEXT NOT NULL,
    "hora" TEXT NOT NULL,
    "userEmail" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Cita_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_correo_key" ON "Usuario"("correo");

-- CreateIndex
CREATE UNIQUE INDEX "Recoleccion_id_residuo_key" ON "Recoleccion"("id_residuo");

-- AddForeignKey
ALTER TABLE "Residuo" ADD CONSTRAINT "Residuo_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "Usuario"("id_usuario") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Residuo" ADD CONSTRAINT "Residuo_id_punto_fkey" FOREIGN KEY ("id_punto") REFERENCES "PuntoRecoleccion"("id_punto") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Recoleccion" ADD CONSTRAINT "Recoleccion_id_residuo_fkey" FOREIGN KEY ("id_residuo") REFERENCES "Residuo"("id_residuo") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Recoleccion" ADD CONSTRAINT "Recoleccion_id_gestor_fkey" FOREIGN KEY ("id_gestor") REFERENCES "Usuario"("id_usuario") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HistorialEstado" ADD CONSTRAINT "HistorialEstado_id_recoleccion_fkey" FOREIGN KEY ("id_recoleccion") REFERENCES "Recoleccion"("id_recoleccion") ON DELETE RESTRICT ON UPDATE CASCADE;
