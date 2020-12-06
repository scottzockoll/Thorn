from flask import Flask, request
from flask_cors import CORS
from markov import Markov

app = Flask(__name__)
CORS(app, supports_credentials=True)


@app.route('/evaluate/<input_string>', methods=['POST'])
def hello_world(input_string):
    rules = {}
    for key, value in request.form.items():
        rules[key] = value
    m = Markov(rules)
    print(rules)
    return {
        'result': m.evaluate(input_string)
    }
