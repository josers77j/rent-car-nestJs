# Usa la imagen base de Node.js 22
FROM node:22.9.0

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /usr/src/app

# Instala dependencias adicionales (PostgreSQL client, netcat-openbsd)
RUN apt-get update && \
    apt-get install -y postgresql-client netcat-openbsd && \
    rm -rf /var/lib/apt/lists/*

# Instala pnpm manualmente en lugar de usar Corepack
RUN npm install -g pnpm@8.15.4

# Instala @nestjs/cli globalmente
RUN npm install -g @nestjs/cli

# Copia los archivos necesarios para instalar dependencias
COPY package*.json ./
RUN pnpm install

# Copia los archivos de Prisma (si los usas)
COPY prisma ./prisma/
RUN pnpm prisma generate

# Copia el resto de la aplicación al contenedor
COPY . .

# Copia el script de espera para PostgreSQL
COPY wait-for-postgres.sh ./

# Da permisos de ejecución al script de espera
RUN chmod +x wait-for-postgres.sh

# Expone el puerto de la aplicación
EXPOSE 5001

# Comando para iniciar la aplicación
CMD ["./wait-for-postgres.sh", "pnpm", "run", "start:dev"]
