const data = {
    name: "Liquido a percibir",
    value: 0.0,
    info: "Información principal",
    children: [
      {
        name: "Devengos",
        value: 0.5,
        info: "Información sobre devengos",
        canBeDeleted: false,
        isContingenciaProfesional: false,
        children: [
          {
            name: "Percepciones Salariales",
            value: 1.2,
            info: "Detalles sobre percepciones",
            canBeDeleted: false,
            isContingenciaProfesional: false,
            children: [
              { name: "Salario Base", value: 1.23, info: "Salario base mensual", canBeDeleted: false, isContingenciaProfesional: false },
              { name: "Complementos Salariales", value: 0.5, info: "Extras salariales", canBeDeleted: true, isContingenciaProfesional: false }
            ]
          },
          {
            name: "Otras Percepciones",
            value: 0.8,
            info: "Información adicional",
            canBeDeleted: true,
            isContingenciaProfesional: false,
            children: [
              { name: "Suplidos", value: 2.45, info: "Gastos reembolsados", canBeDeleted: true, isContingenciaProfesional: false },
              { name: "Prestaciones SS", value: -0.75, info: "Deducción por SS", canBeDeleted: false, isContingenciaProfesional: true },
              { name: "Otras", value: -0.75, info: "Otras deducciones", canBeDeleted: true, isContingenciaProfesional: false }
            ]
          }
        ]
      },
      {
        name: "Deducciones",
        value: -0.2,
        info: "Deducciones aplicadas",
        children: [
          {
            name: "Seguridad Social",
            value: 0.9,
            info: "Pago a la seguridad social",
            children: [
              { name: "Contingencias Comunes", value: 1.75, info: "Deducción por contingencias" },
              { name: "MEI", value: -0.5, info: "Deducción MEI" }
            ]
          },
          { name: "IRPF", value: -0.8, info: "Impuesto sobre la renta" },
          { name: "Otros", value: 0.0, info: "Otros descuentos" }
        ]
      }
    ]
  };