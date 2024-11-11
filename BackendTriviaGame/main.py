from fastapi import FastAPI

app = FastAPI()


@app.get("/", tags=["Home"])
def read_root():
    return {"Hello": "World"}