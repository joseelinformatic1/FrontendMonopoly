import { IPlayer } from "./IPlayer";
import { IPropertie } from "./IPropertie";

export interface Board {
    properties:IPropertie[];
    position: IPlayer[];
}
