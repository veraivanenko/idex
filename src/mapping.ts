import { BigInt } from "@graphprotocol/graph-ts"
import {
  Idex,
  SetOwner,
  Order,
  Cancel,
  Trade,
  Deposit,
  Withdraw
} from "../generated/Idex/Idex"
import { User,IdexDeposit, IdexWithdraw,Balance} from "../generated/schema"
import {getOrCreateUser} from "./helpers/helpers";

export function handleSetOwner(event: SetOwner): void {
  // Entities can be loaded from the store using a string ID; this ID
  // needs to be unique across all entities of the same type


  // Note: If a handler doesn't require existing field values, it is faster
  // _not_ to load the entity from the store. Instead, create it fresh with
  // `new Entity(...)`, set the fields that should be updated and save the
  // entity back to the store. Fields that were not set or unset remain
  // unchanged, allowing for partial updates to be applied.

  // It is also possible to access smart contracts from mappings. For
  // example, the contract that has emitted the event can be connected to
  // with:
  //
  // let contract = Contract.bind(event.address)
  //
  // The following functions can then be called on this contract to access
  // state variables and other data:
  //
  // - contract.adminWithdraw(...)
  // - contract.lastActiveTransaction(...)
  // - contract.withdrawn(...)
  // - contract.admins(...)
  // - contract.tokens(...)
  // - contract.feeAccount(...)
  // - contract.invalidOrder(...)
  // - contract.getOwner(...)
  // - contract.owner(...)
  // - contract.safeSub(...)
  // - contract.safeMul(...)
  // - contract.traded(...)
  // - contract.setInactivityReleasePeriod(...)
  // - contract.safeAdd(...)
  // - contract.trade(...)
  // - contract.inactivityReleasePeriod(...)
  // - contract.withdraw(...)
  // - contract.orderFills(...)
  // - contract.balanceOf(...)
}

export function handleOrder(event: Order): void {
}

export function handleCancel(event: Cancel): void {
}

export function handleTrade(event: Trade): void {
}

export function handleDeposit(event: Deposit): void {
  let entity = IdexDeposit.load(event.transaction.hash.toHex())
  if (entity == null) {
    entity = new IdexDeposit(event.transaction.hash.toHex())
  }
  let user=getOrCreateUser(event.params.user)
  entity.amount=event.params.amount
  entity.balance=event.params.balance
  entity.token=event.params.token
  entity.creator=user.id
  entity.save()

  let bal = Balance.load(user.id+'-'+event.params.token.toHexString())
  if (bal == null) {
    bal = new Balance(user.id+'-'+event.params.token.toHexString())
  }
  bal.token=event.params.token
  bal.amount=event.params.balance
  bal.user=user.id
  bal.save()

}

export function handleWithdraw(event: Withdraw): void {
  let entity = IdexWithdraw.load(event.transaction.hash.toHex())
  if (entity == null) {
    entity = new IdexWithdraw(event.transaction.hash.toHex())
  }
  let user=getOrCreateUser(event.params.user)
  entity.amount=event.params.amount
  entity.balance=event.params.balance
  entity.token=event.params.token
  entity.creator=user.id
  entity.save()

  let bal = Balance.load(user.id+'-'+event.params.token.toHexString())
  if (bal == null) {
    bal = new Balance(user.id+'-'+event.params.token.toHexString())
  }
  bal.token=event.params.token
  bal.amount=event.params.balance
  bal.user=user.id
  bal.save()

}
