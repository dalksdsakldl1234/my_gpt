from flask import Flask, render_template, request
from langchain_community.chat_models import ChatOpenAI
from langchain.schema import HumanMessage
from dotenv import load_dotenv
import os
load_dotenv()  # .env 파일에서 환경 변수 로드

app = Flask(__name__)

# ChatOpenAI 인스턴스 생성
chat = ChatOpenAI(model_name="gpt-3.5-turbo", temperature=0.7)

chat_history = []

@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        user_message = request.form.get('message')
        if user_message:
            # GPT-3.5 Turbo에 메시지 전송
            response = chat([HumanMessage(content=user_message)])
            
            # 대화 기록에 사용자 메시지와 AI 응답 추가
            chat_history.append({"role": "user", "content": user_message})
            chat_history.append({"role": "ai", "content": response.content})

    return render_template('index.html', chat_history=chat_history)

@app.route('/history')
def history():
    return render_template('history.html', chat_history=chat_history)

if __name__ == '__main__':
    app.run(debug=True)