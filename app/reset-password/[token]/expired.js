

export default function ExpiredToken() {
    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="alert alert-error shadow-lg p-4 m-auto">
                Срок действия вашего токена истёк. Пожалуйста, запросите восстановление пароля заново.
            </div>
        </div>
    )
}