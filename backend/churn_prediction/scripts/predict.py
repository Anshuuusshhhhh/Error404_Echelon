import pickle
import pandas as pd
import os

# ----------- Step 3.1: Load the Trained Model -----------
model_path = os.path.join(os.path.dirname(__file__), '..', 'models', 'churn_model.pkl')
with open(model_path, 'rb') as f:
    model = pickle.load(f)

# ----------- Step 3.2: Prepare New Data for Prediction -----------
# Example: Creating a DataFrame with one customer record.
# Ensure the column names match those used in training (excluding CustomerID and Churn)
input_data = {
    'Tenure': [0.147540984],
    'PreferredLoginDevice': [2],
    'CityTier': [1],
    'WarehouseToHome': [8],
    'PreferredPaymentMode': [6],
    'Gender': [1],
    'HourSpendOnApp': [0.6],
    'NumberOfDeviceRegistered': [0.6],
    'PreferedOrderCat': [3],
    'SatisfactionScore': [3],
    'MaritalStatus': [2],
    'NumberOfAddress': [7],
    'Complain': [1],
    'OrderAmountHikeFromlastYear': [0.266666667],
    'CouponUsed': [0],
    'OrderCount': [0],
    'DaySinceLastOrder': [0],
    'CashbackAmount': [0.372011447]
}
df_input = pd.DataFrame(input_data)

# ----------- Step 3.3: Predict Churn -----------
prediction = model.predict(df_input)
print("Predicted Churn (1 indicates churn, 0 indicates non-churn):", prediction[0])
