from flask import Flask, jsonify, request
from flask_cors import CORS
from questions import questions
app = Flask(__name__)
CORS(app)



@app.route('/api/questions', methods=['GET'])
def get_questions():
    return jsonify(questions)

@app.route('/api/submit', methods=['POST'])
def submit_quiz():
    answers = request.json.get('answers')
    correct_count = 0
    for answer in answers:
        question = next((q for q in questions if q['id'] == answer['id']), None)
        if question and question['answer'] == answer['answer']:
            correct_count += 1
    return jsonify({'score': correct_count, 'total': len(questions)})

if __name__ == '__main__':
    app.run(debug=True)
