import streamlit as st
import dotenv
import langchain

from langchain_google_genai import GoogleGenerativeAI,ChatGoogleGenerativeAI
from dotenv import load_dotenv

load_dotenv()

import os
import zipfile


os.environ["GOOGLE_API_KEY"]=os.getenv("gemini")

st.set_page_config(page_title="chat bot",page_icon="🤣")

st.title("AI AUTOMATION WEBSITE CREATION")

prompt=st.text_area("write here about your website")

if st.button("generate"):
    message=[("system","""you are a expert in web development creating professinal website.
               so create html,css,java Scripts code for creating a frontend based website based on user prompt 
               the output should be in below format:
                --html--
                 [html code]
                --html--
              
                --css--
                [css code]
                --css--
              
                --js--
                [java script code]
                --java""")]
    message.append(("user",prompt))

    model=ChatGoogleGenerativeAI(model="gemini-2.5-flash-lite")

    response=model.invoke(message)

    with open("index.html","w") as file:
        file.write(response.content.split("--html--")[1])

    with open("style.css","w") as file:
        file.write(response.content.split("--css--")[1])

    with open("script.js","w") as file:
        file.write(response.content.split("--js--")[1])

    with zipfile.ZipFile("website.zip","w") as zip:
        zip.write("index.html")
        zip.write("style.css")
        zip.write("script.js")
    
    st.download_button("click to download",
                          data=open("website.zip","rb"),
                          file_name=("website.zip"))
    st.write("success")
    