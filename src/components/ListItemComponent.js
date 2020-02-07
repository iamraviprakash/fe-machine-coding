import React from "react";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import DragIndicatorIcon from "@material-ui/icons/DragIndicator";
import DeleteIcon from "@material-ui/icons/Delete";
// import "../shared/style.css";

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

    function enableDrag() {
        props.enableDrag(props.curriculumId)
    }

    function disableDrag() {
        props.disableDrag(props.curriculumId)
    }

    function handleChangeEvent(val) {
        return val
    }

    return(
        <div className="container">
            <div className="col-2 icons-set">
                <button className="icon-button" onMouseDown={enableDrag}>
                    <DragIndicatorIcon />
                </button>
                <button className="icon-button" onClick={outdentCurriculum} >
                    <ArrowBackIcon />
                </button>
                <button className="icon-button" onClick={indentCurriculum} >
                    <ArrowForwardIcon />
                </button>
                <button className="icon-button" onClick={deleteCurriculum} >
                    <DeleteIcon />
                </button>
            </div>
            <div className="col-2">
                <div className="buffer-space"></div>
            </div>
            <div className="col-10 list-content">
                <div className="divider" ></div>
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
        // props.curriculumContent
    );
}

export default ListItem;