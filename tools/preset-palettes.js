/*
 * 智核学术·科研配色工具 - 预设配色方案
 * 
 * 高质量科研预设配色（2–16色），无插值扩展，集中维护
 * 专为科研图表、数据可视化、学术展示优化设计
 * 
 * 暴露为 window.PRESET_GROUPS，结构：{ category: { [count]: [{ name, source, colors: string[] }] } }
 */

(function () {
  function ensureGroup() {
    const g = {};
    for (let n = 2; n <= 16; n++) g[n] = [];
    return g;
  }

  const curated = ensureGroup();

  // 🌈 业界权威配色方案 - Okabe–Ito色盲友好系列 (2-16色)
  curated[2].push({ name: 'Okabe–Ito', source: 'Okabe–Ito', colors: ['#56B4E9', '#E69F00'] });
  curated[3].push({ name: 'Okabe–Ito', source: 'Okabe–Ito', colors: ['#56B4E9', '#E69F00', '#009E73'] });
  curated[4].push({ name: 'Okabe–Ito', source: 'Okabe–Ito', colors: ['#56B4E9', '#E69F00', '#009E73', '#F0E442'] });
  curated[5].push({ name: 'Okabe–Ito', source: 'Okabe–Ito', colors: ['#56B4E9', '#E69F00', '#009E73', '#F0E442', '#0072B2'] });
  curated[6].push({ name: 'Okabe–Ito', source: 'Okabe–Ito', colors: ['#56B4E9', '#E69F00', '#009E73', '#F0E442', '#0072B2', '#D55E00'] });
  curated[7].push({ name: 'Okabe–Ito', source: 'Okabe–Ito', colors: ['#56B4E9', '#E69F00', '#009E73', '#F0E442', '#0072B2', '#D55E00', '#CC79A7'] });
  curated[8].push({ name: 'Okabe–Ito', source: 'Okabe–Ito', colors: ['#56B4E9', '#E69F00', '#009E73', '#F0E442', '#0072B2', '#D55E00', '#CC79A7', '#000000'] });
  curated[9].push({ name: 'Okabe–Ito', source: 'Okabe–Ito', colors: ['#56B4E9', '#E69F00', '#009E73', '#F0E442', '#0072B2', '#D55E00', '#CC79A7', '#000000', '#8E44AD'] });
  curated[10].push({ name: 'Okabe–Ito', source: 'Okabe–Ito', colors: ['#56B4E9', '#E69F00', '#009E73', '#F0E442', '#0072B2', '#D55E00', '#CC79A7', '#000000', '#8E44AD', '#27AE60'] });
  curated[11].push({ name: 'Okabe–Ito', source: 'Okabe–Ito', colors: ['#56B4E9', '#E69F00', '#009E73', '#F0E442', '#0072B2', '#D55E00', '#CC79A7', '#000000', '#8E44AD', '#27AE60', '#C0392B'] });
  curated[12].push({ name: 'Okabe–Ito', source: 'Okabe–Ito', colors: ['#56B4E9', '#E69F00', '#009E73', '#F0E442', '#0072B2', '#D55E00', '#CC79A7', '#000000', '#8E44AD', '#27AE60', '#C0392B', '#D35400'] });
  curated[13].push({ name: 'Okabe–Ito', source: 'Okabe–Ito', colors: ['#56B4E9', '#E69F00', '#009E73', '#F0E442', '#0072B2', '#D55E00', '#CC79A7', '#000000', '#8E44AD', '#27AE60', '#C0392B', '#D35400', '#F39C12'] });
  curated[14].push({ name: 'Okabe–Ito', source: 'Okabe–Ito', colors: ['#56B4E9', '#E69F00', '#009E73', '#F0E442', '#0072B2', '#D55E00', '#CC79A7', '#000000', '#8E44AD', '#27AE60', '#C0392B', '#D35400', '#F39C12', '#E67E22'] });
  curated[15].push({ name: 'Okabe–Ito', source: 'Okabe–Ito', colors: ['#56B4E9', '#E69F00', '#009E73', '#F0E442', '#0072B2', '#D55E00', '#CC79A7', '#000000', '#8E44AD', '#27AE60', '#C0392B', '#D35400', '#F39C12', '#E67E22', '#D5A6BD'] });
  curated[16].push({ name: 'Okabe–Ito', source: 'Okabe–Ito', colors: ['#56B4E9', '#E69F00', '#009E73', '#F0E442', '#0072B2', '#D55E00', '#CC79A7', '#000000', '#8E44AD', '#27AE60', '#C0392B', '#D35400', '#F39C12', '#E67E22', '#D5A6BD', '#AED6F1'] });


  // 🎨 经典高级灰配色方案 (2-16色)
  // 经典系列
  curated[2].push({ name: '经典', source: 'ColorBrewer', colors: ['#005F73', '#0A9396'] });
  curated[3].push({ name: '经典', source: 'ColorBrewer', colors: ['#005F73', '#0A9396', '#94D2BD'] });
  curated[4].push({ name: '经典', source: 'ColorBrewer', colors: ['#005F73', '#0A9396', '#94D2BD', '#E9D8A6'] });
  curated[5].push({ name: '经典', source: 'ColorBrewer', colors: ['#005F73', '#0A9396', '#94D2BD', '#E9D8A6', '#EE9B00'] });
  curated[6].push({ name: '经典', source: 'ColorBrewer', colors: ['#005F73', '#0A9396', '#94D2BD', '#E9D8A6', '#EE9B00', '#CA6702'] });
  curated[7].push({ name: '经典', source: 'ColorBrewer', colors: ['#005F73', '#0A9396', '#94D2BD', '#E9D8A6', '#EE9B00', '#CA6702', '#BB3E03'] });
  curated[8].push({ name: '经典', source: 'ColorBrewer', colors: ['#005F73', '#0A9396', '#94D2BD', '#E9D8A6', '#EE9B00', '#CA6702', '#BB3E03', '#9B2226'] });
  curated[9].push({ name: '经典', source: 'ColorBrewer', colors: ['#005F73', '#0A9396', '#94D2BD', '#E9D8A6', '#EE9B00', '#CA6702', '#BB3E03', '#9B2226', '#001219'] });
  curated[10].push({ name: '经典', source: 'ColorBrewer', colors: ['#005F73', '#0A9396', '#94D2BD', '#E9D8A6', '#EE9B00', '#CA6702', '#BB3E03', '#9B2226', '#001219', '#005F73'] });
  curated[11].push({ name: '经典', source: 'ColorBrewer', colors: ['#005F73', '#0A9396', '#94D2BD', '#E9D8A6', '#EE9B00', '#CA6702', '#BB3E03', '#9B2226', '#001219', '#005F73', '#0A9396'] });
  curated[12].push({ name: '经典', source: 'ColorBrewer', colors: ['#005F73', '#0A9396', '#94D2BD', '#E9D8A6', '#EE9B00', '#CA6702', '#BB3E03', '#9B2226', '#001219', '#005F73', '#0A9396', '#94D2BD'] });
  curated[13].push({ name: '经典', source: 'ColorBrewer', colors: ['#005F73', '#0A9396', '#94D2BD', '#E9D8A6', '#EE9B00', '#CA6702', '#BB3E03', '#9B2226', '#001219', '#005F73', '#0A9396', '#94D2BD', '#E9D8A6'] });
  curated[14].push({ name: '经典', source: 'ColorBrewer', colors: ['#005F73', '#0A9396', '#94D2BD', '#E9D8A6', '#EE9B00', '#CA6702', '#BB3E03', '#9B2226', '#001219', '#005F73', '#0A9396', '#94D2BD', '#E9D8A6', '#EE9B00'] });
  curated[15].push({ name: '经典', source: 'ColorBrewer', colors: ['#005F73', '#0A9396', '#94D2BD', '#E9D8A6', '#EE9B00', '#CA6702', '#BB3E03', '#9B2226', '#001219', '#005F73', '#0A9396', '#94D2BD', '#E9D8A6', '#EE9B00', '#CA6702'] });
  curated[16].push({ name: '经典', source: 'ColorBrewer', colors: ['#005F73', '#0A9396', '#94D2BD', '#E9D8A6', '#EE9B00', '#CA6702', '#BB3E03', '#9B2226', '#001219', '#005F73', '#0A9396', '#94D2BD', '#E9D8A6', '#EE9B00', '#CA6702', '#BB3E03'] });

  // 🌈 业界权威配色方案 - ColorBrewer经典系列 (2-16色)
  // 互补系列
  curated[2].push({ name: '互补', source: 'ColorBrewer', colors: ['#a6cee3', '#1f78b4'] });
  curated[3].push({ name: '互补', source: 'ColorBrewer', colors: ['#a6cee3', '#1f78b4', '#b2df8a'] });
  curated[4].push({ name: '互补', source: 'ColorBrewer', colors: ['#a6cee3', '#1f78b4', '#b2df8a', '#33a02c'] });
  curated[5].push({ name: '互补', source: 'ColorBrewer', colors: ['#a6cee3', '#1f78b4', '#b2df8a', '#33a02c', '#fb9a99'] });
  curated[6].push({ name: '互补', source: 'ColorBrewer', colors: ['#a6cee3', '#1f78b4', '#b2df8a', '#33a02c', '#fb9a99', '#e31a1c'] });
  curated[7].push({ name: '互补', source: 'ColorBrewer', colors: ['#a6cee3', '#1f78b4', '#b2df8a', '#33a02c', '#fb9a99', '#e31a1c', '#fdbf6f'] });
  curated[8].push({ name: '互补', source: 'ColorBrewer', colors: ['#a6cee3', '#1f78b4', '#b2df8a', '#33a02c', '#fb9a99', '#e31a1c', '#fdbf6f', '#ff7f00'] });
  curated[9].push({ name: '互补', source: 'ColorBrewer', colors: ['#a6cee3', '#1f78b4', '#b2df8a', '#33a02c', '#fb9a99', '#e31a1c', '#fdbf6f', '#ff7f00', '#cab2d6'] });
  curated[10].push({ name: '互补', source: 'ColorBrewer', colors: ['#a6cee3', '#1f78b4', '#b2df8a', '#33a02c', '#fb9a99', '#e31a1c', '#fdbf6f', '#ff7f00', '#cab2d6', '#6a3d9a'] });
  curated[11].push({ name: '互补', source: 'ColorBrewer', colors: ['#a6cee3', '#1f78b4', '#b2df8a', '#33a02c', '#fb9a99', '#e31a1c', '#fdbf6f', '#ff7f00', '#cab2d6', '#6a3d9a', '#ffff99'] });
  curated[12].push({ name: '互补', source: 'ColorBrewer', colors: ['#a6cee3', '#1f78b4', '#b2df8a', '#33a02c', '#fb9a99', '#e31a1c', '#fdbf6f', '#ff7f00', '#cab2d6', '#6a3d9a', '#ffff99', '#b15928'] });
  curated[13].push({ name: '互补', source: 'ColorBrewer', colors: ['#a6cee3', '#1f78b4', '#b2df8a', '#33a02c', '#fb9a99', '#e31a1c', '#fdbf6f', '#ff7f00', '#cab2d6', '#6a3d9a', '#ffff99', '#b15928', '#e41a1c'] });
  curated[14].push({ name: '互补', source: 'ColorBrewer', colors: ['#a6cee3', '#1f78b4', '#b2df8a', '#33a02c', '#fb9a99', '#e31a1c', '#fdbf6f', '#ff7f00', '#cab2d6', '#6a3d9a', '#ffff99', '#b15928', '#e41a1c', '#377eb8'] });
  curated[15].push({ name: '互补', source: 'ColorBrewer', colors: ['#a6cee3', '#1f78b4', '#b2df8a', '#33a02c', '#fb9a99', '#e31a1c', '#fdbf6f', '#ff7f00', '#cab2d6', '#6a3d9a', '#ffff99', '#b15928', '#e41a1c', '#377eb8', '#4daf4a'] });
  curated[16].push({ name: '互补', source: 'ColorBrewer', colors: ['#a6cee3', '#1f78b4', '#b2df8a', '#33a02c', '#fb9a99', '#e31a1c', '#fdbf6f', '#ff7f00', '#cab2d6', '#6a3d9a', '#ffff99', '#b15928', '#e41a1c', '#377eb8', '#4daf4a', '#984ea3'] });

  // 柔和系列
  curated[2].push({ name: '柔和', source: 'ColorBrewer', colors: ['#8dd3c7', '#ffffb3'] });
  curated[3].push({ name: '柔和', source: 'ColorBrewer', colors: ['#8dd3c7', '#ffffb3', '#bebada'] });
  curated[4].push({ name: '柔和', source: 'ColorBrewer', colors: ['#8dd3c7', '#ffffb3', '#bebada', '#fb8072'] });
  curated[5].push({ name: '柔和', source: 'ColorBrewer', colors: ['#8dd3c7', '#ffffb3', '#bebada', '#fb8072', '#80b1d3'] });
  curated[6].push({ name: '柔和', source: 'ColorBrewer', colors: ['#8dd3c7', '#ffffb3', '#bebada', '#fb8072', '#80b1d3', '#fdb462'] });
  curated[7].push({ name: '柔和', source: 'ColorBrewer', colors: ['#8dd3c7', '#ffffb3', '#bebada', '#fb8072', '#80b1d3', '#fdb462', '#b3de69'] });
  curated[8].push({ name: '柔和', source: 'ColorBrewer', colors: ['#8dd3c7', '#ffffb3', '#bebada', '#fb8072', '#80b1d3', '#fdb462', '#b3de69', '#fccde5'] });
  curated[9].push({ name: '柔和', source: 'ColorBrewer', colors: ['#8dd3c7', '#ffffb3', '#bebada', '#fb8072', '#80b1d3', '#fdb462', '#b3de69', '#fccde5', '#d9d9d9'] });
  curated[10].push({ name: '柔和', source: 'ColorBrewer', colors: ['#8dd3c7', '#ffffb3', '#bebada', '#fb8072', '#80b1d3', '#fdb462', '#b3de69', '#fccde5', '#d9d9d9', '#bc80bd'] });
  curated[11].push({ name: '柔和', source: 'ColorBrewer', colors: ['#8dd3c7', '#ffffb3', '#bebada', '#fb8072', '#80b1d3', '#fdb462', '#b3de69', '#fccde5', '#d9d9d9', '#bc80bd', '#ccebc5'] });
  curated[12].push({ name: '柔和', source: 'ColorBrewer', colors: ['#8dd3c7', '#ffffb3', '#bebada', '#fb8072', '#80b1d3', '#fdb462', '#b3de69', '#fccde5', '#d9d9d9', '#bc80bd', '#ccebc5', '#ffed6f'] });
  curated[13].push({ name: '柔和', source: 'ColorBrewer', colors: ['#8dd3c7', '#ffffb3', '#bebada', '#fb8072', '#80b1d3', '#fdb462', '#b3de69', '#fccde5', '#d9d9d9', '#bc80bd', '#ccebc5', '#ffed6f', '#e41a1c'] });
  curated[14].push({ name: '柔和', source: 'ColorBrewer', colors: ['#8dd3c7', '#ffffb3', '#bebada', '#fb8072', '#80b1d3', '#fdb462', '#b3de69', '#fccde5', '#d9d9d9', '#bc80bd', '#ccebc5', '#ffed6f', '#e41a1c', '#377eb8'] });
  curated[15].push({ name: '柔和', source: 'ColorBrewer', colors: ['#8dd3c7', '#ffffb3', '#bebada', '#fb8072', '#80b1d3', '#fdb462', '#b3de69', '#fccde5', '#d9d9d9', '#bc80bd', '#ccebc5', '#ffed6f', '#e41a1c', '#377eb8', '#4daf4a'] });
  curated[16].push({ name: '柔和', source: 'ColorBrewer', colors: ['#8dd3c7', '#ffffb3', '#bebada', '#fb8072', '#80b1d3', '#fdb462', '#b3de69', '#fccde5', '#d9d9d9', '#bc80bd', '#ccebc5', '#ffed6f', '#e41a1c', '#377eb8', '#4daf4a', '#984ea3'] });

  // 深调系列
  curated[2].push({ name: '深调', source: 'ColorBrewer', colors: ['#1b9e77', '#d95f02'] });
  curated[3].push({ name: '深调', source: 'ColorBrewer', colors: ['#1b9e77', '#d95f02', '#7570b3'] });
  curated[4].push({ name: '深调', source: 'ColorBrewer', colors: ['#1b9e77', '#d95f02', '#7570b3', '#e7298a'] });
  curated[5].push({ name: '深调', source: 'ColorBrewer', colors: ['#1b9e77', '#d95f02', '#7570b3', '#e7298a', '#66a61e'] });
  curated[6].push({ name: '深调', source: 'ColorBrewer', colors: ['#1b9e77', '#d95f02', '#7570b3', '#e7298a', '#66a61e', '#e6ab02'] });
  curated[7].push({ name: '深调', source: 'ColorBrewer', colors: ['#1b9e77', '#d95f02', '#7570b3', '#e7298a', '#66a61e', '#e6ab02', '#a6761d'] });
  curated[8].push({ name: '深调', source: 'ColorBrewer', colors: ['#1b9e77', '#d95f02', '#7570b3', '#e7298a', '#66a61e', '#e6ab02', '#a6761d', '#666666'] });
  curated[9].push({ name: '深调', source: 'ColorBrewer', colors: ['#1b9e77', '#d95f02', '#7570b3', '#e7298a', '#66a61e', '#e6ab02', '#a6761d', '#666666', '#8B4513'] });
  curated[10].push({ name: '深调', source: 'ColorBrewer', colors: ['#1b9e77', '#d95f02', '#7570b3', '#e7298a', '#66a61e', '#e6ab02', '#a6761d', '#666666', '#8B4513', '#CD853F'] });
  curated[11].push({ name: '深调', source: 'ColorBrewer', colors: ['#1b9e77', '#d95f02', '#7570b3', '#e7298a', '#66a61e', '#e6ab02', '#a6761d', '#666666', '#8B4513', '#CD853F', '#DAA520'] });
  curated[12].push({ name: '深调', source: 'ColorBrewer', colors: ['#1b9e77', '#d95f02', '#7570b3', '#e7298a', '#66a61e', '#e6ab02', '#a6761d', '#666666', '#8B4513', '#CD853F', '#DAA520', '#B8860B'] });
  curated[13].push({ name: '深调', source: 'ColorBrewer', colors: ['#1b9e77', '#d95f02', '#7570b3', '#e7298a', '#66a61e', '#e6ab02', '#a6761d', '#666666', '#8B4513', '#CD853F', '#DAA520', '#B8860B', '#A0522D'] });
  curated[14].push({ name: '深调', source: 'ColorBrewer', colors: ['#1b9e77', '#d95f02', '#7570b3', '#e7298a', '#66a61e', '#e6ab02', '#a6761d', '#666666', '#8B4513', '#CD853F', '#DAA520', '#B8860B', '#A0522D', '#DEB887'] });
  curated[15].push({ name: '深调', source: 'ColorBrewer', colors: ['#1b9e77', '#d95f02', '#7570b3', '#e7298a', '#66a61e', '#e6ab02', '#a6761d', '#666666', '#8B4513', '#CD853F', '#DAA520', '#B8860B', '#A0522D', '#DEB887', '#F4A460'] });
  curated[16].push({ name: '深调', source: 'ColorBrewer', colors: ['#1b9e77', '#d95f02', '#7570b3', '#e7298a', '#66a61e', '#e6ab02', '#a6761d', '#666666', '#8B4513', '#CD853F', '#DAA520', '#B8860B', '#A0522D', '#DEB887', '#F4A460', '#D2691E'] });

  // 🌿 自然灵感配色方案 (2-16色)
  // Nature 柔和系列
  curated[2].push({ name: 'Nature 柔和', source: 'Nature', colors: ['#1D3557', '#457B9D'] });
  curated[3].push({ name: 'Nature 柔和', source: 'Nature', colors: ['#1D3557', '#457B9D', '#A8DADC'] });
  curated[4].push({ name: 'Nature 柔和', source: 'Nature', colors: ['#1D3557', '#457B9D', '#A8DADC', '#2A9D8F'] });
  curated[5].push({ name: 'Nature 柔和', source: 'Nature', colors: ['#1D3557', '#457B9D', '#A8DADC', '#2A9D8F', '#264653'] });
  curated[6].push({ name: 'Nature 柔和', source: 'Nature', colors: ['#1D3557', '#457B9D', '#A8DADC', '#2A9D8F', '#264653', '#E9C46A'] });
  curated[7].push({ name: 'Nature 柔和', source: 'Nature', colors: ['#1D3557', '#457B9D', '#A8DADC', '#2A9D8F', '#264653', '#E9C46A', '#F4A261'] });
  curated[8].push({ name: 'Nature 柔和', source: 'Nature', colors: ['#1D3557', '#457B9D', '#A8DADC', '#2A9D8F', '#264653', '#E9C46A', '#F4A261', '#E76F51'] });
  curated[9].push({ name: 'Nature 柔和', source: 'Nature', colors: ['#1D3557', '#457B9D', '#A8DADC', '#2A9D8F', '#264653', '#E9C46A', '#F4A261', '#E76F51', '#D62828'] });
  curated[10].push({ name: 'Nature 柔和', source: 'Nature', colors: ['#1D3557', '#457B9D', '#A8DADC', '#2A9D8F', '#264653', '#E9C46A', '#F4A261', '#E76F51', '#D62828', '#003049'] });
  curated[11].push({ name: 'Nature 柔和', source: 'Nature', colors: ['#1D3557', '#457B9D', '#A8DADC', '#2A9D8F', '#264653', '#E9C46A', '#F4A261', '#E76F51', '#D62828', '#003049', '#1B998B'] });
  curated[12].push({ name: 'Nature 柔和', source: 'Nature', colors: ['#1D3557', '#457B9D', '#A8DADC', '#2A9D8F', '#264653', '#E9C46A', '#F4A261', '#E76F51', '#D62828', '#003049', '#1B998B', '#386641'] });
  curated[13].push({ name: 'Nature 柔和', source: 'Nature', colors: ['#1D3557', '#457B9D', '#A8DADC', '#2A9D8F', '#264653', '#E9C46A', '#F4A261', '#E76F51', '#D62828', '#003049', '#1B998B', '#386641', '#6A994E'] });
  curated[14].push({ name: 'Nature 柔和', source: 'Nature', colors: ['#1D3557', '#457B9D', '#A8DADC', '#2A9D8F', '#264653', '#E9C46A', '#F4A261', '#E76F51', '#D62828', '#003049', '#1B998B', '#386641', '#6A994E', '#A7C957'] });
  curated[15].push({ name: 'Nature 柔和', source: 'Nature', colors: ['#1D3557', '#457B9D', '#A8DADC', '#2A9D8F', '#264653', '#E9C46A', '#F4A261', '#E76F51', '#D62828', '#003049', '#1B998B', '#386641', '#6A994E', '#A7C957', '#F2E8CF'] });
  curated[16].push({ name: 'Nature 柔和', source: 'Nature', colors: ['#1D3557', '#457B9D', '#A8DADC', '#2A9D8F', '#264653', '#E9C46A', '#F4A261', '#E76F51', '#D62828', '#003049', '#1B998B', '#386641', '#6A994E', '#A7C957', '#F2E8CF', '#BC4749'] });

  // Nature 深沉系列
  curated[2].push({ name: 'Nature 深沉', source: 'Nature', colors: ['#003049', '#1D3557'] });
  curated[3].push({ name: 'Nature 深沉', source: 'Nature', colors: ['#003049', '#1D3557', '#2A4D8F'] });
  curated[4].push({ name: 'Nature 深沉', source: 'Nature', colors: ['#003049', '#1D3557', '#2A4D8F', '#176087'] });
  curated[5].push({ name: 'Nature 深沉', source: 'Nature', colors: ['#003049', '#1D3557', '#2A4D8F', '#176087', '#1B998B'] });
  curated[6].push({ name: 'Nature 深沉', source: 'Nature', colors: ['#003049', '#1D3557', '#2A4D8F', '#176087', '#1B998B', '#2A9D8F'] });
  curated[7].push({ name: 'Nature 深沉', source: 'Nature', colors: ['#003049', '#1D3557', '#2A4D8F', '#176087', '#1B998B', '#2A9D8F', '#386641'] });
  curated[8].push({ name: 'Nature 深沉', source: 'Nature', colors: ['#003049', '#1D3557', '#2A4D8F', '#176087', '#1B998B', '#2A9D8F', '#386641', '#6A994E'] });
  curated[9].push({ name: 'Nature 深沉', source: 'Nature', colors: ['#003049', '#1D3557', '#2A4D8F', '#176087', '#1B998B', '#2A9D8F', '#386641', '#6A994E', '#A7C957'] });
  curated[10].push({ name: 'Nature 深沉', source: 'Nature', colors: ['#003049', '#1D3557', '#2A4D8F', '#176087', '#1B998B', '#2A9D8F', '#386641', '#6A994E', '#A7C957', '#D4A373'] });
  curated[11].push({ name: 'Nature 深沉', source: 'Nature', colors: ['#003049', '#1D3557', '#2A4D8F', '#176087', '#1B998B', '#2A9D8F', '#386641', '#6A994E', '#A7C957', '#D4A373', '#B08968'] });
  curated[12].push({ name: 'Nature 深沉', source: 'Nature', colors: ['#003049', '#1D3557', '#2A4D8F', '#176087', '#1B998B', '#2A9D8F', '#386641', '#6A994E', '#A7C957', '#D4A373', '#B08968', '#A44A3F'] });
  curated[13].push({ name: 'Nature 深沉', source: 'Nature', colors: ['#003049', '#1D3557', '#2A4D8F', '#176087', '#1B998B', '#2A9D8F', '#386641', '#6A994E', '#A7C957', '#D4A373', '#B08968', '#A44A3F', '#781F19'] });
  curated[14].push({ name: 'Nature 深沉', source: 'Nature', colors: ['#003049', '#1D3557', '#2A4D8F', '#176087', '#1B998B', '#2A9D8F', '#386641', '#6A994E', '#A7C957', '#D4A373', '#B08968', '#A44A3F', '#781F19', '#E09F3E'] });
  curated[15].push({ name: 'Nature 深沉', source: 'Nature', colors: ['#003049', '#1D3557', '#2A4D8F', '#176087', '#1B998B', '#2A9D8F', '#386641', '#6A994E', '#A7C957', '#D4A373', '#B08968', '#A44A3F', '#781F19', '#E09F3E', '#9D0208'] });
  curated[16].push({ name: 'Nature 深沉', source: 'Nature', colors: ['#003049', '#1D3557', '#2A4D8F', '#176087', '#1B998B', '#2A9D8F', '#386641', '#6A994E', '#A7C957', '#D4A373', '#B08968', '#A44A3F', '#781F19', '#E09F3E', '#9D0208', '#AE2012'] });

  // 📊 科研专业配色方案 (2-16色)
  // Science 系列
  curated[2].push({ name: 'Science ', source: 'Science', colors: ['#4C78A8', '#F58518'] });
  curated[3].push({ name: 'Science ', source: 'Science', colors: ['#4C78A8', '#F58518', '#E45756'] });
  curated[4].push({ name: 'Science ', source: 'Science', colors: ['#4C78A8', '#F58518', '#E45756', '#72B7B2'] });
  curated[5].push({ name: 'Science ', source: 'Science', colors: ['#4C78A8', '#F58518', '#E45756', '#72B7B2', '#54A24B'] });
  curated[6].push({ name: 'Science ', source: 'Science', colors: ['#4C78A8', '#F58518', '#E45756', '#72B7B2', '#54A24B', '#EECA3B'] });
  curated[7].push({ name: 'Science ', source: 'Science', colors: ['#4C78A8', '#F58518', '#E45756', '#72B7B2', '#54A24B', '#EECA3B', '#B279A2'] });
  curated[8].push({ name: 'Science ', source: 'Science', colors: ['#4C78A8', '#F58518', '#E45756', '#72B7B2', '#54A24B', '#EECA3B', '#B279A2', '#FF9DA6'] });

  // 🎨 科研莫兰迪配色方案 (2-16色)
  // 莫兰迪系列 - 基于中国传统色彩的高级灰调，适合科研图表
  // 甘草 | 排折門 | 东市韵紫
  curated[2].push({ name: '莫兰迪', source: 'Morandi', colors: ['#AC9A5A', '#B48E56'] });
  curated[3].push({ name: '莫兰迪', source: 'Morandi', colors: ['#AC9A5A', '#B48E56', '#53547D'] });
  curated[4].push({ name: '莫兰迪', source: 'Morandi', colors: ['#AC9A5A', '#B48E56', '#53547D', '#A390A2'] });
  curated[5].push({ name: '莫兰迪', source: 'Morandi', colors: ['#AC9A5A', '#B48E56', '#53547D', '#A390A2', '#805C49'] });
  curated[6].push({ name: '莫兰迪', source: 'Morandi', colors: ['#AC9A5A', '#B48E56', '#53547D', '#A390A2', '#805C49', '#6B544A'] });
  curated[7].push({ name: '莫兰迪', source: 'Morandi', colors: ['#AC9A5A', '#B48E56', '#53547D', '#A390A2', '#805C49', '#6B544A', '#635E68'] });
  curated[8].push({ name: '莫兰迪', source: 'Morandi', colors: ['#AC9A5A', '#B48E56', '#53547D', '#A390A2', '#805C49', '#6B544A', '#635E68', '#DFD8D0'] });
  curated[9].push({ name: '莫兰迪', source: 'Morandi', colors: ['#AC9A5A', '#B48E56', '#53547D', '#A390A2', '#805C49', '#6B544A', '#635E68', '#DFD8D0', '#5A5247'] });
  curated[10].push({ name: '莫兰迪', source: 'Morandi', colors: ['#AC9A5A', '#B48E56', '#53547D', '#A390A2', '#805C49', '#6B544A', '#635E68', '#DFD8D0', '#5A5247', '#BEB79F'] });
  curated[11].push({ name: '莫兰迪', source: 'Morandi', colors: ['#AC9A5A', '#B48E56', '#53547D', '#A390A2', '#805C49', '#6B544A', '#635E68', '#DFD8D0', '#5A5247', '#BEB79F', '#A98568'] });
  curated[12].push({ name: '莫兰迪', source: 'Morandi', colors: ['#AC9A5A', '#B48E56', '#53547D', '#A390A2', '#805C49', '#6B544A', '#635E68', '#DFD8D0', '#5A5247', '#BEB79F', '#A98568', '#544E4D'] });
  curated[13].push({ name: '莫兰迪', source: 'Morandi', colors: ['#AC9A5A', '#B48E56', '#53547D', '#A390A2', '#805C49', '#6B544A', '#635E68', '#DFD8D0', '#5A5247', '#BEB79F', '#A98568', '#544E4D', '#9C816E'] });
  curated[14].push({ name: '莫兰迪', source: 'Morandi', colors: ['#AC9A5A', '#B48E56', '#53547D', '#A390A2', '#805C49', '#6B544A', '#635E68', '#DFD8D0', '#5A5247', '#BEB79F', '#A98568', '#544E4D', '#9C816E', '#F3EFD8'] });
  curated[15].push({ name: '莫兰迪', source: 'Morandi', colors: ['#AC9A5A', '#B48E56', '#53547D', '#A390A2', '#805C49', '#6B544A', '#635E68', '#DFD8D0', '#5A5247', '#BEB79F', '#A98568', '#544E4D', '#9C816E', '#F3EFD8', '#7A6772'] });
  curated[16].push({ name: '莫兰迪', source: 'Morandi', colors: ['#AC9A5A', '#B48E56', '#53547D', '#A390A2', '#805C49', '#6B544A', '#635E68', '#DFD8D0', '#5A5247', '#BEB79F', '#A98568', '#544E4D', '#9C816E', '#F3EFD8', '#7A6772', '#5C5C54'] });
  curated[9].push({ name: 'Science ', source: 'Science', colors: ['#4C78A8', '#F58518', '#E45756', '#72B7B2', '#54A24B', '#EECA3B', '#B279A2', '#FF9DA6', '#9D755D'] });
  curated[10].push({ name: 'Science ', source: 'Science', colors: ['#4C78A8', '#F58518', '#E45756', '#72B7B2', '#54A24B', '#EECA3B', '#B279A2', '#FF9DA6', '#9D755D', '#BAB0AC'] });
  curated[11].push({ name: 'Science ', source: 'Science', colors: ['#4C78A8', '#F58518', '#E45756', '#72B7B2', '#54A24B', '#EECA3B', '#B279A2', '#FF9DA6', '#9D755D', '#BAB0AC', '#D37295'] });
  curated[12].push({ name: 'Science ', source: 'Science', colors: ['#4C78A8', '#F58518', '#E45756', '#72B7B2', '#54A24B', '#EECA3B', '#B279A2', '#FF9DA6', '#9D755D', '#BAB0AC', '#D37295', '#F15A60'] });
  curated[13].push({ name: 'Science ', source: 'Science', colors: ['#4C78A8', '#F58518', '#E45756', '#72B7B2', '#54A24B', '#EECA3B', '#B279A2', '#FF9DA6', '#9D755D', '#BAB0AC', '#D37295', '#F15A60', '#E69F00'] });
  curated[14].push({ name: 'Science ', source: 'Science', colors: ['#4C78A8', '#F58518', '#E45756', '#72B7B2', '#54A24B', '#EECA3B', '#B279A2', '#FF9DA6', '#9D755D', '#BAB0AC', '#D37295', '#F15A60', '#E69F00', '#07B5AF'] });
  curated[15].push({ name: 'Science ', source: 'Science', colors: ['#4C78A8', '#F58518', '#E45756', '#72B7B2', '#54A24B', '#EECA3B', '#B279A2', '#FF9DA6', '#9D755D', '#BAB0AC', '#D37295', '#F15A60', '#E69F00', '#07B5AF', '#7B2B83'] });
  curated[16].push({ name: 'Science ', source: 'Science', colors: ['#4C78A8', '#F58518', '#E45756', '#72B7B2', '#54A24B', '#EECA3B', '#B279A2', '#FF9DA6', '#9D755D', '#BAB0AC', '#D37295', '#F15A60', '#E69F00', '#07B5AF', '#7B2B83', '#BCBD22'] });

  // 🔬 生物荧光配色方案 (2-16色)
  // Cell 荧光系列
  curated[2].push({ name: 'Cell 荧光', source: 'Cell', colors: ['#2ECC71', '#27AE60'] });
  curated[3].push({ name: 'Cell 荧光', source: 'Cell', colors: ['#2ECC71', '#27AE60', '#1ABC9C'] });
  curated[4].push({ name: 'Cell 荧光', source: 'Cell', colors: ['#2ECC71', '#27AE60', '#1ABC9C', '#00B894'] });
  curated[5].push({ name: 'Cell 荧光', source: 'Cell', colors: ['#2ECC71', '#27AE60', '#1ABC9C', '#00B894', '#3498DB'] });
  curated[6].push({ name: 'Cell 荧光', source: 'Cell', colors: ['#2ECC71', '#27AE60', '#1ABC9C', '#00B894', '#3498DB', '#2980B9'] });
  curated[7].push({ name: 'Cell 荧光', source: 'Cell', colors: ['#2ECC71', '#27AE60', '#1ABC9C', '#00B894', '#3498DB', '#2980B9', '#9B59B6'] });
  curated[8].push({ name: 'Cell 荧光', source: 'Cell', colors: ['#2ECC71', '#27AE60', '#1ABC9C', '#00B894', '#3498DB', '#2980B9', '#9B59B6', '#8E44AD'] });
  curated[9].push({ name: 'Cell 荧光', source: 'Cell', colors: ['#2ECC71', '#27AE60', '#1ABC9C', '#00B894', '#3498DB', '#2980B9', '#9B59B6', '#8E44AD', '#E74C3C'] });
  curated[10].push({ name: 'Cell 荧光', source: 'Cell', colors: ['#2ECC71', '#27AE60', '#1ABC9C', '#00B894', '#3498DB', '#2980B9', '#9B59B6', '#8E44AD', '#E74C3C', '#C0392B'] });
  curated[11].push({ name: 'Cell 荧光', source: 'Cell', colors: ['#2ECC71', '#27AE60', '#1ABC9C', '#00B894', '#3498DB', '#2980B9', '#9B59B6', '#8E44AD', '#E74C3C', '#C0392B', '#F39C12'] });
  curated[12].push({ name: 'Cell 荧光', source: 'Cell', colors: ['#2ECC71', '#27AE60', '#1ABC9C', '#00B894', '#3498DB', '#2980B9', '#9B59B6', '#8E44AD', '#E74C3C', '#C0392B', '#F39C12', '#D35400'] });
  curated[13].push({ name: 'Cell 荧光', source: 'Cell', colors: ['#2ECC71', '#27AE60', '#1ABC9C', '#00B894', '#3498DB', '#2980B9', '#9B59B6', '#8E44AD', '#E74C3C', '#C0392B', '#F39C12', '#D35400', '#F1C40F'] });
  curated[14].push({ name: 'Cell 荧光', source: 'Cell', colors: ['#2ECC71', '#27AE60', '#1ABC9C', '#00B894', '#3498DB', '#2980B9', '#9B59B6', '#8E44AD', '#E74C3C', '#C0392B', '#F39C12', '#D35400', '#F1C40F', '#E67E22'] });
  curated[15].push({ name: 'Cell 荧光', source: 'Cell', colors: ['#2ECC71', '#27AE60', '#1ABC9C', '#00B894', '#3498DB', '#2980B9', '#9B59B6', '#8E44AD', '#E74C3C', '#C0392B', '#F39C12', '#D35400', '#F1C40F', '#E67E22', '#D5A6BD'] });
  curated[16].push({ name: 'Cell 荧光', source: 'Cell', colors: ['#2ECC71', '#27AE60', '#1ABC9C', '#00B894', '#3498DB', '#2980B9', '#9B59B6', '#8E44AD', '#E74C3C', '#C0392B', '#F39C12', '#D35400', '#F1C40F', '#E67E22', '#D5A6BD', '#AED6F1'] });

  // 📖 封面配图配色方案 - 基于期刊封面图片自动提取
  const coverPalettes = ensureGroup();

  // 封面故事数据结构
  const COVER_STORIES = {
    nature: [
      {
        id: '001',
        title: '《Nature》封面故事：科研智能',
        subtitle: '人工智能如何改变科研？',
        description: '从数据蒸馏到蛋白质结构解析，人工智能（AI）正在快速触及科研的方方面面。本期《自然》将关注为何研究人员对这项快速发展的技术兴奋不已——并探讨AI生成虚假信息的风险。',
        date: '2023 年 9 月 28 日刊',
        imagePath: '/assets/cover/Nature/001/001.png', // 相对于网站根目录的路径
        category: 'Nature',
        colors: [] // 将通过图片提取填充
      },
      {
        id: '002',
        title: '《Nature》封面故事：偏离目标',
        subtitle: '如何在2030年之前实现SDGs？',
        description: '2015年9月，193个国家共同承诺将努力实现17项旨在改善世界人民生活的目标。从消除贫困到减少饥饿，再到应对全球变暖和保护生物多样性，可持续发展目标（Sustainable Development Goals）自此在企业计划和政府政策中占有一席之地。但如今，距离2030年实现这些宏伟目标的时限已经过半，而要做的还有很多。在本期特刊中，《自然》回顾了我们已经取得的进展，并探讨了我们离这些全球目标还有多远。',
        date: '2023 年 9 月 14 日刊',
        imagePath: '/assets/cover/Nature/002/002.png',
        category: 'Nature',
        colors: []
      },
      {
        id: '003',
        title: '《Nature》封面故事：饿死肿瘤',
        subtitle: '饮食强化的多胺耗竭可重编程神经母细胞瘤',
        description: '神经母细胞瘤是一种高度致命的儿童肿瘤，起源于外周神经系统，肿瘤生长依赖多胺的生物合成。一种名为二氟甲基鸟氨酸的药物于2023年末获批，可通过抑制多胺生物合成来帮助治疗神经母细胞瘤。在本期《自然》中，研究者深入探究了这一药物的作用。研究发现，无脯氨酸与精氨酸的饮食能减少多胺合成所需的前体鸟氨酸的数量。这进一步增强了二氟甲基鸟氨酸耗竭多胺的效果，重编程肿瘤生长，并改善了小鼠生存率。',
        date: '2025 年 10 月 16 日刊',
        imagePath: '/assets/cover/Nature/003/003.png',
        category: 'Nature',
        colors: []
      },
      {
        id: '004',
        title: '《Nature》封面故事：DeepSeek-R1的科学',
        subtitle: 'DeepSeek-R1通过强化学习激励大语言模型进行推理',
        description: '大语言模型如果能被训练成在解答过程中设定步骤，就能更好地解决问题。这种“推理”过程类似于人类解决复杂问题的方法，但对人工智能非常困难，需要人类干预来添加标签和注释。在本期《自然》中，DeepSeek 的研究者揭示了他们如何训练模型不仅能以这种方式推理，而且尽量减少人为干预。DeepSeek-R1模型通过强化学习进行训练，当其成功解决数学题时会获得高分奖励，而出错则会受到惩罚。由此，它逐渐学会了推理的重要性——通过分步分析和展示思考过程，更容易得到正确答案。这一机制使DeepSeek-R1具备自我检验与反思的能力，能在输出最终结果前评估自身推理，从而显著提升其在编程任务及研究生层次科学问题中的表现。',
        date: '2025 年 9 月 18 日刊',
        imagePath: '/assets/cover/Nature/004/004.png',
        category: 'Nature',
        colors: []
      },
      {
        id: '005',
        title: '《Nature》封面故事：超粘水凝胶',
        subtitle: '数据驱动设计：AI创造防水超粘合材料',
        description: '研究人员通过数据驱动设计方法，利用人工智能创造了一种新型防水超粘合水凝胶材料。这种名为R1-max的水凝胶具有卓越的粘附性能，即使在潮湿环境下也能保持强大的粘合力。研究团队通过机器学习算法筛选了数千种可能的材料组合，最终确定了这种具有突破性能的水凝胶配方。该材料在医疗修复、水下工程和生物传感器等领域具有广阔的应用前景。',
        date: '2025 年 8 月 7 日刊',
        imagePath: '/assets/cover/Nature/005/005.png',
        category: 'Nature',
        colors: []
      },
      {
        id: '006',
        title: '《Nature》封面故事：按图索"疾"',
        subtitle: '人类病原体在古代欧亚大陆的时空分布',
        description: '通过分析古代DNA样本，研究人员绘制了人类病原体在古代欧亚大陆的时空分布图。这项研究揭示了数千年来人类迁徙与疾病传播之间的复杂关系，帮助我们理解历史上重大流行病的起源和传播路径。研究发现，许多现代病原体的古代变种在青铜时代就已经存在，并且随着人类迁徙路线不断扩散。这一发现对现代流行病学研究和未来疾病防控策略具有重要意义。',
        date: '2025 年 7 月 24 日刊',
        imagePath: '/assets/cover/Nature/006/006.png',
        category: 'Nature',
        colors: []
      },
      {
        id: '007',
        title: '《Nature》封面故事：空间免疫评分系统预测肝癌复发',
        subtitle: '空间免疫评分系统可预测肝细胞癌复发',
        description: '组成肿瘤微环境的细胞和血管会形成复杂的生态系统，这会强烈影响肿瘤如何形成、生长，以及对治疗的反应。肿瘤微环境的各种特征，如免疫细胞的分布和位置，能用来预测疾病预后。在本期《自然》杂志中，孙成及其团队提出了一种基于影像的新评分方法，用于预测肝癌术后复发的可能性。研究集中在复发率较高的肝细胞癌，这也是最常见的肝癌类型。团队发现，免疫细胞——特别是自然杀伤细胞——的空间分布，以及这些细胞所表达的五种基因，与手术预后的改善密切相关。基于这一发现，研究人员开发了肿瘤免疫微环境空间（TIMES）评分系统，该系统利用人工智能进行空间分析，通过这些基因在微环境中的位置来预测肝癌复发的风险。',
        date: '2025 年 4 月 24 日刊',
        imagePath: '/assets/cover/Nature/007/007.png',
        category: 'Nature',
        colors: []
      },
      {
        id: '008',
        title: '《Nature》封面故事：潮流事件',
        subtitle: '宽刈幅卫星测高揭示全球亚中尺度海洋动力学',
        description: '被称为涡旋的海洋环流对海洋动力学有重大影响，从热循环到营养流动，一切都因其而变。中尺度涡旋（直径约100-300 km）得到了比较深入的研究，但较小的亚中尺度（10-100 km）涡旋在全球尺度上更难观察与评估。在本期《自然》杂志中，Matthew Archer及其团队展示了"地表水与海洋地形卫星"（SWOT）的研究成果，这一突破性进展以前所未有的细节揭示了海洋动力学。SWOT卫星通过二维刈幅技术绘制海洋表面特征（如封面艺术再现图），其分辨率为1至10公里，不仅能够测量亚中尺度涡旋，还能捕捉到非线性内波——这些波动发生在海洋内部的密度面，并在混合过程中发挥重要作用。研究表明，这些亚中尺度活动的振幅可能远超预期，因此对整体海洋环流的影响也可能比以往预估的更为显著。',
        date: '2025 年 4 月 17 日刊',
        imagePath: '/assets/cover/Nature/008/008.png',
        category: 'Nature',
        colors: []
      },
      {
        id: '009',
        title: '《Nature》封面故事：识食物',
        subtitle: '茄属泛遗传学揭示农作物改造中不可预测的旁系同源',
        description: '作物基因组学正在快速脱离单一参考基因组，转向覆盖物种遗传多样性的基因组集合。这些"泛基因组"使人们有机会在同一物种个体或变异与其近亲间比较和探究性状。在本期《自然》杂志中，Michael Schatz、Joyce Van Eck、Jesse Gillis、Zachary Lippman及其团队扩展了这一概念，提出了涵盖整个茄属（Solanum）的泛基因组，茄属包括全球重要作物如番茄和土豆，也涵盖了本地作物如红茄（见封面）和奎东茄等。研究发现，茄属的各个物种之间仅共享大约60%的基因，同时基因重复的快速演化也突显了将某一作物的研究成果应用于另一作物的挑战。研究人员认为，深入了解茄属的基因组学，尤其是对于较少研究的本地物种，将有助于使主要作物与孤儿作物的育种策略更加可预测，从而提升育种的成功率。',
        date: '2025 年 4 月 3 日刊',
        imagePath: '/assets/cover/Nature/009/009.png',
        category: 'Nature',
        colors: []
      },
      {
        id: '010',
        title: '《Nature》封面故事：几星好评？',
        subtitle: '二分法量表减少消费者种族歧视及收入不平等',
        description: '今时今日，几乎任何在线业务结束后，都会请你对体验做出评价。但如果业务涉及人力——从评价教师到修漏水的管道工——这类表现评价系统也会导致另一个问题：种族歧视。在本期《自然》中，Tristan Botelho、Katherine DeCelles和同事表明，通过改用两星即好评或差评的评分体系，标准五星评价量表中的固有偏见很容易得到抑制。该团队研究了一个提供家居维护工作的在线平台的历史评分数据，该平台已从五星改为两星评分系统。在这一改变前，白人工作者与有色人种工作者的表现评分存在种族差异，这种差异也反映在了收入中。在改为两星评分系统后，两者的表现评分和收入差距几乎消失了。更多实验显示，将评分系统问题改为明确的好/不好，能消除消费者评价中的偏见。',
        date: '2025 年 3 月 13 日刊',
        imagePath: '/assets/cover/Nature/010/010.png',
        category: 'Nature',
        colors: []
      },
      {
        id: 'Science-001',
        title: '《Science》封面故事：BioEmu助力蛋白质功能预测',
        subtitle: '深度学习系统揭示蛋白质动态变化，快速生成多样化构象',
        description: '蛋白质的功能预测不仅依赖于其序列和结构，还需要理解其动态运动。然而，探索这些运动的可扩展方法一直缺乏。本期《Science》介绍了BioEmu，一个深度学习系统，能够快速生成多样化的蛋白质构象，为蛋白质的柔性和功能提供快速、准确的洞察。图中展示了通过BioEmu采样的环二磷酸腺苷受体模块的蛋白质结构重叠图，展现了其在动态环境下的变化。该技术将为生物分子研究提供强有力的支持。',
        date: '2025年8月14日刊',
        imagePath: '/assets/cover/Science/001/001.jpg',
        category: 'Science',
        colors: []
      }

    ],
    science: [
      // Science 封面故事将在有数据时添加
    ]
  };

  // 图片颜色提取功能
  function extractColorsFromImage(imagePath, callback) {
    const img = new Image();
    // 本地文件不需要crossOrigin
    if (!imagePath.startsWith('http')) {
      // 本地文件，不使用crossOrigin
    } else {
      img.crossOrigin = 'anonymous';
    }

    img.onload = function () {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      // 设置画布尺寸
      canvas.width = img.width || 300; // 提供默认值
      canvas.height = img.height || 200;

      // 绘制图片
      ctx.drawImage(img, 0, 0);

      try {
        // 获取图片数据
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;

        // 颜色统计
        const colorMap = new Map();
        const step = 4; // 采样步长，提高性能

        for (let i = 0; i < data.length; i += step * 4) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];
          const a = data[i + 3];

          // 跳过透明像素
          if (a < 128) continue;

          // 颜色量化，减少相似颜色
          const qr = Math.round(r / 32) * 32;
          const qg = Math.round(g / 32) * 32;
          const qb = Math.round(b / 32) * 32;

          const colorKey = `${qr},${qg},${qb}`;
          colorMap.set(colorKey, (colorMap.get(colorKey) || 0) + 1);
        }

        // 排序并提取主要颜色
        const sortedColors = Array.from(colorMap.entries())
          .sort((a, b) => b[1] - a[1])
          .slice(0, 16)
          .map(([color]) => {
            const [r, g, b] = color.split(',').map(Number);
            return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
          });

        callback(sortedColors);
      } catch (error) {
        console.warn('颜色提取失败，使用默认配色:', error);
        // 返回默认配色
        callback(['#1f77b4', '#ff7f0e', '#2ca02c', '#d62728', '#9467bd', '#8c564b', '#e377c2', '#7f7f7f']);
      }
    };

    img.onerror = function (error) {
      console.warn('图片加载失败，使用默认配色:', imagePath, error);
      console.warn('图片加载失败详情:', {
        imagePath: imagePath,
        error: error,
        startsWithHttp: imagePath.startsWith('http'),
        crossOrigin: img.crossOrigin
      });
      // 返回默认配色
      callback(['#1f77b4', '#ff7f0e', '#2ca02c', '#d62728', '#9467bd', '#8c564b', '#e377c2', '#7f7f7f']);
    };

    img.src = imagePath;
  }

  // 初始化封面配色方案
  function initializeCoverPalettes() {
    console.log('开始初始化封面配色方案...');
    console.log('COVER_STORIES 数据:', COVER_STORIES);
    console.log('coverPalettes 初始状态:', coverPalettes);

    try {
      // 为每个封面故事生成配色方案
      const allStories = Object.values(COVER_STORIES).flat();
      console.log(`找到 ${allStories.length} 个封面故事`);

      allStories.forEach(story => {
        console.log(`处理封面故事: ${story.title}, 图片路径: ${story.imagePath}`);

        if (story.colors.length === 0) {
          // 先提供默认配色，然后异步提取真实颜色
          const defaultColors = ['#1f77b4', '#ff7f0e', '#2ca02c', '#d62728', '#9467bd', '#8c564b', '#e377c2', '#7f7f7f', '#bcbd22', '#17becf', '#aec7e8', '#ffbb78', '#98df8a', '#ff9896', '#c5b0d5', '#c49c94'];
          story.colors = defaultColors;
          console.log(`为"${story.title}"设置默认配色方案`);

          // 为不同颜色数量生成配色方案
          for (let count = 2; count <= 16; count++) {
            const palette = {
              name: story.title.replace('《Nature》封面故事：', '').replace('《Science》封面故事：', ''),
              source: `${story.category} Cover`,
              colors: defaultColors.slice(0, count),
              coverStory: story,
              isCoverPalette: true
            };

            coverPalettes[count].push(palette);
          }

          // 异步提取真实颜色
          console.log(`开始异步提取颜色: ${story.imagePath}`);
          extractColorsFromImage(story.imagePath, (colors) => {
            console.log(`图片颜色提取完成: ${story.title}, 提取到 ${colors ? colors.length : 0} 种颜色`);
            console.log(`提取的颜色: ${colors ? colors.join(', ') : '无'}`);
            if (colors && colors.length > 0) {
              story.colors = colors;

              // 更新配色方案
              for (let count = 2; count <= Math.min(16, colors.length); count++) {
                const existingIndex = coverPalettes[count].findIndex(p => p.coverStory && p.coverStory.id === story.id);
                if (existingIndex !== -1) {
                  coverPalettes[count][existingIndex].colors = colors.slice(0, count);
                }
              }

              // 触发UI更新事件
              console.log('触发UI更新事件...');
              if (window.updatePresetPalettes) {
                window.updatePresetPalettes();
                console.log('UI更新事件已触发');
              } else {
                console.warn('window.updatePresetPalettes 未定义');
              }
            }
          });
        } else {
          // 如果已有颜色数据，直接生成配色方案
          for (let count = 2; count <= Math.min(16, story.colors.length); count++) {
            const palette = {
              name: story.title.replace('《Nature》封面故事：', '').replace('《Science》封面故事：', ''),
              source: `${story.category} Cover`,
              colors: story.colors.slice(0, count),
              coverStory: story,
              isCoverPalette: true
            };

            coverPalettes[count].push(palette);
          }
        }
      });
    } catch (error) {
      console.error('初始化封面配色方案时出错:', error);
      console.error('错误详情:', error.stack);
    }
  }

  // 获取封面故事数据的辅助函数
  function getCoverStories() {
    return COVER_STORIES;
  }

  // 获取特定封面故事的配色方案
  function getCoverPalette(storyId, colorCount = 8) {
    const allStories = Object.values(COVER_STORIES).flat();
    const story = allStories.find(s => s.id === storyId);

    if (story && story.colors.length > 0) {
      return {
        name: story.title.replace('《Nature》封面故事：', '').replace('《Science》封面故事：', ''),
        source: `${story.category} Cover`,
        colors: story.colors.slice(0, Math.min(colorCount, story.colors.length)),
        coverStory: story,
        isCoverPalette: true
      };
    }

    return null;
  }

  window.PRESET_GROUPS = {
    curated,
    coverPalettes
  };

  // 暴露封面相关功能
  window.COVER_PALETTE_UTILS = {
    initializeCoverPalettes,
    getCoverStories,
    getCoverPalette,
    extractColorsFromImage
  };

  // 自动初始化
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeCoverPalettes);
  } else {
    initializeCoverPalettes();
  }
})();