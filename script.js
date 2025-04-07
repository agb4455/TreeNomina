// Variables globales
let porIrpf = 12.0;
let porSS = 0.0;
let CAAA = 0.0;
let CAAAP = 0.0;
let CAHE = 0.0; 
let extra = 0.0;
let thisMoth = false;

const width = 2400, height = 800;
const svg = d3.select("svg").call(d3.zoom().scaleExtent([0.5, 2]).on("zoom", (e) => g.attr("transform", e.transform)));
const g = svg.append("g").attr("transform", "translate(100, 50)");
const treeLayout = d3.tree().size([height, width]);
let root;

// Función para renderizar el árbol
const renderTree = () => {
  root = d3.hierarchy(data);
  treeLayout(root);
  g.selectAll("*").remove();

  g.selectAll("path.link").data(root.links()).enter().append("path")
    .attr("class", "link")
    .attr("d", d3.linkHorizontal().x(d => d.y).y(d => d.x));

  const node = g.selectAll("g.node").data(root.descendants()).enter().append("g")
    .attr("class", "node")
    .attr("transform", d => `translate(${d.y}, ${d.x})`)
    .on("click", (event, d) => {
      if (d.data.canBeDeleted === true) {
        deleteNode(d);
      } else {
        console.log(`El nodo "${d.data.name}" no puede ser eliminado.`);
      }
    });

  node.append("circle").attr("class", "node-circle").attr("r", 5);

  node.append("rect").attr("class", "node-label-rect")
    .attr("x", d => -((d.data.name.length * 7) / 2))
    .attr("y", 10)
    .attr("width", d => d.data.name.length * 7)
    .attr("height", 40);

  node.append("text").attr("class", "node-label-text")
    .attr("x", 0).attr("y", 30)
    .text(d => d.data.name);

  node.append("text").attr("class", "node-value-text")
    .attr("x", 0).attr("y", 45)
    .attr("fill", d => d.data.value >= 0 ? "green" : "red")
    .text(d => d.data.value.toFixed(2) + " €");

  const infoGroup = node.append("g").attr("class", "info-group");
  infoGroup.append("circle").attr("class", "info-circle")
    .attr("cx", d => (d.data.name.length * 7) / 2 + 10)
    .attr("cy", 35).attr("r", 6)
    .on("mouseover", (event, d) => {
      d3.select("#tooltip")
        .style("left", `${event.pageX + 5}px`)
        .style("top", `${event.pageY + 5}px`)
        .style("display", "block")
        .text(d.data.info || "Sin información");
    })
    .on("mouseout", () => d3.select("#tooltip").style("display", "none"));

    updateValues();
};

// Función para eliminar un nodo
function deleteNode(node) {
  const parent = node.parent;
  if (parent) {
    const index = parent.data.children.findIndex(child => child.name === node.data.name);
    if (index !== -1) {
      node.parent.data.value -= node.data.value; // Restar el valor del nodo eliminado al padre;
      parent.data.children.splice(index, 1);
    }
  }
  updateValues(); // Volver a renderizar el árbol después de eliminar el nodo
  renderTree();
}
// Función para buscar un nodo por nombre en el árbol
function findNodeInRootByName(node, name) {
  if (node.data.name === name) return node;
  if (node.children) {
    for (let child of node.children) {
      const found = findNodeInRootByName(child, name);
      if (found) return found;
    }
  }
  return null;
}

// Función para buscar un nodo por nombre en el árbol
function findNodeByName(node, name) {
  if (node.name === name) return node;
  if (node.children) {
    for (let child of node.children) {
      const found = findNodeByName(child, name);
      if (found) return found;
    }
  }
  return null;
}

// Función para actualizar recursivamente los valores desde un nodo
function updateFromNode(node) {
  if (!node.children || node.children.length === 0) {
    return node.value; // Nodo hoja, devuelve su valor
  } else {
    let sum = 0;
    for (let child of node.children) {
      sum += updateFromNode(child);
    }
    node.value = sum; // Actualiza el valor del nodo con la suma de sus hijos
    return sum;
  }
}

// Función para abrir el modal y mostrar los valores actuales
function abrirCompanyModal() {
  document.getElementById("overlay-pdf").style.display = "block";
  document.getElementById("modal-pdf").style.display = "block";
}

// Función para abrir el modal y mostrar los valores actuales
function abrirModal() {
  const salarioBase = root.descendants().find(d => d.data.name === "Salario Base");
  if (salarioBase) {
    document.getElementById("salaryBaseInput").value = salarioBase.data.value.toFixed(2);
  }
  document.getElementById("irpfInput").value = porIrpf.toFixed(2); // Mostrar valor actual de porIrpf
  //document.getElementById("SSInput").value = porSS.toFixed(2); // Mostrar valor actual de porSS
  document.getElementById("extraInput").value = extra.toFixed(2); // Mostrar valor actual de extra
  document.getElementById("extraCheckbox").checked = thisMoth; // Mostrar valor actual de thisMoth
  document.getElementById("overlay").style.display = "block";
  document.getElementById("myModal").style.display = "block";
}

// Guardar el valor actualizado de porIrpf
document.getElementById("editHEForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const HEVal = parseFloat(document.getElementById("HEInput").value);
  let pos = (HEVal !== 0);
  console.log(pos);

  if(pos === true && findNodeByName(data, "Horas extra") === null){
    const no = findNodeByName(data, "Complementos Salariales");
    no.children = no.children || [];
    no.children.push({
      name: "Horas extra",
      value: HEVal,
      info: "Horas extra trabajadas",
      canBeDeleted: false, // Por defecto, los nuevos nodos pueden ser eliminados
    });
  }else if (pos === true && findNodeByName(data, "Horas extra") !== null) {
    const no = findNodeByName(data, "Horas extra");
    no.value = HEVal;
  }else if(pos === false){
    console.log("El nodo 'Pagas Extra' se va a eliminar");
    deleteNode(findNodeInRootByName(root,"Horas extra"));
  }
  updateValues();
  renderTree();
  
  //document.getElementById("overlay").style.display = "none";
  //document.getElementById("myModal").style.display = "none";
});

// Guardar el valor actualizado de porIrpf
document.getElementById("editExtraForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const nuevoExtra = parseFloat(document.getElementById("extraInput").value);
  const moth = (document.getElementById("extraCheckbox").checked);

  console.log(moth);

  if (isNaN(nuevoExtra)) {
    alert("Por favor, introduce un valor numérico válido para las pagas extras.");
    return;
  }

  extra = nuevoExtra;
  thisMoth = moth;

  if(thisMoth === true && findNodeByName(data, "Pagas Extra") === null){
    const no = findNodeByName(data, "Complementos Salariales");
    no.children = no.children || [];
    no.children.push({
      name: "Pagas Extra",
      value: extra,
      info: "Dinero Percibido por la paga extra, normalmente 2 al año, una en junio y otra en diciembre",
      canBeDeleted: false, // Por defecto, los nuevos nodos pueden ser eliminados
    });
  }else if(thisMoth === false){
    console.log("El nodo 'Pagas Extra' se va a eliminar");
    deleteNode(findNodeInRootByName(root,"Pagas Extra"));
  }
  updateValues();
  renderTree();
  
  //document.getElementById("overlay").style.display = "none";
  //document.getElementById("myModal").style.display = "none";
});

document.getElementById("Company-fill").addEventListener("submit", (event) => {
  event.preventDefault();
  let dts = [
    document.getElementById("companyName").value,
    document.getElementById("companyAddress").value,
    document.getElementById("companyCIF").value,
    document.getElementById("workerName").value,
    document.getElementById("workerAddress").value,
    document.getElementById("DNI").value,
    document.getElementById("NAF").value,
    document.getElementById("profGroup").value,
    document.getElementById("cotGroup").value,
  ]
  generarPDF(dts);
  document.getElementById("overlay-pdf").style.display = "none";
  document.getElementById("modal-pdf").style.display = "none";
});


// Guardar el valor actualizado del salario base
document.getElementById("editSalaryForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const nuevoSalarioBase = parseFloat(document.getElementById("salaryBaseInput").value);
  if (isNaN(nuevoSalarioBase)) {
    alert("Por favor, introduce un valor numérico válido para el salario base.");
    return;
  }
  const salarioBaseNode = root.descendants().find(d => d.data.name === "Salario Base");
  if (salarioBaseNode) {
    salarioBaseNode.data.value = nuevoSalarioBase;
  }
  document.getElementById("overlay").style.display = "none";
  document.getElementById("myModal").style.display = "none";
  updateValues();
  renderTree();
});
/**
// Guardar el valor actualizado de porIrpf
document.getElementById("editSSForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const nuevoPorSS = parseFloat(document.getElementById("SSInput").value);
  if (isNaN(nuevoPorSS)) {
    alert("Por favor, introduce un valor numérico válido para el porcentaje de la SS.");
    return;
  }
  porSS = nuevoPorSS;
  //document.getElementById("overlay").style.display = "none";
  //document.getElementById("myModal").style.display = "none";
});
*/

// Guardar el valor actualizado de porIrpf
document.getElementById("editIrpfForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const nuevoPorIrpf = parseFloat(document.getElementById("irpfInput").value);
  if (isNaN(nuevoPorIrpf)) {
    alert("Por favor, introduce un valor numérico válido para el porcentaje IRPF.");
    return;
  }
  porIrpf = nuevoPorIrpf;
  //document.getElementById("overlay").style.display = "none";
  //document.getElementById("myModal").style.display = "none";
});

// Añadir un nuevo nodo hijo
document.getElementById("addChildForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const parentNodeName = document.getElementById("nodeParent").value;
  const newNodeName = document.getElementById("newNodeName").value.trim();
  const newNodeValue = parseFloat(document.getElementById("newNodeValue").value);

  if (!newNodeName) {
    alert("El nombre del nodo no puede estar vacío.");
    return;
  }
  if (isNaN(newNodeValue)) {
    alert("Por favor, introduce un valor numérico válido.");
    return;
  }

  const parentNode = findNodeByName(data, parentNodeName);
  if (parentNode) {
    parentNode.children = parentNode.children || [];
    parentNode.children.push({
      name: newNodeName,
      value: newNodeValue,
      info: "Nuevo nodo añadido",
      canBeDeleted: true, // Por defecto, los nuevos nodos pueden ser eliminados
      isContingenciaProfesional: false // Por defecto, no son de Contingencia Profesional
    });
    renderTree();
    document.getElementById("overlay").style.display = "none";
    document.getElementById("myModal").style.display = "none";
  } else {
    alert("Nodo padre no encontrado.");
  }
  renderTree();
});

// Actualizar valores al pulsar el botón "Actualizar"
document.getElementById("updateValuesBtn").addEventListener("click", () => {
  renderTree();
} );

function updateCAAA(){
  const devengosNode = findNodeByName(data, "Devengos");
  const horasExtraNode = findNodeByName(data, "Horas extra");

  const devengosSum = devengosNode ? parseFloat(sumRec(devengosNode)) : 0;
  const horasExtraValue = horasExtraNode ? parseFloat(horasExtraNode.value) : 0;
  
  let val = devengosSum - horasExtraValue;
  if(thisMoth === true){
    val -= findNodeByName(data, "Pagas Extra").value;
  }
  val += (extra*2)/12;
  CAAA = val;
}

function updateCAAP(){
  const horasExtraNode = findNodeByName(data, "Horas extra");
  const horasExtraValue = horasExtraNode ? parseFloat(horasExtraNode.value) : 0;
  CAAP = CAAA + horasExtraValue;
}

function updateCAHE(){
  const horasExtraNode = findNodeByName(data, "Horas extra");
  CAHE = horasExtraNode ? parseFloat(horasExtraNode.value) : 0;
}

function sumRec(node){
  let sum = 0.0;
  if (node.children) {
    for (let child of node.children) {
      sum += sumRec(child);
    }
  } else {
    sum = node.value;
  }
  return sum;
}

function updateValues() {
    // Paso 1: Actualizar "Devengos" recursivamente FINALIZADO
    const devengosNode = findNodeByName(data, "Devengos");
    if (devengosNode) {
      updateFromNode(devengosNode);
    } else {
      console.error("Nodo 'Devengos' no encontrado");
    }

    updateCAAA();
    updateCAAP();
    updateCAHE();
  
    // Paso 2: Calcular "IRPF" basado en "Devengos" y "porIrpf"
    const irpfNode = findNodeByName(data, "IRPF");

    if (irpfNode && devengosNode) {
      irpfNode.value = - (devengosNode.value * (porIrpf / 100)); // Deducción IRPF (negativo)
    } else {
      console.error("Nodo 'IRPF' o 'Devengos' no encontrado");
    }

    //paso3 acutalizar SS
    //CONTINGENCIAS COMUNES
    const CCNode = findNodeByName(data, "Contingencias Comunes");
    if(CCNode){
      CCNode.value = - (CAAA * (4.7/100));
    }
    //MEI
    const MEINode = findNodeByName(data, "MEI");
    if(MEINode){
      MEINode.value = - (CAAA * (0.13/100));
    }
    //DESEMPLEO
    const DESNode = findNodeByName(data, "Desempleo");
    if(DESNode){
      DESNode.value = - (CAAP * (1.55/100));
    }
    //FORMACION
    const FPNode = findNodeByName(data, "FP");
    if(FPNode){
      FPNode.value = - (CAAP * (0.1/100));
    }
    //HE
  
    // Paso 3: Actualizar "Deducciones" sumando sus hijos (incluyendo el nuevo "IRPF")
    const deduccionesNode = findNodeByName(data, "Deducciones");
    if (deduccionesNode) {
      updateFromNode(deduccionesNode);
    } else {
      console.error("Nodo 'Deducciones' no encontrado");
    }
  
    // Paso 4: Actualizar la raíz sumando sus hijos directos
    data.value = data.children.reduce((sum, child) => sum + child.value, 0);
  
    // Renderizar el árbol con los valores actualizados
    //renderTree();
};

// Eventos para abrir y cerrar el modal
document.getElementById("openModalBtn").addEventListener("click", abrirModal);
document.getElementById("generar-pdf-dialog").addEventListener("click", abrirCompanyModal);

document.getElementById("closeModalBtn").addEventListener("click", () => {
  document.getElementById("overlay").style.display = "none";
  document.getElementById("myModal").style.display = "none";
});

document.getElementById("closeModalBtn-pdf").addEventListener("click", () => {
  document.getElementById("overlay-pdf").style.display = "none";
  document.getElementById("modal-pdf").style.display = "none";
});

function fillPdf(dts){
  fillHeaders(dts);
  fillSalaryPerceptions();
  fillDeduccions();
}

function fillSalaryPerceptions(){
  fillBase();
  fillBonus();
  fillOther();
  fillDevenged();
}

function fillBase(){
  const node = findNodeByName(data,"Salario Base")
  console.log(node);
  const container = document.getElementById("percepciones-salariales-base");
  container.innerHTML = ""; // Clear previous content
  const nValue = parseFloat(node.value).toFixed(2) + " €";
  const fila = document.createElement("tr");
  fila.innerHTML = `<td class = "td-pdf" colspan="5">${node.name}</td><td class = "td-pdf" >${nValue}</td>`;
  container.appendChild(fila);
}

function fillBonus(){
  const node = findNodeByName(data,"Complementos Salariales")
  console.log(node);
  const container = document.getElementById("percepciones-salariales-complementos");
  container.innerHTML = ""; // Clear previous content
  node.children.forEach(child => {
      const nValue = parseFloat(child.value).toFixed(2) + " €";
      const fila = document.createElement("tr");
      fila.innerHTML = `<td class = "td-pdf" colspan="5">${child.name}</td><td class = "td-pdf">${nValue}</td>`;
      container.appendChild(fila);
  });
}

function fillOther(){
  const node = findNodeInRootByName(root,"Otras Percepciones");
  console.log(node);
  const container = document.getElementById("percepciones-no-salariales");
  container.innerHTML = ""; // Clear previous content
  node.children.forEach(percepcion => {
    if(percepcion.data.children.length > 0){
      const fila = document.createElement("tr");
      fila.innerHTML = `<td class = "td-pdf" colspan="6">${percepcion.data.name}</td>`;
      container.appendChild(fila);
      percepcion.children.forEach(child => {
          console.log(child);
          const nValue = parseFloat(child.value).toFixed(2) + " €";
          const fila = document.createElement("tr");
          fila.innerHTML = `<td class = "td-pdf" colspan="5">${child.name}</td><td class = "td-pdf">${nValue}</td>`;
          container.appendChild(fila);
      });
    }
  });
}

function fillDevenged(){
  const node = findNodeInRootByName(root,"Devengos");
  const container = document.getElementById("total-devengado");
  container.innerHTML = ""; // Clear previous content
  const nValue = parseFloat(node.data.value).toFixed(2) + " €";
  const fila = document.createElement("tr");
  fila.innerHTML = `<td class = "td-pdf bold" colspan="5">A. TOTAL DEVENGADO</td><td class = "td-pdf">${nValue}</td>`;
  container.appendChild(fila);
}

function fillDeduccions(){
  fillContributions();
  fillTotalDeduccions();
  fillTotal();
}

function fillContributions(){
  const node = findNodeInRootByName(root,"Seguridad Social");
  const container = document.getElementById("SS");
  container.innerHTML = ""; // Clear previous content
  let i = 0;
  node.children.forEach(child => {
    console.log(node.children[i]);
    const nValue = parseFloat(child.data.value).toFixed(2) + " €";
    const fila = document.createElement("tr");
    fila.innerHTML = `
    <tr class = "tr-pdf">
        <td class = "td-pdf" colspan="3">${child.data.name}</td>
        <td class = "td-pdf" id = "base-imponible-CAAAA">${i<2?CAAA:CAAAP} €</td>
        <td class = "td-pdf" id = "porcentaje-imponible">${i===0?4.7:i===1?0.13:i===2?0.1:1.55} %</td>
        <td class = "td-pdf" id = total>${nValue}</td>
      </tr>
    `;
    container.appendChild(fila);
    i++;
  });
  let nValue = parseFloat(node.parent.data.value).toFixed(2) + " €";
  let fila = document.createElement("tr");
  fila.innerHTML = `
    <tr class = "tr-pdf">
      <td class = "td-pdf bold" colspan="5">1. Total aportaciones</td><td class = "td-pdf">${nValue}</td>
    </tr>
  `;
  container.appendChild(fila);
  const node2 = findNodeInRootByName(root,"IRPF");
  nValue = parseFloat(node.data.value).toFixed(2) + " €";
  fila = document.createElement("tr");
  fila.innerHTML = `
    <tr class = "tr-pdf">
      <td class = "td-pdf bold" colspan="4">2. Impuestos sobre la renta de las personas físicas</td>
      <td class = "td-pdf" id = "porcentaje-imponible">${porIrpf} %</td>
      <td class = "td-pdf">${nValue}</td>
    </tr>
  `;
  container.appendChild(fila);
}

function fillTotalDeduccions(){
  const node = findNodeInRootByName(root,"Deducciones");
  const container = document.getElementById("total-deducciones");
  container.innerHTML = ""; // Clear previous content
  const nValue = parseFloat(node.data.value).toFixed(2) + " €";
  const fila = document.createElement("tr");
  fila.innerHTML = `
    <tr class = "tr-pdf">
      <td class = "td-pdf bold" colspan="5">B. TOTAL A DEDUCIR (1+2)</td>
      <td class = "td-pdf">${nValue}</td>
    </tr>
  `;
  container.appendChild(fila);
}

function fillTotal(){
  let container = document.getElementById("total-a-percibir");
  container.innerHTML = ""; // Clear previous content
  let val = root.data.value.toFixed(2) + " €";
  let fila = document.createElement("tr");
  fila.innerHTML = `
    <tr class = "tr-pdf">
      <td class = "td-pdf" colspan="5" class="bold">LÍQUIDO TOTAL A PERCIBIR (A-B)</td>
      <td class = "td-pdf">${val}</td>
    </tr>
  `;
  container.appendChild(fila);
}

function fillHeaders(dts){
  
  let container = document.getElementById("dtsinit");
  container.innerHTML = ""; // Clear previous content
  let fila = document.createElement("tr");
  fila.innerHTML = `
    <tr class = "tr-pdf">
      <td class = "td-pdf" colspan="3">
        Nombre: ${dts[0]}<br>
        Domicilio: ${dts[1]}<br>
        C.I.F.:${dts[2]}<br>
      </td>
      
      <td class = "td-pdf" colspan="3">
        Nombre: ${dts[3]}<br>
        NIF: ${dts[4]}<br>
        NAF: ${dts[5]}<br>
        Categoría o grupo profesional: ${dts[6]}<br>
        Grupo Cotiz.: ${dts[7]}<br>
      </td>
    </tr>
  `;
  container.appendChild(fila);

  let container2 = document.getElementById("liqPer");
  container2.innerHTML = ""; // Clear previous content
  let fila2 = document.createElement("tr");
  fila2.innerHTML = `
    <tr>
      <td class = "td-pdf" colspan = "6"> Mes de liquidacion: </td>
    </tr>
  `;
  container2.appendChild(fila2);
}

// Renderizar el árbol inicialmente
renderTree();