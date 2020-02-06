import React from "react";
import ListItem from './ListItemComponent';

const List = (props) => {

    // For Drag and drop

    function renderList({curriculumlist, deleteCurriculum, indentCurriculum, outdentCurriculum, updateCurriculum, moveCurriculum}) {
       
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
                    moveCurriculum={(sourceId, destinationId) => moveCurriculum(sourceId, destinationId)}
                />)
               
                if(data["child"].length > 0) {
                    tempChildList = traverseTree(data["child"])
                    return React.createElement("li", {className: "dd-item", 'data-id': data["id"]}, [tempTitle, tempChildList]) 
                    
                } else {
                    return React.createElement("li", {className: "dd-item", 'data-id': data["id"]}, tempTitle)
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