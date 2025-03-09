import pandas as pd
import pickle
import os

def calculate_cumulative_churn():
    # Paths to model and data
    base_dir = os.path.dirname(__file__)
    model_path = os.path.join(base_dir, 'models', 'churn_model.pkl')
    data_path = os.path.join(base_dir, 'data', 'churn_data.csv')
    
    # Load the trained churn model
    with open(model_path, 'rb') as f:
        model = pickle.load(f)
    
    # Load the multi-user dataset
    data = pd.read_csv(data_path)
    
    # Prepare features by dropping non-predictive columns
    X = data.drop(['CustomerID', 'Churn'], axis=1)
    
    # Get churn probability for each user (probability of churn, class 1)
    churn_probabilities = model.predict_proba(X)[:, 1]
    
    # Calculate cumulative churn as the average churn probability (in %)
    cumulative_churn = churn_probabilities.mean() * 100
    return cumulative_churn

if __name__ == "__main__":
    val = calculate_cumulative_churn()
    print(f"Cumulative Churn: {val:.2f}%")
