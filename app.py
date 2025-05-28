# -*- coding: utf-8 -*-
# Flask web framework'ünü içe aktarıyoruz
from flask import Flask, render_template, request, jsonify

# Flask uygulaması oluşturuyoruz
app = Flask(__name__)

# Ana sayfa rotası - kullanıcı web sitesine girdiğinde bu çalışır
@app.route('/')
def ana_sayfa():
    """
    Ana sayfa fonksiyonu
    index.html dosyasını render eder
    """
    return render_template('index.html')

# Hesaplama rotası - AJAX istekleri için
@app.route('/hesapla', methods=['POST'])
def hesapla():
    """
    Hesaplama işlemlerini yapan fonksiyon
    JSON formatında veri alır ve sonucu JSON olarak döner
    """
    try:
        # Frontend'den gelen JSON verisini al
        veri = request.get_json()
        ifade = veri['ifade']
        
        # Güvenlik için sadece belirli karakterlere izin ver
        izinli_karakterler = set('0123456789+-*/.() ')
        if not all(karakter in izinli_karakterler for karakter in ifade):
            return jsonify({'hata': 'Geçersiz karakter kullanıldı!'})
        
        # Matematik işlemini hesapla
        # eval() kullanımı normalde tehlikelidir, ama burada kontrollü şekilde kullanıyoruz
        sonuc = eval(ifade)
        
        # Sonucu formatla (çok uzun ondalık sayıları kısalt)
        if isinstance(sonuc, float):
            sonuc = round(sonuc, 8)
        
        return jsonify({'sonuc': str(sonuc)})
        
    except ZeroDivisionError:
        return jsonify({'hata': 'Sıfıra bölme hatası!'})
    except Exception as e:
        return jsonify({'hata': 'Hesaplama hatası!'})

# Sunucuyu çalıştır
if __name__ == '__main__':
    print("Web Server Hesap Makinesi başlatılıyor...")
    print("Tarayıcınızda http://localhost:5000 adresine gidin")
    print("Ağdaki diğer cihazlardan erişmek için Pi'nin IP adresi:5000 kullanın")
    
    # debug=True: Geliştirme modunda otomatik yeniden başlatma
    # host='0.0.0.0': Tüm ağ arayüzlerinden erişime izin ver
    app.run(debug=True, host='0.0.0.0', port=5000)