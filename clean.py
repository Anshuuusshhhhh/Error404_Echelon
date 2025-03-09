import pandas as pd
from sklearn.preprocessing import LabelEncoder, MinMaxScaler

# Load dataset
df = pd.read_excel("E Commerce Dataset.xlsx", sheet_name="E Comm")

# Handle missing values
print(df.info())
df = df.dropna(axis=0)
# Save cleaned data
df.to_csv("Cleaned_E_Commerce_Data.csv", index=False)

print("Data Cleaning Completed & Saved")

# for col in df.columns:
#     if df[col].dtype == 'object':  # Categorical columns
#         df[col].fillna(df[col].mode()[0], inplace=True)
#     else:  # Numerical columns
#         df[col].fillna(df[col].median(), inplace=True)

'''
# Encode categorical variables
categorical_cols = ["PreferredLoginDevice", "PreferredPaymentMode", "Gender", "PreferedOrderCat", "MaritalStatus"]
encoder = LabelEncoder()
for col in categorical_cols:
    df[col] = encoder.fit_transform(df[col])

# Normalize numerical features
numerical_cols = ["Tenure", "HourSpendOnApp", "NumberOfDeviceRegistered", "OrderAmountHikeFromlastYear", 
                   "CouponUsed", "OrderCount", "DaySinceLastOrder", "CashbackAmount"]
scaler = MinMaxScaler()
df[numerical_cols] = scaler.fit_transform(df[numerical_cols])


'''
