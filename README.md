## CRM test project

Это приложение сделано как тестовое задание

[deploy link](deploy-link)

## Описание

В приложении реализована страница звонков. В меню активна только одна страница. Работает выбор страниц. Хэдер статичен. В аналитике звонков регулируется шкала прогресса. Необходимо только подставить нужное значение. В фильтрах реализован выбор звонков, -Все типы, -Входящие, -Исходящие. Работает кнопка -Сбросить фильтры. В таблице реализована выборка звонков по времени и длительности в восходящем и нисходящем направлениях. Собран с нуля аудиоплеер, для возможности его стилизации. Плеер появляется при наведении курсора на строку, при условии наличия в ней длительности звонка. Работают функции play, pause, scroll. Аудиозаписи декодированы из base64.

## Предпросмотр

![Preview](call-list.png)

## Стек технологий

### Frontend stack

- react@18
- reduxjs/toolkit