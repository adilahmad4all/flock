import { inject, Injectable } from "@angular/core";
// import  SecureLS from 'secure-ls'
import { AppConstants } from "../../shared/constants/app-constants";
import { Storage} from "@ionic/storage-angular";
// const secureLS =  new SecureLS({
//   encodingType: 'aes',
//   encryptionSecret: AppConstants.SECRET_KEY,
//   isCompression: true
// });

@Injectable()
export class StorageService {
  
   storage = this.store.create();
  
 constructor(private store: Storage) {


}



   async setKeyValue(key: string, value: string) {
    const s = await this.storage;
    s.set(key, value);
  }

   async getValueByKey(key: string){
     const s = await this.storage;
     const val = await s.get(key);
     return  val;
     
  }

   async removeKey(key: string) {
    const s = await this.storage;
    s.remove(key);
  }
}