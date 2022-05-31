import { writable} from "svelte/store";
import Gun from "gun";
import "gun/sea";
//import "gun/axe";

export const gun = Gun('https://gun-matrix.herokuapp.com/gun', { radisk: true });

const LoginStore = writable();

const user = gun.user().recall({sessionStorage: true});

export const createUser = function(username, password){
    user.create(username, password, (ack) => {
        if(ack.ok === 0){
            console.log("user successfully created: ", ack);
            authenticateUser(username,password);
        }else{
            alert(ack.err);
            throw new Error(ack.err);
        }
    });
}

export const authenticateUser = function(username, password){
    user.auth(username, password, (ack) => {
        if(ack.err){
            //createUser(username, password);
            alert(ack.err);
            throw new Error(ack.err);
        }else{
            return ack;
        }
    })
}

gun.on("auth", async (e) => {
    const alias = await user.get("alias");
    LoginStore.set(alias);
});


export default LoginStore;