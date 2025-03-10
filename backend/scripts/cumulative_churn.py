# File: backend/scripts/cumulative_churn.py
import pandas as pd
import pickle
import os

def calculate_cumulative_churn():
    base_dir = os.path.dirname(__file__)
    model_path = os.path.join(base_dir, 'models', 'churn_model.pkl')
    data_path = os.path.join(base_dir, 'data', 'churn_data.csv')
    with open(model_path, 'rb') as f:
        model = pickle.load(f)
    data = pd.read_csv(data_path)
    X = data.drop(['CustomerID', 'Churn'], axis=1)
    churn_probabilities = model.predict_proba(X)[:, 1]
    cumulative_churn = churn_probabilities.mean() * 100
    return cumulative_churn

if __name__ == "__main__":
    val = calculate_cumulative_churn()
    print(f"Cumulative Churn: {val:.2f}%")
