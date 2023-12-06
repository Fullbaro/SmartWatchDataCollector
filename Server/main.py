from flask import Flask, request

app = Flask(__name__)


@app.route('/', methods = ['POST', "GET"])
def main():
    print("JOTT")    
    print("\n\n", request.get_json())

    return "OK", 200


if __name__ == '__main__':
    app.run(host="192.168.0.157", port=2323)