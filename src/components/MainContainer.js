import React, { Component } from "react";
import List from "./ListComponent";
import Header from "./HeaderComponent";
import data from "../shared/data.json";
import '../shared/style.css';
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";

class Main extends Component {

    constructor(props) {
        super(props)

        this.state = {
            curriculumlist : data["curriculum"],
            idIndexMap: {},
            parentChildMap: {},
            count: 6
        }

        this.addCurriculum = this.addCurriculum.bind(this)
        this.deleteCurriculum = this.deleteCurriculum.bind(this)
        this.updateCurriculum = this.updateCurriculum.bind(this)
        this.moveCurriculum = this.moveCurriculum.bind(this)
        this.indentCurriculum = this.indentCurriculum.bind(this)
        this.outdentCurriculum = this.outdentCurriculum.bind(this)

        this.deleteCurriculumNode = this.deleteCurriculumNode.bind(this)
        this.updateCurriculumTree = this.updateCurriculumTree.bind(this)
        this.generatePath = this.generatePath.bind(this)
        this.outdentCurriculumNode = this.outdentCurriculumNode.bind(this)
        this.indentCurriculumNode = this.indentCurriculumNode.bind(this)
        this.mapParentChildId = this.mapParentChildId.bind(this)
        this.mapIdIndex = this.mapIdIndex.bind(this)
        this.updateMap = this.updateMap.bind(this)
    }

    // componentDidMount() {
    //     var items = document.querySelectorAll("ul");
    //     items.forEach(item => {
    //         item.draggable = true
    //         item.addEventListener("dragover", (event) => {
    //             console.log(event.target.innerHTML)
    //         }, true)
    //     })
    // }

    updateMap() {
        var tempCurriculumList = this.state.curriculumlist
        var tempParentChildMap = this.state.parentChildMap
        var tempIdIndexMap = this.state.idIndexMap

        this.mapParentChildId(0, tempParentChildMap, tempCurriculumList)
        this.mapIdIndex(null, tempIdIndexMap, tempCurriculumList)
        this.setState({
            parentChildMap: tempParentChildMap,
            idIndexMap: tempIdIndexMap
        })
    }


    UNSAFE_componentWillMount() {
        var tempCurriculumList = this.state.curriculumlist
        var tempParentChildMap = this.state.parentChildMap
        var tempIdIndexMap = this.state.idIndexMap

        this.mapParentChildId(0, tempParentChildMap, tempCurriculumList)
        this.mapIdIndex(null, tempIdIndexMap, tempCurriculumList)
        this.setState({
            parentChildMap: tempParentChildMap,
            idIndexMap: tempIdIndexMap
        })
    }

    mapParentChildId(parent, parentChildMap, data) {
        if (data.hasOwnProperty("child")){
            
            parentChildMap[data["id"]] = Number(parent)
            
            if(data["child"].length > 0) {
                parent = data["id"]
                this.mapParentChildId(parent, parentChildMap, data["child"])
            } 
        }
        else {
            for(var key in data) {
                this.mapParentChildId(parent, parentChildMap, data[key])
            }
        }
    }

    mapIdIndex(index, idIndexMap, data) {
        if (data.hasOwnProperty("child")){
            
            idIndexMap[data["id"]] = Number(index)
            
            if(data["child"].length > 0) {
                this.mapIdIndex(null, idIndexMap, data["child"])
            } 
        }
        else {
            for(var key in data) {
                this.mapIdIndex(key, idIndexMap, data[key])
            }
        }
    }


    generatePath(id, idIndexMap, parentChildMap) {
        var path = [];
        while(parentChildMap[id] !== 0) {
            path.push(idIndexMap[id])
            id = parentChildMap[id]
        }
        path.push(idIndexMap[id])
    
        return path;
    }

    deleteCurriculumNode(id, data) {
        if (data.hasOwnProperty("child")){
            if(data["child"].length > 0) {
                this.deleteCurriculumNode(id, data["child"])
            } else
                return;
        } else {
            for(var key in data) {
                if(data[key]["id"] == id) {
                    data.splice(key, 1)
                    return;
                }
                this.deleteCurriculumNode(id, data[key])
            }
        }        
    }

    updateCurriculumTree(id, newTitle, data) {
        if (data.hasOwnProperty("child")){
            if(data["id"] == id) {
                data["title"] = newTitle
                return;
            } else if(data["child"].length > 0) {
                this.updateCurriculumTree(id, newTitle, data["child"])
            }
        }
        else {
            for(var key in data) {
                this.updateCurriculumTree(id, newTitle, data[key])
            }
        }
    }

    outdentCurriculumNode(path, data) {
        var childNode, pathIndex, tempData
        if( path.length > 2 ){
            pathIndex = path.pop()
            tempData = data[pathIndex]["child"]
            this.outdentCurriculumNode(path, tempData)
        } else if ( path.length == 2 ) {
            pathIndex = path.pop()
            childNode = data[pathIndex]["child"][path[0]]
            data[pathIndex]["child"].splice(path[0], 1)
            data.splice(pathIndex+1, 0, childNode)
        } else
            return;
    }

    indentCurriculumNode(path, data) {
        var childNode, pathIndex, tempData
        if( path.length > 1){
            pathIndex = path.pop()
            tempData = data[pathIndex]["child"]
            this.indentCurriculumNode(path, tempData)
        } else if ( path.length == 1 && path[0] > 0 ) {
            childNode = data[path[0]]
            data.splice(path[0], 1)
            data[path[0]-1]["child"].push(childNode)
        } else
            return;
    }

    addCurriculum() {
        var newCurriculum = {
            "id": this.state.count,
            "title": "Enter Curriculum",
            "child": []
        }

        var tempCurriculumList = this.state.curriculumlist

        tempCurriculumList.push(newCurriculum)

        this.setState({
            count: this.state.count + 1,
            curriculumlist: tempCurriculumList
        })

        this.updateMap()
    }

    deleteCurriculum(id) {
        var tempCurriculumList = this.state.curriculumlist
        
        this.deleteCurriculumNode(id, tempCurriculumList)

        this.setState({
            curriculumlist: tempCurriculumList
        })

        this.updateMap()
    }

    updateCurriculum(id, text) {
        var tempCurriculumList = this.state.curriculumlist

        this.updateCurriculumTree(id, text, tempCurriculumList)

        this.setState({
            curriculumlist: tempCurriculumList
        })
    }

    indentCurriculum(id) {
        var tempCurriculumList = this.state.curriculumlist
        var path = this.generatePath(id, this.state.idIndexMap, this.state.parentChildMap)
        this.indentCurriculumNode(path, tempCurriculumList)
        this.setState({
            curriculumlist: tempCurriculumList
        })

        this.updateMap()
    }

    outdentCurriculum(id) {
        var tempCurriculumList = this.state.curriculumlist
        var path = this.generatePath(id, this.state.idIndexMap, this.state.parentChildMap)
        this.outdentCurriculumNode(path, tempCurriculumList)
        this.setState({
            curriculumlist: tempCurriculumList
        })

        this.updateMap()
    }


    moveCurriculum(sourceId, destinationId) {
        console.log("moveCurriculum");
    }

    render () {
        return(
            <div className="container course">
                <div className="col-2"></div>
                <div className="col-8">
                    <Header />
                    <List 
                        curriculumlist={this.state.curriculumlist} 
                        deleteCurriculum={(id) => this.deleteCurriculum(id)}
                        indentCurriculum={(id) => this.indentCurriculum(id)}
                        outdentCurriculum={(id) => this.outdentCurriculum(id)}
                        updateCurriculum={(id, content) => this.updateCurriculum(id, content)}
                        moveCurriculum={(sourceId, destinationId) => this.moveCurriculum(sourceId, destinationId)}
                    />
                    <button className="button flex-container" onClick={this.addCurriculum}>
                        <div className="button-icon">
                            <AddCircleOutlineIcon /> 
                        </div>
                        <div className="button-text">Add a standard</div>
                    </button>
                    <a href={"data:text/json;charset=utf-8,"+ encodeURIComponent(JSON.stringify({"curriculum": this.state.curriculumlist}))} download="data.json">
                        <button className="button flex-container">
                            <div className="button-text">Download JSON data</div>
                        </button>
                    </a>
                </div>
                <div className="col-2"></div>
            </div>
        );
    }
}

export default Main;