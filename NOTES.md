## При запуске
1 - Приложение собирает все настройки из localstorage (Добавленные приложения, и т.д)
2 - Вызывает Rust функцию для получения активных процессов
3 - Если находит процесс с названием из списка добавленных приложений, использует его настройки для RPC
4 - Отправляет на бэк данные в виде. Каждый из ключей опционален
{
  clientId: number //Код discord бота пользователя.
  details: 'string', //Первая строчка в RPC
  state: 'string', //Вторая строчка в RPC
  startTimestamp: Date.now() //Таймер. Дата начала отсчёта
  largeImageKey: 'url', //Большая картинка
  largeImageText: 'string', //Текст при наведении на большую картинку
  smallImageKey: 'url', //Маленькая картинка
  smallImageText: 'string', //Текст при наведении на маленькую картинку
  instance: false, //В душе не чаю что это, надо чекнуть
  buttons: [
    {
      label: '', //Текст первой кнопки
      url: '' // Ссылка при нажатии
    },
    {
      label: '', //Текст второй кнопки
      url: '' // Ссылка при нажатии
    }
  ]
}
5 - При вызове функции с фронта, бэк устанавливает эти значения RPC и отправляет запрос