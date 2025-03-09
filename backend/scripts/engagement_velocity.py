import pandas as pd
import os

def calculate_individual_EVS(data):
    """
    Engagement Velocity Score (EVS) per user.
    Factors:
      - HourSpendOnApp (higher => more engaged)
      - OrderCount (higher => more frequent buyer)
      - DaySinceLastOrder (lower => more recent)
    We'll normalize these and combine them into a 0-100 scale.
    """
    # 1) Normalize each factor
    data['norm_hours'] = (data['HourSpendOnApp'] - data['HourSpendOnApp'].min()) / \
                         (data['HourSpendOnApp'].max() - data['HourSpendOnApp'].min())
    
    data['norm_orders'] = (data['OrderCount'] - data['OrderCount'].min()) / \
                          (data['OrderCount'].max() - data['OrderCount'].min())
    
    # Invert the DaySinceLastOrder so lower days => higher engagement
    data['norm_recency'] = 1 - ((data['DaySinceLastOrder'] - data['DaySinceLastOrder'].min()) / \
                               (data['DaySinceLastOrder'].max() - data['DaySinceLastOrder'].min()))
    
    # 2) Define weights (adjust based on your business logic)
    weights = {
        'hours': 0.4,
        'orders': 0.3,
        'recency': 0.3
    }
    
    # 3) Calculate EVS (scale 0-100)
    data['EVS'] = (
        weights['hours'] * data['norm_hours'] +
        weights['orders'] * data['norm_orders'] +
        weights['recency'] * data['norm_recency']
    ) * 100
    
    return data

def calculate_cumulative_EVS():
    """
    Reads the churn_data.csv, computes individual EVS, 
    then returns the average EVS across all users.
    """
    base_dir = os.path.dirname(__file__)
    data_path = os.path.join(base_dir, 'data', 'churn_data.csv')
    df = pd.read_csv(data_path)
    
    # Compute individual EVS
    df = calculate_individual_EVS(df)
    
    # Average EVS across all customers
    cumulative_evs = df['EVS'].mean()
    return cumulative_evs

if __name__ == "__main__":
    val = calculate_cumulative_EVS()
    print(f"Cumulative Engagement Velocity Score: {val:.2f}")
