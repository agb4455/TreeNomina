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
              { name: "Suplidos", value: 0.0, canBeDeleted: false, isContingenciaProfesional: false,children: [],
                info: "los suplidos no son propiamente percepciones salariales, sino cantidades que el empleador adelanta al trabajador para cubrir gastos relacionados con el trabajo, que luego se reembolsan o justifican. Por ejemplo, si un empleado paga 50 € en transporte por un viaje laboral, ese importe se incluye como suplido en la nómina, pero no forma parte del salario ni tributa como tal. Son comunes en trabajos con desplazamientos o dietas. A diferencia de los complementos, no son ingresos, sino recuperaciones de gastos." },
              { name: "Prestaciones SS", value: 0.0, info: "Deducción por SS", canBeDeleted: false, isContingenciaProfesional: true,children: [] },
              { name: "Otras", value: 0.0, info: "Otras deducciones", canBeDeleted: false, isContingenciaProfesional: false, children: [] }
            ]
          }
        ]
      },
      {
        name: "Deducciones",
        value: 0.0,
        info: "Las deducciones en una nómina son los importes que se restan del salario bruto para calcular el líquido a percibir. Incluyen principalmente las cotizaciones a la Seguridad Social (como contingencias comunes, desempleo y formación, aprox. 6,4% del bruto en España en 2025) y el IRPF (impuesto sobre la renta, variable según ingresos y situación personal)",
        children: [
          {
            name: "Seguridad Social",
            value: 0.0,
            info: "Pago a la seguridad social",
            children: [
              { name: "Contingencias Comunes", value: 0.0,
                 info: "Las contingencias comunes en una nómina son parte de las cotizaciones a la Seguridad Social que cubren riesgos no laborales, como enfermedad común, accidentes no relacionados con el trabajo o jubilación. En España, en 2025, el trabajador aporta alrededor del 4,7% de su base de cotización para este concepto, mientras que el empleador paga una parte mayor (aprox. 23,6%)." },
              { name: "MEI", value: 0.0,
                 info: "En el contexto de nóminas en España, MEI se refiere al Mecanismo de Equidad Intergeneracional, una medida introducida en 2023 para garantizar la sostenibilidad del sistema de pensiones. Consiste en una cotización adicional a la Seguridad Social que pagan tanto empleados como empleadores. En 2025, esta cotización es del 0,8% sobre la base de cotización: el 0,67% lo aporta la empresa y el 0,13% el trabajador." },
              { name: "FP", value: 0.0,
                 info: "FP suele referirse a la cotización por Formación Profesional, una deducción que se aplica al salario bruto para financiar programas de capacitación laboral. En 2025, el trabajador aporta un 0,1% de su base de cotización para este concepto, mientras que el empleador paga un 0,6% adicional." },
              { name: "Desempleo", value: 0.0,
                 info: "la cotización por desempleo es una deducción del salario bruto destinada a financiar las prestaciones por desempleo, como el paro. En 2025, el trabajador aporta un 1,55% de su base de cotización para este concepto (la empresa paga un 5,5% adicional)" }
            ]
          },
          { name: "IRPF", value: 0.0, info: "El IRPF (Impuesto sobre la Renta de las Personas Físicas) en una nómina es una deducción que se aplica al salario bruto como anticipo del impuesto sobre la renta que el trabajador paga al Estado. En España, en 2025, el porcentaje varía según los ingresos, situación personal (hijos, discapacidad) y tramos fiscales, oscilando entre el 2% y el 45%." },
          { name: "Otros", value: 0.0, info: "Otras deducciones" }
        ]
      }
    ]
  };