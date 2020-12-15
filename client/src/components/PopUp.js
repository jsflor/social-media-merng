import {Popup} from "semantic-ui-react";

const PopUp = ({content, children}) => {
    return <Popup inverted content={content} trigger={children} />
};

export default PopUp;
