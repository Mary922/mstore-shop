import Link from "next/link";


export default function ExpiredToken() {
    return (
        <div className="flex items-center justify-center h-screen">
            <div className="max-w-xs mx-auto bg-white border border-gray-300 rounded-lg shadow-lg p-6 space-y-4">
                <div className="flex items-center justify-center mb-4">
                    <svg width="64" height="64" fill="none" stroke="#dc3545" strokeWidth="2" viewBox="0 0 24 24"
                         className="mx-auto">
                        <path
                            d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"></path>
                    </svg>
                </div>
                <h2 className="font-semibold text-lg leading-tight tracking-widest uppercase text-gray-700 text-center">Срок
                    действия токена истёк</h2>
                <p className="text-gray-600 text-center">
                    Ваш токен для восстановления пароля устарел.<br/>
                    Пожалуйста, запросите восстановление пароля заново.
                </p>
                <Link href="/registration"
                      className="block mt-4 text-center font-medium underline text-indigo-600 hover:text-indigo-700">
                    Запросить восстановление пароля
                </Link>
            </div>
        </div>


    )
}