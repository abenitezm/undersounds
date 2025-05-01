FROM python:3.13.3-slim-bookworm
# Instala Node.js
RUN apt-get update && \
    apt-get install -y curl && \
    curl -fsSL https://deb.nodesource.com/setup_18.x | bash - && \
    apt-get install -y nodejs && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*
WORKDIR /app
COPY . .
RUN pip install --no-cache-dir -r requirements.txt
RUN npm install
EXPOSE 3000
EXPOSE 8000
CMD ["sh", "-c", "npm run backend & npm run dev && wait"]