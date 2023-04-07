import { makeAutoObservable, runInAction } from "mobx";
import { createUser, getUserBalance, signIn } from "../../services/db";

export interface User {
  displayName: string | null;
  email: string | null;
  uid: string;
  balance: number | null;
}

class AuthStore {
  public status: "loading" | "visitor" | "loggedIn";
  public user: User | null;

  constructor() {
    this.status = "loading";
    this.user = null;
    makeAutoObservable(this);
  }

  getStatus() {
    return this.status;
  }

  public async login(
    email: string,
    password: string
  ): Promise<AuthStore["status"]> {
    this.status = "loading";
    const userData = await signIn(email, password);

    if (userData) {
      const balance = await getUserBalance(userData.uid);
      runInAction(() => {
        this.user = { ...userData, balance };
        this.status = "loggedIn";
      });
      return this.status;
    } else {
      runInAction(() => {
        this.status = "visitor";
      });
      return this.status;
    }
  }

  public async register(
    email: string,
    displayName: string,
    password: string
  ): Promise<"visitor" | "loggedIn"> {
    this.status = "loading";
    const user = await createUser(email, displayName, password);

    if (user) {
      runInAction(() => {
        this.user = user;
        this.status = "loggedIn";
      });
      return "loggedIn";
    } else {
      runInAction(() => {
        this.status = "visitor";
      });
      return "visitor";
    }
  }

  public setUser(user: User): void {
    this.user = user;
    this.status = "loggedIn";
  }

  public logOut(): void {
    this.user = null;
    this.status = "visitor";
  }

  public addToBalance(amount: number): void {
    if (this.user?.balance) {
      this.user.balance += amount;
    }
  }

  public decreaseFromBalance(amount: number): void {
    if (this.user?.balance) {
      this.user.balance -= amount;
    }
  }
}

export const authStore = new AuthStore();
