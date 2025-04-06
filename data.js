const data = {
    name: "Liquido a percibir",
    value: 0.0,
    info: "El líquido a percibir es el dinero neto que un empleado recibe tras aplicar todas las deducciones al salario bruto. Esto incluye restar impuestos (como el IRPF en España), cotizaciones a la seguridad social y otros posibles descuentos, como anticipos o aportaciones sindicales",
    children: [
      {
        name: "Devengos",
        value: 0.0,
        info: "En el ámbito de las nóminas, los devengos son los importes que el empleado genera o tiene derecho a percibir antes de cualquier deducción. Incluyen el salario base, complementos (como antigüedad, nocturnidad o productividad), horas extras, pagas extraordinarias o incentivos",
        canBeDeleted: false,
        isContingenciaProfesional: false,
        children: [
          {
            name: "Percepciones Salariales",
            value: 0.0,
            info: "Las percepciones salariales en una nómina son todos los ingresos que un empleado recibe por su trabajo, formando parte de los devengos. Incluyen el salario base (fijo por el contrato), complementos (como antigüedad, turnos o peligrosidad), horas extras, bonificaciones o pagas extras.",
            canBeDeleted: false,
            isContingenciaProfesional: false,
            children: [
              { name: "Salario Base", value: 0.0,
                 info: "El salario base en una nómina es la cantidad fija que un empleado recibe por su trabajo, establecida por su contrato o convenio colectivo. Es el núcleo del salario bruto y no incluye pagos adicionales como bonificaciones, horas extras o complementos. El SMI en España es de 1148€",
                 canBeDeleted: false, isContingenciaProfesional: false
              },
              { name: "Complementos Salariales", value: 0.0, 
                info: "Los complementos salariales en una nómina son cantidades adicionales al salario base que un empleado recibe por circunstancias específicas relacionadas con su trabajo. Incluyen conceptos como antigüedad (por años de servicio), turnos (nocturnidad o festivos), peligrosidad, productividad, o idiomas, según el convenio colectivo o contrato",
                canBeDeleted: false, isContingenciaProfesional: false,
                children: []
              }
            ]
          },
          {
            name: "Otras Percepciones",
            value: 0.0,
            info: "Información adicional",
            canBeDeleted: false,
            isContingenciaProfesional: false,
            children: [
              { name: "Suplidos", value: 0.0, info: "Gastos reembolsados", canBeDeleted: false, isContingenciaProfesional: false,children: [] },
              { name: "Prestaciones SS", value: 0.0, info: "Deducción por SS", canBeDeleted: false, isContingenciaProfesional: true,children: [] },
              { name: "Otras", value: 0.0, info: "Otras deducciones", canBeDeleted: false, isContingenciaProfesional: false, children: [] }
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
              { name: "MEI", value: 0.0, info: "Deducción MEI" },
              { name: "FP", value: 0.0, info: "Deducción por Formacion" },
              { name: "Desempleo", value: 0.0, info: "Deducción por desempleo" }
            ]
          },
          { name: "IRPF", value: 0.0, info: "Impuesto sobre la renta" },
          { name: "Otros", value: 0.0, info: "Otros descuentos" }
        ]
      }
    ]
  };