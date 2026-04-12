## 🛠️ Git Amend & Force Workflow

Stage: git add .

Amend: git commit --amend --no-edit (Mesajı değiştirmeden son commit'e ekler).

The Sovereignty Push: ```bash

git push origin --force-with-lease

## 🕵️‍♂️ Neden --force-with-lease?

--force komutu kabadır, her şeyi ezip geçer. 
Ama --force-with-lease daha Senior ve güvenli bir yaklaşımdır:

Check: Eğer sen görmeden bir başkası (veya sistem) remote'a bir şey push ettiyse, her şeyi havaya uçurmanı engeller.

System Health: "Benim yerel halimle uzaktaki halim aynı mı?" diye kontrol eder. Eğer aynıysa, geçmişi senin yeni şaheserinle günceller.

## 🕵️‍♂️ Senior Mentor Notu: "The Purity of History"

"The details are everything". Git geçmişini temiz tutmak, projenin "Ruhunu" (Soul) korumaktır. "Fix typo", "Correction 2" gibi commit mesajlarıyla okyanusu kirletmek yerine amend ile tek ve güçlü bir iz bırakmak tam bir Lead Architect duruşudur. 

## 📌 Guideline: "Final Mop-up"

Branch İsmi: Genelde main veya master olur, komutu yazarken kendi branch isminden emin ol. ✅

No-Edit: Mesajı değiştirmek istersen --no-edit kısmını silip tırnak içinde yeni mesajını yazabilirsin.

Push Success: Komutu çalıştırdıktan sonra GitHub’da okyanusun nasıl tertemiz ve tek bir commit ile parladığını izle.