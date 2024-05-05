import { Injectable } from "@angular/core";
import SecureLS from "secure-ls";
import { AppConstants } from "../../shared/constants/app-constants";

const secureLS = new SecureLS({
  encodingType: "aes",
  encryptionSecret: AppConstants.SECRET_KEY,
  isCompression: true,
});
// SLSService
@Injectable()
export  class StorageService {
   setKeyValue(key: string, value: string) {
    secureLS.set(key, value);
  }

   getValueByKey(key: string):string {
    return secureLS.get(key);
  }

   removeKey(key: string) {
    secureLS.remove(key);
  }
}
