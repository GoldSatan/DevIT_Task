from flask import Flask
from flask import render_template, session, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
app.secret_key = '1qwer123D!R@!@'

@app.route('/', methods=['GET', 'POST'])
def indexView():
	if request.method == 'POST':
		pass
	
	else:
		return render_template('index.html')



if __name__ == '__main__':
    app.run(debug=True, port=8080, host='0.0.0.0')