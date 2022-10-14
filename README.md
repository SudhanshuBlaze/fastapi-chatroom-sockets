## Setup and Run locally
FastAPI is a modern, fast (high-performance), web framework for building APIs with Python 3.7+ based on standard Python type hints.

### for server

Install the dependencies

```bash
pip install -r requirements.txt
```

Run the backend server

```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

### for client

Install the dependencies

```bash
npm i
```

Start the server

```bash
npm start
```

### Build & run the docker image

- for backend

```bash
docker build -t server .
```

```bash
docker run -d -p 8000:8000 server
```

- for client

```bash
docker build -t client .
```

```bash
docker run -d -p 3000:3000 client
```
