//Grab all entries from the database
//compile all shapes based on data from the database
//check if the site was redirected and set the current showcased shape to that, if not default to 1
//only a single canvas exists on the screen and the button callbacks just change the current showcased index
//rendering is done in renderer.js

function insertDescriptor(descriptor) {
    var filtered = figures.filter(function(figure) {
        return figure.id == descriptor.figure_id;
    });
    let currentFigure = filtered[0];
    currentFigure.descriptors.push({
        i: descriptor["i"],
        edge_count: descriptor["edge_count"],
        angle_offset: descriptor["angle_offset"],
        color: descriptor["color"],
        is_endpiece: descriptor["is_endpiece"]
    });
};

function changeDisplayedShape(id)
{
    var filtered = figures.filter(function(figure) {
        return figure.id == id;
    });
    setDescriptors(filtered[0].descriptors);
}

window.addEventListener('load', function () {
    for(const figure of figures){
        figure.descriptors = new Array();
    }
    for(const descriptor of descriptors) {
        insertDescriptor(descriptor);
    }
    setDescriptors(figures[0].descriptors);
    var table = document.getElementById("title_table");
    for(const figure of figures){
        var row = table.insertRow(-1);
        row.innerHTML = "<button onclick=\"changeDisplayedShape("+figure.id+")\">"+figure.title+"</button>";
    }
})