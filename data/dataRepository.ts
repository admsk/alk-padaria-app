import { TextComponent } from "react-native";
import Constants from "../constants/common";
import AppConstants from "../constants/common";
import Utils from "@/global/helper/utils";

class getData {

    static async get(qry: string) {

        const token = await Utils.getToken();

        try {
            const response = await fetch(`${qry}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json;odata=verbose'
                }
            });

            const data = await response.json();

            return data.d.results;

        } catch (error) {
            console.log(error);
        }
    }

    static async newItem(data: any) {

        try {
            const accessToken = await Utils.getToken();
            const digets = await Utils.getDigest(accessToken);

            const response = await fetch(
                'https://alkmtech.sharepoint.com/sites/novaalianca/_api/web/lists/getbytitle(\'Devices\')/items',
                {
                    method: 'POST',
                    headers: {
                        "Authorization": "Bearer " + accessToken,
                        'Accept': 'application/json;odata=verbose',
                        'Content-Type': 'application/json;odata=verbose',
                        'X-RequestDigest': digets,
                    },
                    body: data,
                }
                
            );

        } catch (error) {
            console.log('Erro ao adicionar o item:', error);
        }
    }

    static async set(listId: string, itemId: string, body: {}) {

        const accessToken = await Utils.getToken();

        const digets = await Utils.getDigest(accessToken);

        if (body == null) {
            body = {
                Tempo: 15,
                Intervalo: 0
            };
        }

        try {
            const response = await fetch(`${Constants.WEBURL}/_api/web/lists/GetByTitle('Notificacoes')/items(1)`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json;odata=verbose',
                    'Content-Type': 'application/json',
                    'X-RequestDigest': `${digets}`,
                    'Authorization': `Bearer ${accessToken}`,
                    'If-Match': "*",
                    'X-HTTP-Method': 'MERGE',
                },
                body: JSON.stringify(body),
            });

        } catch (error) {
        }

    }


}



export default getData;