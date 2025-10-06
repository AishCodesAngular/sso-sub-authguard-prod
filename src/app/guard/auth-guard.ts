import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  const isAppOpen = localStorage.getItem('isRootAppOpen');

  console.log('isAppOpen', isAppOpen);
  if (isAppOpen === 'true') {
    return true; // Allow access
  } else {
    router.navigate(['/error']); // Redirect to message page
    return false;
  }
};
