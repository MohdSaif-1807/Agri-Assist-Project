from flask import Flask, render_template, request,jsonify, Markup,redirect
from flask_cors import CORS
import numpy as np
import pandas as pd
from utils.disease import disease_dic
import requests
import pickle
import io
import config
import torch
from torchvision import transforms
from PIL import Image
from utils.model import ResNet9

disease_classes = ["Apple___Apple_scab",
                   "Apple___Black_rot",
                   "Apple___Cedar_apple_rust",
                   "Apple___healthy",
                   "Blueberry___healthy",
                   "Cherry_(including_sour)___Powdery_mildew",
                   "Cherry_(including_sour)___healthy",
                   "Corn_(maize)___Cercospora_leaf_spot Gray_leaf_spot",
                   "Corn_(maize)___Common_rust_",
                   "Corn_(maize)___Northern_Leaf_Blight",
                   "Corn_(maize)___healthy",
                   "Grape___Black_rot",
                   "Grape___Esca_(Black_Measles)",
                   "Grape___Leaf_blight_(Isariopsis_Leaf_Spot)",
                   "Grape___healthy",
                   "Orange___Haunglongbing_(Citrus_greening)",
                   "Peach___Bacterial_spot",
                   "Peach___healthy",
                   "Pepper,_bell___Bacterial_spot",
                   "Pepper,_bell___healthy",
                   "Potato___Early_blight",
                   "Potato___Late_blight",
                   "Potato___healthy",
                   "Raspberry___healthy",
                   "Soybean___healthy",
                   "Squash___Powdery_mildew",
                   "Strawberry___Leaf_scorch",
                   "Strawberry___healthy",
                   "Tomato___Bacterial_spot",
                   "Tomato___Early_blight",
                   "Tomato___Late_blight",
                   "Tomato___Leaf_Mold",
                   "Tomato___Septoria_leaf_spot",
                   "Tomato___Spider_mites Two-spotted_spider_mite",
                   "Tomato___Target_Spot",
                   "Tomato___Tomato_Yellow_Leaf_Curl_Virus",
                   "Tomato___Tomato_mosaic_virus",
                   "Tomato___healthy"]

def weather_fetch(city_name):
    api_key = config.weather_api_key
    base_url = "http://api.openweathermap.org/data/2.5/weather?"

    complete_url = base_url + "appid=" + api_key + "&q=" + city_name
    response = requests.get(complete_url)
    x = response.json()

    if x["cod"] != "404":
        y = x["main"]

        temperature = round((y["temp"] - 273.15), 2)
        humidity = y["humidity"]
        return temperature, humidity
    else:
        return None

def predict_image(img):
    disease_model_path = 'models/plant_disease_model.pth'
    disease_model = ResNet9(3, len(disease_classes))
    disease_model.load_state_dict(torch.load(disease_model_path, map_location=torch.device('cpu')))
    transform = transforms.Compose([
        transforms.Resize(256),
        transforms.ToTensor(),
    ])
    image = Image.open(io.BytesIO(img))
    img_t = transform(image)
    img_u = torch.unsqueeze(img_t, 0)
    yb = disease_model(img_u)
    _, preds = torch.max(yb, dim=1)
    prediction = disease_classes[preds[0].item()]
    return prediction

app = Flask(__name__)
CORS(app)

@app.route('/')
def hello_world():
    return 'Hello, World!'

@app.route('/check-get',methods=['GET'])
def check():
    data = {
        "message":"hello world"
    }
    return jsonify(data)

@app.route('/check-post',methods=['POST'])
def check_post():
    if request.method == 'POST':
        Name = request.json['name']
        return jsonify(Name)
    else:
        S="something went wrong!"
        return jsonify(S)

@app.route('/disease-predict', methods=['POST'])
def disease_prediction():
    if request.method == 'POST':
        file = request.files['file']
        try:
            print(file)
            img = file.read()
            prediction = predict_image(img)
            prediction = disease_dic[prediction]
            return jsonify(prediction)
        except Exception  as e:
            print('hello')
            print(str(e))
            err={
                "err":"something went wrong!"
            }
            return err
    else:
        s={
            "err":"oops!!"
        }
        return jsonify(s)
    
@ app.route('/crop-predict', methods=['POST'])
def crop_prediction():
    if request.method == 'POST':
        crop_recommendation_model_path = 'models/RandomForest.pkl'
        crop_recommendation_model = pickle.load(open(crop_recommendation_model_path, 'rb'))
        N = request.json['nitrogen']
        P = request.json['phosphorous']
        K = request.json['pottasium']
        ph = request.json['ph']
        rainfall = request.json['rainfall']
        city = request.json['city']
        if weather_fetch(city) != None:
            temperature, humidity =  weather_fetch(city)
            data = np.array([[N, P, K, temperature, humidity, ph, rainfall]])
            my_prediction =  crop_recommendation_model.predict(data)
            final_prediction = my_prediction[0]
            return jsonify(final_prediction)

        else:
            ans_data="something went wrong"
            return jsonify(ans_data)
    
if __name__ == '__main__':
    app.run(port=7000)