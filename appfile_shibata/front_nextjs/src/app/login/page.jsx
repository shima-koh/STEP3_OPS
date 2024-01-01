
import React from 'react'

const login = () => {
    return (
        <div className="flex h-screen">
            {/* 左側の画像部分 */}
            <div className="w-1/3 bg-cover" style={{ backgroundImage: 'url("/path/to/your/image.jpg")' }}>
            
            {/* 画像が入るコンテナ */}
            </div>

            {/* 右側のログインフォーム部分 */}
            <div className="w-2/3 flex items-center justify-center p-8">

                {/* ログインフォーム */}
                <form className="bg-white px-8 py-16 rounded shadow-xl outline outline-gray-300 grid justify-items-center space-y-8">

                    <h1 className='text-2xl font-bold text-center'>Sign in</h1>

                    {/* フォームの中身を適宜追加 */}
                    <label className="block mb-4">
                    <span className="text-gray-700">Username</span>
                    <input
                        type="text"
                        className="form-input mt-1 block w-full"
                        placeholder="Enter your username"
                    />
                    </label>

                    <label className="block mb-4">
                    <span className="text-gray-700">Password</span>
                    <input
                        type="password"
                        className="form-input mt-1 block w-full"
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
export default login;