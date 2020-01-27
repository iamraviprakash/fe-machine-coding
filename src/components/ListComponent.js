import React from "react";
import ListItem from './ListItemComponent';

const List = (props) => {

    // For Drag and drop

    function renderList({curriculumlist, deleteCurriculum, indentCurriculum, outdentCurriculum, updateCurriculum, moveCurriculum}) {
       
        function traverseTree(data) {
            var tempList = []
            var temp;
            if (data.hasOwnProperty("child")){
                tempList.push(React.createElement("li", {key: data["id"]}, 
                <ListItem
                    key={data["id"]}
                    curriculumId={data["id"]}
                    curriculumContent={data["title"]}
                    deleteCurriculum={(id) => deleteCurriculum(id)}
                    indentCurriculum={(id) => indentCurriculum(id)}
                    outdentCurriculum={(id) => outdentCurriculum(id)}
                    updateCurriculum={(id, content) => updateCurriculum(id, content)}
                    moveCurriculum={(sourceId, destinationId) => moveCurriculum(sourceId, destinationId)}
                />))
                
                if(data["child"].length > 0) {
                    temp = traverseTree(data["child"])
                    tempList.push(temp)
                }
            }
            else {
                for(var key in data) {
                    temp = traverseTree(data[key])
                    tempList.push(temp)
                }
            }
            return React.createElement("ul", {type: "none"}, tempList)
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