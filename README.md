# Skillbus-CRM

### Итоговая практическая работа, выполненная в рамках курса «Javascript - базовый уровень» от Skillbox.

Данный проект - это базовая CRM-система, разработанная для удобного управления контактной информацией учеников компании Skillbus. Она предоставляет инструменты для хранения, просмотра и управления данными о клиентах

#### Функционал:

Skillbus-CRM предоставляет следующую функциональность:

- **Просмотр списка клиентов в виде таблицы**  
  Пользователь может просматривать список всех клиентов в удобном формате таблицы. Каждый клиент представлен в виде отдельной строки, содержащей информацию о его ID, ФИО, дате и времени создания, дате и времени последнего изменения, контактах и доступных действиях (редактирование и удаление клиента).
- **Добавление нового клиента**  
  Пользователь может добавлять новых клиентов, заполняя информацию о них. Для каждого клиента необходимо указать фамилию, имя и отчество, контактные данные. Можно добавлять несколько контактов для каждого клиента, указывая их тип (телефон, email, VK и др.) и соответствующие значения. После добавления клиента, его данные сохраняются в системе и отображаются в списке клиентов.
- **Изменение информации о существующем клиенте**  
  Пользователь может вносить изменения в информацию о существующем клиенте. Это включает изменение ФИО и контактной информации клиента. При нажатии на кнопку "Изменить" открывается модальное окно с формой редактирования клиента, где можно внести необходимые изменения. После сохранения изменений, данные клиента обновляются в системе.
- **Просмотр отдельной карточки клиента**  
  При клике на ID клиента в таблице, пользователь может получить ссылку, которая при открытии сразу отображает соответствующую карточку клиента. Это позволяет пользователям обмениваться ссылкой на конкретного клиента, избегая необходимости поиска нужного контакта в таблице. Карточка клиента представлена в удобном для чтения виде, отображая всю необходимую информацию о клиенте.
- **Сортировка списка клиентов**  
  Пользователь имеет возможность сортировать список клиентов по различным полям, таким как ID, ФИО, дата создания и дата изменения. При нажатии на заголовок столбца, список сортируется по соответствующему полю в порядке возрастания или убывания.
- **Поиск клиентов**  
  Поиск клиентов в приложении реализован с автодополнением. При вводе поискового запроса в поле поиска список найденных элементов отображается непосредственно под полем ввода, без изменения самой таблицы. При выборе элемента из списка автодополнения, соответствующий контакт в таблице подсвечивается, чтобы пользователь мог легко идентифицировать его. Если выбранный контакт находится за пределами видимой области, система автоматически прокручивает страницу, чтобы контакт стал видимым. Важно отметить, что для удобства пользователей, реализована возможность выбора элемента с помощью клавиш стрелок вверх/вниз и клавиши Enter на клавиатуре. Это позволяет быстро перемещаться по списку автодополнения и выбирать нужный контакт без необходимости использования мыши. Всё вышеперечисленное значительно улучшает пользовательский опыт.
- **Удаление клиента**  
  Пользователь может удалить клиента из списка. При нажатии на кнопку удаления, открывается модальное окно для подтверждения удаления. Если пользователь подтверждает удаление, клиент удаляется из системы и исчезает из списка клиентов.
- **Валидация формы**  
  Перед отправкой данных на сервер происходит проверка формы на наличие обязательных полей. Если обязательные поля не заполнены, выводятся сообщения об ошибках, а сами поля подсвечиваются для удобства пользователя.
- **Индикатор загрузки**  
  Система обеспечивает индикацию загрузки при выполнении операций, связанных с обменом данных с сервером. Это позволяет пользователю четко видеть, что приложение активно обрабатывает данные и избегает возможных недопониманий или неясностей.

#### Стек технологий:

- JavaScript - для добавления интерактивности и реализации клиентской логики
- СSS - для стилизации и оформления интерфейса
- HTML - для создания структуры и разметки веб-страницы
- для выполнения асинхронных запросов к серверу был использован синтаксис async/await в JavaScript

#### Инструкции по установке:

- cкачайте репозиторий с приложением или склонируйте его с помощью команды: `git clone`

_Backend_

- перейдите в папку crm-backend
- запустите сервер, выполнив команду: `node index`

_Frontend_

- перейдите в папку crm-frontend
- oткройте файл index.html в любом современном веб-браузере

#### Ссылки:

- [Макет в графическом редакторе Figma](https://www.figma.com/file/rcta5K2ySOhnskjG1D82jL/CRM?node-id=121%3A485)
