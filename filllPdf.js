function fillPdf(){
    fillSalaryPerceptions();
}

function fillSalaryPerceptions(){
    fillBase();
    fillBonus();
}

function fillBase(){
    const node = findNodeByName(data,"Salario Base")
    console.log(node);
    const container = document.getElementById("percepciones-salariales-base");
    container.innerHTML = ""; // Clear previous content
    const nValue = parseFloat(node.value) + " €";
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
        const nValue = parseFloat(child.value) + " €";
        const fila = document.createElement("tr");
        fila.innerHTML = `<td class = "td-pdf" colspan="5">${child.name}</td><td class = "td-pdf">${nValue}</td>`;
        container.appendChild(fila);
    });
}