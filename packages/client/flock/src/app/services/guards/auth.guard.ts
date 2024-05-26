import { CanActivateFn, Router } from "@angular/router";
import { AppStateService } from "../common/appStateService";
import { inject } from "@angular/core";

export function authenticationGuard(): CanActivateFn {
    return () => {
      const appState: AppStateService = inject(AppStateService);
      const router = inject(Router);
      console.log(appState.userData());
        if( appState.userData())
            return true;
        router.navigate(['/login']);
        return false;
    };
  }