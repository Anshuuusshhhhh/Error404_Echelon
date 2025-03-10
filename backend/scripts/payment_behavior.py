# File: backend/scripts/payment_behavior.py
import pandas as pd
import os

def calculate_individual_PBI(data):
    """
    Calculate Payment Behavior Index (PBI) for each user.
    Factors:
      - PreferredPaymentMode: mapped to a score.
      - OrderAmountHikeFromlastYear: normalized.
      - CouponUsed: score 1 if coupon NOT used, else 0.
      - CashbackAmount: normalized.
    Returns the DataFrame with a new column 'PBI' (scaled 0-100).
    """
    # Map PreferredPaymentMode to a score
    payment_mode_map = {
        1: 90,
        2: 80,
        3: 70,
        4: 60
    }
    data['payment_mode_score'] = data['PreferredPaymentMode'].map(payment_mode_map).fillna(50)
    
    # Normalize OrderAmountHikeFromlastYear
    data['norm_order_hike'] = (data['OrderAmountHikeFromlastYear'] - data['OrderAmountHikeFromlastYear'].min()) / (data['OrderAmountHikeFromlastYear'].max() - data['OrderAmountHikeFromlastYear'].min())
    
    # CouponUsed: Favorable if coupon NOT used, so score 1 if 0, else 0.
    data['coupon_score'] = data['CouponUsed'].apply(lambda x: 1 if x == 0 else 0)
    
    # Normalize CashbackAmount
    data['norm_cashback'] = (data['CashbackAmount'] - data['CashbackAmount'].min()) / (data['CashbackAmount'].max() - data['CashbackAmount'].min())
    
    weights = {
        'payment_mode': 0.3,
        'order_hike': 0.3,
        'coupon': 0.2,
        'cashback': 0.2
    }
    
    # Combine components to produce PBI (scale 0-100)
    data['PBI'] = (
        weights['payment_mode'] * (data['payment_mode_score'] / 100) +
        weights['order_hike'] * data['norm_order_hike'] +
        weights['coupon'] * data['coupon_score'] +
        weights['cashback'] * data['norm_cashback']
    ) * 100
    return data

def calculate_cumulative_PBI():
    base_dir = os.path.dirname(__file__)
    data_path = os.path.join(base_dir, 'data', 'churn_data.csv')
    data = pd.read_csv(data_path)
    data = calculate_individual_PBI(data)
    cumulative_PBI = data['PBI'].mean()
    return cumulative_PBI

if __name__ == "__main__":
    cumulative_pbi = calculate_cumulative_PBI()
    print(f"Cumulative Payment Behavior Index (PBI): {cumulative_pbi:.2f}")
