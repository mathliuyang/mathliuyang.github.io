// 高质量科研预设配色（2–16色），无插值扩展，集中维护
// 暴露为 window.PRESET_GROUPS，结构：{ category: { [count]: [{ name, source, colors: string[] }] } }
(function () {
  // 业界权威与常用高质量分类色板
  const OKABE_ITO = [
    '#56B4E9', '#E69F00', '#009E73', '#F0E442', '#0072B2', '#D55E00', '#CC79A7', '#000000',
  ];
  const TABLEAU10 = [
    '#4E79A7', '#F28E2B', '#E15759', '#76B7B2', '#59A14F', '#EDC948', '#B07AA1', '#FF9DA7', '#9C755F', '#BAB0AC',
  ];
  const D3_CATEGORY20 = [
    '#1f77b4', '#aec7e8', '#ff7f0e', '#ffbb78', '#2ca02c', '#98df8a', '#d62728', '#ff9896', '#9467bd', '#c5b0d5',
    '#8c564b', '#c49c94', '#e377c2', '#f7b6d2', '#7f7f7f', '#c7c7c7', '#bcbd22', '#dbdb8d', '#17becf', '#9edae5',
  ];
  const PAIRED12 = [
    '#a6cee3', '#1f78b4', '#b2df8a', '#33a02c', '#fb9a99', '#e31a1c', '#fdbf6f', '#ff7f00', '#cab2d6', '#6a3d9a', '#ffff99', '#b15928',
  ];
  const SET3_12 = [
    '#8dd3c7', '#ffffb3', '#bebada', '#fb8072', '#80b1d3', '#fdb462', '#b3de69', '#fccde5', '#d9d9d9', '#bc80bd', '#ccebc5', '#ffed6f',
  ];
  const DARK2_8 = [
    '#1b9e77', '#d95f02', '#7570b3', '#e7298a', '#66a61e', '#e6ab02', '#a6761d', '#666666',
  ];

  // Nature（自然灵感）：海蓝、森林、沙土、岩石等稳定、可读性高的色板
  const NATURE_PASTEL_16 = [
    '#1D3557', '#457B9D', '#A8DADC', '#2A9D8F', '#264653', '#E9C46A', '#F4A261', '#E76F51',
    '#2E7D32', '#66BB6A', '#8D6E63', '#BDB76B', '#6D597A', '#B56576', '#E5989B', '#FFDDD2',
  ];
  const NATURE_DEEP_16 = [
    '#003049', '#1D3557', '#2A4D8F', '#176087', '#1B998B', '#2A9D8F', '#386641', '#6A994E',
    '#A7C957', '#D4A373', '#B08968', '#A44A3F', '#781F19', '#E09F3E', '#9D0208', '#AE2012',
  ];

  // Science（科研常用高对比）：从Vega/D3等生态中整理的现代对比增强色板
  const SCIENCE_MODERN_16 = [
    '#4C78A8', '#F58518', '#E45756', '#72B7B2', '#54A24B', '#EECA3B', '#B279A2', '#FF9DA6',
    '#9C755F', '#BAB0AC', '#1B9E77', '#D95F02', '#7570B3', '#E7298A', '#66A61E', '#E6AB02',
  ];

  // Cell（荧光成像）：常见的绿色/青色/洋红/紫色/蓝色/黄色等荧光通道，保证区分度
  const CELL_FLUO_16 = [
    '#2ECC71', '#27AE60', '#1ABC9C', '#00B894', '#3498DB', '#2980B9', '#9B59B6', '#8E44AD',
    '#C2185B', '#E91E63', '#E74C3C', '#F39C12', '#F1C40F', '#16A085', '#00D084', '#FF00FF',
  ];

  // Covers（封面风格）：具有强烈视觉表现力的编辑风格色板
  const COVERS_EDITORIAL_16 = [
    '#005F73', '#0A9396', '#94D2BD', '#E9D8A6', '#EE9B00', '#CA6702', '#BB3E03', '#9B2226',
    '#1B4965', '#5FA8D3', '#BFD7EA', '#E76F51', '#B56576', '#6D597A', '#3A0CA3', '#4CC9F0',
  ];

  function ensureGroup() {
    const g = {};
    for (let n = 2; n <= 16; n++) g[n] = [];
    return g;
  }

  function addSubset(group, masterColors, name, source, maxN = 16) {
    for (let n = 2; n <= Math.min(maxN, 16); n++) {
      if (masterColors.length >= n) {
        group[n].push({ name, source, colors: masterColors.slice(0, n) });
      }
    }
  }

  // 构建 curated（精选）
  const curated = ensureGroup();
  addSubset(curated, OKABE_ITO, 'Okabe–Ito 色盲友好', 'Okabe–Ito', 8);
  addSubset(curated, TABLEAU10, 'Tableau 10', 'Tableau', 10);
  addSubset(curated, D3_CATEGORY20, 'D3 Category 20', 'D3', 16);
  // 完整提供 12 色的经典方案
  curated[12].push({ name: 'ColorBrewer Paired 12', source: 'ColorBrewer', colors: PAIRED12.slice() });
  curated[12].push({ name: 'ColorBrewer Set3 12', source: 'ColorBrewer', colors: SET3_12.slice() });
  // 提供 8 色的沉稳对比方案
  curated[8].push({ name: 'ColorBrewer Dark2 8', source: 'ColorBrewer', colors: DARK2_8.slice() });
  
  // 将原 nature、science、cell、covers 分类的配色方案移到 curated 分类
  addSubset(curated, NATURE_PASTEL_16, 'Nature Pastel', 'Nature', 16);
  addSubset(curated, NATURE_DEEP_16, 'Nature Deep', 'Nature', 16);
  addSubset(curated, SCIENCE_MODERN_16, 'Science Modern', 'Science', 16);
  addSubset(curated, D3_CATEGORY20, 'D3 Category 20', 'Science', 16);
  addSubset(curated, CELL_FLUO_16, 'Cell Fluorescence', 'Cell', 16);
  addSubset(curated, COVERS_EDITORIAL_16, 'Editorial Cover', 'Covers', 16);

  window.PRESET_GROUPS = {
    curated,
  };
})();