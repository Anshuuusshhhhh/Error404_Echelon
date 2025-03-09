import pandas as pd
import os

def calculate_individual_CHI(data):
    # Normalize each component
    data['norm_satisfaction'] = (data['SatisfactionScore'] - data['SatisfactionScore'].min()) / (data['SatisfactionScore'].max() - data['SatisfactionScore'].min())
    data['norm_order_count'] = (data['OrderCount'] - data['OrderCount'].min()) / (data['OrderCount'].max() - data['OrderCount'].min())
    data['norm_tenure'] = (data['Tenure'] - data['Tenure'].min()) / (data['Tenure'].max() - data['Tenure'].min())
    # Invert normalization for recency so that lower days (more recent) gives higher score
    data['norm_recency'] = 1 - ((data['DaySinceLastOrder'] - data['DaySinceLastOrder'].min()) / (data['DaySinceLastOrder'].max() - data['DaySinceLastOrder'].min()))
    
    # Define weights for each component
    weights = {
        'satisfaction': 0.4,
        'order_count': 0.3,
        'tenure': 0.2,
        'recency': 0.1
    }
    
    # Calculate individual CHI scores (scale to 0-100)
    data['CHI'] = (weights['satisfaction'] * data['norm_satisfaction'] +
                   weights['order_count'] * data['norm_order_count'] +
                   weights['tenure'] * data['norm_tenure'] +
                   weights['recency'] * data['norm_recency']) * 100
    return data

def calculate_cumulative_CHI():
    base_dir = os.path.dirname(__file__)
    # Data folder is inside the scripts folder
    data_path = os.path.join(base_dir, 'data', 'churn_data.csv')
    data = pd.read_csv(data_path)
    data = calculate_individual_CHI(data)
    cumulative_CHI = data['CHI'].mean()
    return cumulative_CHI

if __name__ == "__main__":
    cumulative_health = calculate_cumulative_CHI()
    print(f"Cumulative Customer Health Index (CHI): {cumulative_health:.2f}")
