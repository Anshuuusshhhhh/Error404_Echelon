import pandas as pd
import os

#individual customer basis!!!

def calculate_customer_health_index():
    # Define the data path (ensure your CSV file is in the 'data' folder)
    data_path = os.path.join(os.path.dirname(__file__), '..', 'data', 'churn_data.csv')
    data = pd.read_csv(data_path)
    
    # Normalize the values for each component:
    # 1. SatisfactionScore (higher is better)
    data['norm_satisfaction'] = (data['SatisfactionScore'] - data['SatisfactionScore'].min()) / (data['SatisfactionScore'].max() - data['SatisfactionScore'].min())
    
    # 2. OrderCount (higher is better)
    data['norm_order_count'] = (data['OrderCount'] - data['OrderCount'].min()) / (data['OrderCount'].max() - data['OrderCount'].min())
    
    # 3. Tenure (higher is better)
    data['norm_tenure'] = (data['Tenure'] - data['Tenure'].min()) / (data['Tenure'].max() - data['Tenure'].min())
    
    # 4. DaySinceLastOrder (lower is better, so we invert the normalization)
    data['norm_recency'] = 1 - ((data['DaySinceLastOrder'] - data['DaySinceLastOrder'].min()) / (data['DaySinceLastOrder'].max() - data['DaySinceLastOrder'].min()))
    
    # Define weights for each component (tweak these based on business insights)
    weights = {
        'satisfaction': 0.4,
        'order_count': 0.3,
        'tenure': 0.2,
        'recency': 0.1
    }
    
    # Calculate the composite Customer Health Index (CHI)
    data['CHI'] = (
        weights['satisfaction'] * data['norm_satisfaction'] +
        weights['order_count'] * data['norm_order_count'] +
        weights['tenure'] * data['norm_tenure'] +
        weights['recency'] * data['norm_recency']
    )
    
    # Scale the CHI score to a range from 0 to 100
    data['CHI'] = data['CHI'] * 100
    
    # Return a DataFrame with CustomerID and their CHI
    return data[['CustomerID', 'CHI']]

if __name__ == "__main__":
    chi_df = calculate_customer_health_index()
    print("Customer Health Index for first 5 users:")
    print(chi_df.head())
