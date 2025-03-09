import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import classification_report
import pickle
import os

# ----------- Step 2.1: Load the Data -----------
# Make sure your CSV is in the 'data' folder
data_path = os.path.join(os.path.dirname(__file__), '..', 'data', 'churn_data.csv')
data = pd.read_csv(data_path)

# ----------- Step 2.2: Identify Features and Target -----------
# In this dataset, 'Churn' is the target variable.
# We'll drop CustomerID as it is not useful for prediction.
X = data.drop(['CustomerID', 'Churn'], axis=1)
y = data['Churn']

# ----------- Step 2.3: Define Feature Types -----------
# Define which columns are numeric and which are categorical.
# (Adjust the column names if needed based on your CSV)
numeric_features = [
    'Tenure', 'WarehouseToHome', 'HourSpendOnApp', 
    'NumberOfDeviceRegistered', 'SatisfactionScore', 
    'NumberOfAddress', 'OrderAmountHikeFromlastYear', 
    'OrderCount', 'DaySinceLastOrder', 'CashbackAmount'
]
categorical_features = [
    'PreferredLoginDevice', 'CityTier', 'PreferredPaymentMode', 
    'Gender', 'PreferedOrderCat', 'MaritalStatus', 
    'Complain', 'CouponUsed'
]

# ----------- Step 2.4: Build a Preprocessing Pipeline -----------
preprocessor = ColumnTransformer(
    transformers=[
        ('num', StandardScaler(), numeric_features),
        ('cat', OneHotEncoder(handle_unknown='ignore'), categorical_features)
    ]
)

# ----------- Step 2.5: Create the Full Pipeline with a Classifier -----------
# We use Logistic Regression for churn prediction.
pipeline = Pipeline(steps=[
    ('preprocessor', preprocessor),
    ('classifier', LogisticRegression(max_iter=1000))
])

# ----------- Step 2.6: Split the Data -----------
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# ----------- Step 2.7: Train the Model -----------
pipeline.fit(X_train, y_train)

# ----------- Step 2.8: Evaluate the Model -----------
y_pred = pipeline.predict(X_test)
print("Classification Report:\n", classification_report(y_test, y_pred))

# ----------- Step 2.9: Save the Trained Model -----------
# Ensure the models folder exists.
model_path = os.path.join(os.path.dirname(__file__), '..', 'models', 'churn_model.pkl')
with open(model_path, 'wb') as f:
    pickle.dump(pipeline, f)

print(f"Model saved to {model_path}")
