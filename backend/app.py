from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)

# Allow CORS for specific origin and methods
CORS(app, resources={
    r"/*": {
        "origins": "http://localhost:5173",
        "methods": ["OPTIONS", "POST", "GET"],
        "allow_headers": ["Content-Type"]
    }
})

# Add CORS headers to every response
@app.after_request
def add_cors_headers(response):
    response.headers["Access-Control-Allow-Origin"] = "http://localhost:5173"
    response.headers["Access-Control-Allow-Methods"] = "OPTIONS, POST, GET"
    response.headers["Access-Control-Allow-Headers"] = "Content-Type"
    return response

@app.route('/', methods=['GET'])
def home():
    return "Welcome to the Flask Calculator API!"

@app.route('/calculate', methods=['POST', 'OPTIONS'])
def calculate():
    if request.method == 'OPTIONS':
        # Preflight response
        return jsonify({'message': 'CORS preflight success'}), 200
    try:
        data = request.json  # Get JSON data from the request
        print(f"Request JSON: {data}")  # Debug: Log the received data

        expression = data.get('expression', '')  # Extract "expression" key from JSON
        print(f"Expression to evaluate: {expression}")  # Debug: Log the expression

        # Evaluate the mathematical expression
        result = eval(expression)
        print(f"Result: {result}")  # Debug: Log the result

        return jsonify({'result': result})  # Return the result as JSON
    except Exception as e:
        print(f"Error occurred: {e}")  # Debug: Log the error
        return jsonify({'error': 'Invalid expression'}), 400

if __name__ == '__main__':
    app.run(debug=True)
