# Spotify Killer 🎵

Авторы:  
    [Дмитрий Лихолетов](https://github.com/Mayday2020)  
    [Игорь Иванов](https://github.com/sweetereater)  
    [Кирилл Чирков](https://github.com/21Kaen)  
    
## Запуск 
    1. git clone git@github.com:sweetereater/23-finalBoss.git
    2. npm install
    
    3. В корне приложения создайте файл .env.local. 
        Там укажите id вашего приложения из [Spotify for developers](https://developer.spotify.com/dashboard/applications)
            Пример: REACT_APP_CLIENT_ID=3#####d#####4#####e#####7#####fa

    4. npm start 

### Возможности приложения:

    Главный конкурент Spotify на рынке предоставляет следующий функционал:
        - Отображение самых популярных композиций пользователя
        - Поиск музыки по названию песни / исполнителю по всей базе Spotify
        - Отображение всех избранных композиций пользователя и поиск по ним
        - Добавление / удаление музыки из избранного
        - Отображение всех любимых плейлистов пользователя
        - Добавление / удаление композиций в плейлисты, созданные пользователем
        - Добавление нового плейлиста, редактирование его названия и описания
        - Возможности удалять плейлисты, к сожалению, в открытом API Spotify не найдена :C


### Особенности и пути улучшения:
    - Плеер работает на каждой вкладке и корректно (в большинстве случаев) переключает источники музыки (избранные песни / плейлисты / поиск)
    - Улучшить используемую библиотеку плеера, указав разработчикам на найденные баги
    - Улучшить поиск музыки