import React from 'react';
import PropTypes from 'prop-types';

const CountdownBox = ({ left, divideBy, label }) => {
    return (
        <div className="countdown__box">
            <div className="countdown__box_circles">
                <svg height="110" width="110">
                    <circle
                        stroke="#D7ECEF"
                        strokeWidth="9"
                        r="25"
                        cx="40"
                        cy="40"
                    />
                    <circle
                        stroke="#FE4720"
                        strokeDashoffset={-((left / divideBy) * 25 * 2 * Math.PI) + 25 * 2 * Math.PI}
                        strokeDasharray={25 * 2 * Math.PI}
                        strokeWidth="8"
                        r="25"
                        cx="40"
                        cy="40"
                    />
                </svg>
                <div className="countdown__box_left_mobile">
                    <div className='digits'>
                        {left}
                    </div>
                    <div className='labels'>
                        {label}
                    </div>
                </div>
            </div>
            <p className="countdown__box_label"></p>
        </div>
    );
}

CountdownBox.propTypes = {
    left: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    divideBy: PropTypes.number.isRequired,
    label: PropTypes.string.isRequired
}

export default CountdownBox;