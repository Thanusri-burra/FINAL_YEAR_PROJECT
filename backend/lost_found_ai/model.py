import torch
import torchvision.models as models
import torchvision.transforms as transforms
from PIL import Image
import os

# Device
device = "cuda" if torch.cuda.is_available() else "cpu"

# Load base model (architecture)
model = models.resnet50(pretrained=False)

# Remove final classification layer (feature extractor)
model.fc = torch.nn.Identity()

# Path to model
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_PATH = os.path.join(BASE_DIR, "../models/resnet_feature_extractor.pth")

# Load weights (IMPORTANT FIX)
state_dict = torch.load(MODEL_PATH, map_location=device)
model.load_state_dict(state_dict)

# Move to device and eval mode
model = model.to(device)
model.eval()

# Image transform
transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
    transforms.Normalize(
        mean=[0.485, 0.456, 0.406],
        std=[0.229, 0.224, 0.225]
    )
])

# Feature extraction function
def extract_features(image: Image.Image):
    image = transform(image).unsqueeze(0).to(device)
    with torch.no_grad():
        features = model(image)
    return features.cpu()