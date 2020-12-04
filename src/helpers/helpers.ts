import {
    User
} from "../../generated/schema";
import { Address, BigInt, log } from "@graphprotocol/graph-ts";


export function getOrCreateUser(address: Address): User {
    let user = User.load(address.toHexString());

    if (user == null) {
        user = new User(address.toHexString());
        user.save();
    }
    return user as User;
}