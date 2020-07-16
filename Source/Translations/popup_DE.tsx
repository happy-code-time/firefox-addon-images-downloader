import * as React from 'react';

const DE = {
  exclude: 'Für den Zip Export ignorieren',
  restoreExclude: 'Wieder für den ZIP export freigeben',
  saveToFavourites: 'URL (Online Pfad des Fotos) zu der lokalen Favouriten Liste hinzufügen',
  removeFromFavourites: 'URL (Online Pfad des Fotos) von der lokalen favouriten Liste entfernen',
  download_base64: 'Download als base64',
  loading: 'Laden...',
  links: 'Links',
  img_tag: 'Foto vom Tag',
  img_requests: 'Foto von Anfrage',
  img_from_request: 'Fotos von Anfragen',
  img_from_tags: 'Fotos von <img /> Tag von der Wesbite',
  addon_not_available: 'Diese Webseite unterstützt keine Addons',
  NoDataBlockedItems: 'Keine blockierten Daten',
  home_chat: 'Mit Freunden chatten - ohne Tracking',
  home_messages: 'Nachrichten senden - ohne Tracking',
  home_security: 'Sicherheit im Internet - Blockierung von Trackern',
  home_images_1: 'Fotos herunterladen im originalem Format',
  home_images_2: 'Fotos einzeln herunterladen',
  home_images_3: 'Fotos gebündelt herunterladen',
  /** 
   * Left menu
   */
  messages_main: 'Nachrichten',
  menu_text_messages: 'Nachrichten',
  menu_title_messages: 'Navigiere zu den Nachrichten',
  menu_text_notifications: 'Benachrichtigungen',
  menu_title_notifications: 'Navigiere zu den Benachrichtigungen',
  menu_text_favourites: 'Freunde',
  menu_title_favourites: 'Navigiere zu den Freunde',
  menu_text_add_favourites: 'Suche',
  menu_title_add_favourites: 'Navigiere zu der Freunden Suche',
  chat_main: 'Chat',
  menu_text_chat: 'Chat',
  menu_title_chat: 'Navigiere zu dem Chat',
  menu_text_security: 'Sicherheit',
  menu_text_security_main: 'Listen',
  menu_title_security: 'Navigiere zu dem Bereich Sicherheit',
  menu_text_security_settings: 'Einstellungen',
  menu_title_security_settings: 'Navigiere zu dem Bereich Sicherheits Einstellungen',
  menu_text_cookies: 'Cookies',
  menu_title_cookies: 'Navigiere zu dem Bereich Cookies',
  menu_text_home: 'Startseite',
  menu_title_home: 'Navigiere zur Startseite',
  menu_text_iframes: 'Iframes',
  menu_title_iframes: 'Navigiere zu dem Bereich Iframes',
  menu_text_security_examples: 'Beispiele',
  menu_title_security_examples: 'Navigiere zu dem Bereich Sichereich Beispiele',
  menu_text_download_images: 'Fotos herunterladen',
  menu_title_download_images: 'Navigiere zu dem Bereich Fotos herunterladen',
  menu_text_images: 'Fotos',
  menu_text_images_favourites: 'Gespeicherte Fotos',
  menu_title_images_favourites: 'Navigiere zu dem Bereich gespiecherte Fotos',
  /** 
   * Notifications popup
   */
  notifications: 'Benachrichtigungen',
  view_all_notifications: 'Alle Benachrichtigungen',
  no_notifications: 'Keine Benachrichtigungen',
  /** 
   * Messages popup
   */
  messages: 'Nachrichten',
  view_all_messages: 'Alle Nachrichten',
  no_messages: 'Keine Nachrichten',
  /**
   * Account popup
   */
  account: 'Benutzer',
  view_all_account: 'Benutzer Einstellungen',
  no_data: 'Keine Daten',
  no_data_available: 'Keine Benutzerdaten vorhanden',
  accountSettings: 'Einstellungen',
  accountLogout: 'Logout',
  accountPrivacyTerms: 'Datenschutzbestimmungen',
  /**
   * LOGIN
   */
  titlelogin: 'Login',
  titleUsername: 'E-mail',
  titlePassword: 'Password',
  signInButton: 'Login',
  loginMainTitle: 'Login',
  loginMainTitleSuffix: 'Login',
  registrationButton: 'Account erstellen',
  errorMessageLoginEmptyFields: 'E-mail and Password sind Pfilchtfelder',
  errorMessageLoginInvalidCredentials: 'Logindaten nicht korrekt',
  errorMessageRegistrationCheckbox: 'Es kann nicht fortgefahren werden ohne eine Zustimmung von Speicherung von persönlichen Daten',
  currentLoggedInAs: 'Derzeit eingeloggt als Benutzer',
  fortgotPassword: 'Passwort vergessen ?',
  home: 'Startseite',
  /**
   * LOGOUT
   */
  logoutButton: 'Ausloggen',
  /**
   * REGISTRATION
   */
  backToLogin: 'Zurück zum Login',
  registrationMainTitleSuffix: 'Registration',
  registrationButtonRegister: 'Registrierung',
  titleFirstName: 'Vorname',
  titleLastName: 'Nachname',
  errorMessageUserAlreadyExsists: 'Diese Email Adresse existiert bereits',
  errorMessageRegistrationEmptyFields: 'All Felder sind Pflichtfelder',
  deleteAccount: 'Konto löschen',
  acceptSavingDataTitle: 'Ich stimme der Datenschutzerklärung zu',
  /**
   * DELETE ACCOUNT
   */
  deleteAccountTitle: 'Löschung bestätigen',
  deleteAccountText: 'Bist du sicher dass due dein Account löschen möchtest ?',
  deleteAccountNo: 'Auf keinen Fall !',
  deleteAccountYes: 'Ja',
  deleteAccountPasswordConfirmation: 'Password Bestätigung',
  deleteAccountErrorMessageEmptyFields: 'Password ist eine Pfilchfeld',
  deleteAccountErrorMessageWrongPassword: 'Falsches Password',
  /** 
   * GLOBAL ERROR MESSEAGES
   */
  globalNetworkError: 'Netzwerk Fehler.',
  globalProcessError: 'Interner Fehler.',
  globalUserDoesNotExsists: 'Benutzerkonto existiert nicht',
  globalInvalidEmailsAdress: 'Ungültiges E-Mail-Adressformat',
  globalErrormessagePrefix: 'Es wurde ein Fehler gefunden, der dazu führt, dass die Anwendung nicht ordnungsgemäß funktioniert.',
  globalErrormessageCloseButton: 'Ignorieren',
  globalErrormessageLearnMoreButton: 'Mehr lesen',
  globalInvalidCountry: 'Fehlerhaftes Land',
  globalInvalidLanguage: 'Fehlerhafte Sprache',
  globalErrorCodeTitle: 'Fehlercode',
  globalErrorCode_1: 'Netzwerkfehler. Wenn ein Netzwerkfehler aufgetreten ist, ist eine "Ajax" -Anforderung fehlgeschlagen. Überprüfen Sie Ihre Netzwerkverbindung oder das, da der Remote-Dienst derzeit nicht verfügbar ist.',
  globalErrorCode_2: 'App-Prozessfehler. Dies bedeutet, dass die Antwort auf Ajax-Anforderungen eine ungültige Struktur für die Anwendung bereitgestellt hat.',
  globalErrorCode_3: 'Antwort anders als erwartet. Der Mittelwert des angeforderten Werts des aktuellen Anwendungskontexts ist ungültig.',
  code: 'Code',
  listNotSynchronizedUserNotLoggedIn: 'Du bist nicht eingeloggt deshalb kann diese Liste nicht synchronisiert werden',
  notLoggedIn: 'Nicht eingeloggt Fehler',
  listSynchronized_one: 'Element synchronisiert',
  listSynchronized_more: 'Elemente synchronisiert',
  /**
   * LOGIN REQUIRED
   */
  loginRequired: 'Um diese Aktion durchführen zu können, müssen Sie eingeloggt sein',
  /**
   * Messages
   */
  messagesNewMessage: 'Neu Nachricht',
  messagesInbox: 'Eingang',
  messagesOutbox: 'Gesendet',
  messagesImportant: 'Wichtig',
  messagesTrash: 'Papierkorb',
  messagesDrafts: 'Entwürfe',
  messageToText: 'Zu',
  messageDetailsBoxFrom: 'Von',
  messageDetailsBoxFromEmail: '',
  messageDetailsBoxTo: 'Zu',
  messageDetailsBoxDate: 'Datum',
  messageDetailsBoxTitle: 'Betreff',
  messagesNewMessageEmptyField: 'E-mail Adresse',
  messagesNewMessageNoResults: 'Benutzer nicht gefunden',
  messagesNewMessageCurrentUserAllreadyChoosed: 'Benutzer derzeit schon ausgewählt',
  messagesNewMessagePlaceholdersearchInput: 'E-mail Empfänger',
  messagesNewMessageTitle: 'Neu',
  messagesNewMessageMessagesTitle: 'Betreff',
  messagesNewMessageMessagesText: 'Text',
  messagesNewMessageSend: 'Senden',
  messagesNewMessageReipientDoesNotExsists: 'Einz der angegebene Empfänger existiert nicht',
  errorMessageNewMessagePleaseSearchForRecipient: 'Bitte füge einen Benutzer über die Suchfunktion hinzu oder füge einen Benutzer zu deinene Favoriten hinzu - diese erscheinen dann automatisch als Vorschlag wenn Sie anfangen zu tippen',
  messages_area: 'Wilkommen bei den Nachrichten',
  messages_area_1: 'Schreibe eine Nachricht von jedem Platz auf der Welt',
  messages_area_2: 'Autospeicherung von Nachrichten als Entwurft',
  messages_area_3: 'Einzelne Anhänge bis zu 5MB',
  messages_list: 'Keine Nachrichten in der Liste',
  /**
   * Account settings
   */  
  userSettings: 'Benutzekonto Einstellungen',
  userSettings_password: 'Passwort',
  userSettings_firstname: 'Vorname',
  userSettings_lastname: 'Nachname',
  userSettings_language: 'Sprache',
  saveUserDataButton: 'Speichern',
  errorMessageUserUpdateEmptyFields: 'Leeere Felder sind nicht erlaubt',
  errorMessageUserUpdateError: 'Fehler bei der Benutzerkonto Aktualisierung',
  successUpdate: 'Benutzerkonto wurde aktualisiert',
  /**
   * Popup - Cookies popup page
   */
  titleDeleteCookie: 'Einzelnes Cookie Element löschen',
  titleCopyCookieValue: 'Wert von dem Cookie in den zwischen speichern',
  cookie_msg_1: 'Domäne:',
  cookie_msg_2: 'Name:',
  cookie_msg_3: 'Wert:',
  cookie_msg_4: 'Alle Cookies löschen. Es ist gut möglich das du danach aus der Seite ausgeloggst wirst.',
  cookiesNoData: 'Keine Cookies vorhanden',
  /**
   * Password reset
   */
  passwordResetMainTitleSuffix: 'Passwort reset',
  passwordResetButton: 'Reset',
  followTheMailInstructions: 'Es wurde eine E-mail an die angegebene Adresse versendet',
  /**
   * Favourites
   */
  favouritesNoData: 'Um einen neuen Favoriten hinzuzufügen, navigieren Sie bitte zur Seite "Favoriten-Suche"',
  favouritesTitleCurrentFavourites: 'Ihre aktuelle Freunde',
  favouritesTitleSearchForUsers: 'Benutzersuche',
  favouritesSince: 'Freundschafts Zeitraum',
  favouritesRemoveFriend: 'Freundschaft beenden',
  favouritesRemoveFriendTooltip: 'Freundschaft beenden mit',
  favouritesAddFriend: 'Freundschaft starten',
  favouritesAddFriendTooltip: 'Freundschaft starten mit ',
  favouritesRemoveFriendResponseSuccess: 'Freundschaft beended für',
  favouritesRemoveFriendResponseError: 'Fehler während der Beending der Freundschaft mit',
  favouritesAddFriendResponseSuccess: 'Freundschaft gestarted mit Friendship started',
  favouritesAddFriendResponseError: 'Fehler beim Start der Freundschaft mit',
  favouritesNoResultsSuggestions: 'Keine Benutzer gefunden',
  favouritesEmptyField: 'Das Suchfeld darf nicht leer sein',
  favouritesAllreadyFriends: 'Die Freundschaft existiert bereits mit',
  /**
   * Chat
   */
  chatNoDataFavourites: 'Keine Favoriten gefunden. Um einen Chat zu starten, fügen Sie bitte einen Benutzer von der Seite "Favoriten Suche" hinzu.',
  chatNoDataLoading: 'Favouriten Liste wird geladen...',
  chatNoFavouritesUserSelected: 'Wählen Sie bitte einen Benutzer aus Ihrer Favoritenliste.',
  chatNoDataInsideChat: 'Keine Historien Enträge gefunden für den ausgewählten Benutzer.',
  chatInputPlaceholder: 'Nachricht...',
  chatToggleInputFieldType: 'Ändern Sie den Eingabetyp von einzeilig in mehrzeilig und umgekehrt',
  chatUploadFileTitle: 'Senden Sie Dateien an Ihren Freund',
  chatUploadFile: 'Dateien senden',
  chatSendFilesTo: 'Senden Sie ausgewählte Dateien an Ihren Freund',
  chatSendFilesToButton: 'Dateien senden',
  no_history_available: 'Derzeit kein Chat-Verlauf',
  view_all_chat: 'Chat öffnen',
  popup_not_readed_title: 'Chat - neue Nachricht',
  popup_no_new_messages: 'Keine neuen Nachrichten',
  chat_file: 'Datei senden',
  chatLoadingData: 'Konversation wird geladen...',

  // user account
  avatarErrorFileType: 'Nicht erkannter Dateityp',
  avatarErrorFileSize: 'Die Dateigröße überschreitet das Limit von 5 MB für Avatar',
  avatarErrorFileTypeSupport: 'Es sind nur die Dateitypen jpg, png und gif zulässig',

  /**
   * Blacklist overview
   */
  blacklistedElementsWords: 'Blacklist Wörter',
  blacklistedElementsDomians: 'Blacklist Domänen',
  blacklistedElementsUrlsIncludes: 'Blacklist Url Adressen',
  blacklistedElementsTrackers: 'Blacklist Trackers',
  blacklistedElementsCookies: 'Blacklist Cookies',
  blacklistedElementsClass: 'Blockierung von HTML für class',
  blacklistedElementsId: 'Blockierung von HTML für id',
  blacklistedElementsHref: 'Blockierung von HTML für href',
  blacklistedElementsIframes: 'Blacklist Iframes',
  copiedToClipBoard: 'In die Zwischenablage kopiert',
  action_title_copyToClipboard: 'Liste in Zwischenablage kopieren',
  action_title_exportToFile: 'Liste in JSON-Feld exportieren',
  action_title_deleteList: 'Liste global leeren',
  action_title_copyToClipboard_single: 'Wert in Zwischenablage kopieren',
  action_title_delete_single: 'Eintrag löschen',
  forThisFunctionLogin: 'Um diese Aktion auszuführen, melden Sie sich bitte an',
  emptyListDone: 'Liste wurde geleert',
  restoreDefaultValue: 'Stellen Sie die Liste auf den Standardwert zurück',
  whitelistedElementsDomains: 'Whitelist Domänen',

  /**
   * Security settings
   */
  securityIsOn: 'Das Sicherheits Feature dieser Erweiterung AN oder AUS.',
  scanTextOnWebsite: 'Wenn Sie diese Option ausschalten, werden alle Wörte auf den Websiten NICHT gescannt. Schwarze Liste: Wörte/ Attribute/ Attribute Wörter - werden ignoriert.',
  allowOnlyHttpsProtocol: 'Erlaube nur den Besuch von HTTPS Websites - also der Zugriff auf alle HTTP Webseiten wird blockiert.',
  allowOnlyHttpProtocol: 'Erlaube nur den Besuch von HTTP Websites - also der Zugriff auf alle HTTPS Webseiten wird blockiert.',
  makeSearchInSourceCode: 'Scannen Sie Wörter im Quellcode eines bestimmten HTML-Elements (innerHTML) oder nur im Text von HTML-Elementen (innerText).',
  mutationCheck: 'Überprüfen der HTML-Elemente von Websites nach dem Laden der Seite (DOM Mutationen von HTML Elementen in der Regel durchgeführt von Javascript Bibliotheken).',
  ignoreTagStyle: 'Den Kod innerhalb von den "STYLE" Tags (<style> Tag) beim Scan Prozess ignorieren anhand der Schwarzen Liste Wörter.',
  ignoreTagScript: 'Den Kod innerhalb von den "Script" Tags (<script> Tag) beim Scan Prozess ignorieren anhand der Schwarzen Liste Wörter.',
  ignoreTagLink: 'Den Kod innerhalb von den "Link" Tags (<link> Tag) beim Scan Prozess ignorieren anhand der Schwarzen Liste Wörter.',
  ignoreTagMeta: 'Den Kod innerhalb von den "Meta" Tags (<meta> Tag) beim Scan Prozess ignorieren anhand der Schwarzen Liste Wörter.',
  replacer: 'Ersetze jedes einzelne Gefahrenwortzeichen durch diesen Eintrag. Die Gefahrenwörter sind Wörte aus Ihrer eigen definierten Schwarzen Liste Wörter.',
  maximumOfDangerWords: 'Nach Erreichen dieses Wertes - anhand der schwarzen Listen: Blacklist Wörte, Blockierung von HTML für class, Blockierung von HTML für href oder Blockierung von HTML für id, dann wird die Website gesperrt. Der Minimalwert ist 1, der Maximalwert ist 300.',
  limitlessScan: 'Ignorieren Sie die maximale Anzahl von blockierten Gefahren anhand den Schwarzen Listen: Blacklist Wörte, Blockierung von HTML für class, Blockierung von HTML für href oder Blockierung von HTML für id. Die Website wird nicht blockiert (ignorieren Sie den obigen Wert). Wenn Sie diese Funktion aktivieren, kann Protection die Leistung Ihres Browsers beeinträchtigen.',
  deleteCookies: 'Lösche alle Cookies anhand der Schwarzen Liste Cookies auf jeder Webseite alle 5 Sekunden ?',

  /**
   * Popup - home
   */
  popupMainTitle: 'Security Statistik',
  popup_blocked_trackers: 'Blockierte Trackers',
  popup_blocked_cookies: 'Blockierte Cookies',
  popup_blocked_words: 'Blockierte Wörter',
  popup_blocked_requests: 'Blockierte Anfragen',
  popup_blocked_iframes: 'Blockierte Iframes',
  popup_blocked_dom: 'Blockiertes HTML id, href, class',
  popup_title_dashboard: 'Dashboard',

  /**
   * Popup - Iframes page
   */
  titleDeleteIframe: 'Löschen Sie einen einzelnen Iframe',
  iframe_msg_1: 'Quelle:',
  iframe_msg_2: 'Id:',
  iframe_msg_3: 'className:',
  iframesNoData: 'Keine Iframes vorhanden',

  /**
   * Popup - security
   */
  popup_add_blacklistedElementsTrackers: 'Fügen Sie den Blacklist-Trackern die aktuelle Domain hinzu. Alle Versuche, auf diese Domain zuzugreifen, werden blockiert.',
  popup_remove_blacklistedElementsTrackers: 'Entfernen Sie die aktuelle Domain aus der Blacklist Trackern.',
  popup_add_blacklistedElementsDomians: 'Fügen Sie der Blacklist-Domain die aktuelle Domain hinzu. Alle Versuche, von dieser Domain aus auf diese Domain oder Dienste zuzugreifen, werden blockiert.',
  popup_remove_blacklistedElementsDomians: 'Entfernen Sie die aktuelle Domain aus der Blacklist Domänen.',
  popup_add_blacklistedElementsCookies: 'Fügen Sie den Blacklist-Cookies die aktuelle Domain hinzu. Alle Cookies werden beim Laden der Website alle 5 Sekunden entfernt.',
  popup_remove_blacklistedElementsCookies: 'Entfernen Sie die aktuelle Domain aus der Blacklist Cookies.',
  popup_add_blacklistedElementsIframes: 'Aktuelle Domain zur Blacklist hinzufügen iframes.',
  popup_remove_blacklistedElementsIframes: 'Entfernen Sie die aktuelle Domain aus der Blacklist Iframes.',
  popup_add_whitelistedElementsDomains: 'Fügen Sie der Whitelist-Domain die aktuelle Domain hinzu und lassen Sie alles zu (keine Anfrage wird blockiert, keine Blacklist-Wortprüfung, keine Cookie-Löschung und keine automatische Iframe-Löschung).',
  popup_remove_whitelistedElementsDomains: 'Entfernen Sie die aktuelle Domain aus der Whitelist Domänen.',
  popup_reload_target: 'Reload website',

  /**
   * Security examples
   */
  blacklistedElementsCookies_html: (
    <span className="box-content">
      <div className="box-content--div">
        <p className="element-p">
          Sie können hier einen Cookie-Namen oder einen Domain-Namen hinzufügen, der auf jeder Website gelöscht werden soll.
          Standardmäßig enthält diese Liste 640 Einträge mit vordefinierten Cookie-Namen oder Domain-Namen
          dass die Verwendung von Cookies für Tracking-Zwecke und dort automatisch durch den Sicherheitsinhalt gelöscht werden.
        </p>
        <ul>
          <li>
            Beispiel Eintrag in der Liste: <span className="colored-example-element">GPS</span>. Wenn Sie danach die Webseite besuchen: https://www.youtube.com, dann wird der Cookie mit dem Name <span className="colored-example-element">GPS</span> gelöscht
          </li>
          <li>
            Beispiel Eintrag in der Liste: <span className="colored-example-element">www.7search.com</span>. Wenn Sie danach die Webseite besuchen: https://www.7search.com, dann werden <span className="colored-example-element">alle Cookies</span>  von der Seite gelöscht.
          </li>
        </ul>
      </div>
    </span>
  ),
  blacklistedElementsDomians_html: (
    <span className="box-content">
      <div className="box-content--div">
        <p className="element-p">
        Dies ist eine auf Domainnamen basierende Blacklist.
        Alle Domains aus dieser Liste werden beim Besuch ihrer Websites blockiert.
        </p>
        <ul>
          <li>
            Beispiel Eintrag in der Liste: <span className="colored-example-element">ytimg.com</span> wenn Sie dann die Webseite besuchen <span className="colored-example-element">https://ytimg.com</span> wird der Zugruff verweigert.
          </li>
          <li>
            Beispiel Eintrag in der Liste: <span className="colored-example-element">github.com</span> wenn Sie dann die Webseite besuchen <span className="colored-example-element">https://github.com</span> wird der Zugruff verweigert.
          </li>
        </ul>
      </div>
    </span>
  ),
  blacklistedElementsUrlsIncludes_html: (
    <span className="box-content">
      <div className="box-content--div">
        <p className="element-p">
          Dies ist ein Domainname und Teil der URL-basierten Blacklist.
          Alle Domains aus dieser Liste und alle übereinstimmenden Einträge aus der Website-URL werden blockiert, wenn eine Übereinstimmung gefunden wurde.
        </p>
        <ul>
          <li>
            Beispiel Eintrag in der Liste: <span className="colored-example-element">package</span>. Wenn Sie danach die Webseite besuchen: https://www.npmjs.com/<span className="colored-example-element">package</span>/gulp-babel  wird der Zugruff verweigert.
          </li>
          <li>
            Beispiel Eintrag in der Liste: <span className="colored-example-element">test</span>. Wenn Sie danach die Webseite besuchen: https://www.google.com/search?q=<span className="colored-example-element">test</span>,  wird der Zugruff verweigert.
          </li>
          <li>  
            Beispiel Eintrag in der Liste: <span className="colored-example-element">q</span>. Wenn Sie danach die Webseite besuchen: https://www.google.com/search?<span className="colored-example-element">q</span>=test,  wird der Zugruff verweigert.        
          </li>
          <li>  
            Beispiel Eintrag in der Liste: <span className="colored-example-element">hub.com</span>. Wenn Sie danach die Webseite besuchen: https://www.git<span className="colored-example-element">hub.com</span>,  wird der Zugruff verweigert.       
          </li>
        </ul>
      </div>
    </span>
  ),
  blacklistedElementsIframes_html: (
    <span className="box-content">
      <div className="box-content--div">
        <p className="element-p">
          Wenn Sie eine Website besuchen und sich der Domainname der Website in dieser Liste befindet, werden alle Iframes entfernt.
        </p>
        <ul>
          <li>  
            Beispiel Eintrag in der Liste: <span className="colored-example-element">gazeta.pl</span>. Wenn Sie danach die Webseite besuchen: https://www.gazeta.pl werden alle Iframes von der Seite https://<span className="colored-example-element">gazeta.pl</span> entfernt
          </li>
        </ul>
      </div>
    </span>
  ),
  blacklistedElementsTrackers_html: (
    <span className="box-content">
      <div className="box-content--div">
        <p className="element-p">
          Wenn Sie eine Website besuchen und die Website andere implementiert hat (Dritte)
          Dienste oder Tracking-Dienste und der Domainname stimmen mit einem Domainnamen aus dieser Liste überein
          oder der gesamte URL-Pfad stimmt dann mit einem Eintrag aus dieser Liste überein
          Die Anfrage wird blockiert.
        </p>
        <ul>
          <li>  
            Beispiel Eintrag in der Liste: <span className="colored-example-element">cdn.mouseflow.com</span>. Egal welche Webseite Sie besuchen, falls eine Webseite versuche einen Service von https://<span className="colored-example-element">cdn.mouseflow.com</span>/lib/track.js abzurufen, wird diese Abfrage blockiert
          </li>
          <li>  
            Beispiel Eintrag in der Liste: <span className="colored-example-element">rsrc.php/v3/y4/r/-PAXP-deijE.gif</span>. Egal welche Webseite Sie besuchen, falls eine Webseite versuche einen Service von: https://static.xx.fbcdn.net/<span className="colored-example-element">rsrc.php/v3/y4/r/-PAXP-deijE.gif</span>  abzurufen, wird diese Abfrage blockiert
          </li>
        </ul>
      </div>
    </span>
  ),
  blacklistedElementsWords_html: (
    <span className="box-content">
      <div className="box-content--div">
        <p className="element-p">
          Der Sicherheitsinhalt findet jedes Wort aus dieser schwarzen Liste und jedes Wort wird durch den im Abschnitt "Einstellungen" definierten "Ersetzer" ersetzt.
          Wenn der Sicherheitsinhalt ein Gefahrenwort aus der "Blacklist: Words" in einem HTML-Tag gefunden hat,
          Anschließend werden die HTML-Tag-Attribute gescannt. Wenn ein Attributname aus dieser Liste nicht mit Einträgen aus der "Blacklist: Attribute" übereinstimmt, dann
          Der Sicherheitsinhalt findet jedes Wort innerhalb des Attributwerts aus dieser Liste und ersetzt jedes Zeichen durch das Ersetzerzeichen
          definiert im Abschnitt "Einstellungen".
        </p>
        <ul>
          <li>  
            Zum Beispiel, wenn das Wort "guns" in dieser schwarzen Liste vorhanden ist und Sie eine Website besuchen, dann wird das Wort "guns" ersetzt werden.
            <br />
            Beispiel Eingabe: "we have <span className="colored-example-element">guns</span> in ...".
            <br />
            Beispielausgabe: "we have <span className="colored-example-element">####</span> in ..."
          </li>
          <li>  
            Zum Beispiel, wenn das Wort "seven" in dieser schwarzen Liste vorhanden ist und Sie eine Website besuchen, dann wird das Wort "seven" ersetzt werden.
            <br />
            Beispiel Eingabe: "<span className="colored-example-element">seven</span> years old ...".
            <br />
            Beispielausgabe: "<span className="colored-example-element">#####</span> years old ...".
          </li>
        </ul>
      </div>
    </span>
  ),
  blacklistedElementsClass_html: (
    <span className="box-content">
      <div className="box-content--div">
        <p className="element-p">
          Blockieren von DOM-Elementen (Tags) basierend auf dem Attribut: class.
        </p>
        <ul>
          <li>  
              Beispiel Eintrag: "font-bold". Wenn du eine Webseite besuchtst und irgendein DOM Element das Attribut class mit dem Wert 'font-bold' befüllt ist (z.B.: {'<span class="font-bold"> Text </span>'}) dann wird das Element aus der Webseite enfernt.
          </li>
        </ul>
      </div>
    </span>
  ),
  blacklistedElementsHref_html: (
    <span className="box-content">
      <div className="box-content--div">
        <p className="element-p">
          Blockieren von "A" -Tag-Elementen basierend auf ihrem Attribut: href.
        </p>
        <ul>
          <li>  
            Beispiel Eintrag: "redirect?". Wenn du ein Webseite besuchtst und das DOM Element {'<a>'} das Attribut href mit dem Wert 'redirect?' befüllt hat (z.B.: {'<a href="https://xv345bhFD.com/redirect?client=http://example.com">link</a>'}), dann wird das Element aus der Webseite enfernt.
          </li>
        </ul>
      </div>
    </span>
  ),
  blacklistedElementsId_html: (
    <span className="box-content">
      <div className="box-content--div">
        <p className="element-p">
          Blockieren von DOM-Elementen (Tags) basierend auf dem Attribut: zd.
        </p>
        <ul>
          <li>  
              Beispiel Eintrag: "extern-logo". Wenn du eine Webseite besuchtst und irgendein DOM Element das Attribut id mit dem Wert 'extern-logo' befüllt ist (z.B.: {'<img id="extern-logo"/>'}), dann wird das Element aus der Webseite enfernt.
          </li>
        </ul>
      </div>
    </span>
  ),
  whitelistedElementsDomains_html: (
    <span className="box-content">
      <div className="box-content--div">
        <p className="element-p">
          Machen Sie nichts für ausgewählte Domainnamen.
        </p>
        <ul>
          <li>  
            Beispiel Eintrag in der Liste: <span className="colored-example-element">google.com</span> wenn Sie dann die Webseite besuchen https://www.<span className="colored-example-element">google.com</span> findet keine Überprüfung jeglicher Art statt
          </li>
          <li>  
            Beispiel Eintrag in der Liste: <span className="colored-example-element">npmjs.com</span> wenn Sie dann die Webseite besuchen https://www.<span className="colored-example-element">npmjs.com</span>/package/gulp-babel findet keine Überprüfung jeglicher Art statt
          </li>
        </ul>
      </div>
    </span>
  ),
  example: 'Beispiele',
  /**
   * Images download 
   */
  imagesPopupTitle: 'Fotos wurden gefunden',
  imagesNoData: 'Keine validen Fotos vorhanden',
  imagesNoDataFavourites: 'Keine gespeicherten Fotos vorhanden',
  imagesLoadingTabs: 'Aktive tabs werden geladen...',
  current_tabs_title: 'Offene Tabs',
  filter: 'Filtern nach Typ',
  filter_all: 'Alle',
  itemsPerSite: 'Anzahl der Foto je Seite',
  itemsPerSiteSuffix: 'Fotos',
  page: 'Seite',
  of: 'von',
  images: 'Fotos',
  current_favourites_images: 'Derzeit gespeicherte Fotos',
  open_in_new_tab: 'Im neuen Tab öffnen',
  download: 'Herunterladen',
  downloadSmall: 'Herunterladen der Fotos',
  delete_all: 'Alle löschen',
  notLoggedInImagesFavouritesAdd: 'Nur angemeldete Benutzer können Bilder zur Favoritenliste hinzufügen',
  notLoggedInImagesFavouritesManage: 'Nur angemeldete Benutzer können die Favoritenliste verwalten',
  tabsNoData: 'Keine validen Tabs vorhanden',
  imagesLoadingData: 'Fotos werden geladen...',
  /*
   * List actions 
   */
  infoItemAdded: 'Eintrag wurde in die Liste hinzugefügt',
  infoItemRemoved: 'Eintrag wurde aus der Liste entfernt',
  infoArrayIs0: 'Liste ist leer, daher kann kein Element entfernt werden',
  infoIncorrectValue: 'Wert ist nicht valide',
  infoItemInList: 'Eintrag bereits in der Liste vorhanden',

  country: 'Land',
  countriesNotFoundText: 'Sorry, dieses Land habe ich nicht gefunden',
  dropText: 'Hier loslassen',
  error: 'Fehler',
  languages: 'Sprachen'
};

export default DE;
