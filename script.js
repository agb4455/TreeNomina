// Variable global porIrpf
let porIrpf = 0.0;

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
};

// Función para eliminar un nodo
function deleteNode(node) {
  const parent = node.parent;
  if (parent) {
    const index = parent.data.children.findIndex(child => child.name === node.data.name);
    if (index !== -1) {
      parent.data.children.splice(index, 1);
      renderTree(); // Volver a renderizar el árbol
    }
  }
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
function abrirModal() {
  const salarioBase = root.descendants().find(d => d.data.name === "Salario Base");
  if (salarioBase) {
    document.getElementById("salaryBaseInput").value = salarioBase.data.value.toFixed(2);
  }
  document.getElementById("irpfInput").value = porIrpf.toFixed(2); // Mostrar valor actual de porIrpf
  document.getElementById("overlay").style.display = "block";
  document.getElementById("myModal").style.display = "block";
}

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
  renderTree();
});

// Guardar el valor actualizado de porIrpf
document.getElementById("editIrpfForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const nuevoPorIrpf = parseFloat(document.getElementById("irpfInput").value);
  if (isNaN(nuevoPorIrpf)) {
    alert("Por favor, introduce un valor numérico válido para el porcentaje IRPF.");
    return;
  }
  porIrpf = nuevoPorIrpf;
  document.getElementById("overlay").style.display = "none";
  document.getElementById("myModal").style.display = "none";
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
});

// Actualizar valores al pulsar el botón "Actualizar"
document.getElementById("updateValuesBtn").addEventListener("click", () => {
  // Paso 1: Actualizar "Devengos" recursivamente
  const devengosNode = findNodeByName(data, "Devengos");
  if (devengosNode) {
    updateFromNode(devengosNode);
  } else {
    console.error("Nodo 'Devengos' no encontrado");
  }

  // Paso 2: Calcular "IRPF" basado en "Devengos" y "porIrpf"
  const irpfNode = findNodeByName(data, "IRPF");
  if (irpfNode && devengosNode) {
    irpfNode.value = - (devengosNode.value * (porIrpf / 100)); // Deducción IRPF (negativo)
  } else {
    console.error("Nodo 'IRPF' o 'Devengos' no encontrado");
  }

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
  renderTree();
});

// Eventos para abrir y cerrar el modal
document.getElementById("openModalBtn").addEventListener("click", abrirModal);
document.getElementById("closeModalBtn").addEventListener("click", () => {
  document.getElementById("overlay").style.display = "none";
  document.getElementById("myModal").style.display = "none";
});

// Renderizar el árbol inicialmente
renderTree();