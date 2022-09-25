import torch
import platform
from PIL import Image
import torch.nn as nn
from flask_cors import CORS
import torchvision.models as models
import torchvision.transforms as transforms
from flask import Flask, request, jsonify, render_template

app = Flask(__name__)
CORS(app)

transformations = transforms.Compose([transforms.Resize((256, 256)), transforms.ToTensor()])
dataset = ['cardboard', 'glass', 'metal', 'paper', 'plastic', 'trash']

class ImageClassificationBase(nn.Module):
    def training_step(self, batch):
        images, labels = batch 
        out = self(images)                  # Generate predictions
        loss = F.cross_entropy(out, labels) # Calculate loss
        return loss
    
    def validation_step(self, batch): 
        images, labels = batch 
        out = self(images)                    # Generate predictions
        loss = F.cross_entropy(out, labels)   # Calculate loss
        acc = accuracy(out, labels)           # Calculate accuracy
        return {'val_loss': loss.detach(), 'val_acc': acc}
        
    def validation_epoch_end(self, outputs):
        batch_losses = [x['val_loss'] for x in outputs]
        epoch_loss = torch.stack(batch_losses).mean()   # Combine losses
        batch_accs = [x['val_acc'] for x in outputs]
        epoch_acc = torch.stack(batch_accs).mean()      # Combine accuracies
        return {'val_loss': epoch_loss.item(), 'val_acc': epoch_acc.item()}
    
    def epoch_end(self, epoch, result):
        print("Epoch {}: train_loss: {:.4f}, val_loss: {:.4f}, val_acc: {:.4f}".format(
            epoch+1, result['train_loss'], result['val_loss'], result['val_acc']))

class ResNet(ImageClassificationBase):
    def __init__(self):
        super().__init__()
        # Use a pretrained model
        self.network = models.resnet50(pretrained=True)
        # Replace last layer
        num_ftrs = self.network.fc.in_features
        self.network.fc = nn.Linear(num_ftrs, len(dataset))
    
    def forward(self, xb):
        return torch.sigmoid(self.network(xb))

model = ResNet()

def to_device(data, device):
    """Move tensor(s) to chosen device"""
    if isinstance(data, (list,tuple)):
        return [to_device(x, device) for x in data]
    return data.to(device, non_blocking=True)

def get_default_device():
    """Pick GPU if available, else CPU"""
    if torch.cuda.is_available():
        return torch.device('cuda')
    else:
        return torch.device('cpu')

def predict_image(img, model):
    # Convert to a batch of 1
    xb = to_device(img.unsqueeze(0), device)
    # Get predictions from model
    yb = model(xb)
    # Pick index with highest probability
    prob, preds  = torch.max(yb, dim=1)
    # Retrieve the class label
    return dataset[preds[0].item()]

# 분류기 웹사이트 가는 버튼
@app.route('/')
def index():
    return render_template('index.html')

# 메인 페이지 라우팅
@app.route("/index")

# 데이터 예측 처리
@app.route('/predict', methods=['POST'])
def make_prediction():
    if request.method == 'POST':
        # 업로드 파일 처리 분기
        file = request.files['image']
        if not file: return 'none'
        
        #업로드 받은 사진 처리
        image = Image.open(file)
        
        #이미지 변환
        example_image = transformations(image)
        
        # 모델을 통해 예측
        prediction = predict_image(example_image, loaded_model)
        
        res_body = {'label': prediction}
        return jsonify(res_body)

if __name__ == '__main__':

    device = get_default_device() 
    
    # 모델 로드
    # 윈도우/유닉스에 따른 모델 경로 변경
    model_path = 'model/model.pt'
    if platform.system() == 'Windows':
        model_path.replace('/', '\\')

    loaded_model = torch.load(model_path, map_location=torch.device('cpu'))

    # Flask 서비스 스타트
    app.run(host='0.0.0.0', port=8000, debug=True)
