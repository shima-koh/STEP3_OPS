import os
from langchain import SQLDatabase, PromptTemplate, SQLDatabaseChain, OpenAI


# データベース情報
db_url = "sqlite:///appdb.db"  # 例: SQLiteの場合
tables = ["posts", "workers"]  # 使用するテーブル

# SQLDatabaseオブジェクトの作成
SQL_Database =  SQLDatabase.from_uri(db_url, include_tables=tables)


# OpenAIクラスの初期化
LLM = OpenAI(
    model_name="text-davinci-003",  # 使用するモデル
    temperature=0,  # 出力のランダム性
    verbose=False  # プロンプトの動的表示有無
)


# プロンプトテンプレートの定義
TEMPLATE = """
Given an input question, ...
Question: {input}
SQLQuery: "SQL Query to run"
SQLResult: "Result of the SQL Query"
Answer: "Final answer here"
Only use the following tables: {table_info}
"""

# PromptTemplateの作成
PROMPT = PromptTemplate(
    input_variables=["input", "table_info"],  # プロンプトの入力変数
    template=TEMPLATE  # プロンプトのテンプレート
)

# SQLDatabaseChainオブジェクトの作成
db_chain = SQLDatabaseChain(
    llm=LLM,  # OpenAIの言語モデル
    database=SQL_Database,  # SQLDatabaseオブジェクト
    prompt=PROMPT,  # PromptTemplate
    verbose=True,  # プロンプトの動的表示有無
    return_intermediate_steps=True  # 出力結果に中間処理も含めるか否か
)

# テキスト文章
text = "アプリ作成に関係するPostを教えて"

# LangChainの実行
result = db_chain(text)

# 結果の処理
# 例: resultを出力する関数を呼び出すなど
print(result)