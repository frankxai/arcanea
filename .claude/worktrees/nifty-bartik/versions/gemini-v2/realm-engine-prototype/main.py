# V2 Realm Engine Prototype - main.py
# Owner: Gemini (Architect of the Loom)

import uuid
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field
from typing import Dict, Optional

# --- 1. Application Setup ---
app = FastAPI(
    title="Arcanea V2 - Realm Engine Prototype",
    description="A working prototype of the core V2 architecture.",
    version="0.1.0"
)

# --- 2. In-Memory Database ---
# For this prototype, we use a simple dictionary as an in-memory database.
DB = {
    "realms": {},
    "weavers": {},
    "nexus": {}
}

# --- 3. Core Data Models (Pydantic Schemas) ---

class Weaver(BaseModel):
    weaver_id: uuid.UUID = Field(default_factory=uuid.uuid4)
    display_name: str

class Nexus(BaseModel):
    nexus_id: uuid.UUID = Field(default_factory=uuid.uuid4)
    realm_id: uuid.UUID
    persona_summary: str = "A nascent consciousness, waiting to be shaped."

class Realm(BaseModel):
    realm_id: uuid.UUID = Field(default_factory=uuid.uuid4)
    owner_weaver_id: uuid.UUID
    name: str
    description: str
    nexus_id: uuid.UUID

class RealmCreationRequest(BaseModel):
    weaver_name: str # In a real app, this would come from auth
    realm_name: str
    realm_description: str

# --- 4. API Endpoints (The Incantations) ---

@app.post("/realms", response_model=Realm, status_code=201)
def create_realm(request: RealmCreationRequest):
    """
    **The Echo in the Void**
    
    Creates a new Realm and its corresponding Nexus.
    This is the first creative act for a Weaver.
    """
    # For prototype, create or get a weaver
    weaver = next((w for w in DB["weavers"].values() if w.display_name == request.weaver_name), None)
    if not weaver:
        weaver = Weaver(display_name=request.weaver_name)
        DB["weavers"][weaver.weaver_id] = weaver

    # Create the Realm
    new_realm = Realm(
        owner_weaver_id=weaver.weaver_id,
        name=request.realm_name,
        description=request.realm_description,
        nexus_id=uuid.uuid4() # Assign a future Nexus ID
    )

    # Create the associated Nexus
    new_nexus = Nexus(
        nexus_id=new_realm.nexus_id,
        realm_id=new_realm.realm_id
    )

    # Save to our in-memory DB
    DB["realms"][new_realm.realm_id] = new_realm
    DB["nexus"][new_nexus.nexus_id] = new_nexus

    return new_realm

@app.get("/realms/{realm_id}", response_model=Realm)
def get_realm(realm_id: uuid.UUID):
    """
    Fetches the details of a specific Realm by its ID.
    """
    realm = DB["realms"].get(realm_id)
    if not realm:
        raise HTTPException(status_code=404, detail=f"Realm with ID {realm_id} not found.")
    return realm

@app.get("/")
def read_root():
    """
    Root endpoint with a welcome message.
    """
    return {"message": "Welcome to the Realm Engine. The Loom of Creation is active."}

# To run this prototype:
# 1. Make sure you are in the `versions/gemini-v2/realm-engine-prototype` directory.
# 2. Install dependencies: `pip install -r requirements.txt`
# 3. Run the server: `uvicorn main:app --reload`
# 4. Access the API at http://127.0.0.1:8000/docs
