from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# IMPORT BOTH MODULES
from routers.lost_found import router as lost_found_router
from routers.keyword import router as keyword_router
from routers.abuse import router as abusive_router
from routers.violence import router as violence_router

app = FastAPI(title="Campus Guard Backend")

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
    
)

# INCLUDE ALL ROUTERS
app.include_router(lost_found_router)
app.include_router(keyword_router)
app.include_router(abusive_router, prefix="/abuse", tags=["Abuse Detection"])
app.include_router(violence_router)

# ROOT
@app.get("/")
def home():
    return {"status": "Backend running"}