import platform
print("platform", platform.uname())

from sqlalchemy import create_engine, insert, delete, update, select, or_, and_
import sqlalchemy
from sqlalchemy.orm import sessionmaker
import json
import pandas as pd
import uuid 
from control_db.mymodels import engine, Workers, Posts
from datetime import datetime


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

            query = session.query(mymodel).where(or_(mymodel.post_requireskill.ilike('%' + keyword + '%'), mymodel.post_title.ilike('%' + keyword + '%'), mymodel.post_content.ilike('%' + keyword + '%')))

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
            query = session.query(mymodel).where(mymodel.worker_id == worker_id)

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



def CompanyInfo(mymodel, company_id):
    # session構築
    Session = sessionmaker(bind=engine)
    session = Session()

    try:
        # トランザクションを開始
        with session.begin():
            # SQLAlchemy の Query オブジェクトを生成
            query = session.query(mymodel).where(mymodel.company_id == company_id)

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


def FeedBack(mymodel, post_id):
    # session構築
    Session = sessionmaker(bind=engine)
    session = Session()
    try:
        # トランザクションを開始
        with session.begin():
            # SQLAlchemy の Query オブジェクトを生成
            query = session.query(mymodel).where(and_(mymodel.post_id == post_id, mymodel.direction == 1))

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


def FeedBacks(mymodel, worker_id):
    # session構築
    Session = sessionmaker(bind=engine)
    session = Session()
    try:
        # トランザクションを開始
        with session.begin():
            # SQLAlchemy の Query オブジェクトを生成
            query = session.query(mymodel).where(and_(mymodel.worker_id == worker_id, mymodel.direction == 1))

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


def MyTickets(mymodel, worker_id):
    # session構築
    Session = sessionmaker(bind=engine)
    session = Session()
    try:
        # トランザクションを開始
        with session.begin():
            # SQLAlchemy の Query オブジェクトを生成
            query = session.query(mymodel).where(mymodel.worker_id == worker_id)

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


def MyBookings(mymodel, worker_id):
    # session構築
    Session = sessionmaker(bind=engine)
    session = Session()
    try:
        # トランザクションを開始
        with session.begin():
            # SQLAlchemy の Query オブジェクトを生成
            print("クエリ前まではOK")
            query = session.query(mymodel).where(and_(mymodel.worker_id == worker_id, mymodel.use_date != None ))
            print("クエリ後まではOK")
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


def WorkerSkill(mymodel1, mymodel2, worker_id):
    # session構築
    Session = sessionmaker(bind=engine)
    session = Session()
    try:
        # トランザクションを開始
        with session.begin():
            # SQLAlchemy の Query オブジェクトを生成
            query = session.query(mymodel1).where(mymodel1.worker_id == worker_id)

            # Query オブジェクトを直接実行して結果を取得
            result = query.all()

            # スキルIDに対応するスキル名を取得
            skills = []
            for row in result:
                skill_id = getattr(row, 'skill_id') # ここを実際のスキルIDのカラムに合わせて修正

                # スキル情報を取得
                skill_info = session.query(mymodel2).where(mymodel2.skill_id == skill_id).first()

                # スキル情報が存在する場合
                if skill_info:
                    skill_name = skill_info.skill_name
                else:
                    skill_name = None

                # スキル情報を直接辞書に追加
                row_dict = {
                    'worker_id': row.worker_id,  # 実際のカラムに合わせて修正
                    'skill_id': row.skill_id, 
                    'skill_level': row.skill_level, 
                    'skill_name': skill_name
                }
                skills.append(row_dict)

            # 結果を DataFrame に変換
            df = pd.DataFrame(skills)

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



def MyContractList(mymodel1, mymodel2, worker_id):
    # session構築
    Session = sessionmaker(bind=engine)
    session = Session()
    try:
        # トランザクションを開始
        with session.begin():
            # SQLAlchemy の Query オブジェクトを生成
            print("スタート")
            query = (session.query(mymodel1, mymodel2)
                .join(mymodel1, mymodel1.post_id == mymodel2.post_id)
                .where(mymodel2.worker_id == worker_id))
            
            # Query オブジェクトを直接実行して結果を取得
            result = query.all()

            # 結果を辞書型に変換
            result_json = json.dumps([{
            "post_id": item[0].post_id,
            "post_company": item[0].post_company,
            "post_status": item[0].post_status,
            "post_title": item[0].post_title,
            "post_content": item[0].post_content,
            "workers_posts": {
                "worker_id": item[1].worker_id if item[1] is not None else None,
                "workerpost_progress": item[1].workerpost_progress if item[1] is not None else None,

                } if item[1] is not None else None,
            } for item in result], default=str)

    except sqlalchemy.exc.IntegrityError:
        print("一意制約違反により、挿入に失敗しました")
        result_json = None
    finally:
        # セッションを閉じる
        session.close()

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



def InsertBooking(mymodel, worker_id, values):
    # session構築
    Session = sessionmaker(bind=engine)
    session = Session()

    # トランザクションを開始
    session.begin()
    
    use_date_str = values["use_date"]  # 変数の宣言と初期化
    use_date_str = use_date_str.replace("T", " ")
    values["use_date"] = datetime.strptime(use_date_str, "%Y-%m-%d %H:%M:%S.%fZ")  # format change
    # target_ticket を取得
    target_ticket = session.query(mymodel).filter(and_(mymodel.worker_id == worker_id, mymodel.use_date == None)).first()

    if target_ticket:
        print("target_ticket:", target_ticket)  # 追加
        print("values:", values)  # 追加
        print(target_ticket.ticket_id)
        print("データ確認すること")
        query = update(mymodel).where(mymodel.ticket_id == target_ticket.ticket_id).values(**values)

        print("query:", query)  # 追加

        print(target_ticket)
        print("データ確認すること")

        # データの挿入
        result = session.execute(query)
        print("result:", result)  # 追加
    else:
        print("該当するデータが見つかりませんでした.")

    # セッションをコミット
    session.commit()

    # セッションを閉じる
    session.close()
    return "inserted"