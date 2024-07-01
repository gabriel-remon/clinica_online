import { CanActivateFn } from '@angular/router';

export const noLoginGuard: CanActivateFn = (route, state) => {
  return true;
};
