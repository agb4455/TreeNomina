function fillPdf(){
    fillSalaryPerceptions();
}

function fillSalaryPerceptions(){
    fillBase();
    fillBonus();
<<<<<<< HEAD
    fillOther();
=======
>>>>>>> b1f8208733f243d251e6ab728ab19d836ec7efe9
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
<<<<<<< HEAD
}

function fillOther(){
    const node = findNodeInRootByName(root,"Otras Percepciones");
    console.log(node);
    const container = document.getElementById("percepciones-no-salariales");
    container.innerHTML = ""; // Clear previous content
    node.children.forEach(percepcion => {
        const fila = document.createElement("tr");
        fila.innerHTML = `<td class = "td-pdf" colspan="6">${percepcion.data.name}</td>`;
        container.appendChild(fila);
        if(percepcion.data.children.length !== 0){
            percepcion.children.forEach(child => {
                console.log(child);
                const nValue = parseFloat(child.value) + " €";
                const fila = document.createElement("tr");
                fila.innerHTML = `<td class = "td-pdf" colspan="5">${child.name}</td><td class = "td-pdf">${nValue}</td>`;
                container.appendChild(fila);
            });
        }
    });
=======
>>>>>>> b1f8208733f243d251e6ab728ab19d836ec7efe9
}