# Use uma imagem oficial do Node.js como imagem de base
FROM node:18

# Instale o pnpm
RUN npm install -g pnpm

# Defina o diretório de trabalho no container
WORKDIR /usr/src/app

# Copie os arquivos de pacote e instale as dependências
COPY package*.json ./
RUN pnpm install

# Copie todos os arquivos do projeto
COPY . .

# Exponha a porta que a aplicação usará
EXPOSE 3000

# Comando para rodar a aplicação
CMD ["pnpm", "run", "start"]
