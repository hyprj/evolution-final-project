import { makeAutoObservable, runInAction } from "mobx";
import {
  createUser,
  getUserBalance,
  setUserBalance,
  signIn,
} from "../../services/db";

export interface User {
  displayName: string | null;
  email: string | null;
  uid: string;
  balance: number;
}

class AuthStore {
  public status: "loading" | "visitor" | "loggedIn";
  public user: User | null;

  constructor() {
    this.status = "loading";
    this.user = null;
    makeAutoObservable(this, {}, { autoBind: true });
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
      const balance = (await getUserBalance(userData.uid)) || 2000;
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
    runInAction(() => {
      if (!this.user) return;
      const updatedBalance = amount + this.user.balance;
      setUserBalance(this.user.uid, updatedBalance);
      this.user.balance = updatedBalance;
    });
  }

  public setBalance(balance: number): void {
    runInAction(() => {
      if (!this.user) return;
      setUserBalance(this.user?.uid, balance);
      this.user.balance = balance;
    });
  }

  public decreaseFromBalance(amount: number): void {
    runInAction(() => {
      if (!this.user) return;
      const updatedBalance = this.user.balance - amount;
      setUserBalance(this.user.uid, updatedBalance);
      this.user.balance = updatedBalance;
    });
  }
}

export const authStore = new AuthStore();
