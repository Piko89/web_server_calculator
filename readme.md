# Web Hesap Makinesi

🧮 Basit, şık ve web tabanlı bir hesap makinesi!  
Python (Flask) ile geliştirilmiş, modern arayüze sahip ve Raspberry Pi dahil tüm bilgisayarlarda çalışır.

## Özellikler

- Web tarayıcısı üzerinden kolay kullanım
- Temiz ve modern kullanıcı arayüzü
- Klavye ve fare desteği
- Hatalı girişlerde kullanıcıya uyarı mesajı
- Sıfıra bölme ve geçersiz karakter kontrolü
- Raspberry Pi ve diğer Linux/Windows/Mac cihazlarda çalışır

## Kurulum

1. **Depoyu klonlayın:**
   ```sh
   git clone https://github.com/Piko89/web_server_calculator.git
   cd web_server_calculator
   ```

2. **Gerekli Python paketlerini yükleyin:**
   ```sh
   pip install flask
   ```

3. **Uygulamayı başlatın:**
   ```sh
   python start.py
   ```
   veya Linux/Mac için:
   ```sh
   python3 start.py
   ```

4. **Tarayıcınızda açın:**  
   [http://localhost:5000](http://localhost:5000) adresine gidin.

## Dosya Yapısı

```
web_server_calculator/
├── app.py              # Flask uygulaması
├── start.py            # Otomatik güncelleme ve başlatma scripti
├── static/
│   ├── css/
│   │   └── style.css   # Stil dosyası
│   └── js/
│       └── script.js   # JavaScript dosyası
└── templates/
    └── index.html      # Ana HTML şablonu
```

## Kullanım

- Sayılar ve işlemleri butonlarla veya klavyenizle girin.
- `C` ile temizleyin, `←` ile son karakteri silin.
- `=` veya Enter ile sonucu görün.
- Hatalı girişlerde ekranda uyarı mesajı çıkar.

## Raspberry Pi'de Kullanım

Ağınızdaki diğer cihazlardan erişmek için Pi'nin IP adresini kullanın:  
`http://<cihaz_ip_adresi>:5000`

## Teşekkür
Bu projenin geliştirilmesinde Claude, ChatGPT ve GitHub Copilot'un sağladığı yapay zeka destekli öneri ve yardımlardan faydalanılmıştır.