from flask import Flask, request, jsonify
from pyfcm import FCMNotification


app = Flask(__name__)
server_key = 'BPnh98Rsgc7tJtref_HdhcYZ-UHkQMO-rA8sqmyrU-EnSLCSUWCP7EkDFAsVDpMKzqxNqU0q7EcK83SA535mwUA'

@app.route('/send_notifiction', methods = ['POST'])
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
    app.run(debug = True)