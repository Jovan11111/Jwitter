from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from model import analyze_post

app = FastAPI()

class PostRequest(BaseModel):
    title: str
    content: str

@app.post("/rate")
async def rate_post(req: PostRequest):
    try:
        score = analyze_post(req.title, req.content)
        return {"score": score}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

