import * as React from 'react';

const PL = {
  exclude: 'Ignoruj dla eksportu do pliku zip',
  restoreExclude: 'Przywróć plik dla eksportu zip',
  saveToFavourites: 'Dodaj adres url zdjęcia do twoich lokalnych ulubionych',
  removeFromFavourites: 'Usuń adres url zdjęcia z twoich lokalnych ulubionych',
  download_base64: 'Pobierz jako base64',
  loading: 'Ładowanie...',
  links: 'Linki',
  img_tag: 'Zdjęcie z tagu',
  img_requests: 'Zdjęcie z zapytania',
  img_from_request: 'Zdjęcia z pytań',
  img_from_tags: 'Zdjęcia z tagu <img /> ze strony',
  addon_not_available: 'Bieżąca domena nie zezwala na używanie wtyczek',
  NoDataBlockedItems: 'Brak zablokowanych informacji',
  home_chat: 'Chat z kolegami - bez śledzenia',
  home_messages: 'Wysyłaj wiadomości - bez śledzenia',
  home_security: 'Ochrona w internecie - blokowanie śledzących',
  home_images: 'Pobieraj zdjęcia - bez śledzenia',
  home_images_1: 'Pobierz obrazy w oryginalnym formacie',
  home_images_2: 'Pobierz pojedyncze obrazy',
  home_images_3: 'Pobierz wszystkie dostępne obrazy do pliku zip',
  home: 'Strona główna',
  /** 
   * Left menu
   */
  messages_main: 'Wiadomości',
  menu_text_messages: 'Wiadomości',
  menu_title_messages: 'Przejdź do obszaru wiadomości',
  menu_text_notifications: 'Powiadomienia',
  menu_title_notifications: 'Przejdź do obszaru powiadomień',
  favourites_main: 'Znajomości',
  menu_text_favourites: 'Znajomi',
  menu_title_favourites: 'Przejdź do obszaru znajomi',
  menu_text_add_favourites: 'Wyszukaj',
  menu_title_add_favourites: 'Przejdź do obszaru szukania znajomych',
  chat_main: 'Chat',
  menu_text_chat: 'Chat',
  menu_title_chat: 'Przejdź do obszaru chatu',
  menu_text_security: 'Ochrona',
  menu_text_security_main: 'Listy',
  menu_title_security: 'Przejdź do obszaru ochrony',
  menu_text_security_settings: 'Ustawienia',
  menu_title_security_settings: 'Przejdź do obszaru ustawień ochrony',
  menu_text_cookies: 'Cisteczka',
  menu_title_cookies: 'Przejdź do obszaru ciasteczek',
  menu_text_home: 'Statystyka',
  menu_title_home: 'Przejdź do strony głównej',
  menu_text_iframes: 'Ramki',
  menu_title_iframes: 'Przejdź do obszaru ramek',
  menu_text_security_examples: 'Przykłady',
  menu_title_security_examples: 'Przejdź do obszaru przykładów ochrony',
  menu_text_download_images: 'Pobierz zdjęcia',
  menu_title_download_images: 'Przejdź do obszaru poboru zdjęć',
  menu_text_images: 'Zdjęcia',
  menu_text_images_favourites: 'Zapisane zdjęcia',
  menu_title_images_favourites: 'Przejdź do obszaru zapisanych zdjęć',
  /** 
   * Notifications popup
   */
  notifications: 'Powiadomienia',
  view_all_notifications: 'Wszystkie powiadomienia',
  no_notifications: 'Brak powiadomień',
  /** 
   * Messages popup
   */
  messages: 'Wiadomości',
  view_all_messages: 'Wszystkie wiadomości',
  no_messages: 'Brak wiadomości',
  /**
   * Account popup
   */
  account: 'Konto',
  view_all_account: 'Ustawienia konta',
  no_data: 'Brak dostępnych informacji',
  no_data_available: 'Brak dostępnych danych',
  accountSettings: 'Ustawienia',
  accountLogout: 'Wyloguj',
  accountPrivacyTerms: 'Warunki prywatności',
  /**
   * LOGIN
   */
  titlelogin: 'Zaloguj się',
  titleUsername: 'E-mail',
  titlePassword: 'Hasło',
  signInButton: 'Zaloguj się',
  loginMainTitle: 'Zaloguj się',
  loginMainTitleSuffix: 'Zaloguj się',
  registrationButton: 'Utwórz konto',
  errorMessageLoginEmptyFields: 'Adres e-mail i hasło są wymagane',
  errorMessageLoginInvalidCredentials: 'Niepoprawne dane logowania',
  currentLoggedInAs: 'Aktualnie zalogowany jako użytkownik',
  fortgotPassword: 'Zapomniałeś hasło ?',
  /**
   * LOGOUT
   */
  logoutButton: 'Wyloguj',
  /**
   * REGISTRATION
   */
  backToLogin: 'Powrót do logowania',
  registrationMainTitleSuffix: 'Rejestracja',
  registrationButtonRegister: 'Zapisz się',
  titleFirstName: 'Imię',
  titleLastName: 'Nazwisko',
  errorMessageUserAlreadyExsists: 'Ten adres e-mail jest już zarejestrowany',
  errorMessageRegistrationEmptyFields: 'Wszystkie pola są wymagane',
  errorMessageRegistrationCheckbox: 'Nie można kontynuować bez zgody na przechowywanie danych osobowych',
  deleteAccount: 'Usuń konto',
  acceptSavingDataTitle: 'Zgadzam się z polityką prywatności',
  /**
   * DELETE ACCOUNT
   */
  deleteAccountTitle: 'Potwierdź usunięcie konta',
  deleteAccountText: 'Czy na pewno chcesz usunąć swoje konto?',
  deleteAccountNo: 'Nie !',
  deleteAccountYes: 'Tak',
  deleteAccountPasswordConfirmation: 'Potwierdzenie hasła',
  deleteAccountErrorMessageEmptyFields: 'Hasło jest wymagane',
  deleteAccountErrorMessageWrongPassword: 'Złe hasło',
  /** 
   * GLOBAL ERROR MESSEAGES
   */
  globalNetworkError: 'Błąd sieci.',
  globalProcessError: 'Błąd procesu.',
  globalUserDoesNotExsists: 'Konto użytkownika nie istnieje',
  globalInvalidEmailsAdress: 'Nieprawidłowy format adresu e-mail',
  globalErrormessagePrefix: 'Znaleziono błąd, który powoduje, że aplikacja nie działa poprawnie.',
  globalErrormessageCloseButton: 'Ignoruj',
  globalErrormessageLearnMoreButton: 'Czytaj więcej',
  globalInvalidCountry: 'Niepoprawny kraj',
  globalInvalidLanguage: 'Niepoprawny język',
  globalErrorCodeTitle: 'Kod błędu',
  globalErrorCode_1: 'Błąd sieci. Gdy wystąpił błąd sieci, oznacza to, że żądanie „ajax” nie powiodło się. Sprawdź połączenie sieciowe lub to, ponieważ usługa zdalna jest obecnie niedostępna.',
  globalErrorCode_2: 'Błąd procesu aplikacji. Oznacza to, że odpowiedź na żądania ajax podała nieprawidłową strukturę aplikacji.',
  globalErrorCode_3: 'Odpowiedź inna niż oczekiwana. Oznacza to, że żądana wartość bieżącego kontekstu aplikacji jest nieprawidłowa.',
  code: 'Kod',
  listNotSynchronizedUserNotLoggedIn: 'Nie jesteś zalogowany i lista nie może byc synchronizowana',
  notLoggedIn: 'Błąd niezalogowania',
  listSynchronized_one: 'synchronizowany wpis',
  listSynchronized_more: 'synchronizowane wpisy',
  /**
   * LOGIN REQUIRED
   */
  loginRequired: 'Zaloguj się, aby wykonać tę akcję',
  /**
   * Messages
   */
  messagesNewMessage: 'Nowa wiadomość',
  messagesInbox: 'Odebrane',
  messagesOutbox: 'Wysłane',
  messagesImportant: 'Ważne',
  messagesTrash: 'Kosz',
  messagesDrafts: 'Wersje robocze',
  messageToText: 'Do',
  messageDetailsBoxFrom: 'Od',
  messageDetailsBoxFromEmail: '',
  messageDetailsBoxTo: 'Do',
  messageDetailsBoxDate: 'Data',
  messageDetailsBoxTitle: 'Tytuł',
  messagesNewMessageEmptyField: 'Wpisz adres e-mail',
  messagesNewMessageNoResults: 'Nie znaleziono użytkowników',
  messagesNewMessageCurrentUserAllreadyChoosed: 'Aktualny użytkownik został już wybrany',
  messagesNewMessagePlaceholdersearchInput: 'Adresaci e-mail',
  messagesNewMessageTitle: 'Nowa wiadomość',
  messagesNewMessageMessagesTitle: 'Tytuł',
  messagesNewMessageMessagesText: 'Tekst',
  messagesNewMessageSend: 'Wyslij',
  messagesNewMessageReipientDoesNotExsists: 'Jeden z podanych odbiorców nie istnieje',
  errorMessageNewMessagePleaseSearchForRecipient: 'Dodaj odbiorcę z ulubionych lub użyj przycisku wyszukiwania',
  messages_area: 'Witamy w obszarze wiadomości',
  messages_area_1: 'Pisz wiadomości z każdego miejsca, w którym jesteś',
  messages_area_2: 'Automatyczne zapisywanie wiadomości w wersji roboczej',
  messages_area_3: 'Pojedynczy załącznik do 5 MB',
  messages_list: 'Brak wiadomości na liście',
  /**
   * Account settings
   */
  userSettings: 'Ustawienia konta',
  userSettings_password: 'Hasło',
  userSettings_firstname: 'Imię',
  userSettings_lastname: 'Nazwisko',
  userSettings_language: 'Język',
  saveUserDataButton: 'Zapisz',
  errorMessageUserUpdateEmptyFields: 'Puste pola nie są dozwolone',
  errorMessageUserUpdateError: 'Błąd podczas aktualizacji danych użytkownika',
  successUpdate: 'Profil został zaktualizowany',
  /**
   * Cookies popup page
   */
  titleDeleteCookie: 'Skasuj pojedyncze ciasteczko',
  titleCopyCookieValue: 'Kopiuj wartość do schowka',
  cookie_msg_1: 'Domena:',
  cookie_msg_2: 'Nazwa:',
  cookie_msg_3: 'Wartość:',
  cookie_msg_4: 'Kasuj wszystkie ciasteczka. Jest możliwe że zostaniesz wylogowany z bieżącej strony.',
  cookiesNoData: 'Brak ciasteczek',
  /**
   * Password reset
   */
  passwordResetMainTitleSuffix: 'Reset hasła',
  passwordResetButton: 'Reset',
  followTheMailInstructions: 'Został wysłany email na podany adres',
  /**
   * Favourites
   */
  favouritesNoData: 'Aby dodać nowego ulubionego, przejdź do strony "Szukaj znajomego"',
  favouritesTitleCurrentFavourites: 'Twoi obecni faworyci',
  favouritesTitleSearchForUsers: 'Wyszukiwanie użytkownika',
  favouritesSince: 'Czas przyjaźń',
  favouritesRemoveFriend: 'Anuluj przyjaźń',
  favouritesRemoveFriendTooltip: 'Anuluj przyjaźń z',
  favouritesAddFriend: 'Rozpocznij przyjaźń',
  favouritesAddFriendTooltip: 'Rozpocznij przyjaźń z',
  favouritesRemoveFriendResponseSuccess: 'Przyjaźń anulowana dla',
  favouritesRemoveFriendResponseError: 'Błąd podczas anulowania przyjaźnij z',
  favouritesAddFriendResponseSuccess: 'Przyjaźnij rozpoczęta z',
  favouritesAddFriendResponseError: 'Błąd podczas rozpoczęcia przyjaźnij z',
  favouritesNoResultsSuggestions: 'Nikogo nie znaleziono',
  favouritesEmptyField: 'Pole wyszukowania nie może być puste',
  favouritesAllreadyFriends: 'Przyjaźnij już istnieje z użytkownikiem',
  /**
   * Chat
   */
  chatNoDataFavourites: 'Brak ulubionych. Aby rozpocząć czat, dodaj użytkownika ze strony „Wyszukiwanie ulubionych”.',
  chatNoDataLoading: 'Ładowanie listy znajomych...',
  chatNoFavouritesUserSelected: 'Aby rozpocząć czat, wybierz użytkownika z listy ulubionych.',
  chatNoDataInsideChat: 'Brak historii czatu dla wybranego użytkownika.',
  chatInputPlaceholder: 'Wiadomość...',
  chatToggleInputFieldType: 'Zmień typ wejścia z pojedynczego wiersza na multilinię i odwrotnie',
  chatUploadFileTitle: 'Wyślij pliki do swojego przyjaciela',
  chatUploadFile: 'Wyślij pliki',
  chatSendFilesTo: 'Wyślij wybrane pliki do znajomego',
  chatSendFilesToButton: 'Wyślij pliki',
  no_history_available: 'Obecnie brak historii czatów',
  view_all_chat: 'Otwórz czat',
  popup_not_readed_title: 'Chat - wiadomości',
  popup_no_new_messages: 'Brak nowych wiadomości',
  chat_file: 'Wyślij pliki',
  chatLoadingData: 'Ładowanie konwersacji...',

  // user account
  avatarErrorFileType: 'Nierozpoznany typ pliku',
  avatarErrorFileSize: 'Rozmiar pliku przekracza limit 5 MB dla programu Avatar',
  avatarErrorFileTypeSupport: 'Dozwolone są tylko typy plików jpg, png i gif',

  /**
   * Blacklist overview
   */
  blacklistedElementsWords: 'Czarna lista Słowa',
  blacklistedElementsDomians: 'Czarna lista Domeny',
  blacklistedElementsUrlsIncludes: 'Czarna lista Adresy url',
  blacklistedElementsTrackers: 'Czarna lista Trackery',
  blacklistedElementsCookies: 'Czarna lista Ciasteczka',
  blacklistedElementsClass: 'Blokuj HTML dla class',
  blacklistedElementsId: 'Blokuj HTML dla id',
  blacklistedElementsHref: 'Blokuj HTML dla href',
  blacklistedElementsIframes: 'Czarna lista Ramki',
  copiedToClipBoard: 'Skopiowano do schowka',
  action_title_copyToClipboard: 'Skopiuj listę do schowka',
  action_title_exportToFile: 'Eksportuj listę do pliku o formacie JSON',
  action_title_deleteList: 'Wyczyść listę globalnie',
  action_title_copyToClipboard_single: 'Skopiuj wartość do schowka',
  action_title_delete_single: 'Usuń wpis',
  forThisFunctionLogin: 'Zaloguj się, aby wykonać tę akcję',
  emptyListDone: 'Lista została wyczyszczona',
  restoreDefaultValue: 'Zresetuj listę do wartości domyślnych',
  whitelistedElementsDomains: 'Biała lista Domeny',

  /**
   * Security settings
   */
  securityIsOn: 'Ta ochrona tej wtyczki jest włączona lub wyłączona.',
  scanTextOnWebsite: 'Jeśli wyłączysz tę opcję, wtedy wszystkie słowa na stronie internetowej NIE są skanowane. Czarna lista: Słowa, są ignorowane.',
  allowOnlyHttpsProtocol: 'Zezwalaj na odwiedzanie tylko stron internetowych HTTPS - czyli strony z protokołem HTTP zostaną zablokowane.',
  allowOnlyHttpProtocol: 'Zezwalaj na odwiedzanie tylko stron internetowych HTTP - czyli strony z protokołem HTTPS zostaną zablokowane.',
  makeSearchInSourceCode: 'Skanuj słowa w kodzie źródłowym danego elementu HTML (innerHTML) lub tylko w tekscie elementach HTML (innerText).',
  mutationCheck: 'Sprawdzanie elementów HTML strony internetowej ma nastąpić również po załadowaniu strony (DOM mutacje na elementach HTML zazwyczaj poprzez biblioteki Javascript).',
  ignoreTagStyle: 'Ignoruj kod zawarty w tagach "STYLE" (<style> tag) podczas skanowania na podstawie czarnej listy "Słowa".',
  ignoreTagScript: 'Ignoruj kod zawarty w tagach "SCRIPT" (<script> tag) podczas skanowania na podstawie czarnej listy "Słowa".',
  ignoreTagLink: 'Ignoruj kod zawarty w tagach "Link" (<link> tag) podczas skanowania na podstawie czarnej listy "Słowa".',
  ignoreTagMeta: 'Ignoruj kod zawarty w tagach "Meta" (<meta> tag) podczas skanowania na podstawie czarnej listy "Słowa".',
  replacer: 'Zastąp każdy znak niebezpiecznego słowa (niebezpieczne słowa pochodzą z czarnej listy Słowa) tym wpisem.',
  maximumOfDangerWords: 'Po osiągnięciu tej wartości - poprzez sumę zablokowanych elementów na stronie na podstawie czarnych list: Czarna lista Słowa, Blokuj HTML dla class, Blokuj HTML dla href oraz Blokuj HTML dla id (każdy zablokowany element zwiększa wartości licznika o +1) wtedy strona internetowa zostanie zablokowana. Minimalna wartość to 1, maksymalna to 300.',
  limitlessScan: 'Zignoruj maksymalną liczbę zablokowanych niebezpiecznych elementów na podstawie czarnych list: Czarna lista Słowa, Blokuj HTML dla class, Blokuj HTML dla href oraz Blokuj HTML dla id. Strona nie zostanie zablokowana (zignoruj powyższą wartość). Jeśli aktywujesz tę funkcję, Protection może spowolnić działanie przeglądarki.',
  deleteCookies: 'Kasuj automatycznie wszystkie ciasteczka na podstawie czarnej listy Ciasteczka na wszytkich stronach co 5 sekund ?',

  /**
   * Popup - home
   */
  popupMainTitle: 'Statystyka ochrony',
  popup_blocked_trackers: 'Zablokowani trackerzy',
  popup_blocked_cookies: 'Zablokowane ciasteczka',
  popup_blocked_words: 'Zablokowane słowa',
  popup_blocked_requests: 'Zablokowane zapytania',
  popup_blocked_iframes: 'Zablokowane ramki',
  popup_blocked_dom: 'Zablokowany HTML id, href, class',
  popup_title_dashboard: 'Zarządzanie',

  /**
   * Popup - Iframes page
   */
  titleDeleteIframe: 'Usuń pojedynczy element iframe',
  iframe_msg_1: 'Źródło:',
  iframe_msg_2: 'Id:',
  iframe_msg_3: 'className:',
  iframesNoData: 'Brak ramek',

  /**
   * Popup - security
   */
  popup_add_blacklistedElementsTrackers: 'Dodaj bieżącą domenę do trackerów czarnej listy. Wszystkie próby uzyskania dostępu do tej domeny są zablokowane.',
  popup_remove_blacklistedElementsTrackers: 'Usuń bieżącą domenę z czarnej listy - Trackerów.',
  popup_add_blacklistedElementsDomians: 'Dodaj bieżące domeny do domeny czarnej listy domen. Wszystkie próby uzyskania dostępu do tej domeny lub usług z tej domeny są blokowane.',
  popup_remove_blacklistedElementsDomians: 'Usuń bieżącą domenę z czarnej listy - Domen.',
  popup_add_blacklistedElementsCookies: 'Dodaj bieżącą domenę do czarnej listy plików cookie. Wszystkie pliki cookie są usuwane co 5 sekund podczas ładowania strony.',
  popup_remove_blacklistedElementsCookies: 'Usuń bieżącą domenę z czarnej listy - Ciasteczka',
  popup_add_blacklistedElementsIframes: 'Dodaj bieżącą domenę do czarnej listy - Ramḱi.',
  popup_remove_blacklistedElementsIframes: 'Usuń bieżącą domenę z czarnej listy - Ramki.',
  popup_add_whitelistedElementsDomains: 'Dodaj bieżącą domenę do domeny białej listy i zezwól na wszystko (żadne żądanie nie jest blokowane, brak sprawdzania słów na czarnej liście, brak usuwania plików cookie i automatyczne usuwanie iframe).',
  popup_remove_whitelistedElementsDomains: 'Remove current domain from the whitelist domains.',
  popup_reload_target: 'Załaduj ponownie stronę',

  /**
   * Security examples
   */
  blacklistedElementsCookies_html: (
    <span className="box-content">
      <div className="box-content--div">
        <p className="element-p">
            Tutaj powinno się wpisać nazwę ciasteczka aby na każdej stronie internetowej każde ciasteczko o podanej nazwie zostało skasowane lub
            nazwa domeny na której każde ciasteczka mają zostać skasowane.
            Standardowo lista ma ponad 350 wpisów niebezpiecznych nazew domen lub usług śledzących, którą są automatycznie kasowane.
        </p>
        <ul>
          <li>
            Przykładowy wpis w tej liście: <span className="colored-example-element">GPS</span>. Jeśli odwiedzisz stronę internetową: https://www.youtube.com, wtedy ciasteczko o nazwie <span className="colored-example-element">GPS</span> zostanie skasowane
          </li>
          <li>
            Przykładowy wpis w tej liście: <span className="colored-example-element">www.7search.com</span>. Jeśli odwiedzisz stronę internetową: https://www.7search.com, wtedy <span className="colored-example-element">wszystkie ciasteczka</span> zostaną skasowane
          </li>
        </ul>
      </div>
    </span>
  ),
  blacklistedElementsDomians_html: (
    <span className="box-content">
      <div className="box-content--div">
        <p className="element-p">
            To jest czarna lista oparta jest na nazwie domeny.
            Wszystkie domeny z tej listy są blokowane podczas odwiedzania tej witryny.
        </p>
        <ul>
          <li>
            Przykładowy wpis w tej liście: <span className="colored-example-element">ytimg.com</span>.Jeśli odwiedzisz stronę internetową  <span className="colored-example-element">https://ytimg.com</span> strona internetowa zostanie zablokowana
          </li>
          <li>
            Przykładowy wpis w tej liście: <span className="colored-example-element">github.com</span>. Jeśli odwiedzisz stronę internetową <span className="colored-example-element">https://github.com</span> strona internetowa zostanie zablokowana
          </li>
        </ul>
      </div>
    </span>
  ),
  blacklistedElementsUrlsIncludes_html: (
    <span className="box-content">
      <div className="box-content--div">
        <p className="element-p">
            Czarna listy oparta na adresach URL lub część adresu url.
            Wszystkie nazwy domen z tej listy oraz wszystkie części z adresu URL sa brane pod uwagę podczas odwiedzania storny internetwej.
            Jezeli adres strony internetowej zawiera jakikolwiek znak lub ciąg znaków z tej listy wtedy dostęp do strony internetowej zostanie zablokowany.
        </p>
        <ul>
          <li>
            Przykładowy wpis w tej liście: <span className="colored-example-element">package</span>. Jeśli odwiedzisz stronę internetową: https://www.npmjs.com/<span className="colored-example-element">package</span>/gulp-babel wtedy dostęp do strony internetowej zostanie zablokowany
          </li>
          <li>
            Przykładowy wpis w tej liście: <span className="colored-example-element">test</span>. Jeśli odwiedzisz stronę internetową: https://www.google.com/search?q=<span className="colored-example-element">test</span> wtedy dostęp do strony internetowej zostanie zablokowany
          </li>
          <li>  
            Przykładowy wpis w tej liście: <span className="colored-example-element">q</span>. Jeśli odwiedzisz stronę internetową: https://www.google.com/search?<span className="colored-example-element">q</span>=test wtedy dostęp do strony internetowej zostanie zablokowany
          </li>
          <li>  
            Przykładowy wpis w tej liście: <span className="colored-example-element">hub.com</span>. Jeśli odwiedzisz stronę internetową: https://www.git<span className="colored-example-element">hub.com</span> wtedy dostęp do strony internetowej zostanie zablokowany
          </li>
        </ul>
      </div>
    </span>
  ),
  blacklistedElementsIframes_html: (
    <span className="box-content">
      <div className="box-content--div">
        <p className="element-p">
          Czarna lista nazw domen na których (stronach internetowych) maja zostać usunięte ramki (iframe).
        </p>
        <ul>
          <li>  
            Przykładowy wpis w tej liście: <span className="colored-example-element">gazeta.pl</span>. Jeśli odwiedzisz stronę internetową: https://www.<span className="colored-example-element">gazeta.pl</span> wtedy wszystkie ramki zostaną usunięte
          </li>
        </ul>
      </div>
    </span>
  ),
  blacklistedElementsTrackers_html: (
    <span className="box-content">
      <div className="box-content--div">
        <p className="element-p">
            Jeśli odwiedzisz witrynę internetową, a witryna wdrożyła śledzenie
            usługi i nazwa domeny jest zgodna z jedną z nazw domen z tej listy lub
            cała ścieżka adresu url jest zgodna z jednym z wpisów z tej listy to
            żądanie zostanie zablokowane.
        </p>
        <ul>
          <li>  
            Przykładowy wpis w tej liście: <span className="colored-example-element">cdn.mouseflow.com</span>. Jeśli witryna połączy się z usługą zewnętrzną i adres zapytania zawiera nazwę domeny: https://<span className="colored-example-element">cdn.mouseflow.com</span> to zapytania zostanie zablokowane
          </li>
          <li>  
            Przykładowy wpis w tej liście: <span className="colored-example-element">rsrc.php/v3/y4/r/-PAXP-deijE.gif</span>. Jeśli witryna połączy się z usługą zewnętrzną i adres zapytania zawiera nazwę domeny: https://static.xx.fbcdn.net/<span className="colored-example-element">rsrc.php/v3/y4/r/-PAXP-deijE.gif</span> to zapytania zostanie zablokowane
          </li>
        </ul>
      </div>
    </span>
  ),
  blacklistedElementsWords_html: (
    <span className="box-content">
      <div className="box-content--div">
        <p className="element-p">
            Konteks ochrony tej aplikacji znajdzie każde słowo z tej czarnej listy, a każde słowo zostanie zastąpione przez „zamiennik” zdefiniowany w sekcji „Ustawienia ochrony .
        </p>
        <ul>
          <li>  
            Na przykład, jeśli słowo "pistolet" znajduje się na tej czarnej liście, to jeśli odwiedzisz stronę internetową, słowo „pistolet” zostanie zastąpione.
            <br />
            Przykład przed: "mam <span className="colored-example-element">pistolet</span> w szafie.".
            <br />
            Przykład po: "mam <span className="colored-example-element">########</span> w szafie."
          </li>
          <li>  
            Na przykład, jeśli słowo "zakupy" znajduje się na tej czarnej liście, to jeśli odwiedzisz stronę internetową, słowo zakupy zostanie zastąpione.
            <br />
            Przykład przed: "moje <span className="colored-example-element">zakupy</span> są w samochodzie.".
            <br />
            Przykład po: "moje <span className="colored-example-element">######</span> są w samochodzie."
          </li>
        </ul>
      </div>
    </span>
  ),
  blacklistedElementsClass_html: (
    <span className="box-content">
      <div className="box-content--div">
        <p className="element-p">
            Blokowanie tagów drzewa DOM na podstawie jego identifikatora: class.
        </p>
        <ul>
          <li>  
            Przykładowy wpis na tej liście: "font-bold". Jeśli odwiedzisz jakąkolwiek stronę internetową wtedy wsyzstkie elementy zawierające atrybut class o wartości 'font-bold' (np: {'<span class="font-bold"> Text </span>'}) zostaną usunięte ze strony internetowej.
          </li>
        </ul>
      </div>
    </span>
  ),
  blacklistedElementsHref_html: (
    <span className="box-content">
      <div className="box-content--div">
        <p className="element-p">
            Blokowanie tagów "A" drzewa DOM na podstawie jego identifikatora: href.
        </p>
        <ul>
          <li>  
            Przykładowy wpis na tej liście: "redirect?". Jeśli odwiedzisz jakąkolwiek stronę internetową wtedy wsyzstkie elementy drzewa DOM {'<a>'} zawierające atrybut href o wartości 'redirect?' (np: {'<a href="https://xv345bhFD.com/redirect?client=http://example.com">link</a>'}) zostaną usunięte ze strony internetowej.
          </li>
        </ul>
      </div>
    </span>
  ),
  blacklistedElementsId_html: (
    <span className="box-content">
      <div className="box-content--div">
        <p className="element-p">
            Blokowanie tagów drzewa DOM na podstawie jego identifikatora: id.
        </p>
        <ul>
          <li>  
            Przykładowy wpis na tej liście: "extern-logo". Jeśli odwiedzisz jakąkolwiek stronę internetową wtedy wsyzstkie elementy zawierające atrybut id o wartości 'extern-logo' (np: {'<img id="extern-logo"/>'}) zostaną usunięte ze strony internetowej.
          </li>
        </ul>
      </div>
    </span>
  ),
  whitelistedElementsDomains_html: (
    <span className="box-content">
      <div className="box-content--div">
        <p className="element-p">
            Nie rób nic dla wybranych nazw domen.
        </p>
        <ul>
          <li>  
            Przykładowy wpis w tej liście: <span className="colored-example-element">google.com</span>. Jeśli odwiedzisz stronę internetową: https://www.<span className="colored-example-element">google.com</span> nie są wykonywane żadne procesy ani nie jesteś chroniony
          </li>
          <li>  
            Przykładowy wpis w tej liście: <span className="colored-example-element">npmjs.com</span>. Jeśli odwiedzisz stronę internetową: https://www.<span className="colored-example-element">npmjs.com</span>/package/gulp-babel, nie są wykonywane żadne procesy ani nie jesteś chroniony
          </li>
        </ul>
      </div>
    </span>
  ),
  example: 'Przykłady',
  /**
   * Images download 
   */
  imagesPopupTitle: 'Znaleziono zdjęcia',
  imagesNoData: 'Brak poprawnych zdjęć',
  imagesNoDataFavourites: 'Brak zapisanych zdjęć',
  imagesLoadingTabs: 'Ładowanie aktywnych okienek...',
  current_tabs_title: 'Aktualne okna',
  filter: 'Filtruj według typu',
  filter_all: 'Wszystkie',
  itemsPerSite: 'Liczba zdjęć na stronę',
  itemsPerSiteSuffix: 'zdjęć',
  page: 'Strona',
  of: 'z',
  images: 'zdjęć',
  current_favourites_images: 'Tymczasem zapisane zdjęcia',
  open_in_new_tab: 'Otwórz w nowym okientku',
  download: 'Pobierz',
  downloadSmall: 'Pobierz zdjęcia',
  delete_all: 'Usuń wszysko',
  notLoggedInImagesFavouritesAdd: 'Tylko zalogowani użytkownicy mogą dodawać zdjęcia do listy ulubionych',
  notLoggedInImagesFavouritesManage: 'Tylko zalogowani użytkownicy mogą zarządzać listą ulubionych',
  tabsNoData: 'Brak poprawnych okienek',
  imagesLoadingData: 'Ładowanie zdjęć...',
  /*
   * List actions 
   */
  infoItemAdded: 'Wpis został dodany do listy',
  infoItemRemoved: 'Wpis został usunięty z listy',
  infoArrayIs0: 'Lista jest pusta, więc nie można usunąć żadnego elementu',
  infoIncorrectValue: 'Wartość jest nieprawidłowa',
  infoItemInList: 'Wpis już istnieje na liście',

  country: 'Kraj',
  countriesNotFoundText: 'Przepraszam, nie znalazłem takiego kraju',
  dropText: 'Upuść tutaj',
  error: 'Błąd',
  languages: 'Języki'
};

export default PL;
