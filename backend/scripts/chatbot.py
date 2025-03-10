# File: backend/scripts/chatbot.py
import os
from flask import Flask, request, jsonify
from google import genai
from google.genai import types
from dotenv import load_dotenv
from flask_cors import CORS
import csv

load_dotenv()

app = Flask(__name__)
CORS(app)

api_key = os.getenv("GEMINI_API_KEY")
if not api_key:
    raise ValueError("Error: GEMINI_API_KEY environment variable is not set.")

client = genai.Client(api_key=api_key)
model = "gemini-2.0-pro-exp-02-05"

@app.route("/chatbot", methods=["POST"])
def chatbot():
    user_input = request.json.get("message", "")
    if not user_input:
        return jsonify({"error": "No message provided"}), 400

    contents = [
        types.Content(
            role="user",
            parts=[types.Part.from_text(text=user_input)],
        ),
    ]

    dataset_summary = ""
    try:
        # Ensure the file name and path are correct relative to chatbot.py.
        data_file = os.path.join(os.path.dirname(__file__), 'data', 'churn_data.csv')
        with open(data_file, mode='r') as file:
            reader = csv.reader(file)
            header = next(reader)  # Get the header
            dataset_summary = f"Dataset Header: {header}\n"
            row_count = 0
            for row in reader:
                row_count += 1
                if row_count < 6:  # Only show the first few rows for example.
                    dataset_summary += f"Row: {row}\n"
                else:
                    break
            dataset_summary += f"Total Rows: {row_count}"
    except FileNotFoundError:
        dataset_summary = "Dataset file not found."

    generate_content_config = types.GenerateContentConfig(
        temperature=0,
        top_p=0.95,
        top_k=64,
        max_output_tokens=8192,
        response_mime_type="text/plain",
        system_instruction=[
            types.Part.from_text(
                text=f"""
                You are a CRM expert. Provide suggestions based on the user's query and the provided dataset summary (if any).

                Consider the following dataset variables when providing suggestions and lead generation:
                CustomerID, Churn, Tenure, PreferredLoginDevice, CityTier, WarehouseToHome,
                PreferredPaymentMode, Gender, HourSpendOnApp, NumberOfDeviceRegistered,
                PreferedOrderCat, SatisfactionScore, MaritalStatus, NumberOfAddress, Complain,
                OrderAmountHikeFromlastYear, CouponUsed, OrderCount, DaySinceLastOrder, CashbackAmount.

                Answer in a structured, crisp format. Prioritize key words and concise points.

                For lead generation (if dataset_summary is provided):
                - Include CustomerID and reason for lead.
                - Format leads clearly and concisely.

                Additionally, if the Admin asks about customer behavioral shifts to predict satisfaction, consider:
                - Analyzing customer reviews, social media (Twitter), and emails for sentiment.
                - Identifying patterns in customer communication that indicate changes in satisfaction.
                - Providing insights into potential dissatisfaction triggers.
                - Detecting subtle changes in language or tone, even with ambiguous sentiment.
                
                If dataset_summary is provided, use it to give leads. Leads should include CustomerID and reason for lead.

                Dataset Summary: {dataset_summary}

                Provide actionable and insightful suggestions, and generate leads when applicable.
                """
            ),
        ],
    )

    response_text = ""
    for chunk in client.models.generate_content_stream(
        model=model,
        contents=contents,
        config=generate_content_config,
    ):
        response_text += chunk.text

    # Remove unwanted characters if necessary
    response_text = response_text.replace('*', '').replace('#', '')
    return jsonify({"reply": response_text})

if __name__ == "__main__":
    app.run(debug=True)
