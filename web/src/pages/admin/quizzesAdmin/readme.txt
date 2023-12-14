Witam panów architektów,

Dla (może) ułatwienia wam roboty co zostało zrobione w temacie quizów na froncie:
    - dodano w sciezce pages/admin stronę "QuizzesAdmin"
        -> panel zarządzania quizami, wchodzi sie do niego z utworzonego przez zespół Daily Tasks panelu admina
        -> wyświetlone quizy pobierane z API quizów i działa to
        -> dodawanie / edycja / usuwanie quizów jest tylko "wizualizacja" bo POST i DELETE zwracają mi 403 i nie potrafilem tego zmusic do dzialania
        -> są modale jak sie klika na quizy i opcje edycji itp wiec w miare to jakos mysle wyglada

        -> dodano w AdminLayout.tsx sciezke

    - dodano w sciezce pages/quiz strone "userQuiz"
        -> komponent nazywa się "Quizzes", ścieżka: /quizzes
        -> funkcjonalności zagrania w quiz z racji na problemy z POSTem nie ma: pusty guzik "Zagraj w quiz"
        -> pobiera tylko quizy gdzie data otwarcia jest przed obecną datą
            * 1 quiz z datą na styczen 2024 jest niewidoczny

Co w backendzie:
    - w GreenGameIOApplication.java:
        -> dodano 2 quizy i pytania do nich

    - w sumie nic przesadnie oprocz dodania naszych funkcjonalności
        -> nie zmienialismy nic np. w userze
