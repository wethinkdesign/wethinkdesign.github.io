/* ── Portfolio Data ──
 *
 * 每個案件可包含多張圖片。
 * - cover: Grid 中顯示的封面圖（通常為 images 的第一張）
 * - images: 案件的所有圖片陣列
 *
 * 圖片路徑格式: /portfolio/<folder-name>/01.jpg
 *
 * 快速新增案件：執行 scripts/add-project.sh，詳見該檔案說明。
 */

const generateImages = (id, count) => {
    return Array.from({length: count}, (_, i) =>
        `/portfolio/${id}/${(i + 1).toString().padStart(2, '0')}.jpeg`
    );
};

export const portfolioCategory = {
    All: "all",
    Residential: "residential",
    Commercial: "commercial",
    Office: "office"
};

const portfolioItems = [
    {
        title: "自由之丘",
        subtitle: "C宅",
        category: portfolioCategory.Residential,
        images: generateImages(1, 13),
    },
    {
        title: "國賓大苑K宅",
        subtitle: "K宅",
        category: portfolioCategory.Commercial,
        images: generateImages(2, 21),
    },
    {
        title: "智匯學",
        subtitle: "L宅",
        category: portfolioCategory.Residential,
        images: generateImages(3, 4),
    },
    {
        title: "中北大",
        subtitle: "W宅",
        category: portfolioCategory.Office,
        images: generateImages(4, 11),
    },
];
export default portfolioItems
