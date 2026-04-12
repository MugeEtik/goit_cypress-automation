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
 * * 3. ⚡ PERFORMANCE TESTING: EVERYTHING IN ITS RIGHT PLACE
 * * Performans mimarisi, monolitik yapıdan modüler 'Performance_Artillery' ekosistemine evrilmiştir. 
 * Bu düzenleme, sistemin her bir stres faktörünü ayrı bir frekansta analiz etmemize olanak tanır.
 * Bu, mimarinin 'Scalability' (ölçeklenebilirlik) ve Senior derinliğini korur.
 * 
* * 📍 PROJECT ROOT PATHS:
 * * Performance_Artillery/
 * ├── 05_0_GoIT_Main_Lesson/       # Ana ders içerikleri (Foundation)
 * ├── 05_1_Load-Testing/           # Beklenen normal yük (Normal Rhythm)
 * ├── 05_2_Stress-Testing/         # Kırılma noktası analizi (Breaking Point)
 * ├── 05_3_Scalability-Testing/    # Kaynak & Ramp-up analizi (Linear Growth)
 * ├── 05_4_Spike-Testing/          # Ani trafik patlamaları (Mızrak ucu grafiği)
 * ├── 05_5_Volume-Testing/         # Büyük veri hacmi (Database focus)
 * ├── 05_6_Endurance-Testing/      # Uzun süreli dayanıklılık (Soak test)
 * ├── 05_7_JS-Processor/           # Custom Logic & Scripting (Logic Engine)
 * ├── 05_8_Environments/           # Staging vs. Real-World (Multi-orbit)
 * ├── data/                        # CSV/JSON veri setleri (The Fuel)
 * └── hw17_homework-perf-test/     # Homework specific tests
 *
 * 🚀 TO RUN A MODULE (Example):
 *      artillery run Performance_Artillery/05_1_Load-Testing/normal-usage.yml
 * 
 * * 🧠 PERFORMANCE FIRST MENTALITY:
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