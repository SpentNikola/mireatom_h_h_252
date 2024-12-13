from flask import render_template
#from flask_login import LoginManager

from calc import app


@app.route('/constr')
def contr():
  return render_template('index.html')