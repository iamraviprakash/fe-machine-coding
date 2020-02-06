import React from "react";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import DragIndicatorIcon from "@material-ui/icons/DragIndicator";
import DeleteIcon from "@material-ui/icons/Delete";
import "../shared/style.css";

const ListItem = (props) => {

    function indentCurriculum() {
        props.indentCurriculum(props.curriculumId)
    }

    function outdentCurriculum() {
        props.outdentCurriculum(props.curriculumId)
    }

    function deleteCurriculum() {
        props.deleteCurriculum(props.curriculumId)
    }

    function updateCurriculum(event) {
        props.updateCurriculum(props.curriculumId, event.target.value)
    }

    function moveCurriculum(destinationId) {
        props.moveCurriculum(props.curriculumId, destinationId)
    }

    function handleChangeEvent(val) {
        return val
    }

    return(
        <div className="container">
            <div className="col-2 icons-set">
                <button className="icon-button" onClick={moveCurriculum}>
                    <div className="tooltip">
                        <DragIndicatorIcon />
                        <span className="tooltip-text">Move</span>
                    </div>
                </button>
                <button className="icon-button" onClick={outdentCurriculum} >
                    <div className="tooltip">
                        <ArrowBackIcon />
                        <span className="tooltip-text">Outdent</span>
                    </div>
                </button>
                <button className="icon-button" onClick={indentCurriculum} >
                    <div className="tooltip">
                        <ArrowForwardIcon />
                        <span className="tooltip-text">Indent</span>
                    </div>
                </button>
                <button className="icon-button" onClick={deleteCurriculum} >
                    <div className="tooltip">
                        <DeleteIcon />
                        <span className="tooltip-text">Delete</span>
                    </div>
                </button>
            </div>
            <div className="col-2">
                <div style={{width: 200, height: 50}}></div>
            </div>
            <div className="col-10 list-content">
                <div className="divider" >
                </div>
                <div className="list-text">
                    <input 
                        defaultValue={props.curriculumContent} 
                        placeholder="Enter curriculum" 
                        onChange={() => handleChangeEvent(props.curriculumContent)}
                        onBlur={updateCurriculum}
                    />
                </div>
            </div>
        </div>
    );
}

export default ListItem;