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
                        <span class="tooltip-text">Move</span>
                    </div>
                </button>
                <button className="icon-button" onClick={outdentCurriculum} >
                    <div className="tooltip">
                        <ArrowBackIcon />
                        <span class="tooltip-text">Outdent</span>
                    </div>
                </button>
                <button className="icon-button" onClick={indentCurriculum} >
                    <div className="tooltip">
                        <ArrowForwardIcon />
                        <span class="tooltip-text">Indent</span>
                    </div>
                </button>
                <button className="icon-button" onClick={deleteCurriculum} >
                    <div className="tooltip">
                        <DeleteIcon />
                        <span class="tooltip-text">Delete</span>
                    </div>
                   
                </button>
            </div>
            <div className="col-3"></div>
            <div className="col-9 list-content">
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