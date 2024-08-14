# Usa una versión específica de Node.js
FROM node:16-alpine

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos de package.json y package-lock.json (si existe)
COPY package*.json ./

# Instala todas las dependencias
RUN npm install

# Verifica que jsonwebtoken y bcryptjs estén instalados
RUN npm list jsonwebtoken && npm list bcryptjs

# Copia el resto de los archivos de la aplicación
COPY . .

# Copia el archivo .env si existe
COPY .env* ./

# Expone el puerto en el que tu aplicación se ejecuta
EXPOSE 4000

# Comando para ejecutar la aplicación
CMD ["node", "src/index.js"]