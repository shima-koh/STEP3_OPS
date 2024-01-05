import platform
print("platform", platform.uname())

from sqlalchemy import create_engine, insert, delete, update, select, or_
import sqlalchemy
from sqlalchemy.orm import sessionmaker
import json
import pandas as pd

from control_db.mymodels import engine, Workers, Posts


def myselect(mymodel, customer_id):
    # session構築
    Session = sessionmaker(bind=engine)
    session = Session()
    query = session.query(mymodel).filter(mymodel.customer_id == customer_id)
    try:
        # トランザクションを開始
        with session.begin():
            result = query.all()
        # 結果をオブジェクトから辞書に変換し、リストに追加
        result_dict_list = []
        for customer_info in result:
            result_dict_list.append({
                "customer_id": customer_info.customer_id,
                "customer_name": customer_info.customer_name,
                "age": customer_info.age,
                "gender": customer_info.gender
            })
        # リストをJSONに変換
        result_json = json.dumps(result_dict_list, ensure_ascii=False)
    except sqlalchemy.exc.IntegrityError:
        print("一意制約違反により、挿入に失敗しました")

    # セッションを閉じる
    session.close()
    return result_json


def selectActivePosts(mymodel):
    # session構築
    Session = sessionmaker(bind=engine)
    session = Session()

    try:
        # トランザクションを開始
        with session.begin():
            # SQLAlchemy の Query オブジェクトを生成
            query = session.query(mymodel).filter(mymodel.post_status == 102)

            # Query オブジェクトを直接実行して結果を取得
            result = query.all()

            # 結果を DataFrame に変換
            df = pd.DataFrame([row.__dict__ for row in result])

            # 再帰的な構造を含む列を削除
            recursive_columns = ['_sa_instance_state']
            df = df.drop(columns=recursive_columns, errors='ignore')

            # DataFrame を JSON 形式に変換
            result_json = df.to_json(orient='records', force_ascii=False, date_format='iso', date_unit='s')

    except sqlalchemy.exc.IntegrityError:
        print("一意制約違反により、挿入に失敗しました")
        result_json = None
    finally:
        # セッションを閉じる
        session.close()

    return result_json


def selectPostDetail(mymodel, post_id):
    # session構築
    Session = sessionmaker(bind=engine)
    session = Session()

    try:
        # トランザクションを開始
        with session.begin():
            # SQLAlchemy の Query オブジェクトを生成
            query = session.query(mymodel).filter(mymodel.post_id == post_id)

            # Query オブジェクトを直接実行して結果を取得
            result = query.all()

            # 結果を DataFrame に変換
            df = pd.DataFrame([row.__dict__ for row in result])

            print(df)

            # 再帰的な構造を含む列を削除
            recursive_columns = ['_sa_instance_state']
            df = df.drop(columns=recursive_columns, errors='ignore')
            

            # DataFrame を JSON 形式に変換
            result_json = df.to_json(orient='records', force_ascii=False, date_format='iso', date_unit='s')

    except sqlalchemy.exc.IntegrityError:
        print("一意制約違反により、挿入に失敗しました")
        result_json = None
    finally:
        # セッションを閉じる
        session.close()

    return result_json


def KeywordPostSearch(mymodel, keyword):
    # session構築
    Session = sessionmaker(bind=engine)
    session = Session()

    try:
        # トランザクションを開始
        with session.begin():
            # SQLAlchemy の Query オブジェクトを生成

            query = session.query(mymodel).filter(or_(mymodel.post_title.like('%' + keyword + '%')),(mymodel.post_content.like('%' + keyword + '%')))
            #query = query.filter(or_(mymodel.post_title.ilike(f"%{keyword}%"), mymodel.post_content.ilike(f"%{keyword}%")))

            # Query オブジェクトを直接実行して結果を取得
            result = query.all()

            # 結果を DataFrame に変換
            df = pd.DataFrame([row.__dict__ for row in result])

            # 再帰的な構造を含む列を削除
            recursive_columns = ['_sa_instance_state']
            df = df.drop(columns=recursive_columns, errors='ignore')
            

            # DataFrame を JSON 形式に変換
            result_json = df.to_json(orient='records', force_ascii=False, date_format='iso', date_unit='s')

    except sqlalchemy.exc.IntegrityError:
        print("一意制約違反により、挿入に失敗しました")
        result_json = None
    finally:
        # セッションを閉じる
        session.close()

    return result_json


