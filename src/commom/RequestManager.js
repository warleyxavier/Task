import { Container } from "typedi";

import Config from "../../config/Config";

RequestManager = () => {
    return {
        baseURL: Config.serverHost,
        headers: { 'Authorization': Container.get('web-token') },    
    };
}

export default RequestManager;
