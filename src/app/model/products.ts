export interface IProduct {
  pname: string;
  pid: string;
  pstatus: 'In-Progress' | 'Dispatched' | 'Delivered';
  canReturn: 0 | 1;
}

export interface IRes<T> {
  msg: string;
  data: T;
}