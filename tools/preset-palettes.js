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

  window.PRESET_GROUPS = {
    curated,
  };
})();