const data = {
    name: "Liquido a percibir",
    value: 0.0,
    info: "El salario que se le va a ingresar en cuenta al trabajador",
    children: [
      {
        name: "Devengos",
        value: 0.0,
        info: "Información sobre devengos",
        canBeDeleted: false,
        isContingenciaProfesional: false,
        children: [
          {
            name: "Percepciones Salariales",
            value: 0.0,
            info: "Detalles sobre percepciones",
            canBeDeleted: false,
            isContingenciaProfesional: false,
            children: [
              { name: "Salario Base", value: 0.0, info: "Salario base mensual", canBeDeleted: false, isContingenciaProfesional: false },
              { name: "Complementos Salariales", value: 0.0, info: "Extras salariales", canBeDeleted: true, isContingenciaProfesional: false }
            ]
          },
          {
            name: "Otras Percepciones",
            value: 0.0,
            info: "Información adicional",
            canBeDeleted: true,
            isContingenciaProfesional: false,
            children: [
              { name: "Suplidos", value: 0.0, info: "Gastos reembolsados", canBeDeleted: true, isContingenciaProfesional: false },
              { name: "Prestaciones SS", value: 0.0, info: "Deducción por SS", canBeDeleted: false, isContingenciaProfesional: true },
              { name: "Otras", value: 0.0, info: "Otras deducciones", canBeDeleted: true, isContingenciaProfesional: false }
            ]
          }
        ]
      },
      {
        name: "Deducciones",
        value: 0.0,
        info: "Deducciones aplicadas",
        children: [
          {
            name: "Seguridad Social",
            value: 0.0,
            info: "Pago a la seguridad social",
            children: [
              { name: "Contingencias Comunes", value: 0.0, info: "Deducción por contingencias" },
              { name: "MEI", value: 0.0, info: "Deducción MEI" }
            ]
          },
          { name: "IRPF", value: 0.0, info: "Impuesto sobre la renta" },
          { name: "Otros", value: 0.0, info: "Otros descuentos" }
        ]
      }
    ]
  };