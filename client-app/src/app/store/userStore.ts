import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { User, UserFormValues } from "../models/user";
import { router } from "../router/Router";
import { store } from "./store";

export default class UserStore {
    user: User | null = null;
    fbLoading = false;
    refreshTokenTimeOut: any;

    constructor() {
        makeAutoObservable(this);
    }

    get isLoggedIn() {
        return !!this.user;
    }

    login = async (creds: UserFormValues) => {
        try {
            const user = await agent.Account.login(creds);
            store.commonStore.setToken(user.token);
            this.startRefreshTokenTimer(user);
            runInAction(() => this.user = user);

            router.navigate('/activities');
            store.modalStore.closeModal();
        }
        catch (error) {
            throw error;
        }
    }

    logout = () => {
        store.commonStore.setToken(null);
        this.user = null;
        router.navigate('/');
    }

    getUser = async () => {
        try {
            const user = await agent.Account.current();
            runInAction(() => this.user = user);
            store.commonStore.setToken(user.token);
            this.startRefreshTokenTimer(user);
        } catch (error) {
            console.log(error)
        }
    }

    register = async (creds: UserFormValues) => {
        try {
            await agent.Account.register(creds);
            // store.commonStore.setToken(user.token);
            // this.startRefreshTokenTimer(user);
            // runInAction(() => this.user = user);
            router.navigate(`/account/registerSuccess?email=${creds.email}`);
            store.modalStore.closeModal();
        }
        catch (error: any) {
            if (error?.response?.status === 400) throw error;
            store.modalStore.closeModal();
            console.log(500);
        }
    }

    setImage = (image: string) => {
        if (this.user) this.user.image = image;
    }

    setDisplayName = (name: string) => {
        if (this.user) this.user.displayName = name;
    }

    facebookLogin = async (accessToken: string) => {
        try {
            this.fbLoading = true;
            const user = await agent.Account.fbLogin(accessToken);
            store.commonStore.setToken(user.token);
            this.startRefreshTokenTimer(user);
            runInAction(() => {
                this.user = user;
                this.fbLoading = false;
            });
            router.navigate('/activities');
        } catch (error) {
            console.log(error);
            runInAction(() => { this.fbLoading = false; });
        }
    }

    refreshToken = async () => {
        this.stopRefreshTokenTimer();
        try {
            var user = await agent.Account.refreshToken();
            runInAction(() => this.user = user);
            store.commonStore.setToken(user.token);
            this.startRefreshTokenTimer(user);
        } catch (error) {
            console.log(error);
        }
    }

    private startRefreshTokenTimer(user: User) {
        const jwtToken = JSON.parse(window.atob(user.token.split('.')[1]));
        const expires = new Date(jwtToken.exp * 1000);
        const timeout = expires.getTime() - Date.now() - (60 * 1000);
        this.refreshTokenTimeOut = setTimeout(this.refreshToken, timeout);
    }

    private stopRefreshTokenTimer() {
        clearTimeout(this.refreshTokenTimeOut);
    }

}