import config from "../config.json";

const BASE_URL_FN = function (name, page = 1) {
    return `${config.BASE_URL}${name}&page=${page}&per_page=${config.per_page}&key=${config.KEY_API}`;
};

export { BASE_URL_FN };