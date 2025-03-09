# File: backend/scripts/payment_behavior.py
import pandas as pd
import os

def calculate_individual_PBI(data):
    """
    Calculate Payment Behavior Index (PBI) for each user.
    Factors:
      - PreferredPaymentMode: mapped via a custom score.
      - OrderAmountHikeFromlastYear: normalized.
      - CouponUsed: 1 if coupon NOT used, 0 if used.
      - CashbackAmount: normalized.
    Returns the DataFrame with a new column 'PBI' (scaled 0-100).
    """
    # Map PreferredPaymentMode to a score (example mapping)
    # Adjust the mapping as per your business requirements.
    payment_mode_map = {
        1: 90,
        2: 80,
        3: 70,
        4: 60
    }
    data['payment_mode_score'] = data['PreferredPaymentMode'].map(payment_mode_map).fillna(50)
    
    # Normalize OrderAmountHikeFromlastYear
    data['norm_order_hike'] = (data['OrderAmountHikeFromlastYear'] - data['OrderAmountHikeFromlastYear'].min()) / \
                              (data['OrderAmountHikeFromlastYear'].max() - data['OrderAmountHikeFromlastYear'].min())
    
    # CouponUsed: Favorable if coupon NOT used. So, score=1 if CouponUsed==0, else 0.
    data['coupon_score'] = data['CouponUsed'].apply(lambda x: 1 if x == 0 else 0)

    # Note: If your data type for CouponUsed is numeric 0/1, adjust accordingly.

    # Normalize CashbackAmount
    data['norm_cashback'] = (data['CashbackAmount'] - data['CashbackAmount'].min()) / \
                            (data['CashbackAmount'].max() - data['CashbackAmount'].min())
    
    # Define weights for each component (sums to 1)
    weights = {
        'payment_mode': 0.3,
        'order_hike': 0.3,
        'coupon': 0.2,
        'cashback': 0.2
    }
    
    # Calculate composite Payment Behavior Index (PBI)
    # Note: For payment_mode_score, which is already in [0,100], we normalize by dividing by 100.
    data['PBI'] = (
        weights['payment_mode'] * (data['payment_mode_score'] / 100) +
        weights['order_hike'] * data['norm_order_hike'] +
        weights['coupon'] * data['coupon_score'] +
        weights['cashback'] * data['norm_cashback']
    ) * 100
    
    return data

def calculate_cumulative_PBI():
    """
    Reads the churn_data.csv (located in the data folder within the scripts directory),
    calculates individual PBI scores, and returns the average (cumulative) PBI.
    """
    base_dir = os.path.dirname(__file__)
    data_path = os.path.join(base_dir, 'data', 'churn_data.csv')
    data = pd.read_csv(data_path)
    data = calculate_individual_PBI(data)
    cumulative_PBI = data['PBI'].mean()
    return cumulative_PBI

if __name__ == "__main__":
    cumulative_pbi = calculate_cumulative_PBI()
    print(f"Cumulative Payment Behavior Index (PBI): {cumulative_pbi:.2f}")
