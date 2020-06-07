import api from './api';

export default class Item {
    async list() {
        return api.get('items')
            .then(response => {
                return response.data;
            });
    }
};