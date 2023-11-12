// Zdefiniowałem stałe dla elementów HTML
const dropLists = document.querySelectorAll("form select");
const fromCurrency = document.querySelector(".from select");
const toCurrency = document.querySelector(".to select");
const getButton = document.querySelector("form button");
const exchangeRateTxt = document.querySelector("form .exchange-rate");
const amount = document.querySelector("form input");
const exchangeIcon = document.querySelector("form .icon");

const API_TOKEN="a4491f6bdcb369ece2d017b5";


// Zainicjowałem rozwijane listy danymi walut z country_list
for (const dropList of dropLists) {
  // Iteruję przez country_list i tworzę opcje dla rozwijanej listy
  for (const [currencyCode, country] of Object.entries(country_list)) {
    // Określam, czy opcja ma być zaznaczona
    const selected =
      (dropList === fromCurrency && currencyCode === "USD") ||
      (dropList === toCurrency && currencyCode === "PLN")
        ? "selected"
        : "";
    // Tworzę tag opcji i dodaję go do rozwijanej listy
    const optionTag = `<option value="${currencyCode}" ${selected}>${currencyCode}</option>`;
    dropList.insertAdjacentHTML("beforeend", optionTag);
  }

  // Dodaję obsługę zdarzenia zmiany dla rozwijanej listy
  dropList.addEventListener("change", (e) => loadFlag(e.target));
}

// Dodaję nasłuchiwacza na zdarzenie "load" dla okna przeglądarki
window.addEventListener("load", getExchangeRate);
// Dodaję nasłuchiwacza na zdarzenie kliknięcia dla przycisku
getButton.addEventListener("click", (e) => {
  e.preventDefault();
  getExchangeRate();
});

// Dodaję nasłuchiwacza na zdarzenie kliknięcia dla ikony wymiany walut
exchangeIcon.addEventListener("click", () => {
  // Zamieniam wartości między fromCurrency a toCurrency
  [fromCurrency.value, toCurrency.value] = [toCurrency.value, fromCurrency.value];
  // Wczytuję flagi dla obu walut
  [fromCurrency, toCurrency].forEach((currency) => loadFlag(currency));
  // Pobieram i wyświetlam nowy kurs wymiany
  getExchangeRate();
});

// Funkcja do wczytywania flagi na podstawie wybranej waluty
function loadFlag(element) {
  // Znajduję element obrazka dla danej waluty
  const imgTag = element.parentElement.querySelector("img");
  // Ustawiam nowe źródło obrazka na podstawie country_list
  imgTag.src = `https://flagcdn.com/48x36/${country_list[element.value].toLowerCase()}.png`;
}

// Funkcja do pobierania i wyświetlania kursu wymiany
function getExchangeRate() {
  // Pobieram wartość z pola wprowadzania kwoty, a jeśli nie ma wartości, ustawiam na 1
  let amountVal = amount.value || 1;
  // Wyświetlam informację o pobieraniu kursu wymiany
  exchangeRateTxt.innerText = "Getting exchange rate...";
  // Zdefiniowano URL do API wymiany walut
  const url = `https://v6.exchangerate-api.com/v6/${API_TOKEN}/latest/${fromCurrency.value}`;

  // Wywołuję API i przetwarzam odpowiedź
  fetch(url)
    .then((response) => response.json())
    .then((result) => {
      // Pobieram kurs wymiany dla danej pary walut
      const exchangeRate = result.conversion_rates[toCurrency.value];
      // Obliczam i wyświetlam całkowitą wartość wymiany
      const totalExRate = (amountVal * exchangeRate).toFixed(2);
      exchangeRateTxt.innerText = `${amountVal} ${fromCurrency.value} = ${totalExRate} ${toCurrency.value}`;
    })
    .catch(() => {
      // Wyświetlam informację o błędzie w przypadku niepowodzenia
      exchangeRateTxt.innerText = "Upss.. Something went wrong";
    });
}

let rotationAngle = 0;

// Zdarzenie obsługuje animację exchangeIcon
exchangeIcon.addEventListener("click", () => {
  rotationAngle = (rotationAngle + 180) % 360;
  exchangeIcon.style.transform = `rotateY(${rotationAngle}deg)`;
});

