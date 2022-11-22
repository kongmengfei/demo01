import { useRouteError } from "react-router-dom";
import _ from 'lodash';

export default function ErrorPage() {
    const error = useRouteError();
    console.error(error);

    return (
        <div id="error-page">
            <h1>Oops!</h1>
            <p>Sorry, an unexpected error has occurred.</p>
            <p>
                <i>{_.get(error, 'statusText') || _.get(error, 'message')}</i>
            </p>
        </div>
    );
}