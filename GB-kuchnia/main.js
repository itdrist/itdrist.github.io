document.addEventListener('DOMContentLoaded', function() {

    // === OBSŁUGA MODUŁU PŁATNOŚCI ===
    // Używamy delegacji zdarzeń, aby obsłużyć oba moduły płatności
    
    document.body.addEventListener('click', function(e) {
        if (e.target.classList.contains('amount-btn')) {
            // Znajdź "rodzica" (moduł), w którym kliknięto przycisk
            const parentModule = e.target.closest('.payment-module, .payment-module-clone');
            if (!parentModule) return;

            // Usuń klasę 'active' ze wszystkich przycisków w tym module
            parentModule.querySelectorAll('.amount-btn').forEach(btn => {
                btn.classList.remove('active');
            });

            // Dodaj klasę 'active' do klikniętego przycisku
            e.target.classList.add('active');

            // Zaktualizuj pole "Inna kwota"
            const amount = e.target.dataset.amount;
            const otherAmountInput = parentModule.querySelector('.other-amount-input');
            if (otherAmountInput) {
                otherAmountInput.value = amount;
            }
        }
    });

    // Aktualizuj przyciski, jeśli ktoś wpisze kwotę ręcznie
    document.body.addEventListener('input', function(e) {
        if (e.target.classList.contains('other-amount-input')) {
            const parentModule = e.target.closest('.payment-module, .payment-module-clone');
            if (!parentModule) return;

            const currentValue = e.target.value;
            
            // Usuń zaznaczenie ze wszystkich przycisków
            parentModule.querySelectorAll('.amount-btn').forEach(btn => {
                btn.classList.remove('active');
                // Zaznacz, jeśli kwota pasuje
                if (btn.dataset.amount === currentValue) {
                    btn.classList.add('active');
                }
            });
        }
    });

    // === OBSŁUGA LICZNIKA CZASU (SEKCJA 5) ===
    // TODO: Programista - Zweryfikuj datę docelową.
    const countdownDate = new Date("December 24, 2025 18:00:00").getTime();

    const countdownElement = document.getElementById('countdown');
    
    // Sprawdź, czy element licznika istnieje na stronie
    if (countdownElement) {
        const updateCountdown = setInterval(function() {
            const now = new Date().getTime();
            const distance = countdownDate - now;

            // Obliczenia
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

            // Wyświetlanie
            document.getElementById('days').innerText = days;
            document.getElementById('hours').innerText = hours;
            document.getElementById('minutes').innerText = minutes;

            // Co jeśli czas się skończył
            if (distance < 0) {
                clearInterval(updateCountdown);
                countdownElement.innerHTML = "Kampania została zakończona!";
            }
        }, 1000);
    }

});