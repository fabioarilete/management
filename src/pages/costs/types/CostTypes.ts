import { MarkUpTypes } from '../../markUps/types/MarkUpTypes';
import { MaterialTypes } from '../../materials/types/MaterialTypes';
import { OperationTypes } from '../../operations/types/OperationTypes';
import { InfoTypes } from './InfoTypes';

export interface CostMaterial extends MaterialTypes {
  totalItemMaterial: number;
  obs: string;
  qt: string;
  uuid: string;
}

export interface CostOperation extends OperationTypes {
  totalItemOperation: number;
  obs: string;
  qt: string;
  cav: string;
  ciclo: string;
  uuid: string;
}

export interface CostTypes {
  cod: string;
  name: string;
  unid: string;
  qt: string;
  st: string;
  tipoProduto: string;
  sf_st: string;
  id: number;
  materialsProduct: CostMaterial[];
  operationsProduct: CostOperation[];
  totalOperations: number;
  totalMaterials: number;
  markUpProduct: MarkUpTypes | null;
  informationsProduct: InfoTypes | null;
  totalCost: number;
  unitCost: number;
  priceList: number;
  mediumPrice: number;
}
