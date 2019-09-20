import { updateAssets } from "modules/auth/actions/update-assets";
import logError from "utils/log-error";
import { getDai } from "modules/contracts/actions/contractCalls";
import { AppState } from "store";
import { Action } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { NodeStyleCallback } from "modules/types";

export default function(callback: NodeStyleCallback = logError) {
  return async (dispatch: ThunkDispatch<void, any, Action>, getState: () => AppState) => {
    // TODO: this will change when pending tx exists
    await getDai().catch((err: Error) => {
      console.log("error could not get dai", err);
      logError(new Error("get-Dai"));
    });
    dispatch(updateAssets());
    callback(null);
  };
}
