/**
 * 🚩 ARCHITECTURAL REDIRECT & SYSTEM HEALTH NOTE
 * 
 * * [EN] This file is intentionally left as a placeholder for architectural integrity.
 * * [TR] Bu dosya, mimari bütünlüğü korumak amacıyla bir yer tutucu (placeholder) olarak bırakılmıştır.
 * * WHY IS THIS EMPTY? (Neden Boş?)
 * ------------------------------
 * * 1. SEPARATION OF CONCERNS (Sorumlulukların Ayrılması): 
 * Cypress bir 'Browser-based Functional Testing' aracıdır; Artillery ise 'Node.js/CLI-based Performance Testing' aracıdır. 
 * Bu iki farklı 'System Soul'u aynı klasörde barındırmak 'Scope Creep' ve karmaşaya neden olur.
 * 
 * * 2. TECHNICAL LIMITATION: 
 * Artillery .yml (YAML) formatında çalışır ve CLI üzerinden koşturulur. 
 * Cypress execution engine, YAML dosyalarını 'test suite' olarak tanımaz.
 * 
 * * 3. EVERYTHING IN ITS RIGHT PLACE: 
 * Performans testleri, projenin ana dizinindeki '/Performance_Artillery' klasörüne taşınmıştır.
 * Bu, mimarinin 'Scalability' (ölçeklenebilirlik) ve Senior derinliğini korur.
 * 
 * * 📍 ACTUAL PERFORMANCE TESTS: /Performance_Artillery/05_Performance.yml
 * 
 * * 🚀 TO RUN: artillery run Performance_Artillery/05_Performance.yml
 * 
 * "The ocean is the river's goal" (R.E.M.) - Nehrin (kodun) okyanusa (başarıya) ulaşması için doğru yatağında akması gerekir.
 * 
 * NOTE: Eğer büyük JSON dosyalarını YAML formatına dönüştürmen gerekirse, 
 * bunu manuel yapmak yerine https://www.json2yaml.com/ servisini kullanabilirsin.
 * 
 * * Speed, Stability, Reliability, Scalability ve Responsiveness metrikleri Artillery raporunda şu şekilde okunmalıdır:
 *
 * Speed & Responsiveness: Raporundaki median ve p95 değerleri.
 *
 * Stability: Test süresince p95 değerinin ne kadar "düz bir çizgide" kaldığı.
 *
 * Reliability: vusers.failed sayısının 0 olması.
 *
 * Scalability: rampTo aşamasında, kullanıcı sayısı 2 katına çıktığında yanıt süresinin 2 kattan fazla artıp artmadığı (Doğrusal bağımlılık kontrolü).
**/