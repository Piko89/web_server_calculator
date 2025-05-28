// Global değişkenler
let displayElement = document.getElementById('display');
let errorElement = document.getElementById('error-message');
let currentInput = '0';
let shouldResetDisplay = false;

// Sayfa yüklendiğinde çalışacak fonksiyonlar
document.addEventListener('DOMContentLoaded', function() {
    console.log('Hesap makinesi hazır!');
    updateDisplay();
});

// Ekranı güncelleme fonksiyonu
function updateDisplay() {
    displayElement.value = currentInput;
    hideError();
}

// Hata mesajını gösterme
function showError(message) {
    errorElement.textContent = message;
    errorElement.style.display = 'block';
}

// Hata mesajını gizleme
function hideError() {
    errorElement.style.display = 'none';
}

// Karakter ekleme fonksiyonu
function ekle(value) {
    hideError();
    
    // Eğer ekran sıfırlanması gerekiyorsa
    if (shouldResetDisplay) {
        currentInput = '';
        shouldResetDisplay = false;
    }
    
    // Eğer ekranda sadece '0' varsa ve yeni girdi bir sayıysa
    if (currentInput === '0' && !isNaN(value)) {
        currentInput = value;
    } else {
        currentInput += value;
    }
    
    updateDisplay();
}

// Temizleme fonksiyonu
function temizle() {
    currentInput = '0';
    shouldResetDisplay = false;
    updateDisplay();
    console.log('Ekran temizlendi');
}

// Geri alma fonksiyonu
function geriAl() {
    if (currentInput.length > 1) {
        currentInput = currentInput.slice(0, -1);
    } else {
        currentInput = '0';
    }
    updateDisplay();
}

// Ana hesaplama fonksiyonu
function hesapla() {
    // Boş giriş kontrolü
    if (!currentInput || currentInput === '0') {
        showError('Lütfen bir işlem girin!');
        return;
    }
    
    // × sembolünü * ile değiştir (görsel için × kullanıyoruz ama hesaplama için * gerekli)
    let expression = currentInput.replace(/×/g, '*');
    
    console.log('Hesaplanacak ifade:', expression);
    
    // Sunucuya AJAX isteği gönder
    fetch('/hesapla', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            ifade: expression
        })
    })
    .then(response => response.json()) // JSON formatında yanıt al
    .then(data => {
        if (data.hata) {
            // Hata varsa göster
            showError(data.hata);
            console.error('Hesaplama hatası:', data.hata);
        } else {
            // Başarılıysa sonucu göster
            currentInput = data.sonuc;
            shouldResetDisplay = true; // Sonraki girişte ekranı sıfırla
            updateDisplay();
            console.log('Hesaplama başarılı:', data.sonuc);
        }
    })
    .catch(error => {
        // Ağ hatası vs.
        showError('Sunucu bağlantı hatası!');
        console.error('Fetch hatası:', error);
    });
}

// Klavye desteği
document.addEventListener('keydown', function(event) {
    const key = event.key;
    
    // Sayılar ve işlemler
    if ('0123456789+-*/.'.includes(key)) {
        let displayKey = key === '*' ? '×' : key; // * yerine × göster
        ekle(displayKey);
    }
    // Enter veya = tuşu için hesapla
    else if (key === 'Enter' || key === '=') {
        event.preventDefault();
        hesapla();
    }
    // Escape veya C tuşu için temizle
    else if (key === 'Escape' || key.toLowerCase() === 'c') {
        temizle();
    }
    // Backspace için geri al
    else if (key === 'Backspace') {
        event.preventDefault();
        geriAl();
    }
});

// Debug için - konsola log yazdırma fonksiyonu
function debugLog(message) {
    console.log('[Hesap Makinesi Debug]:', message);
}

// Sayfa yüklendiğinde debug bilgisi
debugLog('JavaScript dosyası yüklendi');