import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import axios from 'axios';
import Constants from '@/constants/common';

class Utils {

  static async getToken() {

    const authUrl = `https://accounts.accesscontrol.windows.net/32d8d55b-7cc2-4709-93a8-6a57aa2b53b7/tokens/OAuth/2`;

    const form = new URLSearchParams();
    form.append('grant_type', 'client_credentials');
    form.append('client_id', '3272c9b7-3bd7-4d03-b519-d5ecea62f270@32d8d55b-7cc2-4709-93a8-6a57aa2b53b7');
    form.append('client_secret', 'XmJkcgIjbMhntaL/JSLLI/DFFcHF9vM31XeDm4+sBX0=');
    form.append('resource', '00000003-0000-0ff1-ce00-000000000000/alkmtech.sharepoint.com@32d8d55b-7cc2-4709-93a8-6a57aa2b53b7');

    try {
      const response = await fetch(authUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: form.toString()
      });
      const data = await response.json();
      return data.access_token;
    } catch (error) {
      console.error('Error obtaining access token:', error);
    }
  }

  static async getFileName(url: string) {

    try {

      try {
        const match = url.match(/\/([^\/?]+)\.[^\/?]+\?/);

        if (match && match[1]) {
          return match[1];
        } else {
          console.warn('No valid file name found in the URL.');
          return undefined;
        }
      } catch (error) {
        console.error('Error obtaining file name:', error);
        return undefined;
      }

    } catch (error) {
      console.error('Error obtaining file name:', error);
    }
  }

  static async getFileExtension(url: String) {
    const match = url.match(/\.(\w+)(\?.*)?$/);
    return match ? match[1] : null;
  };

  static getImages = async () => {

    const { status } = await MediaLibrary.requestPermissionsAsync();

    const albumName = 'DCIM';
    const albums = await MediaLibrary.getAlbumsAsync();
    const album = albums.find(a => a.title === albumName);

    if (!album) {
      console.log('Álbum não encontrado', `O álbum '${albumName}' não foi encontrado.`);
      return;
    }

    const media = await MediaLibrary.getAssetsAsync({
      album: album,
      mediaType: 'photo',
    });


    return media.assets;

  };
  static downloadImage = async (url: string, fileName: String) => {

    try {

      let extension = await Utils.getFileExtension(url);

      const f = await Utils.getFileName(url);

      if (!extension) {
        extension = 'jpg';
      }
      const fileUri = `${FileSystem.documentDirectory}${fileName}.${extension}`;

      const { status } = await MediaLibrary.requestPermissionsAsync();
      const { uri } = await FileSystem.downloadAsync(url, fileUri);

      //const asset = await MediaLibrary.createAssetAsync(uri);
      //await MediaLibrary.createAlbumAsync('alk', asset, false);

    } catch (error) {
      console.error(error);
      console.log('Erro para baixar a imagem!');
    }
  };



  static fetchImage = async () => {

    const sharepointImageUrl = 'https://alkmtech.sharepoint.com/:i:/r/sites/novaalianca/SiteAssets/CarrocelPaes/broa.jpg?csf=1&web=1&e=dhMJWr';

    const token = await this.getToken();

    try {
      const response = await axios.get(sharepointImageUrl, {
        headers: {
          Authorization: `Bearer ${token}`
        },
        responseType: 'blob'
      });

      const imageBlob = response.data;
      const imageObjectURL = URL.createObjectURL(imageBlob);
      return imageObjectURL;

    } catch (error) {
      //console.error('Error ao carregar a imagem:', error);
    }
  };


  static async getDigest(accessToken: string) {

    try {
      // Enviar requisição POST para /_api/contextinfo
      const response = await fetch(`${Constants.WEBURL}/_api/contextinfo`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json;odata=verbose',
          'Authorization': `Bearer ${accessToken}`, // Token de acesso do OAuth
        },
      });

      // Verificar se a resposta foi bem-sucedida
      if (response.ok) {
        const data = await response.json();
        // Retornar o valor do FormDigestValue
        return data.d.GetContextWebInformation.FormDigestValue;
      } else {
        const error = await response.text();
        console.error('Erro ao obter Request Digest:', error);
        throw new Error('Não foi possível obter o Request Digest.');
      }
    } catch (error) {
      console.error('Erro na requisição:', error);
      throw error;
    }
  };

}


export default Utils;
