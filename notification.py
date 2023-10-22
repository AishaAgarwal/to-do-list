from flask import Flask, request, jsonify
from pyfcm import FCMNotification
from flask_cors import CORS


app = Flask(__name__)
CORS(app)
server_key = 'AIzaSyBvxbFPNM2dtLP5TU5xvkxQZcYgHdowN7I'

@app.route('/send_notification', methods = ['POST'])
def send_notification():
    try:
        user_token = request.form.get('token')
        push_service = FCMNotification(api_key = server_key)
        message_title = 'Task Reminder'
        message_body = 'Your task deadline is approaching!'
        result = push_service.notify_single_device(registration_id=user_token, message_title=message_title, message_body=message_body)

        return jsonify({"success" : True, "response" : result})
    except Exception as e:
        return jsonify({"success" : False, "error" : str(e)})
    
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)