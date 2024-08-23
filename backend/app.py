from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Sample quiz data (you can replace this with a database later)
quiz_data = [
    {
        "id": 1,
        "question": "Who wrote '1984'?",
        "options": ["George Orwell", "Aldous Huxley", "Ray Bradbury", "Philip K. Dick"],
        "correct_answer": "George Orwell"
    },
    {
        "id": 2,
        "question": "In 'To Kill a Mockingbird', what is the name of Scout's brother?",
        "options": ["Jem", "Dill", "Boo", "Atticus"],
        "correct_answer": "Jem"
    }
]

@app.route('/api/questions', methods=['GET'])
def get_questions():
    return jsonify(quiz_data)

@app.route('/api/submit', methods=['POST'])
def submit_answers():
    user_answers = request.json
    score = 0
    for answer in user_answers:
        question = next((q for q in quiz_data if q['id'] == answer['id']), None)
        if question and question['correct_answer'] == answer['answer']:
            score += 1
    return jsonify({"score": score, "total": len(quiz_data)})

if __name__ == '__main__':
    app.run(debug=True)
