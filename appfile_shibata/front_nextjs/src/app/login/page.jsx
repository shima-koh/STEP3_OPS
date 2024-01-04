"use client";
import React, { useState } from 'react';
import fetchLogin from '@/components/api/fetchLogin';

const Login = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            console.log('Form submitted with data:', formData);

            // ログイン処理を非同期で実行
            const response = await fetchLogin({
                worker_id: formData.username,
                worker_pw: formData.password,
            });

        if (response.ok) {
            const { IsLogin, userInfo } = await response.json();

            // ログインが成功したかどうかの判定
            if (IsLogin) {
                console.log('Login successful');
                console.log('User info:', userInfo);
                // ログイン成功後の処理をここに追加
            } else {
                console.log('Login failed');
                // ログイン失敗時の処理をここに追加
            }
        } else {
            console.error('Failed to fetch login data:', response.statusText);
            // エラーが発生した場合の処理をここに追加
        }
        } catch (error) {
            console.error('Error during login:', error);
            // エラーが発生した場合の処理をここに追加
        } finally {
            // フォームをクリアするか、他の適切な処理を行う
            setFormData({
                username: '',
                password: '',
            });
        }
    };

    const handleInputChange = (event) => {
    const { name, value } = event.target;

    setFormData({
        ...formData,
        [name]: value,
        });
    };

    return (
        <div className="flex h-screen">
            {/* 左側の画像部分 */}
            <div className="w-1/3 bg-cover" style={{ backgroundImage: 'url("/path/to/your/image.jpg")' }}>
            {/* 画像が入るコンテナ */}
            </div>

            {/* 右側のログインフォーム部分 */}
            <div className="w-2/3 flex items-center justify-center p-8">
                {/* ログインフォーム */}
                <form onSubmit={handleSubmit} className="bg-white px-8 py-16 rounded shadow-xl outline outline-gray-300 grid justify-items-center space-y-8">
                    <h1 className='text-2xl font-bold text-center'>Sign in</h1>
                    {/* フォームの中身を適宜追加 */}
                    <label className="block mb-4">
                        <span className="text-gray-700">Username</span>
                        <input
                            type="text"
                            className="form-input mt-1 block w-full"
                            name="username"
                            value={formData.username}
                            onChange={handleInputChange}
                            placeholder="Enter your username"
                        />
                    </label>

                    <label className="block mb-4">
                        <span className="text-gray-700">Password</span>
                        <input
                            type="password"
                            className="form-input mt-1 block w-full"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            placeholder="Enter your password"
                        />
                    </label>

                    <button
                        type="submit"
                        className="bg-primary text-white py-2 px-4 rounded hover:opacity-75"
                    >
                        Log in
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
