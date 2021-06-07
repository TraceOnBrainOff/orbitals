//get shape configuration via a callback from the fields on the left side of the screen
//parse data into functional parameters
//render shape via renderer.js

var descriptors = []

function addDescriptorCallback()
{
    var edge_count = document.getElementById("edge_count_html").value;
    var color = document.getElementById("color_html").value;
    color = color.substring(1);
    if(!edge_count){
        alert("Edge count is undefined!");
        return;
    }
    edge_count = Math.max(16, Math.min(edge_count, 2));
    var table = document.getElementById("descriptor_table");
    var new_row = table.insertRow(-1);
    var new_cell1 = new_row.insertCell(0);
    new_cell1.innerHTML = edge_count;
    new_cell1.setAttribute('name', 'edge_counts[]');
    var input1 = document.createElement("input");
    input1.setAttribute("type", "hidden");
    input1.setAttribute("name", "edge_counts[]");
    input1.setAttribute("value", edge_count);
    //new_cell1.setAttribute('id', 'edge_counts');
    var new_cell2 = new_row.insertCell(1);
    new_cell2.innerHTML = color;
    new_cell2.setAttribute('name', 'colors[]');
    var input2 = document.createElement("input");
    input2.setAttribute("type", "hidden");
    input2.setAttribute("name", "colors[]");
    input2.setAttribute("value", color);
    //new_cell2.setAttribute('id', 'colors');
    document.getElementById("shape_form_html").appendChild(input1);
    document.getElementById("shape_form_html").appendChild(input2);
    descriptors.push({
        edge_count: edge_count,
        color: color
    })
    setDescriptors(descriptors);
}

function validateForm() 
{
    var title = document.getElementById("title_html").value;
    if(!title)
    {
        alert("Title is undefined!");
        return false;
    }
    if(descriptors.length===0)
    {
        alert("No descriptors were specified!");
        return false;
    }
    return true;
}