// ====== 展覽全域參數設定區 ====== //

const CONTACT_FORM_URL = 'https://forms.office.com/r/KGqcH4rGsR?utm_source=html&utm_medium=main&utm_campaign=form_submit';

// ====== 以下為自動執行腳本，無須更動 ====== //

// 網頁載入完畢後，自動替換所有詢價表單連結
document.addEventListener("DOMContentLoaded", function() {
    const contactLinks = document.querySelectorAll('.global-contact-link');
    contactLinks.forEach(link => {
        link.href = CONTACT_FORM_URL;
    });
});

// ====== 🤖 機型資料庫 (Robot Database) ====== //
const ROBOT_DB = {
    "CRX-5+A": {
        payload: "5 kg",
        reach: "994 mm",
        repeatability: "±0.03 mm",
        previewImg: "img/spec/CRX-5iA.png",
        pdfUrl: "pdf/spec/CRX-5iA.pdf"
    },
    "CRX-10+A": {
        payload: "10 kg",
        reach: "1249 mm",
        repeatability: "±0.04 mm",
        previewImg: "img/spec/CRX-10iA.png",
        pdfUrl: "pdf/spec/CRX-10iA.pdf"
    },
    "CRX-10+A/L": {
        payload: "10 kg",
        reach: "1418 mm",
        repeatability: "±0.04 mm",
        previewImg: "img/spec/CRX-10iA-L.png",
        pdfUrl: "pdf/spec/CRX-10iA-L.pdf"
    },
    "CRX-10+A/L Paint": {
        payload: "10 kg",
        reach: "1418 mm",
        repeatability: "±0.04 mm",
        previewImg: "img/spec/CRX-10iA-L-Paint.png",
        pdfUrl: "pdf/spec/CRX-10iA-L-Paint.pdf"
    },
    "CRX-20+A/L": {
        payload: "20 kg",
        reach: "1418 mm",
        repeatability: "±0.04 mm",
        previewImg: "img/spec/CRX-20iA-L.png",
        pdfUrl: "pdf/spec/CRX-20iA-L.pdf"
    },
	"CRX/20-14A": {
        payload: "20 kg",
        reach: "1418 mm",
        repeatability: "±0.04 mm",
        previewImg: "img/spec/CRX-20iA-L.png",
        pdfUrl: "pdf/spec/CRX-20iA-L.pdf"
    },
    "CRX-30+A": {
        payload: "30 kg",
        reach: "1756 mm",
        repeatability: "±0.05 mm",
        previewImg: "img/spec/CRX-30iA.png",
        pdfUrl: "pdf/spec/CRX-30iA.pdf"
    },
    "M-710/50-26D": {
        payload: "50 kg",
        reach: "2606 mm",
        repeatability: "±0.06 mm",
        previewImg: "img/spec/M-710-50-26D.png",
        pdfUrl: "pdf/spec/M-710-50-26D.pdf",
    },
    "ER-4+A": {
        payload: "4 kg",
        reach: "550 mm",
        repeatability: "±0.01 mm",
        previewImg: "img/spec/ER-4iA.png",
        pdfUrl: "pdf/spec/ER-4iA.pdf"
    },
    "R-50+A": {
        previewImg: "img/spec/R-50iA.png",
        pdfUrl: "pdf/spec/R-50iA.pdf"
    },
	"ROBOGUIDE": {
        previewImg: "img/spec/ROBOGUIDE.png",
        pdfUrl: "pdf/spec/ROBOGUIDE.pdf"
    },
	"ZDT": {
        previewImg: "img/spec/ZDT.png",
        pdfUrl: "pdf/spec/ZDT.pdf"
    },
};

// ====== 🔄 自動注入機型資料腳本 ====== //
document.addEventListener("DOMContentLoaded", function() {
    const robotCard = document.getElementById('dynamic-robot-card');
    
    // 如果這個網頁有呼叫機器人資訊卡片，才執行替換
    if (robotCard) {
        // 抓取你在 HTML 裡設定的機型代號
        const targetModel = robotCard.getAttribute('data-robot-model');
        const robotData = ROBOT_DB[targetModel];

        if (robotData) {
            // 把資料庫的內容塞進對應的 HTML 標籤裡
            const styledModel = `<span class="font-fanuc">${targetModel}</span>`;
            document.getElementById('db-model-name').innerHTML = styledModel;
            document.getElementById('db-payload').innerText = robotData.payload;
            document.getElementById('db-reach').innerText = robotData.reach;
            document.getElementById('db-repeat').innerText = robotData.repeatability;
            document.getElementById('db-preview-img').src = robotData.previewImg;
            document.getElementById('db-pdf-btn').href = robotData.pdfUrl;
			
			// ★ 修正版：YouTube 影片動態生成邏輯 (跟著網頁走，不跟機型走)
			const ytWrapper = document.getElementById('db-youtube-wrapper');
			const videoCard = document.getElementById('dynamic-video-card');
			
			// 確保網頁上有這個區塊
			if (ytWrapper && videoCard) {
				// 從 HTML 的 data-yt-id 屬性把影片代碼抓出來
				const ytId = ytWrapper.getAttribute('data-yt-id');
				
				if (ytId) {
                    // ★ 防呆：YouTube 影片 ID 固定為 11 碼，只能是英數字、底線、連字號
                    const isValidYtId = /^[a-zA-Z0-9_-]{11}$/.test(ytId);

                    if (!isValidYtId) {
                        console.error(`🔴 [YouTube ID 格式異常] data-yt-id="${ytId}" 不是合法的 11 碼影片 ID，請檢查 HTML 設定！`);
                        videoCard.style.display = 'none'; // 格式不對就直接隱藏，避免產生壞掉的 iframe
                    } else {
                        // 如果有填 ID 且格式正確，就把卡片顯示出來
                        videoCard.style.display = 'block';

                        const embedOrigin = window.location.origin;

                        const buildYoutubeIframe = () => `
                            <iframe 
                                src="https://www.youtube.com/embed/${ytId}?rel=0&modestbranding=1&enablejsapi=1&origin=${embedOrigin}&autoplay=1&mute=1&playsinline=1" 
                                title="YouTube video player" 
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                                referrerpolicy="strict-origin-when-cross-origin"
                                allowfullscreen>
                            </iframe>
                        `;

                        if ('IntersectionObserver' in window) {
                            const videoObserver = new IntersectionObserver((entries, obs) => {
                                entries.forEach(entryItem => {
                                    if (entryItem.isIntersecting) {
                                        ytWrapper.innerHTML = buildYoutubeIframe();
                                        obs.disconnect();
                                    }
                                });
                            }, { threshold: 0.2 });

                            videoObserver.observe(videoCard);
                        } else {
                            ytWrapper.innerHTML = buildYoutubeIframe();
                        }
                    }
                } else {
                    // 如果該網頁沒有填寫影片 ID (或是空白)，就確保卡片隱藏
                    videoCard.style.display = 'none';
                }
			}
        } else {
            console.error("找不到機型資料：", targetModel, "請檢查 config.js 裡面的 ROBOT_DB 是否有建立此機型！");
        }
    }
});

// ====== 🎨 首頁縮圖自動配色腳本 ====== //
document.addEventListener("DOMContentLoaded", function() {
    // 找出首頁所有帶有 dynamic-thumb 的圖片
    const dynamicThumbs = document.querySelectorAll('.dynamic-thumb');

    dynamicThumbs.forEach(thumb => {
        // 1. 向上找出這個圖片被包在哪個 .block-container 裡面
        const parentBlock = thumb.closest('.block-container');
        
        if (parentBlock) {
            // 2. 取得父層 block-container 的 id (例如 sec-new, sec-crx-app)
            const blockId = parentBlock.id;
            
            // 3. 根據 id 的關鍵字，決定要用哪個 CSS 變數
            let darkColor, lightColor;
            
            if (blockId.includes('new')) {
                darkColor = 'var(--new-dark)';
                lightColor = 'var(--new-light)';
            } else if (blockId.includes('exp')) {
                darkColor = 'var(--crx-exp-dark)';
                lightColor = 'var(--crx-exp-light)';
            } else if (blockId.includes('crx-app')) {
                darkColor = 'var(--crx-app-dark)';
                lightColor = 'var(--crx-app-light)';
            } else if (blockId.includes('basic')) {
                darkColor = 'var(--basic-dark)';
                lightColor = 'var(--basic-light)';
            } else if (blockId.includes('vision')) {
                darkColor = 'var(--vision-dark)';
                lightColor = 'var(--vision-light)';
            } else if (blockId.includes('iot')) {
                darkColor = 'var(--iot-dark)';
                lightColor = 'var(--iot-light)';
            } else if (blockId.includes('appendix')) {
                darkColor = 'var(--appendix-dark)';
                lightColor = 'var(--appendix-light)';
            }
			
            // 4. 將抓到的主題顏色，填入圖片的 style 裡
			if (darkColor) {
                thumb.style.setProperty('--thumb-color', darkColor);
            }
        }
    });
});

/* // ====== 🕵️‍♂️ 防雷雷達：ROBOT_DB 健康檢查腳本 (含大小寫防呆) ====== //
document.addEventListener("DOMContentLoaded", function() {
    console.log("=== 🕵️‍♂️ 開始自動巡檢 ROBOT_DB 資料庫 ===");
    
    for (const [modelName, data] of Object.entries(ROBOT_DB)) {
        
        // 0. 防呆機制：嚴格檢查附檔名是否有大寫 (抓出 .PNG, .JPG, .Pdf)
        if (data.previewImg && data.previewImg.match(/\.(PNG|JPG|JPEG|Pdf|PDF)$/i)) {
            const ext = data.previewImg.split('.').pop();
            if (ext !== 'png' && ext !== 'jpg') {
                console.error(`🔴 [大小寫地雷] ${modelName} 的圖片副檔名寫成大寫了 (.${ext})！請去 config.js 改成全小寫，並確認實體檔案也是小寫！`);
            }
        }
        if (data.pdfUrl && data.pdfUrl.match(/\.(Pdf|PDF)$/i)) {
            const ext = data.pdfUrl.split('.').pop();
            if (ext !== 'pdf') {
                console.error(`🔴 [大小寫地雷] ${modelName} 的 PDF 副檔名寫成大寫了 (.${ext})！請去 config.js 改成全小寫，並確認實體檔案也是小寫！`);
            }
        }

        // 1. 檢查縮圖會不會破圖 (本機端只防得住檔名拼錯，防不住大小寫)
        if (data.previewImg) {
            const img = new Image();
            img.onload = () => console.log(`🟢 [圖片OK] ${modelName}`);
            img.onerror = () => console.error(`🔴 [破圖警告] 找不到 ${modelName} 的圖片: ${data.previewImg}`);
            img.src = data.previewImg;
        }

        // 2. 檢查 PDF 檔案在不在
        if (data.pdfUrl) {
            fetch(data.pdfUrl, { method: 'HEAD' })
                .then(res => {
                    if (res.ok) {
                        console.log(`🟢 [PDF OK] ${modelName}`);
                    } else {
                        console.error(`🔴 [死結警告] 找不到 ${modelName} 的 PDF: ${data.pdfUrl}`);
                    }
                })
                .catch(err => console.error(`🔴 [讀取錯誤] ${modelName} 的 PDF 路徑異常: ${data.pdfUrl}`));
        }
    }
}); */