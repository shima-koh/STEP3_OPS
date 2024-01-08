from sqlalchemy import ForeignKey, create_engine
from sqlalchemy import LargeBinary
from flask_login import UserMixin
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, sessionmaker
from datetime import datetime
import os


main_path = os.path.dirname(os.path.abspath(__file__))
path = os.chdir(main_path)
print(path)
engine = create_engine("sqlite:///appdb.db", echo=True)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


class Base(DeclarativeBase):
    pass


class Workers(Base, UserMixin):
    __tablename__ = 'workers'
    worker_id:Mapped[str] = mapped_column(primary_key=True)
    worker_mailaddress:Mapped[str] = mapped_column()
    worker_password:Mapped[int] = mapped_column()
    worker_name:Mapped[str] = mapped_column()
    worker_phone:Mapped[int] = mapped_column()
    worker_image:Mapped[bytes] = mapped_column() # image 
    worker_profile:Mapped[str] = mapped_column()
    worker_age:Mapped[int] = mapped_column()
    worker_gender:Mapped[int] = mapped_column() # men:1 women:2
    worker_signin:Mapped[datetime] = mapped_column()
    worker_lastlogin:Mapped[datetime] = mapped_column()


class Companies(Base, UserMixin):
    __tablename__ = 'companies'
    company_id:Mapped[str] = mapped_column(primary_key=True, autoincrement=True)
    company_mailaddress:Mapped[str] = mapped_column()
    company_password:Mapped[int] = mapped_column()
    company_name:Mapped[str] = mapped_column()
    company_image:Mapped[bytes] = mapped_column() # image 
    company_HP:Mapped[str] = mapped_column()
    company_profile:Mapped[str] = mapped_column()
    company_industry:Mapped[str] = mapped_column() 
    company_location:Mapped[str] = mapped_column() 
    company_signin:Mapped[datetime] = mapped_column()
    company_lastlogin:Mapped[datetime] = mapped_column()


class Skills(Base):
    __tablename__ = 'skills'
    skill_id:Mapped[str] = mapped_column(primary_key=True)
    skill_name:Mapped[str] = mapped_column()
    skill_category:Mapped[str] = mapped_column()


class Workers_Skills(Base):
    __tablename__ = 'workers_skills'
    workerskill_id:Mapped[int] = mapped_column(primary_key=True)
    worker_id:Mapped[str] = mapped_column(ForeignKey("workers.worker_id"))
    skill_id:Mapped[str] = mapped_column(ForeignKey("skills.skill_id"))
    skill_level:Mapped[int] = mapped_column()
    skill_regdate:Mapped[datetime] = mapped_column()


class Posts(Base):
    __tablename__ = 'posts'
    post_id:Mapped[str] = mapped_column(primary_key=True, autoincrement=True)
    post_company:Mapped[str] = mapped_column(ForeignKey("companies.company_id")) #postした企業ID
    post_status:Mapped[int] = mapped_column()
    post_postdate:Mapped[datetime] = mapped_column()
    post_lastedit:Mapped[datetime] = mapped_column()
    post_duedate:Mapped[datetime] = mapped_column()
    post_title:Mapped[str] = mapped_column()
    post_content:Mapped[str] = mapped_column()
    post_category:Mapped[str] = mapped_column()
    post_contractworker:Mapped[str] = mapped_column()
    post_contractdate:Mapped[datetime] = mapped_column()
    post_requireskill:Mapped[str] = mapped_column()
    post_recruitmentnum:Mapped[int] = mapped_column()
    post_image:Mapped[str] = mapped_column()


class Workers_Posts(Base):
    __tablename__ = 'workers_posts'
    workerpost_id:Mapped[str] = mapped_column(primary_key=True)
    worker_id:Mapped[str] = mapped_column(ForeignKey("workers.worker_id"))
    post_id:Mapped[str] = mapped_column(ForeignKey("posts.post_id"))
    workerpost_progress:Mapped[int] = mapped_column()
    workerpost_regdate:Mapped[datetime] = mapped_column()
    workerpost_contractdate:Mapped[datetime] = mapped_column()
    workerpost_donedate:Mapped[datetime] = mapped_column()


class FeedBacks(Base):
    __tablename__ = 'feedbacks'
    feedback_id:Mapped[str] = mapped_column(primary_key=True)
    post_id:Mapped[str] = mapped_column(ForeignKey("posts.post_id"))
    post_title:Mapped[str] = mapped_column(ForeignKey("posts.post_title"))
    direction:Mapped[int] = mapped_column() #企業からワーカへの評価：１　 ワーカーから企業への評価:２
    worker_id:Mapped[str] = mapped_column(ForeignKey("workers.worker_id"))
    company_id:Mapped[str] = mapped_column(ForeignKey("companies.company_id"))
    feedback_regdate:Mapped[datetime] = mapped_column()
    totalscore:Mapped[int] = mapped_column()
    feedback_content:Mapped[str] = mapped_column()
    TechScore:Mapped[int] = mapped_column()
    DesignScore:Mapped[int] = mapped_column()
    BizScore:Mapped[int] = mapped_column()