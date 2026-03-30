// processor.js
module.exports = {
  // 1. İstek gitmeden önce çalışacak fonksiyon
  prepareCoffeeOrder: function(requestParams, context, ee, next) {
    // Rastgele bir Málaga Sipariş ID'si üretelim
    const orderId = "MLG-" + Math.floor(Math.random() * 10000);
    
    // Bu ID'yi Artillery'nin hafızasına (context) atalım
    context.vars.dynamicOrderId = orderId;
    
    console.log(`>> [beforeRequest] Málaga Siparişi Hazırlanıyor: ${orderId}`);
    return next(); // "Her şey hazır, isteği gönderebilirsin!"
  },

  // 2. Yanıt geldikten sonra çalışacak fonksiyon
  logTheArrival: function(requestParams, response, context, ee, next) {
    console.log(`>> [afterResponse] Okyanustan Yanıt Geldi! Status: ${response.statusCode}`);
    
    // Eğer yanıt 200 ise bir kutlama mesajı basalım
    if (response.statusCode === 200) {
      console.log(">> [System Health] Málaga verisi başarıyla işlendi. ¡Excelente!");
    }
    return next();
  }
};