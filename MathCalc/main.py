from flask import Flask
from flask import render_template
app = Flask("main")

@app.route('/')
def hello():
  return render_template('index.html')

app.run(debug=True)
