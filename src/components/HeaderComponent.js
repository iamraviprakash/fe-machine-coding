import React from 'react';
// import '../shared/style.css';

const Header = () => {

    return(
        <>
        <div className="course-name">
            MATHEMATICS
        </div>
        <div className="header container">
            <div className="col-2">
                <div className="title">Actions</div>
                <div className="subtitle">
                    Move, Indent, Outdent, Delete
                </div>
            </div>
            <div className="col-10">
                <div className="title">Standard</div>
                <div className="subtitle">
                    The text of the standard
                </div>
            </div>
        </div>
       </>
    )
}

export default Header;