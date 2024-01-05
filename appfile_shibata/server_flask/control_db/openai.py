import os
import pandas as pd
from langchain import OpenAI
from langchain.agents import create_pandas_dataframe_agent


#TODO: APIキーの登録が必要
os.environ["OPENAI_API_KEY"] = ""

df = pd.DataFrame({
    "name": ["佐藤", "鈴木", "吉田"],
    "age": ["20", "30", "40"],
})

print(df)


llm = OpenAI(model_name="text-davinci-003", temperature=0.2)

agent = create_pandas_dataframe_agent(llm, df, verbose=True)

agent.run("佐藤さんの年齢は？")
agent.run("ユーザーの平均年齢は？")