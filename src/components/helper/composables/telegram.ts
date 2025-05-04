export default function useTelegram(){
    if (window.Telegram && window.Telegram.WebApp) {
        const tg = window.Telegram.WebApp;
        return tg
      } else {
        console.error('Telegram WebApp SDK не загружен.');
        return ''
      }
}