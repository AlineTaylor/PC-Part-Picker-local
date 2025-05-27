import { Injectable } from '@angular/core';
import { Auth, signInWithPopup, GoogleAuthProvider, signOut, user } from '@angular/fire/auth';
import { toSignal } from '@angular/core/rxjs-interop';
import { computed, inject, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // gets firebase auth service
  private auth = inject(Auth);
  // emits the user if logged in (returns the user when signed in and null when logged out)
  readonly currentUser = toSignal(user(this.auth), { initialValue: null });
  readonly isLoggedIn = computed(() => {
    // checks if the user is logged in or not
    const loggedIn = !!this.currentUser();
    // returns the logged in status
    localStorage.setItem('isLoggedIn', loggedIn.toString());
    return loggedIn;
  });

  async signInWithGoogle() {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });

    try {
      await signInWithPopup(this.auth, provider);
      localStorage.setItem('isLoggedIn', 'true');
      console.log('✅ Signed in - localStorage:', localStorage.getItem('isLoggedIn'));
    } catch (error) {
      console.error('Sign-in error:', error);
    }
  }

  async logout() {
    try {
      await signOut(this.auth);
      localStorage.setItem('isLoggedIn', 'false');
      console.log('🚪 Logged out - localStorage:', localStorage.getItem('isLoggedIn'));
    } catch (error) {
      console.error('Logout error:', error);
    }
  }
}
