import api from './api';
// import IPoint from '../models/Point';

export default class Point {
    async create(data: FormData) {
        console.log('create, api data', data)
        await api.post('points', data);
    }
};