Witam szanownych kolegów architektów,

Dla (może) ułatwienia wam roboty co zostało zrobione w temacie quizów na froncie:
    - dodano w sciezce pages/admin stronę "QuizzesAdmin"
        -> panel zarządzania quizami, wchodzi sie do niego z utworzonego przez zespół Daily Tasks panelu admina
        -> wyświetlone quizy pobierane z API quizów i działa to
        -> dodawanie / edycja / usuwanie quizów jest tylko "wizualizacja" bo POST i DELETE zwracają mi 403 i nie potrafilem tego chwilowo zmusic do dzialania
        -> są modale jak sie klika na quizy i opcje edycji itp wiec w miare to jakos mysle wyglada

    - dodano w sciezce pages/quiz strone "userQuiz"
        -> komponent nazywa się "Quizzes", ścieżka: /quizzes
        -> funkcjonalności zagrania w quiz z racji na problemy z POSTem nie ma: nic nie robiący guzik "Zagraj w quiz"
        -> pobiera tylko quizy gdzie data otwarcia jest przed obecną datą
            * 1 quiz z datą na styczen 2024 jest niewidoczny
        -> cos nie dzialalo mi z pobraniem HiScore dla quizu i wyświetla dla picu wartość "1" (faktycznie jest tak
            ustawiona jakby co)

    - w Nav.tsx usunąłem powtarzające sie pozycje i zmodyfikowałem ją dla quizów
        { to: "quizzes", icon: MdQuiz, label: "Quizzes" },

Co w backendzie:
    - w GreenGameIOApplication.java:
        -> dodano 2 quizy i pytania do nich oraz odpowiedzi

    - w sumie nic przesadnie oprocz dodania naszych funkcjonalności / plików
        -> nie modyfikowalismy / mieszaliśmy w innych plikach (o ile mi wiadomo)

Generalnie też krzyczy błędem mi TS2322 w index.tsx dla quizów admina i usera ale działać działa więc chyba ok

I wybaczcie syf malarie kod pierwsza moja stycznosc z reactem