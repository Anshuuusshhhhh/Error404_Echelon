import pandas as pd
import os

def calculate_individual_CHI(data):
    data['norm_satisfaction'] = (data['SatisfactionScore'] - data['SatisfactionScore'].min()) / (data['SatisfactionScore'].max() - data['SatisfactionScore'].min())
    data['norm_order_count'] = (data['OrderCount'] - data['OrderCount'].min()) / (data['OrderCount'].max() - data['OrderCount'].min())
    data['norm_tenure'] = (data['Tenure'] - data['Tenure'].min()) / (data['Tenure'].max() - data['Tenure'].min())
    data['norm_recency'] = 1 - ((data['DaySinceLastOrder'] - data['DaySinceLastOrder'].min()) / (data['DaySinceLastOrder'].max() - data['DaySinceLastOrder'].min()))

    weights = {
        'satisfaction': 0.4,
        'order_count': 0.3,
        'tenure': 0.2,
        'recency': 0.1
    }

    data['CHI'] = (
        weights['satisfaction'] * data['norm_satisfaction'] +
        weights['order_count'] * data['norm_order_count'] +
        weights['tenure'] * data['norm_tenure'] +
        weights['recency'] * data['norm_recency']
    ) * 100

    return data

def calculate_cumulative_CHI():
    base_dir = os.path.dirname(__file__)
    data_path = os.path.join(base_dir, 'data', 'churn_data.csv')
    data = pd.read_csv(data_path)
    data = calculate_individual_CHI(data)
    return data['CHI'].mean()

if __name__ == "__main__":
    base_dir = os.path.dirname(__file__)
    data_path = os.path.join(base_dir, 'data', 'churn_data.csv')
    df = pd.read_csv(data_path)
    df = calculate_individual_CHI(df)

    # Print individual CHI for debugging
    print("Individual CHI values:")
    print(df[['CustomerID', 'CHI']])

    # Calculate and print cumulative CHI
    cumulative_val = df['CHI'].mean()
    print(f"\nCumulative Customer Health Index (CHI): {cumulative_val:.2f}")
