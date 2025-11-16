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
        id: 'Nature-001',
        title: '《Nature》封面故事：科研智能',
        subtitle: '人工智能如何改变科研？',
        description: '从数据蒸馏到蛋白质结构解析，人工智能（AI）正在快速触及科研的方方面面。本期《自然》将关注为何研究人员对这项快速发展的技术兴奋不已——并探讨AI生成虚假信息的风险。',
        date: '2023 年 9 月 28 日刊',
        imagePath: '../assets/cover/Nature/001/001.png', // 相对于网站根目录的路径
        category: 'Nature',
        colors: [] // 将通过图片提取填充
      },
      {
        id: 'Nature-002',
        title: '《Nature》封面故事：偏离目标',
        subtitle: '如何在2030年之前实现SDGs？',
        description: '2015年9月，193个国家共同承诺将努力实现17项旨在改善世界人民生活的目标。从消除贫困到减少饥饿，再到应对全球变暖和保护生物多样性，可持续发展目标（Sustainable Development Goals）自此在企业计划和政府政策中占有一席之地。但如今，距离2030年实现这些宏伟目标的时限已经过半，而要做的还有很多。在本期特刊中，《自然》回顾了我们已经取得的进展，并探讨了我们离这些全球目标还有多远。',
        date: '2023 年 9 月 14 日刊',
        imagePath: '../assets/cover/Nature/002/002.png',
        category: 'Nature',
        colors: []
      },
      {
        id: 'Nature-003',
        title: '《Nature》封面故事：饿死肿瘤',
        subtitle: '饮食强化的多胺耗竭可重编程神经母细胞瘤',
        description: '神经母细胞瘤是一种高度致命的儿童肿瘤，起源于外周神经系统，肿瘤生长依赖多胺的生物合成。一种名为二氟甲基鸟氨酸的药物于2023年末获批，可通过抑制多胺生物合成来帮助治疗神经母细胞瘤。在本期《自然》中，研究者深入探究了这一药物的作用。研究发现，无脯氨酸与精氨酸的饮食能减少多胺合成所需的前体鸟氨酸的数量。这进一步增强了二氟甲基鸟氨酸耗竭多胺的效果，重编程肿瘤生长，并改善了小鼠生存率。',
        date: '2025 年 10 月 16 日刊',
        imagePath: '../assets/cover/Nature/003/003.png',
        category: 'Nature',
        colors: []
      },
      {
        id: 'Nature-004',
        title: '《Nature》封面故事：DeepSeek-R1的科学',
        subtitle: 'DeepSeek-R1通过强化学习激励大语言模型进行推理',
        description: '大语言模型如果能被训练成在解答过程中设定步骤，就能更好地解决问题。这种“推理”过程类似于人类解决复杂问题的方法，但对人工智能非常困难，需要人类干预来添加标签和注释。在本期《自然》中，DeepSeek 的研究者揭示了他们如何训练模型不仅能以这种方式推理，而且尽量减少人为干预。DeepSeek-R1模型通过强化学习进行训练，当其成功解决数学题时会获得高分奖励，而出错则会受到惩罚。由此，它逐渐学会了推理的重要性——通过分步分析和展示思考过程，更容易得到正确答案。这一机制使DeepSeek-R1具备自我检验与反思的能力，能在输出最终结果前评估自身推理，从而显著提升其在编程任务及研究生层次科学问题中的表现。',
        date: '2025 年 9 月 18 日刊',
        imagePath: '../assets/cover/Nature/004/004.png',
        category: 'Nature',
        colors: []
      },
      {
        id: 'Nature-005',
        title: '《Nature》封面故事：超粘水凝胶',
        subtitle: '数据驱动设计：AI创造防水超粘合材料',
        description: '研究人员通过数据驱动设计方法，利用人工智能创造了一种新型防水超粘合水凝胶材料。这种名为R1-max的水凝胶具有卓越的粘附性能，即使在潮湿环境下也能保持强大的粘合力。研究团队通过机器学习算法筛选了数千种可能的材料组合，最终确定了这种具有突破性能的水凝胶配方。该材料在医疗修复、水下工程和生物传感器等领域具有广阔的应用前景。',
        date: '2025 年 8 月 7 日刊',
        imagePath: '../assets/cover/Nature/005/005.png',
        category: 'Nature',
        colors: []
      },
      {
        id: 'Nature-006',
        title: '《Nature》封面故事：按图索"疾"',
        subtitle: '人类病原体在古代欧亚大陆的时空分布',
        description: '通过分析古代DNA样本，研究人员绘制了人类病原体在古代欧亚大陆的时空分布图。这项研究揭示了数千年来人类迁徙与疾病传播之间的复杂关系，帮助我们理解历史上重大流行病的起源和传播路径。研究发现，许多现代病原体的古代变种在青铜时代就已经存在，并且随着人类迁徙路线不断扩散。这一发现对现代流行病学研究和未来疾病防控策略具有重要意义。',
        date: '2025 年 7 月 24 日刊',
        imagePath: '../assets/cover/Nature/006/006.png',
        category: 'Nature',
        colors: []
      },
      {
        id: 'Nature-007',
        title: '《Nature》封面故事：空间免疫评分系统预测肝癌复发',
        subtitle: '空间免疫评分系统可预测肝细胞癌复发',
        description: '组成肿瘤微环境的细胞和血管会形成复杂的生态系统，这会强烈影响肿瘤如何形成、生长，以及对治疗的反应。肿瘤微环境的各种特征，如免疫细胞的分布和位置，能用来预测疾病预后。在本期《自然》杂志中，孙成及其团队提出了一种基于影像的新评分方法，用于预测肝癌术后复发的可能性。研究集中在复发率较高的肝细胞癌，这也是最常见的肝癌类型。团队发现，免疫细胞——特别是自然杀伤细胞——的空间分布，以及这些细胞所表达的五种基因，与手术预后的改善密切相关。基于这一发现，研究人员开发了肿瘤免疫微环境空间（TIMES）评分系统，该系统利用人工智能进行空间分析，通过这些基因在微环境中的位置来预测肝癌复发的风险。',
        date: '2025 年 4 月 24 日刊',
        imagePath: '../assets/cover/Nature/007/007.png',
        category: 'Nature',
        colors: []
      },
      {
        id: 'Nature-008',
        title: '《Nature》封面故事：潮流事件',
        subtitle: '宽刈幅卫星测高揭示全球亚中尺度海洋动力学',
        description: '被称为涡旋的海洋环流对海洋动力学有重大影响，从热循环到营养流动，一切都因其而变。中尺度涡旋（直径约100-300 km）得到了比较深入的研究，但较小的亚中尺度（10-100 km）涡旋在全球尺度上更难观察与评估。在本期《自然》杂志中，Matthew Archer及其团队展示了"地表水与海洋地形卫星"（SWOT）的研究成果，这一突破性进展以前所未有的细节揭示了海洋动力学。SWOT卫星通过二维刈幅技术绘制海洋表面特征（如封面艺术再现图），其分辨率为1至10公里，不仅能够测量亚中尺度涡旋，还能捕捉到非线性内波——这些波动发生在海洋内部的密度面，并在混合过程中发挥重要作用。研究表明，这些亚中尺度活动的振幅可能远超预期，因此对整体海洋环流的影响也可能比以往预估的更为显著。',
        date: '2025 年 4 月 17 日刊',
        imagePath: '../assets/cover/Nature/008/008.png',
        category: 'Nature',
        colors: []
      },
      {
        id: 'Nature-009',
        title: '《Nature》封面故事：识食物',
        subtitle: '茄属泛遗传学揭示农作物改造中不可预测的旁系同源',
        description: '作物基因组学正在快速脱离单一参考基因组，转向覆盖物种遗传多样性的基因组集合。这些"泛基因组"使人们有机会在同一物种个体或变异与其近亲间比较和探究性状。在本期《自然》杂志中，Michael Schatz、Joyce Van Eck、Jesse Gillis、Zachary Lippman及其团队扩展了这一概念，提出了涵盖整个茄属（Solanum）的泛基因组，茄属包括全球重要作物如番茄和土豆，也涵盖了本地作物如红茄（见封面）和奎东茄等。研究发现，茄属的各个物种之间仅共享大约60%的基因，同时基因重复的快速演化也突显了将某一作物的研究成果应用于另一作物的挑战。研究人员认为，深入了解茄属的基因组学，尤其是对于较少研究的本地物种，将有助于使主要作物与孤儿作物的育种策略更加可预测，从而提升育种的成功率。',
        date: '2025 年 4 月 3 日刊',
        imagePath: '../assets/cover/Nature/009/009.png',
        category: 'Nature',
        colors: []
      },
      {
        id: 'Nature-010',
        title: '《Nature》封面故事：几星好评？',
        subtitle: '二分法量表减少消费者种族歧视及收入不平等',
        description: '今时今日，几乎任何在线业务结束后，都会请你对体验做出评价。但如果业务涉及人力——从评价教师到修漏水的管道工——这类表现评价系统也会导致另一个问题：种族歧视。在本期《自然》中，Tristan Botelho、Katherine DeCelles和同事表明，通过改用两星即好评或差评的评分体系，标准五星评价量表中的固有偏见很容易得到抑制。该团队研究了一个提供家居维护工作的在线平台的历史评分数据，该平台已从五星改为两星评分系统。在这一改变前，白人工作者与有色人种工作者的表现评分存在种族差异，这种差异也反映在了收入中。在改为两星评分系统后，两者的表现评分和收入差距几乎消失了。更多实验显示，将评分系统问题改为明确的好/不好，能消除消费者评价中的偏见。',
        date: '2025 年 3 月 13 日刊',
        imagePath: '../assets/cover/Nature/010/010.png',
        category: 'Nature',
        colors: []
      },
      {
        id: 'Science-001',
        title: '《Science》封面故事：BioEmu助力蛋白质功能预测',
        subtitle: '深度学习系统揭示蛋白质动态变化，快速生成多样化构象',
        description: '蛋白质的功能预测不仅依赖于其序列和结构，还需要理解其动态运动。然而，探索这些运动的可扩展方法一直缺乏。本期《Science》介绍了BioEmu，一个深度学习系统，能够快速生成多样化的蛋白质构象，为蛋白质的柔性和功能提供快速、准确的洞察。图中展示了通过BioEmu采样的环二磷酸腺苷受体模块的蛋白质结构重叠图，展现了其在动态环境下的变化。该技术将为生物分子研究提供强有力的支持。',
        date: '2025年8月14日刊',
        imagePath: '../assets/cover/Science/001/001.jpg',
        category: 'Science',
        colors: []
      },
      {
        id: 'Science-002',
        title: '《Science》封面故事：免疫系统的生命历程',
        subtitle: '从婴儿到老年，免疫系统如何随生命周期演变',
        description: '本期《科学》封面图呈现了免疫系统在个体生命周期中的变化，从婴儿期到儿童期，再到成年和老年。婴儿的剪影中包含着DNA分子，图中的人物被核膜和质膜包围。这些元素象征着免疫系统在漫长的进化历程中如何随着病毒的基因整合而演化，从单细胞生物到多细胞生物，体现了免疫系统随着生命发展逐步适应环境的过程。',
        date: '2025年8月7日刊',
        imagePath: '../assets/cover/Science/002/002.png',
        category: 'Science',
        colors: []
      },
      {
        id: 'Science-003',
        title: '《Science》封面故事：海洋保护区的双刃剑',
        subtitle: '保护生态需法规与执行并重',
        description: '加拉帕戈斯群岛湛蓝海域中，海狮追逐沙丁鱼的景象象征着生态平衡的力量。海洋保护区（MPA）被寄予厚望，用以维持鱼类种群与健康生态系统。然而，本期《科学》两篇研究揭示，若缺乏有效的监管与执法，再完善的保护区制度也难以抵御非法捕捞的威胁。科学家强调，只有当制度化的限制被严格执行，海洋保护区才能真正成为生态修复与物种保育的屏障。',
        date: '2025年7月24日刊',
        imagePath: '../assets/cover/Science/003/003.png',
        category: 'Science',
        colors: []
      },
      {
        id: 'Science-004',
        title: '《Science》封面故事：手机构筑全球地震预警网',
        subtitle: '数十亿传感器协同捕捉地震信号',
        description: '本期《科学》封面以象征性的方式呈现出全球智能手机共同工作的场景——它们组成了一张庞大的地震监测网络。Android地震预警系统利用分布于全球地震带的数十亿部手机加速度传感器，在震中初始摇动的瞬间捕捉信号，实时分析震源特征。当系统识别到地震发生后，可迅速向受影响地区发送预警信息，为人们争取关键的逃生与应急时间。这一技术展示了分布式智能网络在公共安全领域的创新潜力。',
        date: '2025年7月17日刊',
        imagePath: '../assets/cover/Science/004/004.png',
        category: 'Science',
        colors: []
      },
      {
        id: 'Science-005',
        title: '《Science》封面故事：玫瑰花瓣的几何之谜',
        subtitle: '数学揭示应力如何塑造花瓣之美',
        description: '一朵“红娜奥米”玫瑰绽放出锐利起伏的花瓣边缘，其复杂曲线并非对称生长的产物。本期《科学》的研究揭示了花瓣形态背后的数学规律：在生长过程中，细胞扩张引发几何冲突，使得花瓣无法在三维空间中以平滑形态释放内应力。结果，张力被集中于边缘，形成优雅而锋利的褶皱。科学家指出，这种由生长“挫折”塑造的非对称之美，展示了自然界力与形之间的微妙平衡。',
        date: '2025年5月1日刊',
        imagePath: '../assets/cover/Science/005/005.png',
        category: 'Science',
        colors: []
      },
      {
        id: 'Science-006',
        title: '《Science》封面故事：ESM3开启可编程蛋白时代',
        subtitle: '深度学习语言模型驱动智能分子设计',
        description: '本期《科学》报道的ESM3是一种基于深度学习的蛋白质语言模型，可实现可编程的蛋白设计。研究团队将海量公开数据库中的蛋白序列、结构与功能注释输入模型，使其能够像理解语言一样“理解”蛋白。封面插图中，科研人员依次在控制台输入指令，背后机器象征ESM3模型，三条巨大的漏斗代表不同数据源的汇聚。该模型的出现，为从自然序列规律中生成具备特定功能的人工蛋白提供了全新路径，标志着智能化生物设计迈入新阶段。',
        date: '2025年2月21日刊',
        imagePath: '../assets/cover/Science/006/006.png',
        category: 'Science',
        colors: []
      },

      {
        id: 'Science-007',
        title: '《Science》封面故事：绿色激励重塑外卖习惯',
        subtitle: '简单默认选项引发可持续行为变革',
        description: '封面艺术描绘了一名路人穿行于一次性餐具堆中，沿途收集“绿色积分”，最终用这些象征环保行为的点数种下一棵树。本期《科学》刊登的研究与阿里巴巴合作，发现通过设置默认“不配送餐具”选项，并为选择环保行为的用户发放非货币性质的绿色积分，可以显著降低一次性餐具的使用量。这种简单的“绿色助推”策略不仅改变了数以百万计用户的消费习惯，也带来了可量化的环境收益，展示了数字平台在推动可持续生活方式中的巨大潜能。',
        date: '2023年9月8日刊',
        imagePath: '../assets/cover/Science/007/007.png',
        category: 'Science',
        colors: []
      },
      {
        id: 'Science-008',
        title: '《Science》封面故事：生殖之门的挑战与突破',
        subtitle: '揭示精子异常修复与避孕机制的双重进展',
        description: '封面图展示了形态各异的精子奔向卵子的场景——部分精子畸形，部分则被“修复”，象征着科学家们正在探索的辅助生殖治疗，可通过矫正特定精子缺陷实现健康后代的诞生。与此同时，画面中被墙阻隔的健康精子，则寓意避孕策略的研究进展。本期《科学》以“人类生殖”为特刊主题，聚焦从受孕机制到避孕科技的最新发现，展现了生殖医学在理解生命起源与掌控生育健康上的前沿突破。',
        date: '2023年4月14日刊',
        imagePath: '../assets/cover/Science/008/008.png',
        category: 'Science',
        colors: []
      },
      {
        id: 'Science-009',
        title: '《Science》封面故事：免疫防线的自我平衡',
        subtitle: '解析免疫耐受与自身免疫的新进展',
        description: '免疫系统以复杂而强大的武器库抵御感染与癌变，但其运行依赖精密的调控网络。一旦这些制衡机制失灵，免疫防线便可能转向自身，引发自体免疫疾病。本期《科学》特刊聚焦免疫耐受与自身免疫的最新研究进展，系统梳理了免疫反应中调节性通路的分子基础，以及如何在免疫活化与抑制之间保持微妙平衡。深入理解这些机制，为临床治疗如类风湿关节炎、系统性红斑狼疮等疾病提供了新的干预思路。',
        date: '2023年5月5日刊',
        imagePath: '../assets/cover/Science/009/009.png',
        category: 'Science',
        colors: []
      },
      {
        id: 'Science-010',
        title: '《Science》封面故事：AI程序员崛起',
        subtitle: 'AlphaCode以竞争水平生成创新代码',
        description: '封面图展示了由人类（紫色）与AI系统AlphaCode（白色）生成的程序片段方块，其高度象征代码的可行性。AlphaCode是一种具备编程能力的人工智能系统，能够通过生成并筛选数百万种多样化的候选方案，解决前所未见的复杂问题。研究表明，该系统的表现已达到人类程序竞赛的竞争水准。展望未来，此类代码生成技术有望成为程序员的智能助手，不仅能提升开发效率，也将为计算机教育与算法创新开辟新方向。',
        date: '2022年12月9日刊',
        imagePath: '../assets/cover/Science/010/010.png',
        category: 'Science',
        colors: []
      },
      {
        id: 'Cell-001',
        title: '《Cell》封面故事：胶质-神经元失衡与阿尔茨海默',
        subtitle: '蛋白子网络揭示三类脑细胞互作失调',
        description: '本期《Cell》中，Wang等构建捕捉小胶质细胞、星形胶质细胞与神经元互作的蛋白子网络，揭示其可能是阿尔茨海默病进展的关键驱动力。封面右侧呈现被Tau缠结、淀粉样β斑块和激活胶质细胞包围的暗淡病变神经元；左侧则描绘健康脑中三类细胞间的蛋白互作图谱，亮色神经元被细胞特异蛋白节点及其连接所环绕。图像由Lilas Armstrong-Davies创作，概念由Bin Zhang、Aiqun Li、Erming Wang和Jennifer Gutierrez提出。',
        date: '2025年10月30日刊',
        imagePath: '../assets/cover/Cell/001/001.png',
        category: 'Cell',
        colors: []
      },

      {
        id: 'Cell-002',
        title: '《Cell》封面故事：脑干回路掌管梦境睡眠',
        subtitle: '揭示诱导REM睡眠的关键脑干开关回路',
        description: '本期《Cell》中，Kashiwagi等人锁定了一条位于脑干的神经环路，作为启动快速眼动（REM）睡眠的“开关”。该回路向调控前脑活动的多个区域发出信号，从而在REM期驱动人类梦境的产生。当这一回路功能受损时，会出现REM睡眠行为障碍——患者在睡梦中挥拳踢腿，将梦境情节在现实中“上演”，这是帕金森病的早期前驱信号之一。封面以日本画风格呈现：一只处于REM睡眠的小鼠梦见自己抓着葡萄，现实中却握着形似人脑的核桃，象征小鼠模型中解析的REM睡眠机制如何加深对人类脑部疾病的认识。图像由Otama-shimai创作。',
        date: '2024年10月31日刊',
        imagePath: '../assets/cover/Cell/002/002.png',
        category: 'Cell',
        colors: []
      },

      {
        id: 'Cell-003',
        title: '《Cell》封面故事：50年解码大脑之路',
        subtitle: '数学与机器学习串联细胞机制与神经表征',
        description: '本期《Cell》中，Mathis等人回顾过去半个世纪大脑解码领域的关键进展，从奠定基础的数学理论，到当下迅猛发展的机器学习工具，再到未来如何将细胞层面的分子与电生理机制，与更高层次的神经表征和认知功能精确对接。作者在文中梳理多尺度数据分析框架，探讨如何将行为学观察、大规模神经元记录以及脑机接口读出的信号整合到统一的计算模型之中。封面艺术作品中，一位科学家正同时审视动物行为轨迹、神经群体放电图谱与BMI数据，象征着多源数据融合下，人类对大脑编码规律的理解正迈向新的阶段。作品作者为Julia Kuhl。',
        date: '2024年10月17日刊',
        imagePath: '../assets/cover/Cell/003/003.png',
        category: 'Cell',
        colors: []
      },

      {
        id: 'Cell-004',
        title: '《Cell》50周年封面：微生物学再集结',
        subtitle: '跨学科联盟解码地球微生物组',
        description: '为庆祝《Cell》创刊50周年，本期特辑将目光投向无处不在的微生物世界以及蓬勃发展的微生物学。Eren和Banfield在述评中勾勒出现代微生物学图景：从分子生物学家、化学家到计算机科学家、统计学家和建模专家，不同学科协同解析多尺度的微生物生态。从实验室培养到自然生境、从单一菌株到复杂“组学”大数据，多样技术正推动在医学、农业与生物修复等领域寻找解决方案。封面作品致敬过去50年中涌现的关键学科与发现，也象征当代微生物学跨界融合的力量。图像由Charlotte Hintzmann创作。',
        date: '2024年9月19日刊',
        imagePath: '../assets/cover/Cell/004/004.png',
        category: 'Cell',
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