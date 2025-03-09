# File: backend/scripts/app.py
from flask import Flask, jsonify
from flask_cors import CORS
import os
import pandas as pd
import pickle
import sys

# Add the 'scripts' directory to the Python path (if not already added)
sys.path.append(os.path.join(os.path.dirname(__file__), '.'))

from cumulative_churn import calculate_cumulative_churn
from cumulative_CHI import calculate_individual_CHI, calculate_cumulative_CHI
from engagement_velocity import calculate_cumulative_EVS
from payment_behavior import calculate_cumulative_PBI, calculate_individual_PBI

app = Flask(__name__)
CORS(app)  # Enable cross-origin requests

BASE_DIR = os.path.dirname(__file__)

@app.route('/api/cumulative_churn', methods=['GET'])
def get_cumulative_churn_endpoint():
    try:
        model_path = os.path.join(BASE_DIR, 'models', 'churn_model.pkl')
        data_path = os.path.join(BASE_DIR, 'data', 'churn_data.csv')
        with open(model_path, 'rb') as f:
            model = pickle.load(f)
        data = pd.read_csv(data_path)
        X = data.drop(['CustomerID', 'Churn'], axis=1)
        churn_probabilities = model.predict_proba(X)[:, 1]
        cumulative_churn = churn_probabilities.mean() * 100
        return jsonify({"cumulative_churn": round(cumulative_churn, 2)})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/cumulative_chi', methods=['GET'])
def get_cumulative_chi_endpoint():
    try:
        cumulative_chi = calculate_cumulative_CHI()
        return jsonify({"cumulative_chi": round(cumulative_chi, 2)})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/individual_chi', methods=['GET'])
def get_individual_chi_endpoint():
    try:
        data_path = os.path.join(BASE_DIR, 'data', 'churn_data.csv')
        data = pd.read_csv(data_path)
        data = calculate_individual_CHI(data)
        individual_chi = data[['CustomerID', 'CHI']].to_dict(orient="records")
        return jsonify({"individual_chi": individual_chi})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/engagement_velocity', methods=['GET'])
def get_engagement_velocity_endpoint():
    try:
        evs_value = calculate_cumulative_EVS()
        return jsonify({"cumulative_evs": round(evs_value, 2)})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# NEW: Payment Behavior Endpoints

# Cumulative Payment Behavior Index (Average across all users)
@app.route('/api/payment_behavior', methods=['GET'])
def get_payment_behavior_endpoint():
    try:
        cumulative_pbi = calculate_cumulative_PBI()
        return jsonify({"cumulative_pbi": round(cumulative_pbi, 2)})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Individual Payment Behavior Index for each user (for heat map table, etc.)
@app.route('/api/individual_payment_behavior', methods=['GET'])
def get_individual_payment_behavior_endpoint():
    try:
        data_path = os.path.join(BASE_DIR, 'data', 'churn_data.csv')
        data = pd.read_csv(data_path)
        data = calculate_individual_PBI(data)
        individual_pbi = data[['CustomerID', 'PBI']].to_dict(orient="records")
        return jsonify({"individual_pbi": individual_pbi})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
