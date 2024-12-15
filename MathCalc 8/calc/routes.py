from flask import render_template, request, jsonify
import json

#from flask_login import LoginManager

from calc import app

FORMULAS = {}

FORMULA_DATA = {}

@app.route('/add_formula', methods=['POST'])
def add_formula():
    global FORMULA_DATA
    data = request.get_json()
    formula_id = len(FORMULA_DATA) + 1
    FORMULA_DATA[formula_id] = data
    with open('db.json', 'w') as f:
        json.dump(FORMULA_DATA, f, indent=4)
    return jsonify({"status": "success", "id": formula_id}), 201


@app.route('/constr')
def contr():
  return render_template('index.html')