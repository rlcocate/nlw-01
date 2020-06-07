import api from './api';
import City from '../models/City';
import UF from '../models/Uf';

export default class IBGE {

    async listUFs() {
        return await api.get<UF[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome')
            .then(response => {
                return response.data.map(uf => uf.sigla);
            });
    }

    async listCities(uf: string) {
        return await api.get<City[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios?orderBy=nome`)
            .then(response => {
                return response.data.map(city => city.nome);
            })
    }

};