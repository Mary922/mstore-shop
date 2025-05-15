

export default function OrderButton({sum,func}) {


    return (
        <button className="order-button bg-primary hide-on-small-screen" onClick={func}>
            <div className='font-bold'>Всего к оплате <span className='text-xl'>{sum} ₽</span></div>
            Оформить заказ
        </button>
    );
}