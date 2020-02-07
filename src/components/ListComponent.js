import React from "react";
import ListItem from './ListItemComponent';
// import '../shared/style.css';

const List = (props) => {

    // For Drag and drop


    function enableDrag(id) {
        // console.log("enable drag", id)
        document.querySelector('[data-id="'+id+'"]').setAttribute("draggable", "true")
    }

    function disableDrag(e) {
        if (e.stopPropagation) {
            e.stopPropagation(); 
        }
        e.currentTarget.removeAttribute("draggable")
        // console.log("disable drag", e.currentTarget.dataset.id)
    }

    function drag(e) {
        e.dataTransfer.setData("text", e.target.dataset.id);
    }
    
    function allowDrop(e) {
      if (e.preventDefault) {
        e.preventDefault(); 
      }
    }
    
    function drop(e) {
    
        if (e.stopPropagation) {
            e.stopPropagation(); 
        }
        
        var srcElmnt, destElmnt, srcId, destId, srcElmntCopy;

        srcId = e.dataTransfer.getData("text");
        destId = e.currentTarget.dataset.id;
        
        // console.log(srcId, destId);

        if (srcId !== destId) {
            // srcElmnt = document.querySelector('[data-id="'+srcId+'"]');
            // srcElmntCopy = srcElmnt;  
            // srcElmnt.remove();
            // destElmnt = document.querySelector('[data-id="'+destId+'"]');
            // destElmnt.parentNode.insertBefore(srcElmntCopy, destElmnt.nextSibling);

            props.moveCurriculum(srcId, destId);
            document.querySelector('[data-id="'+srcId+'"]').removeAttribute("draggable")
        }
    }


    function renderList({curriculumlist, deleteCurriculum, indentCurriculum, outdentCurriculum, updateCurriculum}) {
       
        function traverseTree(data) {
            var tempChildList = [], tempChild, tempTitle;
            if (data.hasOwnProperty("child")){

                tempTitle = React.createElement("div", {key: data["id"]}, 
                <ListItem
                    key={data["id"]}
                    curriculumId={data["id"]}
                    curriculumContent={data["title"]}
                    deleteCurriculum={(id) => deleteCurriculum(id)}
                    indentCurriculum={(id) => indentCurriculum(id)}
                    outdentCurriculum={(id) => outdentCurriculum(id)}
                    updateCurriculum={(id, content) => updateCurriculum(id, content)}
                    enableDrag={(id) => enableDrag(id)}
                    // disableDrag={(id) => disableDrag(id)}
                />)
               
                if(data["child"].length > 0) {
                    tempChildList = traverseTree(data["child"])
                    return React.createElement("li", {
                        className: "dd-item", 
                        'data-id': data["id"], 
                        // draggable:"true", 
                        onDrop: drop,
                        onDragOver: allowDrop,
                        onDragStart: drag,
                        onDragEnd: disableDrag
                    }, [tempTitle, tempChildList]) 
                    
                } else {
                    return React.createElement("li", {
                        className: "dd-item", 
                        'data-id': data["id"], 
                        // draggable:"true",
                        onDrop: drop,
                        onDragOver: allowDrop,
                        onDragStart: drag,
                        onDragEnd: disableDrag
                    }, tempTitle)
                }
            }
            else {
                for(var key in data) {
                    tempChild = traverseTree(data[key])
                    tempChildList.push(tempChild)
                }
                return React.createElement("ul", {className: "dd-list", type: "none"}, tempChildList)
            }
          }

        return(
           traverseTree(curriculumlist)
        )
    }

   // console.log(props.curriculumlist)

    return(
        <div className="list-container">
            { renderList(props) }
        </div>
    );
}

export default List;