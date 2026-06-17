/* 案件清單。新增案件：見 docs/superpowers/specs 附錄 A。
 * category 可選：residential / commercial / office
 * slug 未填則退回字串化的 id。 */
export const portfolioConfig = [
  { id: 1, slug: "ziyouzhiqiu",  title: "自由之丘", subtitle: "C宅", category: "residential" },
  { id: 2, slug: "guobindayuan", title: "國賓大苑", subtitle: "K宅", category: "residential" },
  { id: 3, slug: "zhihuixue",    title: "智匯學",   subtitle: "L宅", category: "residential" },
  { id: 4, slug: "zhongbeida",   title: "中北大",   subtitle: "W宅", category: "residential" },
];

export const categoryLabel = {
  residential: "住宅空間",
  commercial: "商業空間",
  office: "辦公空間",
};
