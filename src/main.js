document.querySelector('#app').innerHTML = `
<!-- Kontener główny strony -->
<div class="wrapper">
    <!-- Nagłówek strony -->
    <header>Currency Converter</header>
    <!-- Formularz konwertera walut -->
    <form action="#">
        <!-- Pole do wprowadzania kwoty -->
        <div class="amount">
            <p>Enter Amount</p>
            <input type="text" value="1">
        </div>
        <!-- Kontener dla rozwijanych list z wyborem walut -->
        <div class="drop-list">
            <!-- Sekcja dla wyboru waluty źródłowej -->
            <div class="from">
                <p>From</p>
                <!-- Kontener z obrazkiem flagi i rozwijaną listą -->
                <div class="select-box">
                    <img src="https://flagcdn.com/48x36/us.png" alt="flag">
                    <select>
                        <!-- Tagi opcji są wstawione za pomocą JavaScript -->
                    </select>
                </div>
            </div>
            <!-- Ikona do zamiany walut -->
            <div class="icon"><i class="fas fa-exchange-alt"></i></div>
            <!-- Sekcja dla wyboru waluty docelowej -->
            <div class="to">
                <p>To</p>
                <!-- Kontener z obrazkiem flagi i rozwijaną listą -->
                <div class="select-box">
                    <img src="https://flagcdn.com/48x36/pl.png" alt="flag">
                    <select>
                        <!-- Tagi opcji są wstawione za pomocą JavaScript -->
                    </select>
                </div>
            </div>
        </div>
        <!-- Informacja w trakcie fetchowania API -->
        <div class="exchange-rate">Getting exchange rate...</div>
        <!-- Przycisk do pobierania kursu wymiany -->
        <button>Get Exchange Rate</button>
    </form>
</div>
`


