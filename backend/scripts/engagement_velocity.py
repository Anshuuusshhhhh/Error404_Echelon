# File: backend/scripts/engagement_velocity.py
import pandas as pd
import os

def calculate_individual_EVS(data):
    """
    Engagement Velocity Score (EVS) per user.
    Factors:
      - HourSpendOnApp (higher => more engaged)
      - OrderCount (higher => more frequent buyer)
      - DaySinceLastOrder (lower => more recent)
    Normalize these and combine into a 0-100 scale.
    """
    data['norm_hours'] = (data['HourSpendOnApp'] - data['HourSpendOnApp'].min()) / (data['HourSpendOnApp'].max() - data['HourSpendOnApp'].min())
    data['norm_orders'] = (data['OrderCount'] - data['OrderCount'].min()) / (data['OrderCount'].max() - data['OrderCount'].min())
    data['norm_recency'] = 1 - ((data['DaySinceLastOrder'] - data['DaySinceLastOrder'].min()) / (data['DaySinceLastOrder'].max() - data['DaySinceLastOrder'].min()))
    
    weights = {
        'hours': 0.4,
        'orders': 0.3,
        'recency': 0.3
    }
    
    data['EVS'] = (weights['hours'] * data['norm_hours'] + weights['orders'] * data['norm_orders'] + weights['recency'] * data['norm_recency']) * 100
    return data

def calculate_cumulative_EVS():
    base_dir = os.path.dirname(__file__)
    data_path = os.path.join(base_dir, 'data', 'churn_data.csv')
    df = pd.read_csv(data_path)
    df = calculate_individual_EVS(df)
    cumulative_evs = df['EVS'].mean()
    return cumulative_evs

if __name__ == "__main__":
    val = calculate_cumulative_EVS()
    print(f"Cumulative Engagement Velocity Score: {val:.2f}")
