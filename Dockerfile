FROM python:3.13.3-slim-bookworm
WORKDIR /app
COPY . .
RUN pip install --no-cache-dir -r requirements.txt
EXPOSE 3000
CMD ["npm", "run", "backend"] & ["npm", "run", "dev"]