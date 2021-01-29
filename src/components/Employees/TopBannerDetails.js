import React from 'react';
import Summarry from './Summarry';
import Total from './Total';

function TopBannerDetails(props) {
    return (

        <div className="top-banner-wrapper">
            <Total total={props.total}></Total>
            <Summarry
                highest_earning={props.highest_earning}
                recent_joined={props.recent_joined}
            ></Summarry>
        </div>
    );
}

export default TopBannerDetails;