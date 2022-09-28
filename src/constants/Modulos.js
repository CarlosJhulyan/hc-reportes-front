export const Modulos = [
  {
    key: "1",
    modulo: "Reporte_1",
    ruta: "reporte1",
    descripcion: "Analisis de Ordenes y Pacientes vs Concluidos",
    icono: "icon-auth-screen",
    subMenu: false,
  },
  {
    key: "2",
    modulo: "Reporte_2",
    ruta: "reporte2",
    descripcion: "Analisis de Venta por Mes",
    icono: "icon-shopping-cart",
    subMenu: false,
  },
  {
    key: "3",
    modulo: "Reporte_3",
    ruta: "reporte3",
    descripcion: "Examenes mas Rotados",
    icono: "icon-editor",
    subMenu: false,
  },
  {
    key: "4",
    modulo: "Reporte_4",
    ruta: "reporte4",
    descripcion: "Atencion de espcialidades por mes",
    icono: "icon-hotel-booking",
    subMenu: false,
  },
  {
    key: "5",
    modulo: "Reporte_5",
    ruta: "powerBi",
    descripcion: "Power BI",
    icono: "icon-data-display",
    subMenu: true,
    hijos: [
      {
        key: "6",
        modulo: "Reporte_6",
        ruta: "powerBi/generalVenta",
        descripcion: "Tablero Especialidad - Detallado",
        icono: "icon-tree",
        subMenu: false,
      },
      {
        key: "7",
        modulo: "Reporte_7",
        ruta: "powerBi/especialidadDetallado",
        descripcion: "Tablero Especialidad - Acumulado",
        icono: "icon-stats",
        subMenu: false,
      },
      {
        key: "8",
        modulo: "Reporte_8",
        ruta: "powerBi/especialidadAcumulado",
        descripcion: "Tablero General - Venta",
        icono: "icon-timeline",
        subMenu: false,
      },
    ],
  },
  {
    key: "6",
    modulo: "Reporte_agrupado_laboratorio",
    ruta: "agrupado-por-laboratorio",
    descripcion: "Reporte agrupado por laboratorio",
    icono: "icon-hotel-booking",
    subMenu: false,
  },
  {
    key: "7",
    modulo: "Reporte_7",
    ruta: "reporte7",
    descripcion: "Reporte de otras especialidades",
    icono: "icon-hotel-booking",
    subMenu: false,
  }
];
