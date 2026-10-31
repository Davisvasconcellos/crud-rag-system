export interface TablerPluginItem {
  label: string;
  slug: string;
  isNew?: boolean;
  description: string;
  previewUrl: string;
  docsUrl: string;
}

export const TABLER_PLUGINS_ITEMS: TablerPluginItem[] = [
  {
    label: "Charts",
    slug: "charts",
    description: "Gráficos de área, barras, linhas, rosca e radiais com ApexCharts.",
    previewUrl: "https://preview.tabler.io/charts.html",
    docsUrl: "https://docs.tabler.io/ui/plugins/charts",
  },
  {
    label: "Charts advanced",
    slug: "charts-advanced",
    description: "Séries temporais, múltiplos eixos, gráficos combinados e scatter plots.",
    previewUrl: "https://preview.tabler.io/charts-advanced.html",
    docsUrl: "https://docs.tabler.io/ui/plugins/charts",
  },
  {
    label: "Color picker",
    slug: "colorpicker",
    description: "Seletor nativo de cores com paletas e amostradores pré-definidos.",
    previewUrl: "https://preview.tabler.io/colorpicker.html",
    docsUrl: "https://docs.tabler.io/ui/plugins/colorpicker",
  },
  {
    label: "Date picker",
    slug: "datepicker",
    isNew: true,
    description: "Calendário e seleção de datas simples, múltiplas e intervalos temporais.",
    previewUrl: "https://preview.tabler.io/datepicker.html",
    docsUrl: "https://docs.tabler.io/ui/plugins/datepicker",
  },
  {
    label: "Datatables",
    slug: "datatables",
    description: "Tabelas interativas com paginação, busca e ordenação em tempo real.",
    previewUrl: "https://preview.tabler.io/datatables.html",
    docsUrl: "https://docs.tabler.io/ui/plugins/datatables",
  },
  {
    label: "Dropzone",
    slug: "dropzone",
    description: "Upload de arquivos arrastando e soltando com miniaturas de preview.",
    previewUrl: "https://preview.tabler.io/dropzone.html",
    docsUrl: "https://docs.tabler.io/ui/plugins/dropzone",
  },
  {
    label: "Sortable",
    slug: "sortable",
    isNew: true,
    description: "Listas e cartões reordenáveis com arrastar e soltar (drag & drop).",
    previewUrl: "https://preview.tabler.io/sortable.html",
    docsUrl: "https://docs.tabler.io/ui/plugins/sortable",
  },
  {
    label: "Fullcalendar",
    slug: "fullcalendar",
    description: "Calendário de eventos corporativos, compromissos e agendamentos.",
    previewUrl: "https://preview.tabler.io/fullcalendar.html",
    docsUrl: "https://docs.tabler.io/ui/plugins/fullcalendar",
  },
  {
    label: "Inline player",
    slug: "inline-player",
    description: "Controles de reprodução de áudio e vídeo integrados à interface.",
    previewUrl: "https://preview.tabler.io/inline-player.html",
    docsUrl: "https://docs.tabler.io/ui/plugins/inline-player",
  },
  {
    label: "Lightbox",
    slug: "lightbox",
    description: "Visualizador de fotos em tela cheia com zoom, galeria e navegação.",
    previewUrl: "https://preview.tabler.io/lightbox.html",
    docsUrl: "https://docs.tabler.io/ui/plugins/lightbox",
  },
  {
    label: "Map",
    slug: "maps",
    description: "Mapas geográficos interativos com Leaflet e marcadores personalizados.",
    previewUrl: "https://preview.tabler.io/maps.html",
    docsUrl: "https://docs.tabler.io/ui/plugins/maps",
  },
  {
    label: "Map fullsize",
    slug: "map-fullsize",
    description: "Visualização panorâmica de mapa em tela cheia com painel flutuante.",
    previewUrl: "https://preview.tabler.io/map-fullsize.html",
    docsUrl: "https://docs.tabler.io/ui/plugins/map-fullsize",
  },
  {
    label: "Map blocks",
    slug: "map-blocks",
    isNew: true,
    description: "Blocos de mapa com rotas, cartões de contato e pontos de interesse.",
    previewUrl: "https://preview.tabler.io/map-blocks.html",
    docsUrl: "https://docs.tabler.io/ui/plugins/map-blocks",
  },
  {
    label: "Map vector",
    slug: "maps-vector",
    description: "Mapas vetoriais mundiais e regionais com calorimetria por país/estado.",
    previewUrl: "https://preview.tabler.io/maps-vector.html",
    docsUrl: "https://docs.tabler.io/ui/plugins/maps-vector",
  },
  {
    label: "Tour",
    slug: "tour",
    isNew: true,
    description: "Guias passo a passo interativos para onboarding e apresentação de recursos.",
    previewUrl: "https://preview.tabler.io/tour.html",
    docsUrl: "https://docs.tabler.io/ui/plugins/tour",
  },
  {
    label: "WYSIWYG editor",
    slug: "wysiwyg",
    description: "Editor de texto rico e Markdown para publicação e formatação de artigos.",
    previewUrl: "https://preview.tabler.io/wysiwyg.html",
    docsUrl: "https://docs.tabler.io/ui/plugins/wysiwyg",
  },
];
