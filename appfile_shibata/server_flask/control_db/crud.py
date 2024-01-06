import platform
print("platform", platform.uname())

from sqlalchemy import create_engine, insert, delete, update, select, or_, and_
import sqlalchemy
from sqlalchemy.orm import sessionmaker
import json
import pandas as pd
import uuid 
from control_db.mymodels import engine, Workers, Posts
import datetime


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

            query = session.query(mymodel).where(or_(mymodel.post_title.like('%' + keyword + '%'),mymodel.post_content.like('%' + keyword + '%')))

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


def WorkerInfo(mymodel, worker_id):
    # session構築
    Session = sessionmaker(bind=engine)
    session = Session()

    try:
        # トランザクションを開始
        with session.begin():
            # SQLAlchemy の Query オブジェクトを生成

            print("スタート")

            query = session.query(mymodel).where(mymodel.worker_id == worker_id)

            # Query オブジェクトを直接実行して結果を取得
            result = query.all()
            print("ソートできたか確認")
            print(result)

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

    print("CRUD結果")
    print(result_json)

    return result_json



def MyContractList(mymodel1, mymodel2, worker_id):
    # session構築
    Session = sessionmaker(bind=engine)
    session = Session()

    try:
        # トランザクションを開始
        with session.begin():
            # SQLAlchemy の Query オブジェクトを生成
            #(session.query(Posts.post_id, Posts.post_company, Posts.post_status, Posts.post_title, Posts.post_content)  # 属性を明示的に取得

            print("スタート")
            query = (session.query(mymodel1, mymodel2)
                .join(mymodel1, mymodel1.post_id == mymodel2.post_id)
                .where(mymodel2.worker_id == worker_id))
            

            # Query オブジェクトを直接実行して結果を取得
            result = query.all()
            print("contractソートできたか確認")
            print(result)

            result_json = json.dumps([{
            "post_id": item[0].post_id,
            "post_company": item[0].post_company,
            "post_status": item[0].post_status,
            "post_title": item[0].post_title,
            "post_content": item[0].post_content,
            "workers_posts": {
                "worker_id": item[1].worker_id if item[1] is not None else None,
                "workerpost_progress": item[1].workerpost_progress if item[1] is not None else None,
                # 他に必要な属性があれば同様に追加
                } if item[1] is not None else None,
            } for item in result], default=str)
            # 結果を辞書型に変換
            #result_json = json.dumps([{
            #    "post_id": item[1].post_id,
            #    "post_company": item[1].post_company,
            #    "post_status":item[1].post_status,
            #    "post_title": item[1].post_title,
            #    "post_content":item[1].post_content,
            #    "workers_posts": item.workers_posts.to_dict() if item.workers_posts is not None else None,
            #} for item in result])

    except sqlalchemy.exc.IntegrityError:
        print("一意制約違反により、挿入に失敗しました")
        result_json = None
    finally:
        # セッションを閉じる
        session.close()

    print("CRUD結果")
    print(result_json)

    return result_json


def selectOrderStatus(mymodel, post_id, worker_id):
    # session構築
    Session = sessionmaker(bind=engine)
    session = Session()

    try:
        # トランザクションを開始
        with session.begin():
            # SQLAlchemy の Query オブジェクトを生成

            query = session.query(mymodel).where(and_(mymodel.post_id == post_id, mymodel.worker_id == worker_id))

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



def InsertOrder(mymodel, post_id, worker_id):
    # session構築
    Session = sessionmaker(bind=engine)
    session = Session()

    # UUID4関数を呼び出し、一意の値を生成
    workerpost_id = str(uuid.uuid4())

    query = insert(mymodel).values({
        "workerpost_id": str(workerpost_id),
        "worker_id": worker_id,
        "post_id": post_id,
        "workerpost_progress": 102,
        "workerpost_regdate": datetime.datetime.now(),
    })

    try:
        # トランザクションを開始
        with session.begin():
            # データの挿入
            result = session.execute(query)
    except sqlalchemy.exc.IntegrityError as e:
        print(f"一意制約違反IntegrityError: {e}")
        session.rollback()

    # セッションを閉じる
    session.close()
    return "inserted"